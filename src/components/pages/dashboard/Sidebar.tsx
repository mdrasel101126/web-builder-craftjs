"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Home,
  Settings,
  Users,
  Package,
  Bell,
  Globe,
  Mail,
  Phone,
  Star,
  User,
} from "lucide-react";
import Image from "next/image";

const navItems = [
  { href: "/dashboard", icon: Home },
  { href: "/users", icon: Users },
  { href: "/billing", icon: Package },
  { href: "/payments", icon: Package },
  { href: "/markets", icon: Globe },
  { href: "/notifications", icon: Bell },
  { href: "/messages", icon: Mail },
  { href: "/contact", icon: Phone },
  { href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen  w-16 bg-gray-900 p-4 flex flex-col items-center space-y-6 text-white">
      <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
        <span className="text-lg font-bold">D</span>
      </div>
      <nav className="flex flex-col space-y-4">
        {navItems.map(({ href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
          >
            <div
              className={cn(
                "flex items-center justify-center p-2 rounded-lg cursor-pointer transition-colors",
                pathname === href ? "bg-blue-500" : "hover:bg-gray-700",
              )}
            >
              <Icon className="w-6 h-6" />
            </div>
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <User className="w-10 h-10 rounded-full" />
      </div>
    </aside>
  );
}
