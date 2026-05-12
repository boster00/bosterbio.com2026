import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

/**
 * Legacy Magento CMS URLs often use a trailing `.html`. Next catch-all routes
 * use slash paths without the suffix. Rewrite internally so `/path.html` and
 * `/path` resolve the same RSC while the browser URL may stay on `.html`.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (!pathname.endsWith(".html") || pathname.length <= 5) {
    return NextResponse.next()
  }
  const stripped = pathname.slice(0, -5) || "/"
  const url = request.nextUrl.clone()
  url.pathname = stripped
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
