import Link from "next/link";
import path from "path";
import React from "react";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = [
    {
      path: "/community/discussion",
      label: "Discussion",
    },
    {
      path: "/community/support",
      label: "Support",
    },
  ];
  return (
    <div className="min-h-screen py-2">
      <h1 className="text-3xl">Community</h1>
      <div>
        {tabs.map(({ path, label }) => (
          <Link
            key={path}
            href={path}
            className="px-3 py-2 rounded-md cursor-pointer transition-colors"
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
