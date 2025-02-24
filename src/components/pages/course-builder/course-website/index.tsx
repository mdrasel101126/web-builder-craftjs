"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash } from "lucide-react";

interface Page {
  id: number;
  name: string;
  content: string;
}

export default function CourseWebsiteBuilder() {
  const [pages, setPages] = useState<Page[]>([
    { id: 1, name: "Home", content: "Welcome to our course!" },
    { id: 2, name: "About", content: "Learn more about this course." },
  ]);
  const [newPage, setNewPage] = useState<{ name: string; content: string }>({
    name: "",
    content: "",
  });

  const addPage = () => {
    if (!newPage.name || !newPage.content) return;
    setPages([
      ...pages,
      { id: pages.length + 1, name: newPage.name, content: newPage.content },
    ]);
    setNewPage({ name: "", content: "" });
  };

  const removePage = (id: number) => {
    setPages(pages.filter((page) => page.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Course Website Builder</h1>
      <Input
        placeholder="Page Name"
        value={newPage.name}
        onChange={(e) => setNewPage({ ...newPage, name: e.target.value })}
      />
      <Input
        placeholder="Page Content"
        value={newPage.content}
        onChange={(e) => setNewPage({ ...newPage, content: e.target.value })}
      />
      <Button
        onClick={addPage}
        className="w-full flex items-center gap-2"
      >
        <Plus size={16} /> Add Page
      </Button>

      <div className="space-y-4">
        {pages.map((page) => (
          <Card key={page.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-lg">{page.name}</h2>
                  <p className="text-gray-600">{page.content}</p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removePage(page.id)}
                >
                  <Trash size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
