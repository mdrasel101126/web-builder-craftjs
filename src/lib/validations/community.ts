import * as z from "zod";

export const PostSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Post content is required" })
    .max(500, { message: "Post content must be less than 500 characters" }),
  image: z.string().optional(),
});

export type PostFormValues = z.infer<typeof PostSchema>;

export const CommentSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Comment cannot be empty" })
    .max(200, { message: "Comment must be less than 200 characters" }),
});

export type CommentFormValues = z.infer<typeof CommentSchema>;