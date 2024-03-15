'use client';

import React from "react"
import { redirect } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";

interface Props {
    children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
    const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);

    if (isLoading) {
        return (
            <div className="h-screen justify-center items-center text-center flex mx-4">
                <div className="flex flex-col gap-4 w-full">
                    <div className="skeleton h-28 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="font-bold text-4xl">
                        Loading...
                    </div>
                    <p>
                        If it&apos;s takes too long try reloading the page.
                    </p>
                    <div className="skeleton h-28 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        toast.error('You must be logged in to view this page.');
        redirect('/auth/login');
    }


    return <>{children}</>
}