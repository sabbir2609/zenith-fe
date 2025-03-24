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
    console.error("response", response);
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

// ...existing code...

import { revalidatePath } from "next/cache";

// Add this new function
export async function createRoomType(formData: FormData, accessToken: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/main/room-types/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );

    if (!res.ok) {
      const data = await res.json();
      return {
        success: false,
        error:
          data.detail ||
          (typeof data === "object"
            ? Object.values(data).flat()[0]
            : "Failed to add room type"),
      };
    }

    // Revalidate the room types page to refresh data
    revalidatePath("/dashboard/rooms/room-types");
    return { success: true };
  } catch (error) {
    console.error("Error adding room type:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
