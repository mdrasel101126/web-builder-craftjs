"use client";

import { Button } from "@/components/ui/button";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Lock, Users } from "lucide-react";
import { Group } from "@/lib/data/group";

interface GroupHeaderProps {
  group: Group;
}

export function GroupHeader({ group }: GroupHeaderProps) {
  return (
    <div className="relative mb-6">
      <div className="h-[300px] w-full overflow-hidden rounded-b-lg">
        <img
          src={group.coverImage}
          alt={group.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mx-auto max-w-5xl px-4">
        <div className="relative -mt-16 flex flex-col items-center rounded-lg bg-background p-6 shadow-sm md:flex-row md:items-end md:justify-between">
          <div className="mb-4 flex flex-col items-center md:mb-0 md:flex-row md:items-end">
            <h1 className="mb-2 text-3xl font-bold md:mb-0 md:mr-4">
              {group.name}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                {group.privacy === "private" ? (
                  <Lock className="mr-1 h-4 w-4" />
                ) : (
                  <Users className="mr-1 h-4 w-4" />
                )}
                <span>
                  {group.privacy === "private"
                    ? "Private group"
                    : "Public group"}
                </span>
              </div>
              <div>
                <span>{group.memberCount} members</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <AvatarGroup
                users={group.members}
                max={5}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Joined
              </Button>
              <Button>+ Invite</Button>
              <Button variant="outline">Share</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
