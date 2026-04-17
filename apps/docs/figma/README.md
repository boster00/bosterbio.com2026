# Figma Design Export

Exported from **Boster Design Master File** (`NMfOvoGgMVFPYM4nLtN8zD`) on 2026-04-03.

## Structure

### JSON node data (full Figma API responses at depth 10)
- `website-canvas.json` — top-level Website canvas structure (depth 2)
- `homepage-1440.json` — Homepage at 1440px, full depth
- `product-listing-1440.json` — Product listing page
- `product-page-1440.json` — Product detail page
- `search-page-1440.json` — Search results page
- `about-us-1440.json` — About Us page
- `cart-1440.json` — Shopping cart page
- `design-assets-vi-guide.json` — Visual identity guide & design assets

### Screenshots (`images/`)
- `homepage-1440.png`, `homepage-1920.png`, `homepage-1200.png`, `homepage-768.png`, `homepage-375.png`
- `product-listing-1440.png`
- `product-page-1440.png`
- `search-page-1440.png`
- `about-us-1440.png`
- `cart-1440.png`

## How to use

Each JSON file contains the full Figma node tree with:
- **Layout:** `absoluteBoundingBox`, `layoutMode`, `itemSpacing`, `padding`
- **Text:** `characters`, `style.fontFamily`, `style.fontSize`, `style.fontWeight`
- **Colors:** `fills[].color` (RGBA 0-1 scale, multiply by 255)
- **Components:** `type: "INSTANCE"` with `componentId` for reusable elements

### Key node IDs
| Page | Node ID | Breakpoints available |
|------|---------|----------------------|
| Homepage | `820:14937` | 375, 768, 1200, 1440, 1920 |
| Product Listing | `7139:74372` | 375, 768, 1200, 1440, 1920 |
| Product Page | `8015:59958` | 375, 768, 1200, 1440, 1920 |
| Search Page | `2466:18300` | 768, 1200, 1440, 1920 |
| About Us | `2848:22800` | 1440 |
| Cart | `6491:32981` | 1440 |

### Design tokens
| Token | Value |
|-------|-------|
| Primary Blue | `rgb(0, 76, 149)` / `#004C95` |
| Accent Orange | `rgb(234, 141, 40)` / `#EA8D28` |
| Light Blue | `rgb(60, 169, 214)` / `#3CA9D6` |
| Body Gray | `rgb(111, 111, 111)` / `#6F6F6F` |
| Heading Font | Josefin Sans (Bold) |
| Body Font | Mulish (Regular 400 / Medium 500 / ExtraBold 800) |
