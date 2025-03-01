import * as z from "zod";

export const postFormSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Post content is required" })
    .max(1000, { message: "Post content must be less than 1000 characters" }),
  imageUrl: z.string().optional(),
});

export type PostFormValues = z.infer<typeof postFormSchema>;
