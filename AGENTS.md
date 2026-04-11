# AGENTS.md

## Cursor Cloud specific instructions

### Architecture

BosterBio is a pnpm + Turborepo monorepo with three packages:
- `apps/api` — Medusa v2 headless commerce backend (port 9000)
- `apps/web` — Next.js 15 + React 19 storefront (port 3000)
- `packages/types` — shared TypeScript types

### Prerequisites (already installed in snapshot)

- **PostgreSQL** and **Redis** must be running before starting the API.
- Start PostgreSQL: `sudo pg_ctlcluster $(pg_lsclusters -h | awk '{print $1, $2}') start`
- Start Redis: `redis-server --daemonize yes`
- Database: `bosterbio` owned by user `medusa` (password: `medusa`)

### Running services

- **API**: `cd apps/api && pnpm dev` (runs `medusa develop` on port 9000)
- **Web**: `cd apps/web && pnpm dev` (runs `next dev` on port 3000)
- Or run both: `pnpm dev` from workspace root (uses Turborepo)

### Gotchas

- The Medusa CLI requires `ts-node` and `@swc/core` as dev dependencies in `apps/api`. These are already declared in `package.json`.
- The API `tsconfig.json` uses `"module": "Node16"` / `"moduleResolution": "Node16"` to support `@medusajs/framework` package.json `exports` map. Do not change this to `"Node"`.
- `.npmrc` has `public-hoist-pattern` entries for `@medusajs/*` and related packages — required for pnpm to resolve Medusa packages correctly.
- `pnpm.onlyBuiltDependencies` in root `package.json` lists packages allowed to run postinstall scripts (esbuild, sharp, @swc/core, etc.).
- The `packageManager` field in root `package.json` is required by Turborepo.
- Admin dashboard Vite build warnings about missing `@medusajs/dashboard` are cosmetic — the core API still starts and serves requests.
- `apps/api` type-check has pre-existing errors in the Stripe payment provider (placeholder code). This does not block `medusa develop`.

### Standard commands (see root `package.json`)

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all services (Turborepo) |
| `pnpm lint` | Lint all packages |
| `pnpm type-check` | Type-check all packages |
| `pnpm build` | Build all packages |

### Database migrations

Run from `apps/api`: `pnpm medusa db:migrate`

### Admin credentials (dev only)

- Email: `admin@bosterbio.com` / Password: `admin123`
- Publishable API key is configured in `apps/web/.env.local`
