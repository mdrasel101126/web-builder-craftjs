import * as z from "zod";

export const chapterSchema = z.object({
  title: z
    .string()
    .min(1, "Chapter title is required")
    .min(3, "Chapter title must be at least 3 characters")
    .max(100, "Chapter title must be less than 100 characters"),
});

export const lessonSchema = z.object({
  title: z
    .string()
    .min(1, "Lesson title is required")
    .min(3, "Lesson title must be at least 3 characters")
    .max(100, "Lesson title must be less than 100 characters"),
  content: z.string().optional(),
});

export type ChapterFormData = z.infer<typeof chapterSchema>;
export type LessonFormData = z.infer<typeof lessonSchema>;
