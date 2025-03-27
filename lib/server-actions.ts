// lib/server-actions.ts
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

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

/**
 * Generic function to submit form data to any endpoint with revalidation
 * @param endpoint API endpoint to submit data to
 * @param formData Form data to submit
 * @param revalidatePaths Array of paths to revalidate after successful submission
 * @param entityName Name of the entity for error messages (e.g., "room type")
 */
export async function submitFormDataAndRevalidate(
  endpoint: string,
  formData: FormData,
  revalidatePaths: string[],
  entityName: string = "item"
) {
  try {
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get("access");
    console.log("Form data", formData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken?.value}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json();
      return {
        success: false,
        error:
          data.detail ||
          (typeof data === "object"
            ? Object.values(data).flat()[0]
            : `Failed to add ${entityName}`),
      };
    }

    // Revalidate all specified paths
    revalidatePaths.forEach((path) => revalidatePath(path));

    // Return the created data if available
    const responseData = await res.json().catch(() => null);
    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    console.error(`Error adding ${entityName}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function createFloor(formData: FormData) {
  return submitFormDataAndRevalidate(
    "main/floors/",
    formData,
    ["/dashboard/floors"],
    "floor"
  );
}

export async function createRoomType(formData: FormData) {
  return submitFormDataAndRevalidate(
    "main/room-types/",
    formData,
    ["/dashboard/rooms/room-types"],
    "room type"
  );
}