"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Image, X } from "lucide-react";
import { toast } from "sonner";
import { postFormSchema, PostFormValues } from "@/lib/validations/group";
import { currentUser } from "@/lib/data/group";

export function CreatePost() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      content: "",
      imageUrl: "",
    },
  });

  function onSubmit(values: PostFormValues) {
    // In a real app, this would send data to an API
    console.log(values);
    toast.success("Post created successfully!");
    form.reset();
    setImagePreview(null);
  }

  // Simulate image upload by setting a preview URL
  function handleImageUpload() {
    // In a real app, this would handle file upload
    const mockImageUrl =
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop";
    setImagePreview(mockImageUrl);
    form.setValue("imageUrl", mockImageUrl);
  }

  function removeImage() {
    setImagePreview(null);
    form.setValue("imageUrl", "");
  }

  return (
    <Card className="mb-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage
                  src={currentUser.image}
                  alt={currentUser.name}
                />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder={`What's on your mind, ${
                            currentUser.name.split(" ")[0]
                          }?`}
                          className="min-h-[100px] resize-none border-none focus-visible:ring-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {imagePreview && (
                  <div className="relative mt-3">
                    <img
                      src={imagePreview}
                      alt="Post image"
                      className="max-h-[300px] w-full rounded-md object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t px-6 py-3">
            <div className="flex w-full items-center justify-between">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={handleImageUpload}
              >
                <Image className="mr-2 h-4 w-4" />
                Photo
              </Button>
              <Button
                type="submit"
                size="sm"
              >
                Post
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
