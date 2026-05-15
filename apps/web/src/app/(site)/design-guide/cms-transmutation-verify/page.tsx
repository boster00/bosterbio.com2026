import type { Metadata } from "next"
import Link from "next/link"
import { EditorialPageHeader } from "@/components/cms/EditorialPageHeader"
import { composeTransmutedArticleHtml, transmutationReadinessScore } from "@/lib/cms-transmute"
import { isCatalogSupabaseConfigured } from "@/lib/supabase/catalog-credentials"
import type { CmsPageRow } from "@/lib/supabase/cms"
import { listNewestCmsPages } from "@/lib/supabase/cms"
import verificationSeed from "@/data/cms-transmute-verification-seed.json"

export const metadata: Metadata = {
  title: "CMS transmutation verify | Design guide",
  description:
    "Smoke checklist for Magento CMS HTML → editorial template transmutation (section tags, readiness score, .html routes).",
}

export const revalidate = 300

type SeedPage = {
  legacy_page_id: number
  identifier: string
  title: string
  content_heading: string
  content: string
}

function seedToRow(p: SeedPage): CmsPageRow {
  return {
    id: p.legacy_page_id,
    legacy_page_id: p.legacy_page_id,
    identifier: p.identifier,
    title: p.title,
    content_heading: p.content_heading || null,
    content: p.content,
    meta_title: null,
    meta_description: null,
    meta_keywords: null,
    is_active: true,
    legacy_updated_at: null,
    legacy_created_at: null,
    created_at: "",
    updated_at: "",
  }
}

async function resolveVerificationPages(): Promise<CmsPageRow[]> {
  if (isCatalogSupabaseConfigured()) {
    try {
      const rows = await listNewestCmsPages(2)
      if (rows.length >= 2) return rows
    } catch (e) {
      console.warn("[cms-transmutation-verify] listNewestCmsPages failed, using seed.", e)
    }
  }
  const pages = verificationSeed.pages as SeedPage[]
  return pages.map(seedToRow)
}

export default async function CmsTransmutationVerifyPage() {
  const pages = await resolveVerificationPages()

  return (
    <main id="main-content" className="min-h-screen bg-white pb-24">
      <EditorialPageHeader
        id="cms-transmute-verify-title"
        title="CMS transmutation verify"
        subtitle="Magento nav-CMS → EditorialPageHeader + prose (Design Guide patterns). Per-tag readiness uses the transmutation pipeline on the two newest cms_pages rows when Supabase is configured; otherwise the repo TSV seed for Hashimoto’s + Celiac disease pages."
      />

      <div className="container-content space-y-12 py-12">
        <section className="rounded-2xl border border-brand/10 bg-brand-tint/30 p-6 shadow-card">
          <h2 className="font-display text-display-md text-brand">Brand tokens (smoke reference)</h2>
          <p className="mt-3 text-ink-secondary">
            Target palette for migration parity checks: primary deep blue{" "}
            <code className="rounded bg-white px-1.5 py-0.5 font-mono text-sm">#1a365d</code>, accent orange{" "}
            <code className="rounded bg-white px-1.5 py-0.5 font-mono text-sm">#f97316</code>, typography{" "}
            <span className="font-medium text-ink">Inter + Josefin Sans + Mulish</span> (see{" "}
            <code className="font-mono text-sm">globals.css</code> + <code className="font-mono text-sm">layout.tsx</code>
            ).
          </p>
        </section>

        <section className="rounded-2xl border border-brand/10 bg-white p-6 shadow-card">
          <h2 className="font-display text-display-md text-brand">Section mapping (data)</h2>
          <p className="mt-2 text-ink-secondary">
            Outer <code className="font-mono text-sm">&lt;section&gt;</code> boundaries survive class stripping. We annotate{" "}
            <code className="font-mono text-sm">data-cms-section</code> for QA:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-ink">
            <li>
              <strong className="font-medium">legacy-hero-cluster</strong> — first section (topic band; duplicate H1 removed in
              hydration because the shell H1 owns the title).
            </li>
            <li>
              <strong className="font-medium">intro-cluster</strong> — second section (lead copy, contents list).
            </li>
            <li>
              <strong className="font-medium">body-cluster</strong> — remaining sections (biomarkers, tables, images, inline
              CTAs).
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-brand/10 bg-white p-6 shadow-card">
          <h2 className="font-display text-display-md text-brand">Pages under test</h2>
          <ul className="mt-4 space-y-3 text-ink">
            {pages.map((p) => (
              <li key={p.identifier}>
                <span className="font-medium">{p.title}</span> —{" "}
                <Link className="text-accent underline-offset-4 hover:underline" href={`/${p.identifier}`}>
                  /{p.identifier}
                </Link>{" "}
                ·{" "}
                <Link className="text-accent underline-offset-4 hover:underline" href={`/${p.identifier}.html`}>
                  /{p.identifier}.html
                </Link>{" "}
                <span className="text-ink-tertiary">(middleware rewrite)</span>
              </li>
            ))}
          </ul>
        </section>

        {pages.map((p) => {
          const raw = p.content ?? ""
          const heading = (p.content_heading ?? p.title).trim()
          const transmuted = composeTransmutedArticleHtml(raw, heading)
          const { score, breakdown } = transmutationReadinessScore(raw, transmuted)
          const pct = Math.round(score * 1000) / 10

          return (
            <section key={p.identifier} className="rounded-2xl border border-brand/10 bg-white p-6 shadow-card">
              <h2 className="font-display text-display-md text-brand">{p.title}</h2>
              <p className="mt-2 font-mono text-xs text-ink-tertiary">{p.identifier}</p>

              <div className="mt-6 rounded-xl border border-brand/10 bg-surface-subtle p-4">
                <p className="text-sm font-semibold text-brand">Reusable readiness score (semantic tags)</p>
                <p className="mt-1 text-2xl font-bold text-accent">{pct}%</p>
                <p className="mt-1 text-xs text-ink-secondary">
                  Mean parity of h1–h3, p, a, img, lists, tables, section, br between raw CMS HTML and transmuted output. Target
                  ≥90%.
                </p>
              </div>

              <h3 className="mt-8 font-display text-title text-brand">Per-element verdicts</h3>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-brand/15 text-ink-secondary">
                      <th className="py-2 pr-4 font-semibold">Tag</th>
                      <th className="py-2 pr-4 font-semibold">Legacy count</th>
                      <th className="py-2 pr-4 font-semibold">New count</th>
                      <th className="py-2 pr-4 font-semibold">Parity</th>
                      <th className="py-2 font-semibold">Verdict</th>
                    </tr>
                  </thead>
                  <tbody>
                    {breakdown.map((row) => {
                      const ok = row.parity >= 0.9
                      return (
                        <tr key={row.tag} className="border-b border-brand/10">
                          <td className="py-2 pr-4 font-mono text-xs">{row.tag}</td>
                          <td className="py-2 pr-4">{row.before}</td>
                          <td className="py-2 pr-4">{row.after}</td>
                          <td className="py-2 pr-4">{Math.round(row.parity * 1000) / 10}%</td>
                          <td className={`py-2 font-semibold ${ok ? "text-brand" : "text-accent"}`}>
                            {ok ? "PASS" : "REVIEW"}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <h3 className="mt-10 font-display text-title text-brand">Visual / structure checks (manual)</h3>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-ink-secondary">
                <li>
                  <strong className="text-ink">Hero</strong> — EditorialPageHeader: uppercase Josefin title, optional updated line.
                  PASS if one dominant H1 pattern; REVIEW if duplicate titles.
                </li>
                <li>
                  <strong className="text-ink">Intro + body</strong> — prose column: orange H2s, blue H3s, Mulish body. PASS if
                  section order matches legacy intent; REVIEW if tables/lists collapsed.
                </li>
                <li>
                  <strong className="text-ink">CTAs / links</strong> — links resolve (legacy absolute URLs from hydration). PASS if
                  primary CTAs visible; REVIEW if buttons were in stripped scripts.
                </li>
                <li>
                  <strong className="text-ink">Images</strong> — remote <code className="font-mono text-xs">bosterbio.com/media</code>{" "}
                  loads. PASS if hero/inline images render; REVIEW if lazy attrs missing.
                </li>
                <li>
                  <strong className="text-ink">Footer</strong> — site chrome from layout, not CMS body. PASS if no raw Magento
                  footer HTML leaked into article.
                </li>
              </ul>
            </section>
          )
        })}

        <p className="text-center text-sm text-ink-tertiary">
          <Link href="/design-guide" className="text-accent underline-offset-4 hover:underline">
            ← Back to design guide
          </Link>
        </p>
      </div>
    </main>
  )
}
