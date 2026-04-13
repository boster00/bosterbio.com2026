#!/usr/bin/env python3
"""
Export Magento 2 cms_page rows to JSON for local analysis.
Run ONLY on a host that can reach MySQL (e.g. after SSH to app server).

  export MYSQL_HOST=127.0.0.1 MYSQL_USER=... MYSQL_PASSWORD=... MYSQL_DATABASE=bosterbio_m2
  python3 scripts/export-magento-cms-pages.py > cms_pages_export.json

Do not commit cms_pages_export.json or passwords.
"""
from __future__ import annotations

import json
import os
import sys

try:
    import pymysql
except ImportError:
    print("Install: pip install pymysql", file=sys.stderr)
    sys.exit(1)


def main() -> None:
    conn = pymysql.connect(
        host=os.environ.get("MYSQL_HOST", "127.0.0.1"),
        user=os.environ["MYSQL_USER"],
        password=os.environ["MYSQL_PASSWORD"],
        database=os.environ["MYSQL_DATABASE"],
        charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor,
    )
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT page_id, title, identifier, content, content_heading, is_active
                FROM cms_page
                """
            )
            rows = cur.fetchall()
        json.dump(rows, sys.stdout, ensure_ascii=False, indent=0)
        sys.stdout.write("\n")
    finally:
        conn.close()


if __name__ == "__main__":
    for key in ("MYSQL_USER", "MYSQL_PASSWORD", "MYSQL_DATABASE"):
        if key not in os.environ:
            print(f"Missing env: {key}", file=sys.stderr)
            sys.exit(1)
    main()
