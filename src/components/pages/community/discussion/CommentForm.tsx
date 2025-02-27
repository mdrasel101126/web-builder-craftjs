"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/ui/user-avatar";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { CommentFormValues, CommentSchema } from "@/lib/validations/community";
import { Comment, currentUser } from "@/lib/data/community";

interface CommentFormProps {
  postId: string;
  onAddComment: (comment: Comment) => void;
}

export function CommentForm({ postId, onAddComment }: CommentFormProps) {
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (values: CommentFormValues) => {
    // In a real app, this would send data to an API
    const newComment: Comment = {
      id: Date.now().toString(),
      content: values.content,
      createdAt: new Date(),
      author: currentUser,
      likes: 0,
    };

    onAddComment(newComment);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-2"
      >
        <UserAvatar
          user={currentUser}
          className="h-8 w-8"
        />
        <div className="flex-1 flex gap-2">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    placeholder="Write a comment..."
                    className="min-h-[40px] resize-none py-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="sm"
            disabled={form.formState.isSubmitting}
          >
            Comment
          </Button>
        </div>
      </form>
    </Form>
  );
}
