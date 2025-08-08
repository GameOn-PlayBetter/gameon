// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  // --- 1) ADMIN AUTH-ONLY GATE ---
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const res = NextResponse.next();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          // New API: only getAll + setAll
          getAll: () => req.cookies.getAll(),
          setAll: (cookies) => {
            for (const { name, value, ...options } of cookies) {
              // Next 14 signature
              res.cookies.set(name, value, options as any);
            }
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      url.pathname = "/login";
      url.searchParams.set("next", "/admin");
      return NextResponse.redirect(url);
    }

    return res;
  }

  // --- 2) YOUR EXISTING SKILLERY REWRITES ---
  if (pathname.startsWith("/skillery/")) {
    const target = pathname.replace("/skillery", "");
    const rootPages = [
      "/privacy-policy",
      "/cookie-policy",
      "/safety-guidelines",
      "/legal",
      "/contact",
      "/coach-requirements-eligibility",
      "/terms-of-service",
    ];
    if (rootPages.includes(target)) {
      url.pathname = target;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/skillery/:path*"],
};