# BosterBio.com 2026 Rebuild

## Project structure
- `apps/web` — Next.js 15 storefront (port 3000)
- `apps/api` — Medusa v2 backend (port 9000)
- `packages/types` — shared TypeScript types
- Monorepo managed with pnpm + Turborepo

## Figma design source
- **File:** Boster Design Master File
- **File key:** `NMfOvoGgMVFPYM4nLtN8zD`
- **API access:** `FIGMA_ACCESS_TOKEN` is set in `apps/web/.env.local`
- Use the Figma REST API (`https://api.figma.com/v1/`) with header `X-Figma-Token: <token>` to pull design data, images, and assets
- The "Website" canvas (node `820:2`) contains all page designs at multiple breakpoints (375, 768, 1200, 1440, 1920)
- Key homepage frame: node `820:14937` (Homepage-1440)

## Design system
- **Primary Blue:** `rgb(0, 76, 149)` — headings, nav background
- **Accent Orange:** `rgb(234, 141, 40)` — CTAs, stat numbers, nav accent bar
- **Light Blue:** `rgb(60, 169, 214)` — secondary actions
- **Heading font:** Josefin Sans (Bold, 42-48px)
- **Body font:** Mulish (Regular 400 / Medium 500 / ExtraBold 800)

## Commands
- `pnpm dev` — start all apps via turbo
- `pnpm --filter @bosterbio/web dev` — start just the storefront
