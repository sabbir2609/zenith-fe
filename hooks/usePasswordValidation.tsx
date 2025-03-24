"use client";

import { useState, useEffect } from "react";

export interface PasswordValidationResult {
  newPassword: string;
  confirmPassword: string;
  passwordStrength: number;
  errors: Record<string, string>;
  isValid: boolean;
  handleNewPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validatePasswords: () => boolean;
  resetPasswords: () => void;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export function usePasswordValidation(): PasswordValidationResult {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);

  // Calculate password strength
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  // Handle new password change
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));

    // Clear specific error if user is fixing it
    if (errors.newPassword) {
      setErrors((prev) => ({ ...prev, newPassword: "" }));
    }
  };

  // Handle confirm password change
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

  // Validate password
  const validatePasswords = () => {
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

  // Reset passwords
  const resetPasswords = () => {
    setNewPassword("");
    setConfirmPassword("");
    setPasswordStrength(0);
    setErrors({});
  };

  // Update isValid state whenever relevant state changes
  useEffect(() => {
    setIsValid(
      passwordStrength >= 75 &&
        newPassword === confirmPassword &&
        newPassword.length > 0
    );
  }, [newPassword, confirmPassword, passwordStrength]);

  return {
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
  };
}
