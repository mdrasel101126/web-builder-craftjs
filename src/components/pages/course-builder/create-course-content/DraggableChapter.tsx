import { useDrag, useDrop } from "react-dnd";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chapter } from ".";

interface DraggableChapterProps {
  chapter: Chapter;
  index: number;
  moveChapter: (dragIndex: number, hoverIndex: number) => void;
  toggleChapter: (chapterId: string) => void;
  handleAddLesson: (chapterId: string) => void;
  expandedChapters: Set<string>;
}

export function DraggableChapter({
  chapter,
  index,
  moveChapter,
  toggleChapter,
  handleAddLesson,
  expandedChapters,
}: DraggableChapterProps) {
  const [{ isDragging }, drag] = useDrag({
    type: "CHAPTER",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "CHAPTER",
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveChapter(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        drag(drop(node));
      }}
      style={{ opacity: isDragging ? 0.5 : 1 }}
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
  );
}
