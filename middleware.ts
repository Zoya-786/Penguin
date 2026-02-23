import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("penguin_session");
  const isLoginPage = request.nextUrl.pathname === "/login";

  // 1. If no session and NOT on login page, go to login
  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. If session exists and on login page, skip to dashboard
  if (session && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Don't run middleware on static files or images
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};