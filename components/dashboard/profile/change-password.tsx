"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import Form from "next/form";
import { SubmitButton } from "../common/submit-button";
import { toast } from "sonner";
import { usePasswordValidation } from "@/hooks/usePasswordValidation";
import { PasswordInput } from "../utils/password-input";
import { PasswordStrength } from "../utils/password-strength";

interface ChangePasswordProps {
  accessToken: string;
}

export default function ChangePassword({ accessToken }: ChangePasswordProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState("");

  const {
    newPassword,
    confirmPassword,
    passwordStrength,
    errors,
    isValid,
    handleNewPasswordChange,
    handleConfirmPasswordChange,
    validatePasswords,
    resetPasswords,
    setErrors,
  } = usePasswordValidation();

  const resetForm = () => {
    resetPasswords();
    setOldPasswordError("");
  };

  const closeDialog = () => {
    resetForm();
    setIsOpen(false);
  };

  const handleSubmit = async (formData: FormData) => {
    if (!validatePasswords()) return;

    const currentPassword = formData.get("old-password") as string;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/users/set_password/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword,
            re_new_password: confirmPassword,
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json();

        // Handle the current_password error
        if (data.current_password) {
          setOldPasswordError(data.current_password[0]);
          return;
        }

        // Handle new_password errors
        if (data.new_password) {
          setErrors((prev) => ({
            ...prev,
            newPassword: data.new_password[0],
          }));
          return;
        }

        // Handle re_new_password errors
        if (data.re_new_password) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: data.re_new_password[0],
          }));
          return;
        }

        // Handle non-field errors
        if (data.non_field_errors) {
          toast.error(data.non_field_errors[0]);
          return;
        }

        throw new Error(data.detail || "Failed to change password");
      }

      toast.success("Password changed successfully");
      resetForm();
      closeDialog();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="flex items-center gap-2"
        size="sm"
      >
        <Lock size={16} />
        Change Password
      </Button>

      <Dialog open={isOpen} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Create a strong password that includes uppercase letters, numbers,
              and special characters.
            </DialogDescription>
          </DialogHeader>

          <Form action={handleSubmit} className="space-y-6 py-4">
            <PasswordInput
              id="old-password"
              name="old-password"
              label="Current Password"
              error={oldPasswordError}
            />

            <PasswordInput
              id="new-password"
              name="new-password"
              label="New Password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              error={errors.newPassword}
            />

            {newPassword && (
              <PasswordStrength
                password={newPassword}
                strength={passwordStrength}
              />
            )}

            <PasswordInput
              id="confirm-password"
              name="confirm-password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={errors.confirmPassword}
            />

            {confirmPassword && newPassword === confirmPassword && (
              <p className="text-sm text-green-500 flex items-center gap-1 mt-1">
                ✓ Passwords match
              </p>
            )}

            <DialogFooter className="sm:justify-between">
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <SubmitButton label="Change Password" disabled={!isValid} />
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
