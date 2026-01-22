import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function proxy(request: NextRequest) {
  // Get the path
  const path = request.nextUrl.pathname;

  // Define protected routes
  const isProtectedRoute = path.startsWith("/dashboard");

  // Check if user has authentication cookie
  const accessToken = request.cookies.get("access")?.value;

  // Redirect if trying to access protected route without auth
  if (isProtectedRoute && !accessToken) {
    const url = new URL("/auth/login", request.url);
    // Add a redirect param so login can redirect back after authentication
    url.searchParams.set("redirect", path);
    return NextResponse.redirect(url);
  }

  // If we have an access token, check if it needs refreshing
  if (accessToken) {
    try {
      // Check if token is near expiration (refresh if < 5 minutes left)
      const decoded = jwtDecode<{ exp: number }>(accessToken);
      const expirationTime = decoded.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      const timeUntilExpiry = expirationTime - currentTime;

      // If token expires in less than 5 minutes, refresh it
      if (timeUntilExpiry < 5 * 60 * 1000) {
        // Refresh token logic (similar to your refreshAccessToken function)
        const refreshToken = request.cookies.get("refresh")?.value;
        if (refreshToken) {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(`${apiUrl}/auth/token/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
          });

          if (response.ok) {
            const data = await response.json();
            const nextResponse = NextResponse.next();

            // Set the cookies directly in the response
            nextResponse.cookies.set("access", data.access, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              path: "/",
              maxAge: 60 * 24 * 3, // 3 days
            });

            if (data.refresh) {
              nextResponse.cookies.set("refresh", data.refresh, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 10, // 10 days
              });
            }

            return nextResponse;
          }
        }
      }
    } catch (error) {
      console.error("Token refresh middleware error:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
