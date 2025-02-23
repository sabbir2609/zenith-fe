"use client";

import { useRouter } from "next/navigation";
import useSWR from "swr";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  avatar: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }

  return res.json();
};

export function useAuth() {
  const router = useRouter();

  const {
    data: userdata,
    error,
    isLoading,
    mutate,
  } = useSWR<User>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/users/me/`,
    fetcher
  );

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout/`, {
        method: "POST",
        credentials: "include",
      });
      await mutate(undefined); // Clear the cache
      router.push("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return {
    userdata,
    isAuthenticated: Boolean(userdata),
    loading: isLoading,
    error,
    logout: handleLogout,
    mutate, // Expose mutate for manual cache updates
  };
}
