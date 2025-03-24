"use client";

import { toast } from "sonner";
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
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.detail || "Login failed");
      throw new Error(errorData.detail || "Login failed");
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
  try {
    await serverLogout();
  } catch (error) {
    console.error("Logout error:", error);
  }
}
