#!/usr/bin/env python3
"""
Stream the full Magento internal-export.csv into BosterBio Supabase `products`.

- Handles multiline quoted cells (streaming csv.DictReader).
- UPSERT on `sku` via PostgREST (same column mapping as migrate-products-pilot.mjs).
- Products only by default (--images is expensive for 85K+ rows).

Environment (preferred):
  BOSTERBIO_SUPABASE_URL, BOSTERBIO_SUPABASE_KEY

Usage:
  python3 scripts/migrate_products_full_stream.py [--max-products=N] [--batch=80] [--images]
"""
from __future__ import annotations

import argparse
import csv
import io
import json
import os
import sys
import urllib.error
import urllib.request
from typing import Any

csv.field_size_limit(sys.maxsize)

TYPE_B_COLUMNS = [
    "kit_components",
    "cross_reactivity",
    "reconstitution",
    "predicted_reactivity",
    "recommended_detection_systems",
    "sensitivity",
    "reproducibility",
    "assay_range",
    "sample_type",
    "sequence_similarities",
    "description_before_attributes",
    "description_after_attributes",
    "immunogen",
    "purification",
    "concentration",
    "form",
    "isotype",
    "tissue_specificity",
    "subcellular_localization",
    "molecular_weight",
    "principle",
    "tmb_incubation_time",
    "intra_inter_assay_cv",
    "sample_data",
    "application_details",
]
TARGET_INFO_FIELDS = [
    "gene_name",
    "uniprot_id",
    "synonyms",
    "protein_function",
    "gene_full_name",
    "protein_name",
]

CSV_URL = "https://www.bosterbio.com/internal-export.csv"


def parse_array_string(s: str | None) -> list[str]:
    if not s:
        return []
    out: list[str] = []
    for part in s.replace("|", ",").replace(";", ",").split(","):
        t = part.strip()
        if t:
            out.append(t)
    return out


def parse_images(raw_images: str | None, raw_labels: str | None) -> list[dict[str, Any]]:
    if not raw_images:
        return []
    paths = [p.strip() for p in raw_images.split("|") if p.strip()]
    labels = [p.strip() for p in (raw_labels or "").split("|")]
    rows = []
    base = "https://www.bosterbio.com/media/catalog/product"
    for i, p in enumerate(paths):
        if p.startswith("http"):
            url = p
        else:
            url = base + (p if p.startswith("/") else "/" + p)
        rows.append(
            {
                "image_url": url,
                "alt_text": labels[i] if i < len(labels) else None,
                "type": "hero" if i == 0 else "gallery",
                "position": i,
            }
        )
    return rows


def row_to_product(row: dict[str, str | None]) -> dict[str, Any] | None:
    sku = (row.get("sku") or "").strip()
    if not sku:
        return None
    url_key = (row.get("url_key") or "").strip()
    if not url_key:
        return None
    tpl = (row.get("template") or "").strip() or "antibodies"
    # `handle` is UNIQUE in DB; Magento occasionally reuses url_key across SKUs — use SKU so handle is always unique.
    handle = sku
    target_info: dict[str, str] = {}
    for f in TARGET_INFO_FIELDS:
        v = row.get(f)
        if v:
            target_info[f] = str(v).strip()
    clone = " ".join(
        x for x in ((row.get("clonality") or "").strip(), (row.get("clone_number") or "").strip()) if x
    )
    product: dict[str, Any] = {
        "sku": sku,
        "title": (row.get("name") or "").strip() or sku,
        "handle": handle,
        "product_template": tpl,
        "category": (row.get("product_category") or "").strip() or None,
        "status": "enabled" if (row.get("status") or "1") == "1" else "disabled",
        "reactivity": parse_array_string(row.get("reactivity")),
        "applications": parse_array_string(row.get("applications")),
        "clone": clone or None,
        "host_species": (row.get("host") or "").strip() or None,
        "badges": (row.get("badges") or "").strip() or None,
        "target_info": target_info,
        "description": row.get("description") or None,
        "short_description": row.get("short_description") or None,
        "background": row.get("background") or None,
        "storage": (row.get("storage") or "").strip() or None,
        "meta_title": row.get("meta_title") or None,
        "meta_description": row.get("meta_description") or None,
        "meta_keywords": row.get("meta_keyword") or None,
        "search_index": " ".join(
            x
            for x in (
                sku,
                (row.get("name") or "").strip(),
                (row.get("gene_name") or "").strip(),
                (row.get("uniprot_id") or "").strip(),
                (row.get("synonyms") or "").strip(),
            )
            if x
        ),
    }
    for i, col in enumerate(TYPE_B_COLUMNS):
        if i >= 25:
            break
        v = row.get(col)
        product[f"attr_{i + 1}"] = str(v).strip() if v else None
    return product


def load_supabase() -> tuple[str, str]:
    u = os.environ.get("BOSTERBIO_SUPABASE_URL", "").strip()
    k = (
        os.environ.get("BOSTERBIO_SUPABASE_KEY", "").strip()
        or os.environ.get("BOSTERBIO_SUPABASE_SERVICE_ROLE_KEY", "").strip()
    )
    if u and k:
        return u.rstrip("/"), k
    u = os.environ.get("NEXT_PUBLIC_SUPABASE_URL", "").strip()
    k = (
        os.environ.get("SUPABASE_SECRETE_KEY", "").strip()
        or os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "").strip()
    )
    if u and k:
        return u.rstrip("/"), k
    print(
        "Missing BOSTERBIO_SUPABASE_URL/BOSTERBIO_SUPABASE_KEY "
        "or NEXT_PUBLIC_SUPABASE_URL/SUPABASE_SECRETE_KEY",
        file=sys.stderr,
    )
    raise SystemExit(1)


def rest_post_json(url: str, key: str, path: str, body: Any, prefer: str) -> tuple[int, str]:
    data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(
        url + path,
        data=data,
        method="POST",
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Prefer": prefer,
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=300) as resp:
            return resp.status, resp.read().decode("utf-8", errors="replace")[:500]
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", errors="replace")[:800]


def rest_delete_images(url: str, key: str, product_ids: list[int]) -> None:
    if not product_ids:
        return
    # Chunk in.query to avoid huge URLs
    chunk = 80
    for i in range(0, len(product_ids), chunk):
        part = ",".join(str(x) for x in product_ids[i : i + chunk])
        req = urllib.request.Request(
            f"{url}/rest/v1/product_images?product_id=in.({part})",
            method="DELETE",
            headers={"apikey": key, "Authorization": f"Bearer {key}"},
        )
        with urllib.request.urlopen(req, timeout=120) as _:
            pass


def rest_insert_images(url: str, key: str, rows: list[dict[str, Any]]) -> None:
    if not rows:
        return
    data = json.dumps(rows).encode("utf-8")
    req = urllib.request.Request(
        url + "/rest/v1/product_images",
        data=data,
        method="POST",
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
        },
    )
    with urllib.request.urlopen(req, timeout=300) as _:
        pass


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument(
        "--max-products",
        type=int,
        default=0,
        help="Stop after successfully upserting N products (0 = no limit)",
    )
    ap.add_argument("--batch", type=int, default=80, help="Rows per POST (lower if Supabase returns statement timeout)")
    ap.add_argument("--images", action="store_true", help="Refresh product_images per batch (slow)")
    args = ap.parse_args()

    sb_url, sb_key = load_supabase()
    print(
        "Supabase:",
        sb_url,
        "batch=",
        args.batch,
        "max_products=",
        args.max_products or "all",
        "images=",
        args.images,
    )

    req = urllib.request.Request(
        CSV_URL,
        headers={"User-Agent": "bosterbio-migrate/1.0 (+https://github.com/boster00/bosterbio.com2026)"},
    )
    resp = urllib.request.urlopen(req, timeout=600)
    text = io.TextIOWrapper(resp, encoding="utf-8-sig", newline="", errors="replace")
    reader = csv.DictReader(text)

    batch: list[dict[str, Any]] = []
    batch_rows: list[dict[str, str | None]] = []
    total = 0
    errors = 0

    def flush() -> None:
        nonlocal batch, batch_rows, total, errors
        if not batch:
            return
        code, body = rest_post_json(
            sb_url,
            sb_key,
            "/rest/v1/products?on_conflict=sku",
            batch,
            "resolution=merge-duplicates,return=representation",
        )
        if code not in (200, 201):
            print("BATCH_FAIL", code, body[:400])
            errors += 1
            # retry singles
            for one in batch:
                c2, b2 = rest_post_json(
                    sb_url,
                    sb_key,
                    "/rest/v1/products?on_conflict=sku",
                    [one],
                    "resolution=merge-duplicates,return=representation",
                )
                if c2 not in (200, 201):
                    print("ROW_FAIL", one.get("sku"), b2[:200])
        else:
            total += len(batch)
            if args.images:
                try:
                    inserted = json.loads(body) if body.strip().startswith("[") else []
                except json.JSONDecodeError:
                    inserted = []
                sku_to_id = {str(p.get("sku")): int(p["id"]) for p in inserted if p.get("sku") and p.get("id")}
                imgs: list[dict[str, Any]] = []
                pids: list[int] = []
                for raw in batch_rows:
                    sku = (raw.get("sku") or "").strip()
                    pid = sku_to_id.get(sku)
                    if not pid:
                        continue
                    pids.append(pid)
                    for im in parse_images(raw.get("images"), raw.get("image_labels")):
                        imgs.append({"product_id": pid, **im})
                if imgs:
                    rest_delete_images(sb_url, sb_key, list(dict.fromkeys(pids)))
                    for i in range(0, len(imgs), 200):
                        rest_insert_images(sb_url, sb_key, imgs[i : i + 200])
        batch = []
        batch_rows = []
        sys.stdout.write(f"\rUpserted products (cumulative): {total}  errors_batches={errors}")
        sys.stdout.flush()

    n = 0
    for row in reader:
        n += 1
        if n % 5000 == 0:
            print(f"\n...scanned CSV rows={n} products_upserted={total}")
        p = row_to_product(row)
        if not p:
            continue
        batch.append(p)
        batch_rows.append(row)
        if args.max_products and total + len(batch) >= args.max_products:
            need = args.max_products - total
            if need <= 0:
                break
            batch = batch[:need]
            batch_rows = batch_rows[:need]
            flush()
            break
        if len(batch) >= args.batch:
            flush()

    flush()
    print(f"\nDone. products_upserted={total} csv_data_rows_seen={n} batch_errors={errors}")


if __name__ == "__main__":
    main()
