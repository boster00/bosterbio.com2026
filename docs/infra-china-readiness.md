# Global Web Infrastructure for B2B Life-Sci Storefront — China-Reachability Analysis

Generated 2026-05-01 in response to Office Hour Q6: research globally
accessible infrastructure (especially China-accessibility) since some
Chinese networks / Starlink may block Supabase + Vercel.

Stack constraint: Next.js 15 + Postgres, ~80GB images, ~10TB/mo bandwidth,
~700MB DB, US + EU + China customers, lean ops, ship in 2026.

---

## Headline finding

You cannot achieve "good China reachability" with **any** Western-only stack.
Your current Vercel + Supabase combo is among the *worst* configurations for
China — both endpoints are DNS-polluted by the GFW and have no in-China
presence. The only architectures that actually work are: (a) **Hong Kong
fronted by a CN-friendly CDN** (no ICP, ~25-40ms latency), (b) **dual-stack**:
Western primary + China-domestic mirror behind ICP, or (c) **full Chinese
cloud** (Aliyun / Tencent + ICP). For "lean ops, launch this year, B2B,"
Option A is the only realistic pick.

---

## 1. Hosting (Next.js runtime)

| Provider | China reach | Bypass needed | Latency to CN | DX | Pricing | Migration cost |
|---|---|---|---|---|---|---|
| **Vercel** (current) | Spotty — `*.vercel.app` DNS-polluted, custom domain better but variable | Need CN-friendly CDN in front | 200-300ms US, ~80ms HK edge | 5 — gold standard | ~$20-200/mo | — (current) |
| **Cloudflare Workers + OpenNext** | Spotty without CN Network; good with it (requires ICP + Enterprise) | CF China Network = ICP + $2k+/mo Enterprise | <50ms with CN PoPs | 4 — OpenNext mature in 2026, 3ms cold start | $5-25/mo base | Medium — adapter swap, edge-runtime constraints |
| **Cloudflare Pages** | Same as Workers | Same | Same | 2 — Workers+OpenNext now recommended | Same | Same |
| **Netlify** | Spotty, similar to Vercel | CDN proxy | US/EU edge | 4 | similar to Vercel | Medium |
| **Render / Railway** | Poor — single-region VMs, no CN edge | VPN/proxy required | 250-350ms | 4 | $7-50/mo | Low — Dockerfile |
| **AWS Amplify** | Poor (no CN edge unless AWS China sep account) | ICP for AWS China | 200ms+ | 3 — Amplify Next.js support quirky | $20-80/mo | High |
| **Hong Kong VPS (CN2 GIA)** | **Reachable**, no GFW issues | None | **20-40ms** | 3 — you operate the box | $15-80/mo + ops | Medium — Dockerize |
| **Aliyun ECS / Function Compute (mainland)** | **Reachable, native** | **ICP filing required** | 5-30ms | 2 — Chinese console, English docs uneven | $30-150/mo | High — ICP + WFOE/local entity |
| **Tencent Cloud (mainland)** | **Reachable, native** | **ICP required** | 5-30ms | 2 — same caveats | $30-150/mo | High |

## 2. CDN (images + static)

| Provider | China reach | Bypass | Latency CN | DX | Price (10TB/mo) | Migration |
|---|---|---|---|---|---|---|
| **Cloudflare** (global free/Pro) | Spotty without China Network | None / N/A — China Network = ICP + Enterprise | varies (often ~150ms) | 5 | Free-$25/mo | — |
| **Cloudflare China Network** | **Excellent** (JD Cloud + 30 CN cities) | **ICP + Enterprise contract** | <50ms | 4 — same dashboard | Enterprise ($2k+/mo) | Medium |
| **AWS CloudFront** (global) | Poor — no PoPs in mainland | CloudFront China is *separate AWS China* + ICP | varies | 4 | $0.085/GB ≈ $850/mo | — |
| **Fastly** | Poor — POPs in HK/Seoul only, "could be blocked any day" | CN-domestic CDN | 50-150ms | 4 | ~$0.08/GB | — |
| **Bunny.net** | **Limited** — no mainland PoPs, AWS/GCP backed | CN-domestic CDN | 60-150ms via HK/SG | 5 — cheapest, simplest | ~$10-50/mo (10TB ≈ $50) | Easy |
| **Aliyun CDN** | **Native, fast** | **ICP** | <30ms | 2 | ~$0.03/GB CN region | High |
| **Tencent Cloud CDN** | **Native, fast** | **ICP** | <30ms | 2 | similar to Aliyun | High |
| **ChinaCache / CDNetworks** | Native | ICP | <30ms | 3 | enterprise contract | High |

## 3. Object storage (~80GB images)

| Provider | China reach | Bypass | DX | Price (80GB + 10TB egress) | Migration |
|---|---|---|---|---|---|
| **Supabase Storage** (current) | Spotty (same GFW issues as Supabase API) | CDN proxy | 5 | bundled in Supabase plan | — |
| **Cloudflare R2** | Spotty direct, **excellent paired with CF CDN**; **zero egress** | None (egress-free is the killer feature) | 5 | $1.20 storage + $0 egress = ~$1.20/mo | Easy — S3-compatible |
| **AWS S3** | Poor direct from CN | CloudFront+China sep | 5 | $1.84 storage + ~$900 egress | Easy |
| **Bunny Storage** | Poor in CN | Use Bunny CDN | 5 | ~$1.60 storage + $50 egress | Easy |
| **Backblaze B2** | Poor in CN | CDN | 4 | ~$0.40 storage + Cloudflare Bandwidth Alliance free egress to CF | Easy |
| **Aliyun OSS** | Native | ICP if served via CN domain; cross-border S3-style read OK from CN | 2 | ~$1.20 storage + ~$0.05/GB CN egress | Medium |
| **Tencent COS** | Native | ICP | 2 | similar | Medium |

**Winner for cost+global+CN-via-CDN:** R2. Zero egress + CF Cache means your 10TB/mo is essentially $1-2/mo storage cost; bandwidth becomes a CDN problem solved separately.

## 4. Postgres (~700MB)

| Provider | China reach | Bypass | DX | Price (small) | Migration |
|---|---|---|---|---|---|
| **Supabase** (current) | **Blocked / spotty** — `*.supabase.co` GFW-affected | None viable from CN; you'd need to proxy via your HK app server | 5 — auth, RLS, realtime, storage all bundled | $25/mo Pro | — |
| **Neon** (Singapore region) | Spotty (same TLS-SNI risk) but Singapore POP gives ~120ms; **not blocked** as of search | Proxy via app server | 5 — branching killer feature | $19/mo | Medium — keep RLS pattern, lose Supabase Auth/Storage |
| **Aiven Postgres** (Tokyo/Singapore) | Reachable, ~100-150ms | None | 4 | ~$60/mo for HA | Medium |
| **AWS RDS (ap-east-1 HK)** | Reachable from CN, ~30ms | None | 3 — manual ops | ~$30-60/mo small | Medium |
| **GCP Cloud SQL** (asia-east2 HK) | Reachable | None | 3 | ~$30-60/mo | Medium |
| **PolarDB for PostgreSQL** (Aliyun) | **Native fast** | ICP if served in-CN | 2 — Chinese console; PG14-17 compatible | ~$50-100/mo entry | High — connect-string + extension differences |
| **Tencent TDSQL-C PG** | **Native fast** | ICP | 2 | similar | High |
| **Self-hosted on HK VPS** | Reachable | None | 1 — you do backups | $15/mo | High — ops burden |

---

## Special considerations

- **ICP license:** Required to host *or* serve cached content from mainland China PoPs. Requires a **mainland Chinese legal entity** (WFOE, JV, or rep office) — minimum 4-8 weeks for ICP Filing, several months for Commercial ICP. **Hong Kong is exempt** — separate jurisdiction, no ICP needed, but content still passes through GFW (so no political-content issues for B2B reagents = fine).
- **Hong Kong middle-ground:** With **CN2 GIA routing**, HK→mainland latency is **20-40ms**. For B2B life-sci where the user-facing latency budget is generous, HK is the sweet spot.
- **Cloudflare in China:** CF *global* edge does not serve mainland; the GFW intermittently blocks individual CF IPs. CF *China Network* (via JD Cloud, 30+ CN cities) works reliably **only with** (a) Enterprise plan ($2k+/mo), (b) valid ICP, (c) JD Cloud content vetting.
- **Multi-region (global edge + China-edge):** Doubles ops if you do it as two real deployments. Single-deployment-with-CDN (HK origin + CN-friendly CDN) is the lean version. Only go true dual-stack once revenue from CN customers justifies a WFOE.

---

## Recommendation

**Primary stack — "HK origin + edge-everywhere":**
- **Hosting:** Vercel (keep current) for global; **add a Hong Kong VPS** (CN2 GIA, $30-50/mo) running the same Next.js as a China-facing origin
- **CDN:** **Bunny.net** (cheap, simple, 10TB ≈ $50/mo; HK PoPs reach CN at ~80ms) for global static + image; route `cn.yourdomain.com` to the HK origin
- **Storage:** **Cloudflare R2** ($1.20/mo storage + zero egress — pair with Bunny pull-through cache for CN delivery)
- **DB:** **Migrate Supabase → Neon (ap-southeast-1 Singapore)** OR keep Supabase and add a **read-replica via PgBouncer on the HK VPS** if you need RLS / Auth / Realtime. If you can drop Supabase Auth (use Auth.js or Clerk), Neon is simpler.

Total ops: one extra VPS, one CDN, one storage migration. ~$100-150/mo incremental over current.

**Backup stack — "if a CN strategic customer signs":**
- Add **Aliyun OSS + Aliyun CDN** with **ICP filing** (requires WFOE — start the 3-6mo process now)
- Keep HK as the application origin even with ICP; ICP'd CN-domestic CDN cache the static + images
- Becomes the move once CN MRR justifies the legal entity (~$5-10k setup + ongoing)

---

## What to verify before committing

We cannot fully de-risk this without **a real connection on the ground in China.** Specifically:
1. Measure actual TTFB from Beijing/Shanghai/Shenzhen to your candidate HK origin on each major ISP (China Telecom CN2, China Unicom, China Mobile) — public benchmarks vary 5x between ISPs.
2. Confirm your specific Bunny POPs (HK/SG) aren't currently DNS-polluted for your domain — GFW behavior is per-domain, not per-provider, and changes.
3. Test whether your customers' corporate networks (universities, pharma, biotech) impose extra restrictions beyond GFW.
4. If you eventually pursue ICP, confirm "biological reagent" content classification doesn't trigger extra MIIT review.

Recommended action: hire a $50/mo China-mainland monitoring service (Uptrends, Catchpoint, or 17ce.com free tool) to baseline before launch and alarm on regression.

---

## Sources

- [Vercel KB: Accessing Vercel-hosted sites from mainland China](https://vercel.com/kb/guide/accessing-vercel-hosted-sites-from-mainland-china)
- [vercel.app Blocked by SNI and DNS Pollution in China (GitHub discussion)](https://github.com/vercel/community/discussions/803)
- [Supabase: Navigating Regional Network Blocks (Mar 2026)](https://supabase.com/blog/navigating-regional-network-blocks)
- [Cloudflare China Network — Overview](https://developers.cloudflare.com/china-network/)
- [Cloudflare China Network — ICP requirement](https://developers.cloudflare.com/china-network/concepts/icp/)
- [ICP China License: Complete Compliance Guide 2026 (NETK5)](https://netk5.com.cn/icp-china-license/)
- [Hong Kong VPS Hosting: Why CN2+BGP Matters](https://vps.do/hong-kong-vps-hosting-why-cn2bgp-matters-for-china-traffic/)
- [Best No-ICP CDN for China Acceleration in 2026 (CDN07)](https://www.cdn07.com/en/china-cdn-without-icp-2026)
- [Bunny CDN — Asia coverage](https://bunny.net/cdn/content-delivery-asia/)
- [Cloudflare R2 official pricing](https://developers.cloudflare.com/r2/pricing/)
- [PolarDB for PostgreSQL (Alibaba Cloud)](https://www.alibabacloud.com/en/product/polardb-for-postgresql)
- [Neon Asia Pacific Singapore region](https://neon.com/docs/changelog)
