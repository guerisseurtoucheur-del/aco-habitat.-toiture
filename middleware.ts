import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || ""

  // Redirect diag.aco-habitat.fr to aco-habitat.fr (301 permanent)
  if (host === "diag.aco-habitat.fr" || host === "www.diag.aco-habitat.fr") {
    const url = new URL(request.url)
    url.host = "aco-habitat.fr"
    url.protocol = "https"
    return NextResponse.redirect(url, 301)
  }

  // Redirect www to non-www
  if (host === "www.aco-habitat.fr") {
    const url = new URL(request.url)
    url.host = "aco-habitat.fr"
    url.protocol = "https"
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files and api routes that don't need redirecting
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
