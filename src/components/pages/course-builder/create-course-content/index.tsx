"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  BookOpen,
  Settings,
  DollarSign,
} from "lucide-react";

import {
  type ChapterFormData,
  type LessonFormData,
  chapterSchema,
  lessonSchema,
} from "@/lib/validations/course";

interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  content?: string;
}

export default function CourseContent() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set(),
  );
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [isChapterDialogOpen, setIsChapterDialogOpen] = useState(false);
  const [isLessonDialogOpen, setIsLessonDialogOpen] = useState(false);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);

  const chapterForm = useForm<ChapterFormData>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      title: "",
    },
  });

  const lessonForm = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const onChapterSubmit = (data: ChapterFormData) => {
    const newChapter: Chapter = {
      id: Date.now().toString(),
      title: data.title,
      lessons: [],
    };

    setChapters([...chapters, newChapter]);
    chapterForm.reset();
    setIsChapterDialogOpen(false);
  };

  const onLessonSubmit = (data: LessonFormData) => {
    if (!activeChapterId) return;

    setChapters(
      chapters.map((chapter) => {
        if (chapter.id === activeChapterId) {
          return {
            ...chapter,
            lessons: [
              ...chapter.lessons,
              {
                id: Date.now().toString(),
                title: data.title,
                content: data.content,
              },
            ],
          };
        }
        return chapter;
      }),
    );

    lessonForm.reset();
    setIsLessonDialogOpen(false);
  };

  const handleAddLesson = (chapterId: string) => {
    setActiveChapterId(chapterId);
    setIsLessonDialogOpen(true);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r ">
        <div className="p-4 space-y-4">
          <h3 className="text-2xl font-medium">Course name</h3>
          <div className="space-y-2">
            {chapters.map((chapter, index) => (
              <div
                key={chapter.id}
                className="select-none"
              >
                <div
                  className="flex items-center px-4 py-2 hover:bg-accent cursor-pointer"
                  onClick={() => toggleChapter(chapter.id)}
                >
                  {expandedChapters.has(chapter.id) ? (
                    <ChevronDown className="h-4 w-4 mr-2" />
                  ) : (
                    <ChevronRight className="h-4 w-4 mr-2" />
                  )}
                  <span className="text-sm font-medium">
                    {index + 1}. {chapter.title}
                  </span>
                </div>

                {expandedChapters.has(chapter.id) && (
                  <div className="ml-6 space-y-1">
                    {chapter.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lesson.id}
                        className="flex items-center px-4 py-2 text-sm text-muted-foreground hover:bg-accent cursor-pointer"
                      >
                        {lessonIndex + 1}. {lesson.title}
                      </div>
                    ))}
                    <Button
                      variant="ghost"
                      size="lg"
                      className="border ml-4 text-muted-foreground"
                      onClick={() => handleAddLesson(chapter.id)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Lesson
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Dialog
            open={isChapterDialogOpen}
            onOpenChange={setIsChapterDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create Chapter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Chapter</DialogTitle>
              </DialogHeader>
              <Form {...chapterForm}>
                <form
                  onSubmit={chapterForm.handleSubmit(onChapterSubmit)}
                  className="space-y-4 pt-4"
                >
                  <FormField
                    control={chapterForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chapter Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter chapter title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                  >
                    Create Chapter
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Lesson Dialog */}
      <Dialog
        open={isLessonDialogOpen}
        onOpenChange={setIsLessonDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Lesson</DialogTitle>
          </DialogHeader>
          <Form {...lessonForm}>
            <form
              onSubmit={lessonForm.handleSubmit(onLessonSubmit)}
              className="space-y-4 pt-4"
            >
              <FormField
                control={lessonForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter lesson title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
              >
                Create Lesson
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <div className="flex-1 pt-14">
        {chapters.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-8">
            <h2 className="text-2xl font-bold mb-2">
              Please Create Your Chapter!
            </h2>
            <p className="text-muted-foreground">
              Get started by creating your first chapter in the sidebar
            </p>
          </div>
        ) : (
          <div className="p-8">
            {selectedChapter ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  {selectedChapter.title}
                </h2>
                {/* Add chapter content editor here */}
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                Select a chapter to start editing
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
