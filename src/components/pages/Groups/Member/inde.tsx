"use client";
import { groups } from "@/lib/data/group";
import { notFound, useParams } from "next/navigation";
import { GroupHeader } from "../GroupHeader";
import { GroupTabs } from "../GroupTabs";
import { Sidebar } from "../Sidebar";
import { MembersList } from "../MembersList";

export default function Members() {
  const params = useParams();
  const groupId = params.id as string;

  const group = groups.find((g) => g.id === groupId);

  if (!group) {
    notFound();
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1">
        <GroupHeader group={group} />
        <GroupTabs
          groupId={group.id}
          activeTab="members"
        />

        <div className="mx-auto max-w-3xl px-4 py-6">
          <MembersList group={group} />
        </div>
      </main>
    </div>
  );
}
