"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";

export default function CreateCourseContent() {
  const [modules, setModules] = useState<
    {
      id: number;
      name: string;
      lessons: { title: string; content: string; type: string }[];
    }[]
  >([
    { id: 1, name: "Introduction to React", lessons: [] },
    { id: 2, name: "State and Props", lessons: [] },
  ]);
  const [selectedModule, setSelectedModule] = useState(modules[0]?.id || "");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [lessonType, setLessonType] = useState("video");

  const addLesson = () => {
    if (!lessonTitle || !selectedModule) return;
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === selectedModule
          ? {
              ...module,
              lessons: [
                ...module.lessons,
                {
                  title: lessonTitle,
                  content: lessonContent,
                  type: lessonType,
                },
              ],
            }
          : module,
      ),
    );
    setLessonTitle("");
    setLessonContent("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Create Course Content</h1>
      <Select onValueChange={(value) => setSelectedModule(Number(value))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a Module" />
        </SelectTrigger>
        <SelectContent>
          {modules.map((module) => (
            <SelectItem
              key={module.id}
              value={module.id.toString()}
            >
              {module.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        placeholder="Lesson Title"
        value={lessonTitle}
        onChange={(e) => setLessonTitle(e.target.value)}
      />
      <Textarea
        placeholder="Lesson Content"
        value={lessonContent}
        onChange={(e) => setLessonContent(e.target.value)}
      />

      <Select onValueChange={(value) => setLessonType(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Lesson Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="video">Video</SelectItem>
          <SelectItem value="article">Article</SelectItem>
          <SelectItem value="quiz">Quiz</SelectItem>
        </SelectContent>
      </Select>

      <Button
        onClick={addLesson}
        className="w-full flex items-center gap-2"
      >
        <Plus size={16} /> Add Lesson
      </Button>

      <div className="space-y-4">
        {modules.map((module) => (
          <Card key={module.id}>
            <CardContent className="p-4">
              <h2 className="font-semibold text-lg">{module.name}</h2>
              {module.lessons.map((lesson, index) => (
                <div
                  key={index}
                  className="border-t mt-2 pt-2"
                >
                  <p className="font-medium">{lesson.title}</p>
                  <p className="text-sm text-gray-600">{lesson.type}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
