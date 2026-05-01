/**
 * Centered editorial page header. Mirrors the Figma "About Us" pattern
 * (apps/docs/figma/about-us-1440.png, node 2848:22800):
 *
 *   - Centered orange uppercase title in Josefin Sans Medium 40px
 *     (color #EA8D28 = brand-accent, letter-spacing -0.02em).
 *   - Centered 16px subtitle below.
 *   - Optional small uppercase update line.
 *   - Thin separator at the bottom; sits on white background.
 *
 * Used by NavCmsPage (nav-CMS), the live About-Us page, the design-guide,
 * and any future editorial route. One component → one rule for the page
 * header; updating it once updates everywhere.
 */

type Props = {
  /** Required H1 text. Will be displayed uppercase via CSS. */
  title: string
  /** Optional centered subtitle below the title. */
  subtitle?: string | null
  /** Optional ISO-style date string ("2026-04-29..."). Only first 10 chars used. */
  updatedAt?: string | null
  /** Optional id for the H1 (for aria-labelledby, etc.). */
  id?: string
}

export function EditorialPageHeader({ title, subtitle, updatedAt, id }: Props) {
  return (
    <section className="border-b border-surface-muted bg-white" aria-labelledby={id}>
      <div className="container-content py-14 md:py-20 text-center">
        <h1
          id={id}
          className="font-heading text-[28px] font-medium uppercase leading-tight tracking-[-0.02em] text-accent md:text-[40px]"
        >
          {title}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-3 max-w-2xl text-base text-ink-secondary">{subtitle}</p>
        ) : null}
        {updatedAt ? (
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-ink-tertiary">
            Updated {updatedAt.slice(0, 10)}
          </p>
        ) : null}
      </div>
    </section>
  )
}
