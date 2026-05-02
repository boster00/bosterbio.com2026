"use client"

import { useState } from "react"
import Link from "next/link"

type Step = "contact" | "payment" | "review" | "done"

type CartLine = {
  sku: string
  title: string
  unit_price_cents: number
  quantity: number
  template?: string
}

// Demo cart for the smoke test (no Medusa cart wired yet).
// In production this comes from a real cart context. For now we hardcode
// two real catalog SKUs so the form has something to submit.
const DEMO_CART: CartLine[] = [
  { sku: "A06751", title: "Anti-Ficolin-1 FCN1 Antibody", unit_price_cents: 35900, quantity: 1, template: "antibodies" },
  { sku: "EK1629", title: "Mouse TFF3/ITF ELISA Kit PicoKine®", unit_price_cents: 49900, quantity: 1, template: "elisa-kits" },
]

function fmtCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export function CheckoutFlow() {
  const [step, setStep] = useState<Step>("contact")
  const [contact, setContact] = useState({
    email: "",
    full_name: "",
    company: "",
    phone: "",
    ship_addr1: "",
    ship_city: "",
    ship_state: "",
    ship_postal: "",
    ship_country: "US",
    notes: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("sandbox")
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ ok: boolean; order_number?: string; order_id?: string; note?: string; error?: string } | null>(null)

  const subtotal = DEMO_CART.reduce((s, l) => s + l.unit_price_cents * l.quantity, 0)

  function update<K extends keyof typeof contact>(k: K, v: string) {
    setContact((c) => ({ ...c, [k]: v }))
  }

  async function submitOrder() {
    setSubmitting(true)
    try {
      const r = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, payment_method: paymentMethod, items: DEMO_CART }),
      })
      const j = await r.json()
      setResult(j)
      if (j.ok) setStep("done")
    } catch (e: unknown) {
      setResult({ ok: false, error: e instanceof Error ? e.message : "Network error" })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_360px]">
      {/* Main step area */}
      <div className="space-y-6">
        <Stepper current={step} />

        {step === "contact" && (
          <div className="rounded-2xl border border-surface-muted bg-white p-6 shadow-card md:p-8">
            <h2 className="font-heading text-xl text-brand-primary">Contact + Shipping</h2>
            <p className="mt-2 text-sm text-ink-secondary">Where should we ship the order, and how do we reach you?</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Field label="Work email *" id="email" type="email" value={contact.email} onChange={(v) => update("email", v)} />
              <Field label="Full name" id="name" value={contact.full_name} onChange={(v) => update("full_name", v)} />
              <Field label="Institution / Company" id="company" value={contact.company} onChange={(v) => update("company", v)} />
              <Field label="Phone" id="phone" value={contact.phone} onChange={(v) => update("phone", v)} />
              <Field label="Address line 1" id="addr1" value={contact.ship_addr1} onChange={(v) => update("ship_addr1", v)} className="md:col-span-2" />
              <Field label="City" id="city" value={contact.ship_city} onChange={(v) => update("ship_city", v)} />
              <Field label="State" id="state" value={contact.ship_state} onChange={(v) => update("ship_state", v)} />
              <Field label="ZIP / Postal" id="zip" value={contact.ship_postal} onChange={(v) => update("ship_postal", v)} />
              <Field label="Country" id="country" value={contact.ship_country} onChange={(v) => update("ship_country", v)} />
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                disabled={!/.+@.+\..+/.test(contact.email)}
                onClick={() => setStep("payment")}
                className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-accent-hover disabled:opacity-50"
              >
                Continue to payment →
              </button>
            </div>
          </div>
        )}

        {step === "payment" && (
          <div className="rounded-2xl border border-surface-muted bg-white p-6 shadow-card md:p-8">
            <h2 className="font-heading text-xl text-brand-primary">Payment</h2>
            <p className="mt-2 text-sm text-ink-secondary">
              <strong>Sandbox mode</strong> — no real charge will be made. Order will capture to the Boster order database.
              Real Authorize.Net + Stripe gateways arrive in the next phase (toggleable via PAYMENT_GATEWAY env var per Office Hour Q2).
            </p>

            <div className="mt-6 space-y-3">
              <PaymentRadio
                value="sandbox"
                checked={paymentMethod === "sandbox"}
                onChange={setPaymentMethod}
                label="Sandbox payment (smoke test)"
                hint="Records the order with payment_status='unpaid'; gateway integration TBD."
              />
              <PaymentRadio
                value="po"
                checked={paymentMethod === "po"}
                onChange={setPaymentMethod}
                label="Purchase order (PO)"
                hint="Order ships against a PO; team confirms terms after capture."
              />
            </div>

            <div className="mt-6 flex justify-between">
              <button type="button" onClick={() => setStep("contact")} className="text-sm font-medium text-brand-primary hover:underline">
                ← Back
              </button>
              <button
                type="button"
                onClick={() => setStep("review")}
                className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-accent-hover"
              >
                Review order →
              </button>
            </div>
          </div>
        )}

        {step === "review" && (
          <div className="rounded-2xl border border-surface-muted bg-white p-6 shadow-card md:p-8">
            <h2 className="font-heading text-xl text-brand-primary">Review and place order</h2>
            <p className="mt-2 text-sm text-ink-secondary">Check your shipping + payment selection before placing the order.</p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <DetailBlock title="Shipping to">
                <p className="text-sm text-ink">{contact.full_name || "(name not provided)"}</p>
                <p className="text-sm text-ink">{contact.email}</p>
                <p className="text-sm text-ink-secondary">{contact.company}</p>
                <p className="text-sm text-ink-secondary">{contact.ship_addr1}</p>
                <p className="text-sm text-ink-secondary">
                  {contact.ship_city}, {contact.ship_state} {contact.ship_postal} · {contact.ship_country}
                </p>
              </DetailBlock>
              <DetailBlock title="Payment">
                <p className="text-sm text-ink">{paymentMethod === "sandbox" ? "Sandbox payment (no charge)" : "Purchase order (PO)"}</p>
                <p className="mt-2 text-xs text-ink-tertiary">payment_method = <code className="rounded bg-surface-subtle px-1 py-0.5">{paymentMethod}</code></p>
              </DetailBlock>
            </div>

            {result && !result.ok ? (
              <div className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
                Failed: {result.error}
              </div>
            ) : null}

            <div className="mt-6 flex justify-between">
              <button type="button" onClick={() => setStep("payment")} className="text-sm font-medium text-brand-primary hover:underline">
                ← Back
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={submitOrder}
                className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-accent-hover disabled:opacity-50"
              >
                {submitting ? "Placing order…" : `Place order (${fmtCents(subtotal)})`}
              </button>
            </div>
          </div>
        )}

        {step === "done" && result?.ok && (
          <div className="rounded-2xl border border-green-300 bg-green-50 p-8 shadow-card text-center">
            <h2 className="font-heading text-2xl text-brand-primary">Order placed ✓</h2>
            <p className="mt-3 text-base text-ink">
              Confirmation number: <code className="rounded bg-white px-2 py-1 font-mono text-sm">{result.order_number}</code>
            </p>
            <p className="mt-4 text-sm text-ink-secondary">{result.note}</p>
            <p className="mt-2 text-xs text-ink-tertiary font-mono">order_id = {result.order_id}</p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/products" className="rounded-full border border-brand-primary px-5 py-2 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white">
                Continue browsing
              </Link>
              <Link href="/" className="rounded-full bg-accent px-5 py-2 text-sm font-bold text-white transition hover:bg-accent-hover">
                Home
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Order summary aside */}
      <aside className="rounded-2xl border border-surface-muted bg-surface-subtle p-6 shadow-card h-fit">
        <h3 className="font-heading text-lg text-brand-primary">Your cart</h3>
        <ul className="mt-4 space-y-3">
          {DEMO_CART.map((l) => (
            <li key={l.sku} className="flex justify-between text-sm">
              <span className="text-ink">
                <span className="block font-semibold">{l.title}</span>
                <span className="text-xs text-ink-tertiary">{l.sku} · qty {l.quantity}</span>
              </span>
              <span className="font-mono text-ink">{fmtCents(l.unit_price_cents * l.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-surface-muted pt-4 space-y-1 text-sm">
          <div className="flex justify-between"><span className="text-ink-secondary">Subtotal</span><span className="font-mono">{fmtCents(subtotal)}</span></div>
          <div className="flex justify-between text-ink-tertiary"><span>Tax</span><span>—</span></div>
          <div className="flex justify-between text-ink-tertiary"><span>Shipping</span><span>—</span></div>
          <div className="flex justify-between font-semibold text-ink mt-2"><span>Total</span><span className="font-mono">{fmtCents(subtotal)}</span></div>
        </div>
      </aside>
    </div>
  )
}

function Stepper({ current }: { current: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "contact", label: "Contact" },
    { key: "payment", label: "Payment" },
    { key: "review", label: "Review" },
    { key: "done", label: "Done" },
  ]
  const idx = steps.findIndex((s) => s.key === current)
  return (
    <ol className="flex items-center gap-2 text-xs uppercase tracking-[0.18em]">
      {steps.map((s, i) => (
        <li key={s.key} className="flex items-center gap-2">
          <span
            className={[
              "inline-flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-bold",
              i <= idx ? "border-accent bg-accent text-white" : "border-surface-muted bg-white text-ink-tertiary",
            ].join(" ")}
          >
            {i + 1}
          </span>
          <span className={i <= idx ? "text-brand-primary" : "text-ink-tertiary"}>{s.label}</span>
          {i < steps.length - 1 ? <span className="mx-1 h-px w-8 bg-surface-muted" aria-hidden /> : null}
        </li>
      ))}
    </ol>
  )
}

function Field({
  label, id, type = "text", value, onChange, className,
}: { label: string; id: string; type?: string; value: string; onChange: (v: string) => void; className?: string }) {
  return (
    <label htmlFor={id} className={["block", className].filter(Boolean).join(" ")}>
      <span className="block text-xs font-medium uppercase tracking-[0.12em] text-ink-secondary">{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-surface-muted bg-white px-3 py-2 text-sm text-ink shadow-inner focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
      />
    </label>
  )
}

function PaymentRadio({
  value, checked, onChange, label, hint,
}: { value: string; checked: boolean; onChange: (v: string) => void; label: string; hint: string }) {
  return (
    <label className={[
      "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition",
      checked ? "border-brand-primary bg-brand-primary/5" : "border-surface-muted bg-white hover:bg-surface-subtle",
    ].join(" ")}>
      <input type="radio" name="payment" value={value} checked={checked} onChange={() => onChange(value)} className="mt-1 accent-brand-primary" />
      <span>
        <span className="block font-semibold text-ink">{label}</span>
        <span className="mt-1 block text-xs text-ink-secondary">{hint}</span>
      </span>
    </label>
  )
}

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-surface-muted p-4">
      <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-secondary">{title}</h3>
      <div className="mt-2 space-y-1">{children}</div>
    </div>
  )
}
