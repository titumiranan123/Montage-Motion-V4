import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("next-auth.session-token")?.value;
  const isAuthPage = pathname.startsWith("/signin");
  const isProtected =
    pathname === "/" ||
    pathname.startsWith("/montage-") ||
    pathname.startsWith("/montage/");

  /**
   * 1️⃣ Logged-in user → block auth pages
   */
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  /**
   * 2️⃣ Guest user → block protected pages
   */
  if (isProtected && !token) {
    const loginUrl = new URL("/signin", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/montage-:path*", "/montage/:path*"],
};
