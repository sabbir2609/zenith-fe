"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LogoutPage() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/auth/login");
        }, 5000);

        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [router]);

    return (
        <Card className="w-full max-w-md mx-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Goodbye</CardTitle>
                <CardDescription className="text-center">
                    You have been logged out
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <p className="text-center">
                        You have been successfully logged out
                    </p>
                    <p className="text-center text-sm text-muted-foreground">
                        Redirecting to login page in {countdown} seconds...
                    </p>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Link href="/auth/login">
                    <Button className="w-full">Sign in again</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}