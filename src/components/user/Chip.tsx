// components/ui/chip.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface ChipProps {
  label: string;
  color?: "primary" | "secondary";
  size?: "sm" | "md";
}

export const Chip: React.FC<ChipProps> = ({
  label,
  color = "primary",
  size = "sm",
}) => {
  const colorClasses =
    color === "primary"
      ? "bg-blue-500 text-white"
      : "bg-gray-200 text-gray-800";
  const sizeClasses = size === "sm" ? "text-xs py-1 px-2" : "text-sm py-2 px-4";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full",
        colorClasses,
        sizeClasses,
      )}
    >
      {label}
    </span>
  );
};
