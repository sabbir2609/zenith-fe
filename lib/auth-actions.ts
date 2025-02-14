"use server";

import { cookies } from "next/headers";

export async function serverLogin(data: { access: string; refresh: string }) {
  const cookieStore = await cookies();

  cookieStore.set("access_token", data.access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 15, // 15 minutes
  });

  cookieStore.set("refresh_token", data.refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export async function serverLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
}

export async function getServerAuthStatus() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");
  return !!accessToken;
}
