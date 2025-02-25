import * as z from "zod";

export const chapterSchema = z.object({
  title: z
    .string()
    .min(1, "Chapter title is required")
    .min(3, "Chapter title must be at least 3 characters")
    .max(100, "Chapter title must be less than 100 characters"),
});

export type ChapterFormData = z.infer<typeof chapterSchema>;

// lesson content schema
export const lessonSchema = z.object({
  name: z.string().min(3, "Lesson name must be at least 3 characters"),
  type: z.enum([
    "VIDEO",
    "TEXT",
    "PPT",
    "PDF",
    "AUDIO",
    "QUIZ",
    "SURVEY",
    "ASSIGN",
    "DOWNLOAD",
    "LIVE",
    "EMBEDDED",
    "SCOR",
  ]),
  content: z.union([
    z.object({
      type: z.literal("VIDEO"),
      url: z.string().url("Please enter a valid URL").optional(),
      file: z.any().optional(), // In a real app, you'd want to validate this is a File object
    }),
    z.object({
      type: z.literal("TEXT"),
      text: z.string().min(1, "Content is required"),
    }),
    // Add other content type validations here
  ]),
  description: z.string().optional(),
  settings: z.object({
    isDraft: z.boolean(),
    isFreePreview: z.boolean(),
    hasPrerequisite: z.boolean(),
    isDownloadableWeb: z.boolean(),
    isDownloadableApp: z.boolean(),
    enableDiscussions: z.boolean(),
    requireVideoCompletion: z.boolean(),
  }),
});

export type LessonFormData = z.infer<typeof lessonSchema>;
