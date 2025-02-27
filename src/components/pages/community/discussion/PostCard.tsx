"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Comment, Post } from "@/lib/data/community";
import { CommentForm } from "./CommentForm";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments);

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  const handleAddComment = (comment: Comment) => {
    setComments([...comments, comment]);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <UserAvatar user={post.author} />
        <div className="flex flex-col">
          <p className="font-semibold">{post.author.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(post.createdAt, { addSuffix: true })}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="mb-4">{post.content}</p>
        {post.image && (
          <div className="relative aspect-video overflow-hidden rounded-md">
            <img
              src={post.image}
              alt="Post image"
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col p-0">
        <div className="flex items-center justify-between p-2 px-4">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{likesCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">
              {comments.length} comments
            </span>
          </div>
        </div>
        <Separator />
        <div className="flex items-center justify-between p-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={handleLike}
          >
            <Heart
              className={`mr-2 h-4 w-4 ${
                liked ? "fill-destructive text-destructive" : ""
              }`}
            />
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
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
        {showComments && (
          <div className="p-4 pt-0">
            <CommentForm
              postId={post.id}
              onAddComment={handleAddComment}
            />
            <div className="mt-4 space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex gap-2"
                >
                  <UserAvatar
                    user={comment.author}
                    className="h-8 w-8"
                  />
                  <div className="flex-1">
                    <div className="rounded-xl bg-muted p-3">
                      <p className="font-semibold text-sm">
                        {comment.author.name}
                      </p>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1 ml-2">
                      <button className="text-xs text-muted-foreground hover:underline">
                        Like
                      </button>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(comment.createdAt, {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
