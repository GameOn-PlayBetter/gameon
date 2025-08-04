import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  // Only intercept /skillery/* pages
  if (pathname.startsWith("/skillery/")) {
    const target = pathname.replace("/skillery", "");

    // Define which root pages Skillery should use
    const rootPages = [
      "/privacy-policy",
      "/cookie-policy",
      "/safety-guidelines",
      "/legal",
      "/contact",
      "/coach-requirements-eligibility",
      "/terms-of-service",
    ];

    // If the path after /skillery matches one of the root pages
    if (rootPages.includes(target)) {
      url.pathname = target; // rewrite to root page
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/skillery/:path*"],
};