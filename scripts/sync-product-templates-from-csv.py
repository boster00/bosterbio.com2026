#!/usr/bin/env python3
"""
Stream Magento internal-export.csv and batch-update products.product_template via
Supabase RPC apply_product_template_updates (sql/007_apply_product_template_updates.sql).

Uses column 100 `template` from the CSV header (same as migrate-products-pilot.mjs).

Environment (first match wins):
  BOSTERBIO_NEXT_PUBLIC_SUPABASE_URL / BOSTERBIO_SUPABASE_SERVICE_ROLE_KEY
  NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SECRETE_KEY (from repo .env.local)

Examples:
  python3 scripts/sync-product-templates-from-csv.py --dry-run --limit 500
  python3 scripts/sync-product-templates-from-csv.py --source https://www.bosterbio.com/internal-export.csv
"""
from __future__ import annotations

import argparse
import csv
import io
import json
import os
import urllib.request
from pathlib import Path

csv.field_size_limit(10 * 1024 * 1024)

REPO_ROOT = Path(__file__).resolve().parents[1]


def load_dotenv_files() -> None:
    candidates = [
        REPO_ROOT / ".env.local",
        REPO_ROOT / "apps" / "web" / ".env.local",
    ]
    for path in candidates:
        if not path.is_file():
            continue
        for raw in path.read_text(encoding="utf-8", errors="replace").splitlines():
            line = raw.strip()
            if not line or line.startswith("#"):
                continue
            if "=" not in line:
                continue
            k, v = line.split("=", 1)
            k, v = k.strip(), v.strip().strip('"').strip("'")
            if k and k not in os.environ:
                os.environ[k] = v


def resolve_credentials() -> tuple[str, str]:
    url = (
        os.environ.get("BOSTERBIO_NEXT_PUBLIC_SUPABASE_URL")
        or os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
        or ""
    ).strip()
    key = (
        os.environ.get("BOSTERBIO_SUPABASE_SERVICE_ROLE_KEY")
        or os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
        or os.environ.get("SUPABASE_SECRETE_KEY")
        or ""
    ).strip()
    if not url or not key:
        raise SystemExit(
            "Missing Supabase URL/key. Set BOSTERBIO_* or NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SECRETE_KEY "
            "(e.g. in repo .env.local)."
        )
    return url, key


def rpc_apply_templates(base_url: str, service_key: str, batch: list[dict]) -> int:
    """Returns rowcount reported by RPC."""
    payload = json.dumps({"payload": batch}).encode("utf-8")
    req = urllib.request.Request(
        f"{base_url.rstrip('/')}/rest/v1/rpc/apply_product_template_updates",
        data=payload,
        method="POST",
        headers={
            "apikey": service_key,
            "Authorization": f"Bearer {service_key}",
            "Content-Type": "application/json",
            "Prefer": "return=representation",
        },
    )
    with urllib.request.urlopen(req, timeout=600) as resp:
        body = resp.read().decode("utf-8").strip()
    # PostgREST returns scalar as plain text or JSON number
    if not body:
        return 0
    try:
        return int(json.loads(body))
    except json.JSONDecodeError:
        return int(body)


def default_template(raw: str | None) -> str:
    t = (raw or "").strip()
    return t if t else "antibodies"


def open_csv_text_stream(source: str):
    if source.startswith("http://") or source.startswith("https://"):
        raw = urllib.request.urlopen(source, timeout=600)
        return io.TextIOWrapper(raw, encoding="utf-8-sig", newline="")
    return open(source, "r", encoding="utf-8-sig", newline="", errors="replace")


def main() -> None:
    parser = argparse.ArgumentParser(description="Sync product_template from Magento CSV.")
    parser.add_argument(
        "--source",
        default="https://www.bosterbio.com/internal-export.csv",
        help="CSV path or URL (default: live internal-export)",
    )
    parser.add_argument("--batch-size", type=int, default=500)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--limit", type=int, default=0, help="Stop after N data rows (0 = no limit)")
    args = parser.parse_args()

    load_dotenv_files()
    if not args.dry_run:
        base_url, service_key = resolve_credentials()
    else:
        try:
            base_url, service_key = resolve_credentials()
        except SystemExit:
            base_url, service_key = ("", "")

    rows_seen = 0
    batches_sent = 0
    total_updated = 0
    pending: list[dict] = []

    with open_csv_text_stream(args.source) as fh:
        reader = csv.DictReader(fh)
        if not reader.fieldnames or "sku" not in reader.fieldnames:
            raise SystemExit("CSV missing header or sku column")

        for row in reader:
            sku = (row.get("sku") or "").strip()
            if not sku:
                continue
            tpl = default_template(row.get("template"))
            pending.append({"sku": sku, "product_template": tpl})
            rows_seen += 1

            if len(pending) >= args.batch_size:
                if args.dry_run:
                    batches_sent += 1
                    total_updated += len(pending)
                else:
                    n = rpc_apply_templates(base_url, service_key, pending)
                    batches_sent += 1
                    total_updated += n
                pending = []

            if args.limit and rows_seen >= args.limit:
                break

        if pending:
            if args.dry_run:
                batches_sent += 1
                total_updated += len(pending)
            else:
                n = rpc_apply_templates(base_url, service_key, pending)
                batches_sent += 1
                total_updated += n

    mode = "dry-run" if args.dry_run else "live"
    print(
        json.dumps(
            {
                "mode": mode,
                "csv_rows_processed": rows_seen,
                "batches": batches_sent,
                "updated_or_would_update": total_updated,
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
