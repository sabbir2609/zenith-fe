"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Form from "next/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { usePasswordValidation } from "@/hooks/usePasswordValidation";
import { SubmitButton } from "@/components/dashboard/common/submit-button";
import { toast } from "sonner";
import { PasswordInput } from "@/components/dashboard/utils/password-input";
import { PasswordStrength } from "@/components/dashboard/utils/password-strength";

export default function PasswordResetPage() {
    const router = useRouter();
    const params = useParams();

    // Use password validation hook
    const {
        newPassword,
        confirmPassword,
        passwordStrength,
        errors: passwordErrors,
        isValid: passwordIsValid,
        handleNewPasswordChange,
        handleConfirmPasswordChange,
        validatePasswords,
        setErrors: setPasswordErrors,
    } = usePasswordValidation();

    const handlePasswordReset = async (formData: FormData) => {
        // First validate passwords client-side
        if (!validatePasswords()) {
            return;
        }

        // Create the submission object
        const payload = {
            uid: params.uid,
            token: params.token,
            new_password: newPassword,
            re_new_password: confirmPassword,
        };

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/users/reset_password_confirm/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        if (response.ok) {
            // Success - redirect to confirmation page
            toast.success(
                "Password reset successful! You can now log in with your new password."
            );
            router.push("/auth/login");
            return;
        } else if (response.status === 400) {
            const errorData = await response.json();
            if (errorData.token) {
                toast.error("This link has expired. Please request a new password reset.");
            } else {
                toast.error("Failed to reset password. Please check the errors and try again.");
            }
        } else {
            toast.error("Failed to reset password. Please check the errors and try again.");
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <CardHeader>
                <CardTitle className="text-2xl">
                    Password Reset
                </CardTitle>
                <CardDescription>
                    Enter your new password below.
                </CardDescription>
            </CardHeader>

            <Form action={handlePasswordReset}>
                <CardContent className="space-y-4">
                    {/* Password Input with Strength Indicator */}
                    <PasswordInput
                        id="password"
                        name="password"
                        label="Password"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        error={passwordErrors.newPassword}
                        required={true}
                        autocomplete="new-password"
                    />

                    {newPassword && (
                        <PasswordStrength
                            password={newPassword}
                            strength={passwordStrength}
                        />
                    )}
                    {/* Confirm Password Input */}
                    <PasswordInput
                        id="confirm-password"
                        name="confirm-password"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        error={passwordErrors.confirmPassword}
                        required={true}
                        autocomplete="confirm-new-password"
                    />
                    {confirmPassword && newPassword === confirmPassword && (
                        <p className="text-sm text-green-500 flex items-center gap-1 mt-1">
                            ✓ Passwords match
                        </p>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <SubmitButton
                        label="Reset Password"
                        disabled={!passwordIsValid}
                        className="w-full"
                    />
                </CardFooter>
            </Form>
        </Card>
    );
}
