/**
 * Audit all core pages at desktop (1440) and mobile (375) widths.
 * One-off scratch script for the page-by-page robustness check.
 *
 * Usage: cd apps/web && node scripts/_audit-pages-responsive.mjs
 *
 * Saves screenshots to apps/web/.audit-screenshots/{slug}-{breakpoint}.png
 * and prints a per-page rubric to stdout (status code, render time,
 * presence of expected hero/main/nav, mobile-menu button, console errors).
 */
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3003";
const OUT = ".audit-screenshots";
mkdirSync(OUT, { recursive: true });

// label → path (label is filesystem-safe, used in screenshot filename)
const PAGES = [
  ["home", "/"],
  ["plp", "/products"],
  ["pdp", "/products/A06751"],
  ["cart", "/cart"],
  ["checkout", "/checkout"],
  ["contact", "/contact"],
  ["contact-us", "/contact-us"],
  ["about", "/about"],
  ["about-us", "/about-us"],
  ["design-guide", "/design-guide"],
  ["service-detail", "/services/custom-antibody-production-services"],
  ["service-hub", "/services"],
  ["knowledge-wb", "/western-blotting-technical-resource-center"],
  ["knowledge-elisa", "/elisa-technical-resource-center"],
  ["primary-antibodies", "/primary-antibodies"],
  ["blog", "/blog"],
  ["404-known", "/__definitely_not_a_real_page__"],
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 375, height: 812 },
];

const browser = await chromium.launch();
const results = [];

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  for (const [label, path] of PAGES) {
    const page = await ctx.newPage();
    const consoleErrors = [];
    page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${e.message.slice(0, 200)}`));
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(`console.error: ${m.text().slice(0, 200)}`);
    });
    const t0 = Date.now();
    let status = 0;
    let networkOk = true;
    try {
      const resp = await page.goto(`${BASE}${path}`, { waitUntil: "networkidle", timeout: 20_000 });
      status = resp?.status() ?? 0;
    } catch (e) {
      networkOk = false;
      consoleErrors.push(`navigation: ${String(e).slice(0, 200)}`);
    }
    const elapsed = Date.now() - t0;

    // Quick DOM probes — run inside the page so they reflect actual render
    const probe = await page.evaluate(() => {
      const $ = (sel) => document.querySelector(sel);
      const hasMain = !!$("main, [role='main'], #main-content");
      const hasHeader = !!$("header, [role='banner']");
      const hasFooter = !!$("footer, [role='contentinfo']");
      const h1 = $("h1");
      const h1Text = h1?.textContent?.trim().slice(0, 80) ?? "";
      // Is the mobile-only nav trigger visible? (assumes a button with hamburger / aria-label menu)
      const mobileNavBtn = Array.from(document.querySelectorAll("button"))
        .find((b) => /menu|nav/i.test(b.getAttribute("aria-label") || "") || b.querySelector("svg[aria-label*='menu' i]"));
      const mobileNavVisible = mobileNavBtn ? mobileNavBtn.getBoundingClientRect().width > 0 : false;
      // How many broken (loaded=true, naturalWidth=0) images?
      const imgs = Array.from(document.querySelectorAll("img"));
      const broken = imgs.filter((i) => i.complete && i.naturalWidth === 0).length;
      // Body text overflowing horizontally? (rough horizontal-scroll test)
      const overflowX = document.documentElement.scrollWidth > window.innerWidth + 4;
      return { hasMain, hasHeader, hasFooter, h1Text, mobileNavVisible, brokenImages: broken, totalImages: imgs.length, overflowX };
    });

    const screenshotPath = join(OUT, `${label}-${vp.name}.png`);
    try {
      await page.screenshot({ path: screenshotPath, fullPage: false });
    } catch (e) {
      // Page may not have rendered; skip
    }

    results.push({ vp: vp.name, label, path, status, elapsed, networkOk, probe, consoleErrors: consoleErrors.slice(0, 3) });
    await page.close();
  }
  await ctx.close();
}
await browser.close();

writeFileSync(join(OUT, "results.json"), JSON.stringify(results, null, 2));

// Pretty-print summary table
const groups = {};
for (const r of results) {
  groups[r.label] ??= {};
  groups[r.label][r.vp] = r;
}
console.log("\nPage audit results — http://localhost:3003");
console.log("=".repeat(110));
console.log(["page", "path", "dt-stat", "dt-h1", "dt-overflowX", "dt-broken", "mb-stat", "mb-mobnav", "mb-overflowX", "mb-broken", "errors"]
  .join(" | "));
for (const label of Object.keys(groups)) {
  const d = groups[label].desktop;
  const m = groups[label].mobile;
  const errs = [...(d?.consoleErrors ?? []), ...(m?.consoleErrors ?? [])].length;
  console.log([
    label.padEnd(22),
    (d?.path ?? "").padEnd(46),
    String(d?.status ?? "?").padEnd(7),
    (d?.probe?.h1Text ?? "(no h1)").slice(0, 28).padEnd(28),
    String(d?.probe?.overflowX ?? "?"),
    `${d?.probe?.brokenImages ?? "?"}/${d?.probe?.totalImages ?? "?"}`,
    String(m?.status ?? "?").padEnd(7),
    String(m?.probe?.mobileNavVisible ?? "?"),
    String(m?.probe?.overflowX ?? "?"),
    `${m?.probe?.brokenImages ?? "?"}/${m?.probe?.totalImages ?? "?"}`,
    String(errs),
  ].join(" | "));
}
console.log("=".repeat(110));
console.log(`\nScreenshots in ${OUT}/`);
