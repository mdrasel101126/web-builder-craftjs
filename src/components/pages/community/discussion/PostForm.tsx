"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { currentUser, Post } from "@/lib/data/community";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PostFormValues, PostSchema } from "@/lib/validations/community";
import { UserAvatar } from "@/components/ui/user-avatar";

interface PostFormProps {
  onAddPost: (post: Post) => void;
}

export function PostForm({ onAddPost }: PostFormProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      content: "",
      image: undefined,
    },
  });

  const handleImageUpload = () => {
    // In a real app, this would be an actual upload
    // For demo purposes, we'll just use a random image
    const demoImages = [
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    ];

    const randomImage =
      demoImages[Math.floor(Math.random() * demoImages.length)];
    setImageUrl(randomImage);
    form.setValue("image", randomImage);
  };

  const removeImage = () => {
    setImageUrl(undefined);
    form.setValue("image", undefined);
  };

  const onSubmit = (values: PostFormValues) => {
    // In a real app, this would send data to an API
    const newPost: Post = {
      id: Date.now().toString(),
      content: values.content,
      image: values.image,
      createdAt: new Date(),
      author: currentUser,
      likes: 0,
      comments: [],
    };

    onAddPost(newPost);
    form.reset();
    setImageUrl(undefined);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <UserAvatar user={currentUser} />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Textarea
                        placeholder="What's on your mind?"
                        className="min-h-[80px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {imageUrl && (
              <div className="relative mt-4">
                <img
                  src={imageUrl}
                  alt="Post image"
                  className="rounded-md max-h-[300px] w-full object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={removeImage}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between p-4 pt-0">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={handleImageUpload}
            >
              <Image className="mr-2 h-4 w-4" />
              Add Image
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Post
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
