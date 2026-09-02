import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: request.nextUrl.protocol === "https:",
  });
  const isAuthenticated = Boolean(token);
  const isAuthPage = pathname.startsWith("/signin");
  const isProtected =
    pathname === "/" ||
    pathname.startsWith("/montage-") ||
    pathname.startsWith("/montage/");

  /**
   * 1️⃣ Logged-in user → block auth pages
   */
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  /**
   * 2️⃣ Guest user → block protected pages
   */
  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/signin", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/montage-:path*", "/montage/:path*"],
};
