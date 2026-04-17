/**
 * Load NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SECRETE_KEY from ~/guildos/.env.local
 * (do not use apps/web/.env.local for GuildOS operations).
 */
import fs from "node:fs"
import path from "node:path"
import os from "node:os"

export function loadGuildosEnv() {
  const candidates = [
    path.join(os.homedir(), "guildos", ".env.local"),
    "/root/guildos/.env.local",
  ]
  const p = candidates.find((c) => fs.existsSync(c))
  if (!p) {
    throw new Error(`Missing GuildOS env (tried ${candidates.join(", ")})`)
  }
  const raw = fs.readFileSync(p, "utf8")
  for (const line of raw.split("\n")) {
    const t = line.trim()
    if (!t || t.startsWith("#")) continue
    const eq = t.indexOf("=")
    if (eq === -1) continue
    const k = t.slice(0, eq).trim()
    let v = t.slice(eq + 1).trim()
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1)
    }
    if (!process.env[k]) process.env[k] = v
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL not set in ~/guildos/.env.local")
  }
  if (!process.env.SUPABASE_SECRETE_KEY?.trim()) {
    throw new Error("SUPABASE_SECRETE_KEY not set in ~/guildos/.env.local")
  }
}
