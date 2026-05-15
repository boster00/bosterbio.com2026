/**
 * Load NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SECRETE_KEY for GuildOS Supabase
 * (do not use apps/web/.env.local for GuildOS operations).
 *
 * Tries, in order: ~/.guildos.env (export lines from cursor.writeAgent), then
 * ~/guildos/.env.local. Existing process.env values are not overwritten.
 */
import fs from "node:fs"
import path from "node:path"
import os from "node:os"

function applyEnvFile(raw) {
  for (const line of raw.split("\n")) {
    let t = line.trim()
    if (!t || t.startsWith("#")) continue
    if (t.startsWith("export ")) {
      t = t.slice("export ".length).trim()
    }
    const eq = t.indexOf("=")
    if (eq === -1) continue
    const k = t.slice(0, eq).trim()
    let v = t.slice(eq + 1).trim()
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1)
    }
    if (!process.env[k]) process.env[k] = v
  }
}

export function loadGuildosEnv() {
  const candidates = [
    path.join(os.homedir(), ".guildos.env"),
    path.join(os.homedir(), "guildos", ".env.local"),
    "/root/guildos/.env.local",
  ]
  const paths = candidates.filter((c) => fs.existsSync(c))
  if (!paths.length) {
    throw new Error(`Missing GuildOS env (tried ${candidates.join(", ")})`)
  }
  for (const p of paths) {
    applyEnvFile(fs.readFileSync(p, "utf8"))
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL not set after loading GuildOS env files")
  }
  if (!process.env.SUPABASE_SECRETE_KEY?.trim()) {
    throw new Error("SUPABASE_SECRETE_KEY not set after loading GuildOS env files")
  }
}
