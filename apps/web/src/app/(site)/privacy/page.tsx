export default function PrivacyPage() {
  return (
    <main id="main-content">
      <div className="container-content max-w-3xl py-12 md:py-16">
        <h1 className="font-display text-display-md text-ink">Privacy policy</h1>
        <p className="mt-6 text-sm text-ink-secondary">
          This is placeholder legal copy for layout and navigation only. Replace with counsel-approved privacy terms
          before production launch.
        </p>
        <section className="mt-10 space-y-4 text-ink-secondary">
          <h2 className="font-display text-title text-ink">Information we collect</h2>
          <p>
            We may collect information you provide when you create an account, place an order, or contact support —
            including name, institution, email address, and shipping details.
          </p>
          <h2 className="font-display text-title text-ink pt-4">How we use information</h2>
          <p>
            We use this information to fulfill orders, provide technical support, and improve our products and website
            experience.
          </p>
        </section>
      </div>
    </main>
  )
}
