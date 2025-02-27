import Tabs from "@/components/pages/community/support/Tabs";
import React from "react";

export default function SupportLayout({
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
