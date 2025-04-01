"use client";

import { getAccessToken, serverLogout } from "@/lib/auth-actions";
import { User } from "@/lib/types";
import { useRouter } from "next/navigation";
import useSWR, { SWRConfiguration } from "swr";
import { toast } from "sonner";

const fetcher = async (url: string) => {
  const accessToken = await getAccessToken();
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  return res.json();
};

export function useAuth(swrOptions?: SWRConfiguration) {
  const router = useRouter();
  const {
    data: user,
    error,
    isLoading: loading,
    mutate,
  } = useSWR<User>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/users/me/`,
    fetcher,
    {
      // Default SWR options
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 5000,
      // Override with any passed options
      ...swrOptions,
    }
  );

  const handleLogout = async () => {
    try {
      await serverLogout(); // Call server logout first
      await mutate(undefined, { revalidate: false }); // Clear cache without revalidation
      router.push("/auth/login");
      router.refresh(); // Force router refresh
      toast("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return {
    user,
    isAuthenticated: Boolean(user),
    loading,
    error,
    logout: handleLogout,
    mutate,
  };
}
