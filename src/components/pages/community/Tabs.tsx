"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Tabs = () => {
  const pathname = usePathname();
  const tabs = [
    { path: "/community/discussion", label: "Discussion" },
    { path: "/community/support", label: "Support" },
  ];

  return (
    <div className="flex space-x-4 border-b border-gray-300 pb-2">
      {tabs.map(({ path, label }) => {
        const isActive = pathname === path;
        return (
          <Link
            key={path}
            href={path}
            className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-300
              ${
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }
            `}
          >
            {label}
            {isActive && (
              <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-600 rounded-full"></span>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default Tabs;
