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

// support

export const SupportTicketSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters" })
    .max(100, { message: "Subject must be less than 100 characters" }),
  category: z.enum(["account", "technical", "billing", "content", "other"], {
    message: "Please select a valid category",
  }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" })
    .max(1000, { message: "Description must be less than 1000 characters" }),
  attachments: z.array(z.string()).optional(),
  priority: z
    .enum(["low", "medium", "high"], {
      message: "Please select a valid priority",
    })
    .default("medium"),
});

export type SupportTicketFormValues = z.infer<typeof SupportTicketSchema>;

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(500, { message: "Message must be less than 500 characters" }),
});

export type ContactFormValues = z.infer<typeof ContactFormSchema>;
