import Tabs from "@/components/pages/community/Tabs";
import Link from "next/link";
import path from "path";
import React from "react";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen py-2">
      <Tabs />
      <div className="w-full">{children}</div>
    </div>
  );
}
