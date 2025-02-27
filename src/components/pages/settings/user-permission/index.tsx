"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as z from "zod";

export const userPermissionSchema = z.object({
  notifyUpdates: z.boolean(),
  weeklyDigest: z.boolean(),
  collaboratorAccess: z.enum(["Admin Only", "All Members", "Read Only"]),
});

export const teamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  dateJoined: z.date(),
  lastActive: z.date(),
  role: z.enum(["Owner", "Admin", "Read-Only"]),
});

export type UserPermissionFormData = z.infer<typeof userPermissionSchema>;
export type TeamMember = z.infer<typeof teamMemberSchema>;

export function UserPermission() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Alana Workasno",
      email: "alanaworkasno@gmail.com",
      dateJoined: new Date("2022-06-10"),
      lastActive: new Date("2022-07-20"),
      role: "Owner",
    },
    {
      id: "2",
      name: "Michelle Oyvia",
      email: "michelle.oyvia@gmail.com",
      dateJoined: new Date("2022-06-22"),
      lastActive: new Date("2022-07-20"),
      role: "Admin",
    },
    // Add more members as needed
  ]);

  const form = useForm<UserPermissionFormData>({
    resolver: zodResolver(userPermissionSchema),
    defaultValues: {
      notifyUpdates: true,
      weeklyDigest: false,
      collaboratorAccess: "Admin Only",
    },
  });

  const onSubmit = (data: UserPermissionFormData) => {
    console.log(data);
    // Handle form submission
  };

  const handleDeleteMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id));
  };

  return (
    <div className="mx-5 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">User Permission</h1>
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <Form {...form}>
          <form className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-lg font-medium">General Permission</h2>

              <FormField
                control={form.control}
                name="notifyUpdates"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <div>
                      <FormLabel>Notify on updates and activity</FormLabel>
                      <FormDescription>
                        You'll be notified when anyone shares a report or
                        invites you to a project
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weeklyDigest"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <div>
                      <FormLabel>Send weekly digest</FormLabel>
                      <FormDescription>
                        A weekly update on changes in teams, shipment and more
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="collaboratorAccess"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <div>
                      <FormLabel>Collaborators</FormLabel>
                      <FormDescription>
                        These give the designers, developers, and marketers
                        access to your account. They don't count toward your
                        seat limit.
                      </FormDescription>
                    </div>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Admin Only">Admin Only</SelectItem>
                        <SelectItem value="All Members">All Members</SelectItem>
                        <SelectItem value="Read Only">Read Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Team Members</h2>
                <Button variant="outline">Add Members</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date joined</TableHead>
                    <TableHead>Last active</TableHead>
                    <TableHead>Team Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage
                              src={`https://avatar.vercel.sh/${member.name}`}
                            />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-gray-500">
                              {member.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {format(member.dateJoined, "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell>
                        {format(member.lastActive, "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleDeleteMember(member.id)}
                        >
                          Delete
                        </Button>
                        <Button variant="ghost">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
