"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
export default function Activate({
  params,
}: {
  params: Promise<{ uid: string; token: string }>;
}) {
  const { uid, token } = use(params);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function activateAccount() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/users/activation/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              uid: uid,
              token: token,
            }),
          }
        );

        if (response.ok) {
          setSuccess(true);
          // Redirect after showing success message briefly
          setTimeout(() => {
            router.push("/auth/login?activated=true");
          }, 2000);
        } else {
          const data = await response.json();
          setError(
            data.detail ||
              "Failed to activate account. The link may be invalid or expired."
          );
        }
      } catch (err) {
        console.error(err);
        setError("An unexpected error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    activateAccount();
  }, [uid, token, router]);

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Account Activation</CardTitle>
          <CardDescription>
            {loading
              ? "Activating your account..."
              : success
              ? "Account activated!"
              : "Activation failed"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-4 text-center text-muted-foreground">
                Please wait while we activate your account...
              </p>
            </div>
          ) : success ? (
            <div className="py-4 text-center text-green-600">
              <p>Your account has been successfully activated!</p>
              <p className="mt-2 text-muted-foreground">
                Redirecting to login page...
              </p>
            </div>
          ) : (
            <div className="py-4 text-center text-red-600">
              <p>{error}</p>
            </div>
          )}
        </CardContent>

        {!loading && !success && (
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => router.push("/auth/login")}
            >
              Go to Login
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
