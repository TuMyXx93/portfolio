#!/usr/bin/env python3
"""
Repair legacy sync mutations in engram.db: fill missing `directory` in
session upsert payloads and observation upsert payloads, mirroring
upstream tools/repair-missing-session-directory.sh --fix-exported.

Usage:
    py tools/repair-missing-session-directory.py [--apply] [--project NAME] [--directory DIR]

Default: dry-run. With --apply writes to DB inside a transaction.
"""

import argparse
import json
import os
import sqlite3
import sys
from pathlib import Path

DEFAULT_DB = Path(os.environ.get("ENGRAM_DB") or Path.home() / ".engram" / "engram.db")
DEFAULT_PROJECT = "portfolio"
DEFAULT_DIRECTORY = str(Path.cwd())


def session_required_missing(payload_json: str) -> list[str]:
    if not payload_json:
        return ["directory"]
    try:
        p = json.loads(payload_json)
    except json.JSONDecodeError:
        return ["directory"]
    missing = []
    if not p.get("directory"):
        missing.append("directory")
    return missing


def observation_required_missing(payload_json: str) -> list[str]:
    required = ["sync_id", "session_id", "type", "title", "content", "project", "scope"]
    if not payload_json:
        return required
    try:
        p = json.loads(payload_json)
    except json.JSONDecodeError:
        return required
    return [f for f in required if not p.get(f)]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument(
        "--apply", action="store_true", help="Write changes (default: dry-run)"
    )
    ap.add_argument("--project", default=DEFAULT_PROJECT)
    ap.add_argument("--directory", default=DEFAULT_DIRECTORY)
    ap.add_argument("--db", default=str(DEFAULT_DB))
    args = ap.parse_args()

    db_path = Path(args.db)
    if not db_path.exists():
        print(f"error: db not found: {db_path}", file=sys.stderr)
        return 2

    conn = sqlite3.connect(str(db_path))
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    # --- Pre-check: count blocked session mutations
    cur.execute(
        """
        SELECT seq, payload
          FROM sync_mutations
         WHERE entity = 'session' AND op = 'upsert'
        """
    )
    session_blocked = []
    for row in cur.fetchall():
        miss = session_required_missing(row["payload"])
        if miss:
            session_blocked.append((row["seq"], miss))

    # --- Pre-check: count blocked observation mutations
    cur.execute(
        """
        SELECT seq, payload
          FROM sync_mutations
         WHERE entity = 'observation' AND op = 'upsert'
        """
    )
    obs_blocked = []
    for row in cur.fetchall():
        miss = observation_required_missing(row["payload"])
        if miss:
            obs_blocked.append((row["seq"], miss))

    print(f"[scan] session mutations blocked: {len(session_blocked)}")
    print(f"[scan] observation mutations blocked: {len(obs_blocked)}")

    if not session_blocked and not obs_blocked:
        print("[scan] nothing to repair")
        conn.close()
        return 0

    # --- Session repair: only patch session payloads that miss `directory`
    #     by using the matching local sessions.directory if available,
    #     else the supplied --directory.
    repairs_session = 0
    for seq, _ in session_blocked:
        cur.execute(
            "SELECT payload, entity_key FROM sync_mutations WHERE seq = ?",
            (seq,),
        )
        row = cur.fetchone()
        if not row:
            continue
        try:
            payload = json.loads(row["payload"] or "{}")
        except json.JSONDecodeError:
            payload = {}

        local_dir = None
        if row["entity_key"]:
            cur.execute(
                "SELECT directory FROM sessions WHERE id = ?",
                (row["entity_key"],),
            )
            sr = cur.fetchone()
            if sr and sr["directory"]:
                local_dir = sr["directory"]
        new_dir = local_dir or args.directory
        payload["directory"] = new_dir
        new_payload = json.dumps(payload, separators=(",", ":"))
        print(
            f"[plan] session seq={seq} entity_key={row['entity_key']!r} -> directory={new_dir!r}"
        )
        if args.apply:
            cur.execute(
                "UPDATE sync_mutations SET payload = ? WHERE seq = ?",
                (new_payload, seq),
            )
        repairs_session += 1

    # --- Observation repair: patch missing required fields from local observations
    repairs_obs = 0
    for seq, miss in obs_blocked:
        cur.execute(
            "SELECT payload, entity_key FROM sync_mutations WHERE seq = ?",
            (seq,),
        )
        row = cur.fetchone()
        if not row:
            continue
        try:
            payload = json.loads(row["payload"] or "{}")
        except json.JSONDecodeError:
            payload = {}

        local = None
        if payload.get("sync_id"):
            cur.execute(
                "SELECT sync_id, session_id, type, title, content, project, scope "
                "FROM observations WHERE sync_id = ? "
                "ORDER BY id DESC LIMIT 1",
                (payload["sync_id"],),
            )
            local = cur.fetchone()
        if local is None and row["entity_key"]:
            cur.execute(
                "SELECT sync_id, session_id, type, title, content, project, scope "
                "FROM observations WHERE id = ?",
                (row["entity_key"],),
            )
            local = cur.fetchone()

        if local is None:
            # No local fallback: cannot infer missing fields safely
            print(
                f"[skip] observation seq={seq} no local row to backfill (missing: {miss})"
            )
            continue

        for field, value in zip(
            ["sync_id", "session_id", "type", "title", "content", "project", "scope"],
            [
                local["sync_id"],
                local["session_id"],
                local["type"],
                local["title"],
                local["content"],
                local["project"],
                local["scope"],
            ],
        ):
            if field in miss and value:
                payload[field] = value

        new_payload = json.dumps(payload, separators=(",", ":"))
        still_missing = observation_required_missing(new_payload)
        if still_missing:
            print(f"[skip] observation seq={seq} still missing: {still_missing}")
            continue
        print(f"[plan] observation seq={seq} patched (was missing: {miss})")
        if args.apply:
            cur.execute(
                "UPDATE sync_mutations SET payload = ? WHERE seq = ?",
                (new_payload, seq),
            )
        repairs_obs += 1

    if args.apply:
        conn.commit()
        print(
            f"[apply] committed: {repairs_session} session + {repairs_obs} observation payloads"
        )
    else:
        conn.rollback()
        print(
            f"[dry-run] would patch: {repairs_session} session + {repairs_obs} observation payloads"
        )

    # --- Post-check: recount blocked
    cur.execute(
        "SELECT seq, payload FROM sync_mutations WHERE entity = 'session' AND op = 'upsert'"
    )
    post_sess = sum(1 for r in cur.fetchall() if session_required_missing(r["payload"]))
    cur.execute(
        "SELECT seq, payload FROM sync_mutations WHERE entity = 'observation' AND op = 'upsert'"
    )
    post_obs = sum(
        1 for r in cur.fetchall() if observation_required_missing(r["payload"])
    )
    print(f"[verify] post-repair blocked: session={post_sess} observation={post_obs}")
    conn.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
