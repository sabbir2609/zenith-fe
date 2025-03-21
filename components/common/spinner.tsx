import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  className?: string;
}

const Spinner = ({
  size = "md",
  color = "#4F46E5",
  className = "",
}: SpinnerProps) => {
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const spinnerSize = sizeMap[size];

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${spinnerSize} border-4 border-t-transparent rounded-full animate-spin`}
        style={{ borderColor: `transparent ${color} ${color} ${color}` }}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
