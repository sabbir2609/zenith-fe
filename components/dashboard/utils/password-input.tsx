"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";

interface PasswordInputProps {
  id: string;
  name: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

export function PasswordInput({
  id,
  name,
  label,
  value,
  onChange,
  error,
  required = true,
  className = "",
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className={`pr-10 ${error ? "border-red-500" : ""} ${className}`}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </Button>
      </div>
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
          <AlertCircle size={14} /> {error}
        </p>
      )}
    </div>
  );
}
