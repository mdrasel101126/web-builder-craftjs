"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { tabs } from "@/lib/data/group";

interface GroupTabsProps {
  groupId: string;
  activeTab?: string;
}

export function GroupTabs({
  groupId,
  activeTab = "discussion",
}: GroupTabsProps) {
  const [active, setActive] = useState(activeTab);

  return (
    <div className="border-b">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={`/groups/${groupId}/${
                tab.id !== "discussion" ? tab.id : ""
              }`}
              onClick={() => setActive(tab.id)}
              className={cn(
                "flex-shrink-0 border-b-2 px-4 py-2 text-sm font-medium",
                active === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground",
              )}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
