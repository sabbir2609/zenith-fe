"use server"

import { cookies } from "next/headers";

export default async function Fetch({ endpoint }: { endpoint: string }) {
    'use server';
    const cookieStore = cookies()
    const token = cookieStore.get('access')?.value

    if (!token) {
        throw new Error("You are not logged in");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/${endpoint}`, {
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    return data;
}