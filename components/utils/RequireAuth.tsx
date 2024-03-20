'use client';

import React from "react"
import { redirect } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { LoadingState } from ".";

interface Props {
    children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
    const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);

    if (isLoading) {
        return (
            <LoadingState />
        );
    }

    if (!isAuthenticated) {
        toast.error('You must be logged in to view this page.', { toastId: 'authError' });
        redirect('/auth/login');
    }

    return <>{children}</>
}