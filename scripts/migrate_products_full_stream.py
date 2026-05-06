#!/usr/bin/env python3
"""
Full-catalog product migration from Magento internal-export.csv into BosterBio Supabase.

Streams the CSV (handles quoted multiline cells), maps rows using the same Type A / Type B
rules as scripts/migrate-products-pilot.mjs, and upserts products + product_images via PostgREST.

Quest alignment:
  - python3 + csv.field_size_limit (large HTML cells)
  - utf-8-sig for BOM
  - Column `template` (last column in the 100-col export) → products.product_template
  - Duplicate Magento url_key: second+ rows use handle = sku so `handle` UNIQUE holds

Env (repo-root .env.local or --env-file), same pairing as storefront-supabase-env.mjs:
  Prefer BOSTERBIO_SUPABASE_URL + BOSTERBIO_SUPABASE_KEY, else NEXT_PUBLIC_SUPABASE_URL +
  SUPABASE_SECRETE_KEY or SUPABASE_SERVICE_ROLE_KEY.

Usage:
  python3 scripts/migrate_products_full_stream.py \\
    --source https://www.bosterbio.com/internal-export.csv \\
    --batch-size 150

Dry run first 500 rows:
  python3 scripts/migrate_products_full_stream.py --limit 500 --skip-images
"""

from __future__ import annotations

import argparse
import csv
import io
import json
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

csv.field_size_limit(10 * 1024 * 1024)

REPO_ROOT = Path(__file__).resolve().parent.parent

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


def parse_dotenv(path: Path) -> dict[str, str]:
    out: dict[str, str] = {}
    raw = path.read_text(encoding="utf-8")
    for line in raw.splitlines():
        s = line.strip()
        if not s or s.startswith("#"):
            continue
        if "=" not in s:
            continue
        k, v = s.split("=", 1)
        out[k.strip()] = v.strip()
    return out


def resolve_storefront_creds(env: dict[str, str]) -> tuple[str, str]:
    bu = (env.get("BOSTERBIO_SUPABASE_URL") or "").strip()
    bk = (env.get("BOSTERBIO_SUPABASE_KEY") or "").strip()
    if bu and bk:
        return bu.rstrip("/"), bk
    lu = (env.get("NEXT_PUBLIC_SUPABASE_URL") or "").strip()
    lk = (env.get("SUPABASE_SECRETE_KEY") or env.get("SUPABASE_SERVICE_ROLE_KEY") or "").strip()
    if lu and lk:
        return lu.rstrip("/"), lk
    print(
        "Missing Supabase creds: set BOSTERBIO_SUPABASE_URL + BOSTERBIO_SUPABASE_KEY "
        "or NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SECRETE_KEY in .env.local",
        file=sys.stderr,
    )
    sys.exit(1)


def parse_array_string(s: str | None) -> list[str]:
    if not s:
        return []
    return [x.strip() for x in s.replace("|", ",").replace(";", ",").split(",") if x.strip()]


def parse_images(raw_images: str | None, raw_labels: str | None) -> list[dict[str, Any]]:
    if not raw_images:
        return []
    paths = [s.strip() for s in raw_images.split("|") if s.strip()]
    labels = [s.strip() for s in (raw_labels or "").split("|")]
    rows = []
    for i, p in enumerate(paths):
        url = (
            p
            if p.startswith("http")
            else f"https://www.bosterbio.com/media/catalog/product{p if p.startswith('/') else '/' + p}"
        )
        rows.append(
            {
                "image_url": url,
                "alt_text": labels[i] if i < len(labels) else None,
                "type": "hero" if i == 0 else "gallery",
                "position": i,
            }
        )
    return rows


def row_to_product(row: dict[str, str | None], seen_handles: set[str]) -> dict[str, Any] | None:
    sku = (row.get("sku") or "").strip()
    if not sku:
        return None
    url_key = (row.get("url_key") or "").strip()
    cand = url_key or sku
    handle = sku if cand in seen_handles else cand
    seen_handles.add(handle)

    target_info: dict[str, str] = {}
    for f in TARGET_INFO_FIELDS:
        v = row.get(f)
        if v:
            target_info[f] = str(v)

    tpl = (row.get("template") or "").strip() or "antibodies"
    status_raw = row.get("status") or "1"
    status = "enabled" if str(status_raw).strip() == "1" else "disabled"

    clone_parts = [row.get("clonality"), row.get("clone_number")]
    clone = " ".join(str(x).strip() for x in clone_parts if x and str(x).strip()) or None

    product: dict[str, Any] = {
        "sku": sku,
        "title": (row.get("name") or "").strip() or sku,
        "handle": handle,
        "product_template": tpl,
        "category": (row.get("product_category") or "").strip() or None,
        "status": status,
        "reactivity": parse_array_string(row.get("reactivity")),
        "applications": parse_array_string(row.get("applications")),
        "clone": clone,
        "host_species": (row.get("host") or "").strip() or None,
        "badges": (row.get("badges") or "").strip() or None,
        "target_info": target_info,
        "description": row.get("description") or None,
        "short_description": row.get("short_description") or None,
        "background": row.get("background") or None,
        "storage": row.get("storage") or None,
        "meta_title": row.get("meta_title") or None,
        "meta_description": row.get("meta_description") or None,
        "meta_keywords": row.get("meta_keyword") or None,
        "search_index": " ".join(
            str(x)
            for x in [sku, row.get("name"), row.get("gene_name"), row.get("uniprot_id"), row.get("synonyms")]
            if x
        ),
    }
    for i, col in enumerate(TYPE_B_COLUMNS):
        if i >= 25:
            break
        v = row.get(col)
        product[f"attr_{i + 1}"] = str(v) if v else None
    return product


def http_json(
    method: str,
    url: str,
    key: str,
    *,
    body: bytes | None = None,
    extra_headers: dict[str, str] | None = None,
) -> tuple[int, str]:
    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Accept": "application/json",
    }
    if body is not None:
        headers["Content-Type"] = "application/json"
    if extra_headers:
        headers.update(extra_headers)
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return resp.status, resp.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", errors="replace")


def upsert_products(base: str, key: str, batch: list[dict[str, Any]]) -> list[dict[str, Any]]:
    url = f"{base}/rest/v1/products?on_conflict=sku"
    body = json.dumps(batch).encode()
    status, text = http_json(
        "POST",
        url,
        key,
        body=body,
        extra_headers={
            "Prefer": "resolution=merge-duplicates,return=representation",
        },
    )
    if status not in (200, 201):
        raise RuntimeError(f"products upsert HTTP {status}: {text[:1200]}")
    data = json.loads(text) if text else []
    if not isinstance(data, list):
        raise RuntimeError("unexpected products response shape")
    return data


def delete_images_for_products(base: str, key: str, product_ids: list[int]) -> None:
    if not product_ids:
        return
    ids = ",".join(str(i) for i in product_ids)
    url = f"{base}/rest/v1/product_images?product_id=in.({ids})"
    status, text = http_json("DELETE", url, key)
    if status not in (200, 204):
        raise RuntimeError(f"delete images HTTP {status}: {text[:800]}")


def insert_images(base: str, key: str, rows: list[dict[str, Any]]) -> None:
    if not rows:
        return
    url = f"{base}/rest/v1/product_images"
    body = json.dumps(rows).encode()
    status, text = http_json(
        "POST",
        url,
        key,
        body=body,
        extra_headers={"Prefer": "return=minimal"},
    )
    if status not in (200, 201):
        raise RuntimeError(f"insert images HTTP {status}: {text[:800]}")


def open_csv_source(source: str):
    if source.startswith("http://") or source.startswith("https://"):
        req = urllib.request.Request(source, headers={"User-Agent": "bosterbio-migrate/1.0"})
        return urllib.request.urlopen(req, timeout=120)
    return Path(source).expanduser().open("rb")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument(
        "--source",
        default="https://www.bosterbio.com/internal-export.csv",
        help="CSV URL or local path",
    )
    ap.add_argument(
        "--env-file",
        type=Path,
        default=REPO_ROOT / ".env.local",
        help="Dotenv file with storefront Supabase credentials",
    )
    ap.add_argument("--batch-size", type=int, default=150)
    ap.add_argument("--limit", type=int, default=0, help="Stop after N product rows (0 = no limit)")
    ap.add_argument("--skip-images", action="store_true")
    args = ap.parse_args()

    if not args.env_file.is_file():
        print(f"Env file not found: {args.env_file}", file=sys.stderr)
        sys.exit(1)

    env = parse_dotenv(args.env_file)
    base, key = resolve_storefront_creds(env)

    seen_handles: set[str] = set()
    batch: list[dict[str, Any]] = []
    pending_rows: list[dict[str, str | None]] = []
    total = 0
    processed = 0
    t0 = time.time()

    def flush() -> None:
        nonlocal batch, pending_rows, total
        if not batch:
            return
        inserted = upsert_products(base, key, batch)
        sku_to_id = {str(r["sku"]): int(r["id"]) for r in inserted}
        if not args.skip_images:
            pids = list(sku_to_id.values())
            delete_images_for_products(base, key, pids)
            img_rows = []
            for raw in pending_rows:
                sku = (raw.get("sku") or "").strip()
                pid = sku_to_id.get(sku)
                if not pid:
                    continue
                for img in parse_images(raw.get("images"), raw.get("image_labels")):
                    img_rows.append({"product_id": pid, **img})
            insert_images(base, key, img_rows)
        total += len(batch)
        elapsed = time.time() - t0
        print(f"upserted cumulative products={total} (+{len(batch)}) elapsed_s={elapsed:.1f}")
        batch = []
        pending_rows = []

    bio = open_csv_source(args.source)
    try:
        text_io = io.TextIOWrapper(bio, encoding="utf-8-sig", newline="")
        reader = csv.DictReader(text_io)
        for row in reader:
            # csv.DictReader yields dict[str, str | None]
            rec = {k: (v if v is not None else None) for k, v in row.items()}
            prod = row_to_product(rec, seen_handles)
            if prod is None:
                continue
            batch.append(prod)
            pending_rows.append(rec)
            processed += 1
            if len(batch) >= args.batch_size:
                flush()
            if args.limit and processed >= args.limit:
                flush()
                break
        flush()
    finally:
        bio.close()

    print("done.")


if __name__ == "__main__":
    main()
