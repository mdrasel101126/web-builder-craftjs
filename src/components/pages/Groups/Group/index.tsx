"use client";
import { CreatePost } from "@/components/pages/Groups/CreatePost";
import { GroupHeader } from "@/components/pages/Groups/GroupHeader";
import { GroupTabs } from "@/components/pages/Groups/GroupTabs";
import { PostCard } from "@/components/pages/Groups/PostCard";
import { Sidebar } from "@/components/pages/Groups/Sidebar";
import { groups, posts } from "@/lib/data/group";
import { notFound, useParams } from "next/navigation";

export default function Group() {
  const params = useParams();
  const groupId = params.id as string;

  const group = groups.find((g) => g.id === groupId);

  if (!group) {
    notFound();
  }

  const groupPosts = posts.filter((post) => post.group.id === group.id);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1">
        <GroupHeader group={group} />
        <GroupTabs groupId={group.id} />

        <div className="mx-auto max-w-3xl px-4 py-6">
          <CreatePost />

          {groupPosts.length > 0 ? (
            groupPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
              />
            ))
          ) : (
            <div className="rounded-lg bg-card p-6 text-center">
              <h3 className="text-lg font-medium">No posts yet</h3>
              <p className="text-muted-foreground">
                Be the first to post in this group!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
