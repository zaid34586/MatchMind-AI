import { NextResponse } from "next/server";

export function proxy(request) {
  const authCookie = request.cookies.get("matchmind_auth");
  const isLoggedIn = authCookie?.value === "true";

  const protectedRoutes = [
    "/dashboard",
    "/analysis",
    "/assistant",
    "/history",
    "/settings",
  ];

  const pathname = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/analysis/:path*",
    "/assistant/:path*",
    "/history/:path*",
    "/settings/:path*",
  ],
};