"use client";

import { serverLogout } from "@/lib/auth-actions";
import { User } from "@/lib/types";
import { useRouter } from "next/navigation";
import useSWR from "swr";

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
      await serverLogout(); // Call server logout first
      await mutate(undefined, { revalidate: false }); // Clear cache without revalidation
      router.push("/auth/login");
      router.refresh(); // Force router refresh
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
