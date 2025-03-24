//Password Strength Indicator Component

"use client";

import { Progress } from "@/components/ui/progress";
import { Check, X } from "lucide-react";

interface PasswordStrengthProps {
  password: string;
  strength: number;
}

export function PasswordStrength({
  password,
  strength,
}: PasswordStrengthProps) {
  const getStrengthLabel = () => {
    if (strength <= 25) return "Weak";
    if (strength <= 50) return "Fair";
    if (strength <= 75) return "Good";
    return "Strong";
  };

  const getStrengthColor = () => {
    if (strength <= 25) return "bg-red-500";
    if (strength <= 50) return "bg-yellow-500";
    if (strength <= 75) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-2 mt-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Password strength: {getStrengthLabel()}
        </span>
        <span
          className={`text-xs ${
            strength === 100 ? "text-green-500" : "text-gray-500"
          }`}
        >
          {strength}%
        </span>
      </div>
      <Progress value={strength} className={getStrengthColor()} />

      <div className="grid grid-cols-2 gap-2 pt-2">
        <div className="flex items-center text-xs gap-1">
          {password.length >= 8 ? (
            <Check size={12} className="text-green-500" />
          ) : (
            <X size={12} className="text-red-500" />
          )}
          <span>8+ characters</span>
        </div>
        <div className="flex items-center text-xs gap-1">
          {/[A-Z]/.test(password) ? (
            <Check size={12} className="text-green-500" />
          ) : (
            <X size={12} className="text-red-500" />
          )}
          <span>Uppercase letter</span>
        </div>
        <div className="flex items-center text-xs gap-1">
          {/[0-9]/.test(password) ? (
            <Check size={12} className="text-green-500" />
          ) : (
            <X size={12} className="text-red-500" />
          )}
          <span>Number</span>
        </div>
        <div className="flex items-center text-xs gap-1">
          {/[^A-Za-z0-9]/.test(password) ? (
            <Check size={12} className="text-green-500" />
          ) : (
            <X size={12} className="text-red-500" />
          )}
          <span>Special character</span>
        </div>
      </div>
    </div>
  );
}
