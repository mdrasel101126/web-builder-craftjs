import React from "react";
import { ChevronDown } from "lucide-react"; // Assuming you're using Lucide icons for the arrow
import { cn } from "@/lib/utils"; // Utility function for conditional class names

export type SidebarItemProps = {
  title: string;
  height?: string;
  icon: React.ElementType;
  visible?: boolean;
  onChange?: (bool: boolean) => void;
  children?: React.ReactNode;
};

export const SidebarItem: React.FC<SidebarItemProps> = ({
  visible,
  icon: Icon,
  title,
  children,
  height,
  onChange,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col",
        visible && height && height !== "full" ? `h-[${height}]` : "h-auto",
        visible && height && height === "full" ? "flex-1" : "flex-none",
      )}
    >
      <div
        onClick={() => {
          if (onChange) onChange(!visible);
        }}
        className={cn(
          "cursor-pointer bg-white border-b last:border-b-0 flex items-center px-2 h-[45px]",
          visible ? "shadow-sm" : "",
        )}
      >
        <div className="flex-1 flex items-center">
          <Icon className="w-4 h-4 mr-2" />
          <h2 className="text-xs uppercase">{title}</h2>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform",
            visible ? "rotate-180" : "rotate-0",
          )}
        />
      </div>
      {visible && <div className="w-full flex-1 overflow-auto">{children}</div>}
    </div>
  );
};
