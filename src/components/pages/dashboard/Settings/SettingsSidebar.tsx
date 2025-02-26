"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  Users,
  Package,
  Bell,
  Globe,
} from "lucide-react";

const navSections = [
  {
    title: "General Settings",
    items: [
      { name: "General Details", href: "/settings/general" },
      { name: "User Permissions", href: "/settings/permissions" },
      { name: "Billing", href: "/settings/billing" },
      { name: "Payments", href: "/settings/payments" },
      { name: "Shipping", href: "/settings/shipping" },
      { name: "Markets", href: "/settings/markets" },
      { name: "Sales Channels", href: "/settings/sales-channels" },
    ],
  },
  {
    title: "Personal Settings",
    items: [
      { name: "Plans", href: "/settings/plans" },
      { name: "Notification", href: "/settings/notification" },
      { name: "Domain", href: "/settings/domain" },
      { name: "Languages", href: "/settings/languages" },
    ],
  },
];

export default function SettingsSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className={cn(
            "p-1 rounded-full bg-gray-200 absolute mt-6 -ml-4 z-20-",
            {
              "text-blue-500": collapsed,
            },
          )}
        >
          {<ChevronRight size={20} />}
        </button>
      )}

      <aside
        className={cn(
          "h-screen border-r transition-all overflow-hidden ",
          collapsed ? "w-0" : "w-64",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className={cn("font-semibold text-lg", collapsed && "hidden")}>
            Settings
          </span>
          <button
            onClick={() => setCollapsed(true)}
            className={cn("p-1 rounded-full bg-gray-200", {
              "text-blue-500": collapsed,
            })}
          >
            {<ChevronLeft size={20} />}
          </button>
        </div>
        <nav className="p-4 space-y-6">
          {navSections.map((section) => (
            <div key={section.title}>
              <span
                className={cn(
                  "text-gray-500 text-sm font-semibold",
                  collapsed && "hidden",
                )}
              >
                {section.title}
              </span>
              <div className="mt-2 space-y-2">
                {section.items.map(({ name, href }) => (
                  <Link
                    key={href}
                    href={href}
                  >
                    <div
                      className={cn(
                        "flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors",
                        pathname === href
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-200",
                        collapsed && "justify-center",
                      )}
                    >
                      <span className={cn("text-sm", collapsed && "hidden")}>
                        {name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </div>
  );
}
