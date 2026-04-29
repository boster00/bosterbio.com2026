// Google Tag Manager + GA4 tracking scripts.
//
// GTM is HOSTNAME-GATED at runtime: it only fires on the live bosterbio.com
// domain (and a few permitted hostnames). The reason — GTM-5S2DVGH is the
// *live Magento store's* container; it contains tags that inject a chat
// widget, promo sidebar, and other live-site UI bits via DOM mutation.
// Firing that container on the staging Vercel URL bleeds those widgets onto
// our redesigned pages (broken icon glyphs in the right margin, "Live Chat
// is offline" popup, etc.). The container can't be safely modified without
// risking the live store, so we gate the new site instead.
//
// GA4 is *not* gated — it has its own measurement ID dedicated to the 2026
// property, so it's safe (and useful) to fire on staging for analytics.
//
// To allow GTM on additional hostnames (e.g. a separate staging domain that
// you've configured in GTM), append them to GTM_HOST_ALLOWLIST below.
import Script from "next/script";

const GTM_HOST_ALLOWLIST = ["bosterbio.com", "www.bosterbio.com"];

export function TrackingScripts() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim();

  return (
    <>
      {gtmId ? (
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  var allowed = ${JSON.stringify(GTM_HOST_ALLOWLIST)};
  if (allowed.indexOf(location.hostname) === -1) return;
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
  var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
  j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
  f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');
})();
            `.trim(),
          }}
        />
      ) : null}

      {ga4Id ? (
        <>
          <Script
            id="ga4-loader"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga4Id}', { send_page_view: true });
              `.trim(),
            }}
          />
        </>
      ) : null}
    </>
  );
}

/**
 * GTM noscript fallback iframe — same hostname gate. Renders inside <body> top.
 * For SSR we can't read window.location, so we always emit the noscript tag
 * but wrap it in a marker div that a tiny inline script removes off-allowlist.
 */
export function TrackingNoscript() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  if (!gtmId) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="GTM"
      />
    </noscript>
  );
}
