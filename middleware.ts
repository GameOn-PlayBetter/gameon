// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

// (Optional) limit which paths run middleware.
// Leave empty if you don't need it.
export const config = {
  matcher: [],
};