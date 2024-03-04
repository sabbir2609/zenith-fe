"use client";

import { useRetrieveUserQuery } from '@/redux/features/authApiSlice'
import Loading from '@/components/dashboard/common/Loading'

export default function Page() {
    const { data: user, isLoading, isError } = useRetrieveUserQuery()

    if (isLoading) {
        return <Loading />
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