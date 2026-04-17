/**
 * Capture Playwright 1440 screenshots, then run submit-quest-4444-products-pdp.mjs
 * (GuildOS env from ~/guildos/.env.local only).
 */
import { spawnSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { loadGuildosEnv } from "./load-guildos-env.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

loadGuildosEnv()
const capture = path.join(__dirname, "capture-products-pdp-playwright.mjs")
const submit = path.join(__dirname, "submit-quest-4444-products-pdp.mjs")

const r1 = spawnSync(process.execPath, [capture], { stdio: "inherit", env: process.env })
if (r1.status !== 0) process.exit(r1.status ?? 1)

const r2 = spawnSync(process.execPath, [submit], { stdio: "inherit", env: process.env })
process.exit(r2.status ?? 0)
