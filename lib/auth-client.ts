"use client";

import { serverLogin, serverLogout } from "./auth-actions";

interface AuthTokens {
  access: string;
  refresh: string;
}

export async function login(email: string, password: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/jwt/create/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data: AuthTokens = await response.json();
    await serverLogin(data);
    return true;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
}

export async function logout(): Promise<void> {
  await serverLogout();
}
