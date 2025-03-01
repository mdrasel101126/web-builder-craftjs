"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Heart, MessageCircle, Share } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { currentUser, Post } from "@/lib/data/group";
import { commentFormSchema, CommentFormValues } from "@/lib/validations/group";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(values: CommentFormValues) {
    // In a real app, this would send data to an API
    console.log(values);
    form.reset();
  }

  function handleLike() {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  }

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarImage
              src={post.author.image}
              alt={post.author.name}
            />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{post.author.name}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                Posted in <span className="font-medium">{post.group.name}</span>
              </span>
            </div>

            <div className="mt-3 space-y-3">
              <p>{post.content}</p>

              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="Post image"
                  className="mt-3 rounded-md"
                />
              )}
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                <span>{likesCount}</span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="hover:underline"
                >
                  {post.comments.length} comments
                </button>
                <button className="hover:underline">0 shares</button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="flex justify-between p-2">
        <Button
          variant="ghost"
          size="sm"
          className={`flex-1 ${liked ? "text-red-500" : ""}`}
          onClick={handleLike}
        >
          <Heart className={`mr-2 h-4 w-4 ${liked ? "fill-red-500" : ""}`} />
          Like
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex-1"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Comment
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex-1"
        >
          <Share className="mr-2 h-4 w-4" />
          Share
        </Button>
      </CardFooter>

      {showComments && (
        <div className="border-t p-3">
          {post.comments.map((comment) => (
            <div
              key={comment.id}
              className="mb-3 flex gap-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={comment.author.image}
                  alt={comment.author.name}
                />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="rounded-xl bg-muted p-3">
                  <div className="font-semibold">{comment.author.name}</div>
                  <p className="text-sm">{comment.content}</p>
                </div>

                <div className="mt-1 flex gap-4 pl-2 text-xs text-muted-foreground">
                  <button className="hover:underline">Like</button>
                  <button className="hover:underline">Reply</button>
                  <span>
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-3 flex gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={currentUser.image}
                alt={currentUser.name}
              />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex-1"
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex w-full items-center gap-2">
                      <FormControl>
                        <Input
                          placeholder="Write a comment..."
                          className="flex-1 rounded-full bg-muted"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="submit"
                        size="sm"
                        className="rounded-full"
                      >
                        Post
                      </Button>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      )}
    </Card>
  );
}
