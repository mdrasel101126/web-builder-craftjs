"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Group } from "@/lib/data/group";
import { Search, UserPlus } from "lucide-react";

interface MembersListProps {
  group: Group;
}

export function MembersList({ group }: MembersListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Members</CardTitle>
        <CardDescription>
          {group.memberCount} members in this group
        </CardDescription>

        <div className="mt-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search members"
              className="pl-8"
            />
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {group.members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={member.image}
                    alt={member.name}
                  />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">Member</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
              >
                View Profile
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
