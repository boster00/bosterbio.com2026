# Headless CMS Comparison — Agentic B2B Life-Science Blog

Generated 2026-05-01 in response to Office Hour Q4: pick a headless CMS for the
new bosterbio.com2026 blog. The blog will mostly be filled by an
agentic / generic content-generation pipeline (AI-drafted posts → human review
→ publish), so the lens is **automation friendliness** and **MCP / write-API
support** — NOT traditional editorial UX preference.

Stack context: Next.js 15 + Tailwind on Vercel; Supabase Postgres for catalog;
eventual Medusa for cart/checkout; ~50-200 posts/year; 1-3 editors. China
customers in scope.

---

## Eliminated (one-line each)

- **TinaCMS** — only a C# experimental MCP, Git-based workflow adds friction for agentic writes.
- **Outstatic** — no MCP, MDX-in-repo means every post is a PR; wrong shape for high-volume AI drafting.
- **Cosmic** — official hosted MCP exists but ecosystem/community is thin vs leaders; pricing per-object scales poorly.
- **Keystone** — no MCP, project momentum has slowed, more app-framework than CMS.
- **Hygraph** — MCP in early access, but per-API-call billing punishes agentic workflows that draft/preview frequently.
- **Strapi** — multiple competing community MCPs + a "native" one still in development; fragmented and unstable as a contract surface today.
- **DatoCMS** — solid official MCP, but seat pricing + GCP infra (no China PoP) puts it behind Sanity at similar cost.

---

## Top 5 ranked

| # | CMS | MCP | Write API | Editor UX | Pricing | Self-host | Next.js | Media | China |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Payload CMS** | Official Payload MCP plugin (per-collection capability toggles) + 3+ community MCPs | Excellent: typed REST + GraphQL, draft/publish, versions, scheduled publish | Strong: built-in admin, live preview, versions, lexical editor | $0 self-host (MIT); ~$10-40/mo VPS; Cloud $35/mo | **Yes** | Native (Next 15 app router, runs in same repo) | Built-in, S3 / Cloudflare R2 adapters | Self-host on Tencent Cloud / Alibaba — fully solvable |
| 2 | **Sanity** | Official remote MCP at `mcp.sanity.io`, OAuth, schema-aware GROQ + patch | Excellent: Content Lake API, schema validation, drafts, scheduled publishing, releases | Strong: Studio, side-by-side preview, comments, tasks | Free up to 20 seats; Growth $15/seat/mo | No (SaaS) | First-class (`next-sanity`, ISR, draft mode) | Built-in image pipeline, hotspot / crop | GCP-backed, no mainland PoP — proxy via CDN |
| 3 | **Contentful** | Official Contentful MCP (one-click install, MIT) | Mature CMA: validation, drafts, scheduled, workflows | Polished: web app, rich preview, comments | Free 100k API calls; Lite paid; expensive at scale | No | Good (`contentful` SDK, ISR) | Built-in, image API | No mainland PoP — known China problems |
| 4 | **Storyblok** | Official Storyblok MCP (full Management API) | Strong REST, draft/publish, scheduled | Best-in-class visual editor (overkill here) | Free starter; ~$99/mo Entry | No | Good Next plugin | Built-in | Same GCP / AWS issue, no mainland PoP |
| 5 | **Notion** | Official `makenotion/notion-mcp-server` (22 tools, OAuth, very mature) | Decent: pages, databases, comments — but no real "draft / publish" state, no workflow gates | Editors love it; not built for blog publishing | Free for personal, ~$10/seat/mo Plus | No | Need rendering layer (`react-notion-x`) | Notion-hosted images expire — must mirror | **Blocked in mainland China** |

---

## Per-candidate one-liners

**Payload** — *Pros:* MIT, runs in your Next.js 15 repo on Vercel, you control hosting (China-solvable), excellent typed write API. *Cons:* official MCP is younger; you operate the DB. *Best when:* you want Sanity-class DX without vendor lock-in and need the China-accessibility lever.

**Sanity** — *Pros:* the most polished MCP+schema+studio combo, agents get GROQ + patch with schema awareness. *Cons:* SaaS-only, GCP infra means China customers see slow loads. *Best when:* you want minimum infra ops and agentic-quality MCP from day one.

**Contentful** — *Pros:* enterprise-grade, official MCP, mature workflow. *Cons:* expensive scaling, no China PoP. *Best when:* you already have Contentful elsewhere in the org.

**Storyblok** — *Pros:* strongest visual editor, full-Management-API MCP. *Cons:* visual-editor strength is wasted on agent-drafted blog posts. *Best when:* marketing wants drag-and-drop landing pages alongside blog.

**Notion** — *Pros:* most mature MCP in the market, editors already know it. *Cons:* not a publishing CMS, mainland China blocks it, image hosting is a liability. *Best when:* internal-only knowledge base, not customer-facing blog.

---

## Recommendation

**Primary: Payload CMS** (self-hosted, in the same Next.js 15 repo on Vercel; Postgres on Supabase, identical to your catalog).

It's the only top-5 candidate that simultaneously gives you (a) a real official MCP with per-collection capability scoping for safe agentic writes, (b) MIT/free pricing at your volume, (c) China-accessibility because *you* pick the host (Tencent / Alibaba mirror or Cloudflare China-network), and (d) zero infra divergence from your existing Supabase Postgres + Vercel + Medusa stack. Same repo means the AI pipeline can call collections directly without crossing a SaaS boundary.

**Backup: Sanity.** If self-host operational burden is unacceptable, Sanity's official remote MCP is the most mature contract surface in the market, and the 20-seat free tier covers you through scaling. Accept the China caveat and front it with a CDN proxy (Cloudflare China-network, ChinaNetCenter, or a Tencent-hosted asset mirror).

---

## Sources

- [Sanity remote MCP server (GA)](https://www.sanity.io/blog/sanity-remote-mcp-server-is-generally-available)
- [Payload MCP plugin docs](https://payloadcms.com/docs/plugins/mcp)
- [Contentful official MCP](https://mcp.directory/servers/contentful-official)
- [Storyblok MCP server](https://www.storyblok.com/lp/mcp-server)
- [Hygraph MCP early access](https://hygraph.com/blog/mcp-server)
- [DatoCMS MCP server](https://www.datocms.com/docs/mcp-server)
- [Strapi native MCP recap](https://strapi.io/blog/strapi-community-call-recap-updates-native-mcp-server-flow-gine-and-better-auth-plugin)
- [Notion official MCP server](https://github.com/makenotion/notion-mcp-server)
- [Cosmic hosted MCP](https://www.cosmicjs.com/blog/hosted-mcp-cosmic-in-cursor-claude-and-codex-with-zero-install)
- [Payload pricing 2026](https://www.buildwithmatija.com/payload-cms-pricing)
- [Sanity vs Contentful vs Hygraph pricing 2026](https://sitegrade.io/en/blog/sanity-vs-contentful-vs-hygraph-headless-cms-pricing-2026/)
- [Sanity in China analysis](https://www.chinafy.com/blog/does-sanityio-work-in-china)
- [Contentful in China analysis](https://www.21cloudbox.com/solutions/how-to-make-contentful-work-in-china.html)
