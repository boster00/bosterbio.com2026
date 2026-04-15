/**
 * Load apps/web/.env.local into process.env (does not override existing vars).
 * Supports SUPABASE_SECRETE_KEY (typo) as alias for service role uploads.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function stripQuotes(v) {
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    return v.slice(1, -1)
  }
  return v
}

export function loadEnvLocal() {
  const file = path.join(__dirname, "../.env.local")
  if (!fs.existsSync(file)) return
  const text = fs.readFileSync(file, "utf8")
  for (const line of text.split("\n")) {
    const t = line.trim()
    if (!t || t.startsWith("#")) continue
    const eq = t.indexOf("=")
    if (eq === -1) continue
    const key = t.slice(0, eq).trim()
    let val = stripQuotes(t.slice(eq + 1).trim())
    if (process.env[key] === undefined) process.env[key] = val
  }
  // Map typo name → service role for upload scripts
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.SUPABASE_SECRETE_KEY) {
    process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SECRETE_KEY
  }
}
