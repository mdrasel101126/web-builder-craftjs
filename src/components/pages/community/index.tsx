"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  MessageSquare,
  LifeBuoy,
  Plus,
  Search,
  Filter,
  Tag,
  MessageCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as z from "zod";

export const supportTicketSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum(["technical", "billing", "feature", "general"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  status: z.enum(["open", "in-progress", "resolved", "closed"]),
  attachments: z.array(z.string()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const communityPostSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  category: z.enum(["discussion", "question", "tutorial", "announcement"]),
  tags: z.array(z.string()),
  isPublic: z.boolean(),
  allowComments: z.boolean(),
});

export type SupportTicket = z.infer<typeof supportTicketSchema>;
export type CommunityPost = z.infer<typeof communityPostSchema>;

export function CommunitySupport() {
  const [activeTab, setActiveTab] = useState("support");
  const [searchQuery, setSearchQuery] = useState("");

  const tickets: SupportTicket[] = [
    {
      id: "1",
      title: "Unable to access dashboard",
      description:
        "I'm getting an error when trying to access the dashboard...",
      category: "technical",
      priority: "high",
      status: "open",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Add more sample tickets
  ];

  const posts: CommunityPost[] = [
    {
      id: "1",
      title: "Best practices for optimization",
      content: "Here are some tips for optimizing your workflow...",
      category: "tutorial",
      tags: ["optimization", "performance"],
      isPublic: true,
      allowComments: true,
    },
    // Add more sample posts
  ];

  return (
    <div className="mx-5 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Community & Support</h1>
          <p className="text-gray-500">
            Manage support tickets and community discussions
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger
            value="support"
            className="flex items-center gap-2"
          >
            <LifeBuoy className="w-4 h-4" />
            Support Tickets
          </TabsTrigger>
          <TabsTrigger
            value="community"
            className="flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Community Discussions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="support">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Support Tickets</CardTitle>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Ticket
                </Button>
              </div>
              <div className="flex gap-4 mt-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search tickets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tickets</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{ticket.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {ticket.description.substring(0, 100)}...
                        </p>
                      </div>
                      <Badge
                        variant={
                          ticket.status === "open"
                            ? "default"
                            : ticket.status === "in-progress"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {ticket.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Badge variant="outline">{ticket.category}</Badge>
                      <Badge
                        variant={
                          ticket.priority === "urgent"
                            ? "destructive"
                            : ticket.priority === "high"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {ticket.priority}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {format(ticket.createdAt, "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Community Discussions</CardTitle>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Discussion
                </Button>
              </div>
              <div className="flex gap-4 mt-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="discussion">Discussions</SelectItem>
                    <SelectItem value="question">Questions</SelectItem>
                    <SelectItem value="tutorial">Tutorials</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{post.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {post.content.substring(0, 100)}...
                        </p>
                      </div>
                      <Badge>{post.category}</Badge>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                        >
                          {tag}
                        </Badge>
                      ))}
                      <div className="flex items-center gap-1 text-sm text-gray-500 ml-auto">
                        <MessageCircle className="w-4 h-4" />
                        <span>12 comments</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
