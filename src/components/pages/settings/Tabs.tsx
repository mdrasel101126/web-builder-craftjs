"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "General Details", href: "/settings/general-details" },
  { name: "User Permissions", href: "/settings/user-permission" },
  { name: "Billing", href: "/settings/billing" },
  { name: "Payments", href: "/settings/payments" },
  { name: "Shipping", href: "/settings/shipping" },
  { name: "Markets", href: "/settings/markets" },
  { name: "Sales Channels", href: "/settings/sales-channels" },
  { name: "Plans", href: "/settings/plans" },
  { name: "Notification", href: "/settings/notification" },
  { name: "Domain", href: "/settings/domain" },
  { name: "Languages", href: "/settings/languages" },
];

export default function Tabs() {
  const pathname = usePathname();

  return (
    <div>
      <div className="p-5">
        <span className={cn("font-semibold text-2xl")}>Settings</span>
      </div>
      <nav className="p-4 space-y-6">
        <div className="mt-2 flex flex-wrap gap-4">
          {tabs.map(({ name, href }) => (
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
                )}
              >
                <span className={cn("text-sm")}>{name}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
