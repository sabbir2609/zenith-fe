"use client";

import { useRetrieveUserQuery } from '@/redux/features/authApiSlice'

export default function Page() {
    const { data: user, isError } = useRetrieveUserQuery()

    if (isError) {
        return <h1>Error fetching user</h1>
    }

    return (
        <section>
            <header>
                <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
            </header>
            <main>
                <p>
                    {user?.email}
                </p>
                <p>
                    {user?.first_name} {user?.last_name}
                </p>
            </main>
        </section>
    )
}