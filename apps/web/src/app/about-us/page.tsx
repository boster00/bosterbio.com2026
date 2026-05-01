import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getCmsNavPage } from "@/lib/cms-nav"
import { EditorialPageHeader } from "@/components/cms/EditorialPageHeader"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "BosterBio — antibody and ELISA experts since 1993. Quality reagents, validation, and support for life science research worldwide.",
}

const timeline = [
  {
    year: "1993",
    title: "First product",
    body:
      "In 1993, Steven developed Boster’s first product, in a room no larger than a small household garage. His friends made fun of him and gave him the nickname “he who converts science in the lavatory”.",
  },
  {
    year: "Late 90s",
    title: "Antibodies",
    body:
      "In the early days Boster developed various products for IHC and EM. In late 90s, Boster developed hundreds of primary antibodies, and became the biggest catalog antibody company in China at the time.",
  },
  {
    year: "Early 2000s",
    title: "ELISA kits",
    body:
      "After years of research and development, Boster was able to create a proprietary ELISA platform, PicoKine™. About a dozen in-house developed trade secretes empower Boster’s high-sensitivity ELISA kits to deliver repeatable results.",
  },
  {
    year: "2006",
    title: "Going global",
    body:
      "In 2006, Boster started to form partnerships with distributors and OEM partners around the globe. Today Boster products are used around the world by academics and industrial users alike, for WB, IHC, ELISA, and Flow.",
  },
  {
    year: "2012",
    title: "USA office",
    body:
      "In 2012, Boster established office in Pleasanton California to better service its global customers. Since then Boster’s brand awareness have been significantly improved globally. Many partnerships were established.",
  },
  {
    year: "2016",
    title: "Fastest growing",
    body:
      "In 2016, Boster was rated the fastest growing antibody company in the WORLD, by CiteAb.com. In 2021, Boster Bio was named a winner of the 2021 Bioz Stars Award for Antibodies!",
  },
  {
    year: "2022–2023",
    title: "Expand the scale",
    body:
      "In 2022, In order to accommodate the growing production needs, the company purchased a new site for the laboratory. In 2023, the company established a warehouse in the Netherlands, providing faster delivery to clients in Europe.",
  },
  {
    year: "Today",
    title: "Among top 10 antibody companies",
    body:
      "As of time of writing, Boster stands among the top 10 research antibody companies in the world. We will not stop here, but will continue to move forward on a new journey.",
  },
] as const

const stats = [
  { label: "Years", value: "30+", sub: "Serving researchers" },
  { label: "Publications", value: "50,000+", sub: "Product citations" },
  { label: "Rating", value: "4.9★", sub: "Biocompare" },
  { label: "Antibodies", value: "15,000+", sub: "Catalog & growing" },
  { label: "ELISA kits", value: "500+", sub: "Assay formats" },
] as const

export default function AboutUsPage() {
  const cms = getCmsNavPage("about-us")
  if (!cms || cms.page_id !== "10") {
    return (
      <main id="main-content" className="container-content py-20">
        <p className="text-ink-secondary">About page content is unavailable.</p>
      </main>
    )
  }

  return (
    <main id="main-content" className="bg-surface-subtle">
      {/*
        Editorial header — matches the Figma "About Us" pattern (centered orange
        uppercase title on white). The previous full-bleed blue-gradient hero
        was an improvisation that contradicted the Figma reference.
      */}
      <EditorialPageHeader
        id="about-hero-heading"
        title="About Boster Bio"
        subtitle="Your experts in state-of-the-art ELISA kits, antibodies, custom reagents, and analytical services in immunology, sequencing, cancer research, and more."
      />

      {/* Values + CTA card */}
      <section className="mx-auto max-w-[1440px] px-[var(--container-px)] py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <h2 className="font-heading text-2xl font-bold text-brand-primary md:text-3xl">Our values</h2>
            <p className="mt-4 text-ink-secondary leading-relaxed">
              You, the life scientist, are the hero destined for great discoveries and inventions. We serve to help you become
              the overachiever you were meant to be.
            </p>
            <p className="mt-4 text-ink-secondary leading-relaxed">
              With over 30 years in the industry, our foundations always go back to maintaining quality and having strong
              integrity to deliver consistent products and services. Providing reliable and high-quality products is our
              passion. This is our way of helping the life science community thrive, helping more researchers get the best
              tools to move forward.
            </p>
            <h2 className="mt-10 font-heading text-2xl font-bold text-brand-primary md:text-3xl">Boster quality guarantee</h2>
            <p className="mt-4 text-ink-secondary leading-relaxed">
              With our pride in providing products you can trust, a satisfaction/money-back guarantee backs up each of our
              items and services! This is our commitment to you, our loyal clients, who deserve the best of our technology,
              skills, and expertise in biochemistry.
            </p>
          </div>
          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-brand-primary/10 bg-white p-6 shadow-card md:p-8">
              <h3 className="font-heading text-xl font-bold text-brand-primary">Solutions, not just products</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                Empowering life science researchers has always been our aspiration—now, it’s our reality. With Boster Bio’s{" "}
                <strong className="text-ink">Free Validation Service</strong>, we test our antibodies in your research
                context—before you buy—so you invest only in what works.
              </p>
              <Link
                href="/promotions/free-validation-for-picoband-antibodies"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-accent-warm px-6 py-3 text-center text-sm font-bold text-white shadow-md transition hover:bg-accent-hover md:w-auto"
              >
                Claim my free validation
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Journey */}
      <section className="border-y border-brand-primary/10 bg-white py-12 md:py-16">
        <div className="mx-auto max-w-[1440px] px-[var(--container-px)]">
          <h2 className="text-center font-heading text-2xl font-bold uppercase tracking-wide text-accent-warm md:text-3xl">
            The journey of Boster Bio
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-ink-secondary">From humble beginnings to global success</p>

          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <h3 className="font-heading text-xl font-bold text-accent-warm">Humble start</h3>
              <p className="mt-3 text-ink-secondary leading-relaxed">
                Founded in 1993 by histologist Steven Xia, Boster Bio is an{" "}
                <Link href="/antibody-company" className="font-semibold text-brand-sky underline hover:text-brand-primary">
                  antibody manufacturing company
                </Link>{" "}
                specializing in high-sensitivity, high-specificity ELISA kits and WB/IHC compatible antibodies.
              </p>
              <p className="mt-4 text-ink-secondary leading-relaxed">
                It all started as a family-owned business. From a poor farming family, Steven Xia was the only one in the
                village to go to college and the only one in the county with a PhD.
              </p>
              <p className="mt-4 text-ink-secondary leading-relaxed">
                In early 90s China, he saw an underserved medical and research community and made a difference. It began in
                a small pickup truck-sized room with no capital. Despite all odds, he developed proprietary reagents for
                histology, becoming one of the few domestic suppliers of histology reagents when China heavily relied on
                imports.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl bg-brand-tint lg:col-span-7">
              <Image
                src="https://www.bosterbio.com/media/images/design-guide/hero-people-team2.jpg"
                alt="BosterBio team and laboratory"
                width={960}
                height={540}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-2xl bg-brand-tint">
              <Image
                src="https://www.bosterbio.com/media/images/design-guide/western-blot1.jpg"
                alt="BosterBio research and development"
                width={960}
                height={540}
                className="h-auto w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-accent-warm">30+ years later</h3>
              <p className="mt-3 text-ink-secondary leading-relaxed">
                Since then, the company has organically grown into one of the top 10 antibody companies globally.
              </p>
              <p className="mt-4 text-ink-secondary leading-relaxed">
                We have spent the last 3 decades perfecting our techniques and technology, and our products have been
                well-cited in tens of thousands of publications. We thoroughly validated our antibodies for IHC, WB,
                ELISA, and Flow Cytometry to bring you trustworthy products.
              </p>
              <p className="mt-4 text-ink-secondary leading-relaxed">
                We strive to provide the best service and have earned the trust of researchers worldwide. All products are
                covered by the Boster Quality Guarantee — each product will work as stated in the datasheet or your money
                back.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-brand-tint/60 py-12 md:py-16">
        <div className="mx-auto max-w-[1440px] px-[var(--container-px)]">
          <h2 className="text-center font-heading text-2xl font-bold uppercase tracking-wide text-accent-warm md:text-3xl">
            BosterBio timeline
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-ink-secondary">A brief history of Boster over the years</p>
          <ol className="mx-auto mt-12 max-w-3xl space-y-8 border-l-2 border-brand-sky/50 pl-8">
            {timeline.map((item) => (
              <li key={item.year} className="relative">
                <span className="absolute -left-[2.125rem] top-1 flex h-4 w-4 -translate-x-px rounded-full border-2 border-brand-sky bg-white" />
                <p className="font-heading text-sm font-bold uppercase tracking-wide text-brand-sky">{item.year}</p>
                <h3 className="mt-1 font-heading text-lg font-bold text-brand-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Commitment */}
      <section className="mx-auto max-w-[1440px] px-[var(--container-px)] py-12 md:py-16">
        <h2 className="text-center font-heading text-2xl font-bold uppercase tracking-wide text-accent-warm md:text-3xl">
          Our commitment
        </h2>
        <div className="mx-auto mt-8 max-w-3xl space-y-4 text-ink-secondary leading-relaxed">
          <p>
            To ensure you get the best experience possible, our platform brings you simple processes for applying for our
            services. With a swift response from our friendly customer support, you can effortlessly chat and leave a message
            for any concerns and questions.
          </p>
          <p>
            We promise a concierge sourcing experience. You will have a project manager who treats your project like
            his/her own and aims to provide full end-to-end solutions to help you turn your samples into insights
            (analytical), and obtain critical reagents for your projects (development and manufacturing).
          </p>
          <p>
            Ultimately, you, our clients, are the ones who do the hard work, therefore it’s our goal to guide and assist
            you, and be the hammer that helps you create scientific works of art.
          </p>
          <p>
            Ready to collaborate? Let’s discover, create, or analyze the next breakthrough in biological research!{" "}
            <Link href="/contact-us" className="font-bold text-brand-sky underline hover:text-brand-primary">
              Contact us today
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Brands */}
      <section className="border-t border-brand-primary/10 bg-white py-12 md:py-16">
        <div className="mx-auto max-w-[1440px] px-[var(--container-px)]">
          <h2 className="text-center font-heading text-2xl font-bold uppercase tracking-wide text-accent-warm md:text-3xl">
            Our brands
          </h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-4 text-ink-secondary leading-relaxed">
            <p>
              At first glance, the Boster logo appears simple — but it tells a powerful story. Every color, every curve
              reflects the heart of who we are.
            </p>
            <p>
              The vibrant <strong className="text-brand-sky">Sky Blue</strong> speaks to our R&amp;D team&apos;s relentless
              pursuit of scientific truth and quality. <strong className="text-accent-warm">Flame Orange</strong> captures
              the passion and innovation of our marketing and product teams. <strong className="text-emerald-600">Apple Green</strong>{" "}
              represents our customer support — empathetic, dependable, and always here to help.
            </p>
            <p>
              The white line inside is both a stylized “B” and a subtle thumbs-up from our mascot, Dr. Booster — a mark of
              confidence. Our tagline: <em className="text-brand-primary">Antibody and ELISA Experts.</em> Trusted by
              thousands, proven for decades.
            </p>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/about-us/boster-brands"
              className="inline-flex rounded-full bg-accent-warm px-8 py-3 text-sm font-bold text-white shadow-md hover:bg-accent-hover"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="bg-gradient-to-br from-brand-primary to-[#003566] py-12 text-white md:py-16"
        aria-labelledby="stats-heading"
      >
        <div className="mx-auto max-w-[1440px] px-[var(--container-px)]">
          <h2 id="stats-heading" className="text-center font-heading text-2xl font-bold uppercase tracking-wide md:text-3xl">
            Stats &amp; numbers
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-white/75">Some quick facts about us</p>
          <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
            {stats.map((s) => (
              <li
                key={s.label}
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-6 text-center backdrop-blur-sm"
              >
                <p className="font-heading text-2xl font-bold text-accent-warm md:text-3xl">{s.value}</p>
                <p className="mt-2 font-heading text-xs font-bold uppercase tracking-wide text-white/90">{s.label}</p>
                <p className="mt-1 text-xs text-white/65">{s.sub}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-[1440px] px-[var(--container-px)] py-12 md:py-16">
        <h2 className="text-center font-heading text-2xl font-bold uppercase tracking-wide text-accent-warm md:text-3xl">
          Testimonials
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-ink-secondary">
          What life scientists are saying about Boster products
        </p>
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <figure className="rounded-2xl border border-brand-primary/10 bg-white p-6 shadow-card">
            <div className="mb-4 overflow-hidden rounded-lg bg-brand-tint">
              <Image
                src="https://www.bosterbio.com/media/images/testimonials/immunofluorescence-PA1239-anti-Glial-fibrillary-acidic-protein-GFAP-antibody.jpg"
                alt="Customer IF result"
                width={400}
                height={300}
                className="h-auto w-full object-cover"
              />
            </div>
            <figcaption>
              <p className="font-heading font-bold text-accent-warm">Maria Teresa Dell&apos;Anno</p>
              <p className="text-xs text-ink-tertiary">Postdoc</p>
              <p className="mt-3 font-heading text-sm font-bold text-brand-primary">This antibody works perfectly!</p>
              <blockquote className="mt-2 text-sm leading-relaxed text-ink-secondary">
                I used it for IHC on frozen sections at a dilution of 1:500. It did not need several trials to optimize the
                protocol.
              </blockquote>
            </figcaption>
          </figure>
          <figure className="rounded-2xl border border-brand-primary/10 bg-white p-6 shadow-card">
            <div className="mb-4 overflow-hidden rounded-lg bg-brand-tint">
              <Image
                src="https://www.bosterbio.com/media/images/testimonials/DZ12892-Jakub-Famulski.png"
                alt="Jakub Famulski"
                width={400}
                height={300}
                className="h-auto w-full object-cover"
              />
            </div>
            <figcaption>
              <p className="font-heading font-bold text-accent-warm">Jakub Famulski</p>
              <p className="text-xs text-ink-tertiary">Principal investigator</p>
              <p className="mt-3 font-heading text-sm font-bold text-brand-primary">Good zebrafish antibody for Nlz2</p>
              <blockquote className="mt-2 text-sm leading-relaxed text-ink-secondary">
                Zebrafish-specific antibody. Used in whole mount IF on 24hpf zebrafish embryos… promising results in whole
                mount applications.
              </blockquote>
            </figcaption>
          </figure>
          <figure className="rounded-2xl border border-brand-primary/10 bg-white p-6 shadow-card">
            <div className="mb-4 overflow-hidden rounded-lg bg-brand-tint">
              <Image
                src="https://www.bosterbio.com/media/images/testimonials/PB9318-Ramaz-Geguchadze.png"
                alt="Ramaz Geguchadze"
                width={400}
                height={300}
                className="h-auto w-full object-cover"
              />
            </div>
            <figcaption>
              <p className="font-heading font-bold text-accent-warm">Ramaz Geguchadze</p>
              <p className="text-xs text-ink-tertiary">Research scientist</p>
              <p className="mt-3 font-heading text-sm font-bold text-brand-primary">A good PKC alpha antibody for IP and WB</p>
              <blockquote className="mt-2 text-sm leading-relaxed text-ink-secondary">
                Strong positive band with right mass. Works great without optimization! Good quality and ready for publish.
              </blockquote>
            </figcaption>
          </figure>
        </div>
        <p className="mt-6 text-center text-xs text-ink-tertiary">Content synced from CMS (page_id {cms.page_id}), last updated {cms.update_time.slice(0, 10)}.</p>
      </section>

      {/* Support strip + contact */}
      <section className="border-t border-brand-primary/10 bg-brand-tint/40 py-12 md:py-16">
        <div className="mx-auto max-w-[1440px] px-[var(--container-px)]">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-card md:p-10">
              <h2 className="font-heading text-xl font-bold text-brand-primary md:text-2xl">Boster support to customers</h2>
              <p className="mt-2 font-heading text-sm font-semibold text-ink-secondary">Our expertise at your service</p>
              <p className="mt-4 text-ink-secondary leading-relaxed">
                Our technical resources are free to access and download at your convenience, and our customer support is at
                your service within 24 hours. We take pride in our high standard of quality and we transparently share our
                validation data so you can get better data with less time, less money, and less frustration.
              </p>
            </div>
            <div className="flex flex-col justify-center rounded-2xl border border-brand-primary/10 bg-white p-8 shadow-card md:p-10">
              <h2 className="font-heading text-xl font-bold text-brand-primary">Get in touch</h2>
              <p className="mt-2 text-sm text-ink-secondary">Our support team will answer within 24 hours.</p>
              <ul className="mt-6 space-y-3 text-sm text-ink-secondary">
                <li>
                  <strong className="text-brand-primary">Orders:</strong>{" "}
                  <a href="mailto:orders@bosterbio.com" className="text-brand-sky underline">
                    orders@bosterbio.com
                  </a>
                </li>
                <li>
                  <strong className="text-brand-primary">Support:</strong>{" "}
                  <a href="mailto:support@bosterbio.com" className="text-brand-sky underline">
                    support@bosterbio.com
                  </a>
                </li>
                <li>
                  <strong className="text-brand-primary">Phone:</strong> (888) 466-3604
                </li>
                <li>
                  <strong className="text-brand-primary">Address:</strong> 3942 Valley Ave, Suite B, Pleasanton, CA 94566
                </li>
              </ul>
              <Link
                href="/contact-us"
                className="mt-6 inline-flex w-fit rounded-full bg-accent-warm px-8 py-3 text-sm font-bold text-white hover:bg-accent-hover"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
