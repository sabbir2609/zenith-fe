"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, AlertCircle, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import Form from "next/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "../common/submit-button";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface ChangePasswordProps {
  accessToken: string;
}

export default function ChangePassword({ accessToken }: ChangePasswordProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));

    // Clear specific error if user is fixing it
    if (errors.newPassword) {
      setErrors((prev) => ({ ...prev, newPassword: "" }));
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // Clear specific error if user is fixing it
    if (errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const getStrengthLabel = () => {
    if (passwordStrength <= 25) return "Weak";
    if (passwordStrength <= 50) return "Fair";
    if (passwordStrength <= 75) return "Good";
    return "Strong";
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500";
    if (passwordStrength <= 50) return "bg-yellow-500";
    if (passwordStrength <= 75) return "bg-blue-500";
    return "bg-green-500";
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!/[A-Z]/.test(newPassword)) {
      newErrors.newPassword =
        "Password must include at least one uppercase letter";
    }

    if (!/[0-9]/.test(newPassword)) {
      newErrors.newPassword = "Password must include at least one number";
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setNewPassword("");
    setConfirmPassword("");
    setPasswordStrength(0);
    setErrors({});
    setShowOldPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const closeDialog = () => {
    resetForm();
    setIsOpen(false);
  };

  const handleSubmit = async (formData: FormData) => {
    if (!validateForm()) return;

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
          setErrors((prev) => ({
            ...prev,
            oldPassword: data.current_password[0],
          }));
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
            <div className="space-y-2">
              <Label htmlFor="old-password" className="text-sm font-medium">
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="old-password"
                  type={showOldPassword ? "text" : "password"}
                  name="old-password"
                  required
                  className={`pr-10 ${
                    errors.oldPassword ? "border-red-500" : ""
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
              {errors.oldPassword && (
                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle size={14} /> {errors.oldPassword}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-sm font-medium">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  name="new-password"
                  required
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  className={`pr-10 ${
                    errors.newPassword ? "border-red-500" : ""
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle size={14} /> {errors.newPassword}
                </p>
              )}

              {newPassword && (
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Password strength: {getStrengthLabel()}
                    </span>
                    <span
                      className={`text-xs ${
                        passwordStrength === 100
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    >
                      {passwordStrength}%
                    </span>
                  </div>
                  <Progress
                    value={passwordStrength}
                    className={getStrengthColor()}
                  />

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="flex items-center text-xs gap-1">
                      {newPassword.length >= 8 ? (
                        <Check size={12} className="text-green-500" />
                      ) : (
                        <X size={12} className="text-red-500" />
                      )}
                      <span>8+ characters</span>
                    </div>
                    <div className="flex items-center text-xs gap-1">
                      {/[A-Z]/.test(newPassword) ? (
                        <Check size={12} className="text-green-500" />
                      ) : (
                        <X size={12} className="text-red-500" />
                      )}
                      <span>Uppercase letter</span>
                    </div>
                    <div className="flex items-center text-xs gap-1">
                      {/[0-9]/.test(newPassword) ? (
                        <Check size={12} className="text-green-500" />
                      ) : (
                        <X size={12} className="text-red-500" />
                      )}
                      <span>Number</span>
                    </div>
                    <div className="flex items-center text-xs gap-1">
                      {/[^A-Za-z0-9]/.test(newPassword) ? (
                        <Check size={12} className="text-green-500" />
                      ) : (
                        <X size={12} className="text-red-500" />
                      )}
                      <span>Special character</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm-password"
                  required
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={`pr-10 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle size={14} /> {errors.confirmPassword}
                </p>
              )}
              {confirmPassword && newPassword === confirmPassword && (
                <p className="text-sm text-green-500 flex items-center gap-1 mt-1">
                  <Check size={14} /> Passwords match
                </p>
              )}
            </div>

            <DialogFooter className="sm:justify-between">
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <SubmitButton
                label="Change Password"
                disabled={
                  passwordStrength < 75 || newPassword !== confirmPassword
                }
              />
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
