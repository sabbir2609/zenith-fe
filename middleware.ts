import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the path
  const path = request.nextUrl.pathname;

  // Define protected routes
  const isProtectedRoute = path.startsWith("/dashboard");

  // Check if user has authentication cookie
  const token = request.cookies.get("access")?.value;

  // Redirect if trying to access protected route without auth
  if (isProtectedRoute && !token) {
    const url = new URL("/auth/login", request.url);
    // Add a redirect param so login can redirect back after authentication
    url.searchParams.set("redirect", path);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
