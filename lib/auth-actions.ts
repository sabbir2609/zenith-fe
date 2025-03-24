"use server";

import { cookies } from "next/headers";

// Type definitions
interface AuthTokens {
  access: string;
  refresh: string;
}

interface RefreshResponse {
  access: string;
  refresh?: string;
}

// Cookie configuration
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

// Sets authentication cookies for the user session
export async function serverLogin(data: AuthTokens): Promise<void> {
  const cookieStore = cookies();

  (await cookieStore).set("access", data.access, {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 24 * 3, // 3 days
  });

  (await cookieStore).set("refresh", data.refresh, {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 10, // 10 days
  });
}

// Clears user session and removes auth cookies
export async function serverLogout(): Promise<void> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error("API URL is not defined");
    }

    // Call the Django logout endpoint
    const response = await fetch(`${apiUrl}/auth/logout/`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      console.warn("Logout API call failed:", response.status);
    }
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Clear cookies regardless of API call result
    const cookieStore = cookies();
    (await cookieStore).delete("access");
    (await cookieStore).delete("refresh");
  }
}

// Checks if user is currently authenticated on the server
export async function getServerAuthStatus(): Promise<boolean> {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access");
  return !!accessToken;
}

// Gets the access token from cookies for server components
export async function getAccessToken(): Promise<string | null> {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access");
  return accessToken?.value || null;
}

// Refreshes the access token using the refresh token (might need it in the future)
export async function refreshAccessToken(): Promise<boolean> {
  try {
    const cookieStore = cookies();
    const refreshToken = (await cookieStore).get("refresh");

    if (!refreshToken?.value) {
      console.error("No refresh token available");
      return false;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error("API URL is not defined");
    }

    const response = await fetch(`${apiUrl}/auth/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken.value }),
    });

    if (!response.ok) {
      console.error(`Failed to refresh token: ${response.status}`);
      return false;
    }

    const data = (await response.json()) as RefreshResponse;

    // Update with new tokens
    await serverLogin({
      access: data.access,
      refresh: data.refresh || refreshToken.value, // Use existing refresh token if not provided
    });

    return true;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return false;
  }
}
