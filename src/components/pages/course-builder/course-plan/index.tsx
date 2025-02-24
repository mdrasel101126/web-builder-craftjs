"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash } from "lucide-react";

export default function CoursePlan() {
  const [title, setTitle] = useState("Mastering React");
  const [description, setDescription] = useState(
    "A comprehensive course on React development, covering hooks, state management, and performance optimization.",
  );
  const [modules, setModules] = useState([
    { id: 1, name: "Introduction to React", lessons: [] },
    { id: 2, name: "State and Props", lessons: [] },
    { id: 3, name: "Hooks and Lifecycle", lessons: [] },
  ]);

  const addModule = () => {
    setModules([...modules, { id: modules.length + 1, name: "", lessons: [] }]);
  };

  const removeModule = (id: number) => {
    setModules(modules.filter((module) => module.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Course Plan</h1>
      <Input
        placeholder="Course Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Course Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="space-y-4">
        {modules.map((module, index) => (
          <Card key={module.id}>
            <CardContent className="p-4 flex justify-between items-center">
              <Input
                placeholder={`Module ${index + 1} Name`}
                value={module.name}
                onChange={(e) => {
                  const newModules = [...modules];
                  newModules[index].name = e.target.value;
                  setModules(newModules);
                }}
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeModule(module.id)}
              >
                <Trash size={16} />
              </Button>
            </CardContent>
          </Card>
        ))}
        <Button
          onClick={addModule}
          className="w-full flex items-center gap-2"
        >
          <Plus size={16} /> Add Module
        </Button>
      </div>
    </div>
  );
}
