import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import { authSecret } from "@/lib/auth";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: authSecret });
  const { pathname } = req.nextUrl;

  // Wholesale routing logic
  if (pathname.startsWith("/dashboard") && token?.role !== "B2B") {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/account/:path*"],
};
