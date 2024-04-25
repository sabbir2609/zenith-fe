"use server"

import { cookies } from "next/headers";

export default async function Post(endpoint: string, data: object) {
    const cookieStore = cookies();
    const token = cookieStore.get('access')?.value;

    if (!token) {
        throw new Error("You are not logged in");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    return response;
}
