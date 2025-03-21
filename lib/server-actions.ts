// lib/server-actions.ts
"use server";

import { cookies } from "next/headers";

export async function fetchData(endpoint: string) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
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

export async function postData<T>(endpoint: string, data: T) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken?.value}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("API request failed");
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function deleteData(endpoint: string) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
      {
        method: "DELETE",
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

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function patchData<T>(endpoint: string, data: T) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken?.value}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("API request failed");
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
