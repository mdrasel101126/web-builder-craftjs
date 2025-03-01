"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Group as Groups,
  Search,
  Settings,
  Compass,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { joinedGroups } from "@/lib/data/group";

export function Sidebar() {
  return (
    <div className="h-screen w-[320px] border-r bg-card">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">Groups</h1>
        <Button
          variant="ghost"
          size="icon"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      <div className="px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search groups"
            className="pl-8"
          />
        </div>
      </div>

      <nav className="space-y-1 px-2">
        <NavItem
          href="/"
          icon={<Inbox className="mr-3 h-5 w-5" />}
          label="Your feed"
        />
        <NavItem
          href="/discover"
          icon={<Compass className="mr-3 h-5 w-5" />}
          label="Discover"
        />
        <NavItem
          href="/groups"
          icon={<Groups className="mr-3 h-5 w-5" />}
          label="Your groups"
        />
      </nav>

      <div className="mt-4 px-4">
        <Button
          className="w-full justify-start"
          variant="outline"
        >
          <span className="mr-2">+</span> Create new group
        </Button>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between px-4 py-2">
          <h2 className="text-lg font-semibold">Groups you've joined</h2>
          <Button
            variant="link"
            size="sm"
          >
            See all
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-1 p-2">
            {joinedGroups.map((group) => (
              <Link
                key={group.id}
                href={`/groups/${group.id}`}
                className="flex items-center gap-3 rounded-md p-2 hover:bg-accent"
              >
                <Avatar>
                  {group.coverImage ? (
                    <AvatarImage
                      src={group.coverImage}
                      alt={group.name}
                    />
                  ) : (
                    <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate font-medium">{group.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Last active {formatLastActive(group.lastActive)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
        active && "bg-accent",
      )}
    >
      {icon}
      {label}
    </Link>
  );
}

function formatLastActive(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60),
  );

  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
      return "1 day ago";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      const diffInWeeks = Math.floor(diffInDays / 7);
      if (diffInWeeks === 1) {
        return "1 week ago";
      } else {
        return `${diffInWeeks} weeks ago`;
      }
    }
  }
}
