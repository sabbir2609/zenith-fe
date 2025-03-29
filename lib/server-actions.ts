// lib/server-actions.ts
"use server";

import { revalidatePath } from "next/cache";
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
  console.log("Data:", data);
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
  return response;
}

export async function deleteData(endpoint: string) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access");
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

  if (response.status === 204) {
    // revalidate the endpoint path without the item id dynamically
    // For example, if the endpoint is /dashboard/floors/1, it will revalidate to /dashboard/floors 
    const path = endpoint.split("/").slice(0, -1).join("/");
    revalidatePath(`/${path}`);
    return { success: true };
  } else {
    return { success: false };
  }
}

export async function patchData<T>(endpoint: string, data: T) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access");
  console.log("Data:", data);

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

    console.log("Response:", response);

    if (!response.ok) {
      throw new Error("API request failed");
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}


// app/dashboard/floors/components/floor-create.tsx
export async function createFloor(formData: FormData) {
  "use server";

  const floorData = {
    level: Number(formData.get("level")),
    is_elevator_accessible: formData.get("is_elevator_accessible") === "true",
    description: formData.get("description") as string,
  };

  try {
    const response = await postData("main/floors/", floorData);

    if (response && response.status === 400) {
      return { success: false, message: "Floor already exists" };
    }

    if (response && response.status === 201) {
      revalidatePath("/dashboard/floors");
      return { success: true, message: "Floor created successfully" };
    } else {
      return { success: false, message: "Failed to create floor" };
    }

  } catch (error) {
    return { success: false, message: `An error occurred ${error}` };
  }
}

// app/dashboard/floors/components/floor-edit.tsx
export async function updateFloor(formData: FormData, level: number) {
  "use server";

  const updatedFloor = {
    level: Number(formData.get("level")),
    is_elevator_accessible: formData.get("is_elevator_accessible") === "true",
    description: formData.get("description") as string,
  };

  const response = await patchData(`main/floors/${level}/`, updatedFloor);

  try {
    if (response && response.ok) {
      revalidatePath(`/dashboard/floors/`);
      return { success: true, message: "Floor updated successfully" };
    } else {
      return { success: false, message: "Failed to update floor" };
    }
  } catch (error) {
    return { success: false, message: `An error occurred ${error}` };
  }
}