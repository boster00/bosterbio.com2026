import Link from "next/link"

export default function AccountPage() {
  return (
    <main id="main-content" className="min-h-[50vh]">
      <div className="container-content py-12 md:py-16">
        <h1 className="font-display text-display-md text-ink">Sign in</h1>
        <p className="mt-3 max-w-xl text-ink-secondary">
          Account and order history will connect to Medusa customer authentication when the storefront integration is
          complete.
        </p>
        <div className="mt-10 max-w-md rounded-xl border border-surface-muted bg-surface-subtle p-8">
          <form className="space-y-4" action="#" method="post">
            <div>
              <label htmlFor="acct-email" className="block text-sm font-medium text-ink">
                Email
              </label>
              <input
                id="acct-email"
                name="email"
                type="email"
                autoComplete="email"
                className="mt-1 h-11 w-full rounded-md border border-surface-muted bg-white px-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <div>
              <label htmlFor="acct-password" className="block text-sm font-medium text-ink">
                Password
              </label>
              <input
                id="acct-password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="mt-1 h-11 w-full rounded-md border border-surface-muted bg-white px-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-brand py-3 text-sm font-semibold text-white hover:bg-brand-light"
            >
              Continue
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-ink-secondary">
            <Link href="/contact" className="font-semibold text-brand hover:underline">
              Need help accessing your account?
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
