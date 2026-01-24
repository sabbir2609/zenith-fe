"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Form from "next/form";
import { Input } from "@/components/ui/input";
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

export default function RegisterPage() {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    // Clear field-specific errors when user corrects them
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleRegister = async (formData: FormData) => {
    // First validate passwords client-side
    if (!validatePasswords()) {
      return;
    }

    // Create the submission object
    const payload = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      email: formData.get("email") as string,
      password: newPassword,
      re_password: confirmPassword,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/users/`,
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
          "Registration successful! Please check your email to activate your account."
        );
        router.push("/auth/register/confirmation");
        return;
      }

      // Handle error responses
      const data = await response.json();

      // Process field-specific errors
      const newFieldErrors: Record<string, string> = {};
      let hasFieldErrors = false;

      if (data.email) {
        newFieldErrors.email = data.email[0];
        hasFieldErrors = true;
      }

      if (data.first_name) {
        newFieldErrors.first_name = data.first_name[0];
        hasFieldErrors = true;
      }

      if (data.last_name) {
        newFieldErrors.last_name = data.last_name[0];
        hasFieldErrors = true;
      }

      if (data.password) {
        setPasswordErrors((prev) => ({
          ...prev,
          newPassword: data.password[0],
        }));
        hasFieldErrors = true;
      }

      if (data.re_password) {
        setPasswordErrors((prev) => ({
          ...prev,
          confirmPassword: data.re_password[0],
        }));
        hasFieldErrors = true;
      }

      if (hasFieldErrors) {
        setFieldErrors(newFieldErrors);
      } else if (data.non_field_errors) {
        toast.error(data.non_field_errors[0]);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Network error. Please check your connection and try again.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader>
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>
          Enter your information to create a new account
        </CardDescription>
      </CardHeader>

      <Form action={handleRegister}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="first_name" className="text-sm font-medium">
                First Name
              </label>
              <Input
                id="first_name"
                name="first_name"
                onChange={handleInputChange}
                className={fieldErrors.first_name ? "border-red-500" : ""}
                required
              />
              {fieldErrors.first_name && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldErrors.first_name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="last_name" className="text-sm font-medium">
                Last Name
              </label>
              <Input
                id="last_name"
                name="last_name"
                onChange={handleInputChange}
                className={fieldErrors.last_name ? "border-red-500" : ""}
                required
              />
              {fieldErrors.last_name && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldErrors.last_name}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={handleInputChange}
              className={fieldErrors.email ? "border-red-500" : ""}
              required
            />
            {fieldErrors.email && (
              <p className="text-sm text-red-500 mt-1">{fieldErrors.email}</p>
            )}
          </div>

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
            label="Register"
            disabled={!passwordIsValid}
            className="w-full"
          />

          <div className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Form>
    </Card>
  );
}
