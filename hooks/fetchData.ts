"use client";

import useSWR from "swr";

interface FetchResponse<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  mutate: () => void;
}

const fetcher = async (url: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export function useFetchData<T>(endpoint: string): FetchResponse<T> {
  const { data, error, isLoading, mutate } = useSWR<T>(endpoint, fetcher);

  return {
    data: data || null,
    error: error || null,
    isLoading,
    mutate,
  };
}
