import { NextRequest, NextResponse } from "next/server"

const ALLOWED = /^https:\/\/(www\.)?bosterbio\.com\//i

/**
 * Same-origin proxy for BosterBio product images (CDN often blocks hotlinking in headless browsers).
 * GET /api/proxy-product-image?url=<encoded https://www.bosterbio.com/...>
 */
export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("url")
  if (!raw || !ALLOWED.test(raw)) {
    return NextResponse.json({ error: "Invalid or disallowed url" }, { status: 400 })
  }

  try {
    const upstream = await fetch(raw, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
      redirect: "follow",
      cache: "no-store",
    })

    if (!upstream.ok) {
      return NextResponse.json({ error: `Upstream ${upstream.status}` }, { status: 502 })
    }

    const ct = upstream.headers.get("content-type") ?? "image/jpeg"
    if (!ct.startsWith("image/")) {
      return NextResponse.json({ error: "Not an image" }, { status: 502 })
    }

    const buf = Buffer.from(await upstream.arrayBuffer())
    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type": ct,
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 502 })
  }
}
