// lib/server-actions.ts
"use server";

import { cookies } from "next/headers";

export async function fetchData(endpoint: string) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access_token");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken?.value}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("API request failed");
    }

    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}