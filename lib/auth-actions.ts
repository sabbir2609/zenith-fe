"use server";

import { cookies } from "next/headers";

export async function serverLogin(data: { access: string; refresh: string }) {
  const cookieStore = await cookies();

  cookieStore.set("access", data.access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // Changed to match Django settings
    path: "/",
    maxAge: 60 * 24 * 3, // 3 days
  });

  cookieStore.set("refresh", data.refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // Changed to match Django settings
    path: "/",
    maxAge: 60 * 60 * 24 * 10, // 10 days
  });
}

export async function serverLogout() {
  try {
    // Call the Django logout endpoint
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout/`, {
      method: "POST",
      credentials: "include",
    });

    // Then clear cookies
    const cookieStore = await cookies();
    cookieStore.delete("access");
    cookieStore.delete("refresh");
  } catch (error) {
    console.error("Logout error:", error);
  }
}

export async function getServerAuthStatus() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access");
  return !!accessToken;
}
