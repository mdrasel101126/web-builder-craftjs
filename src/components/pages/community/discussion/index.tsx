"use client";
import React from "react";
import { useState } from "react";
import { Post, posts as initialPosts } from "@/lib/data/community";
import { PostForm } from "./PostForm";
import { PostCard } from "./PostCard";
const Discussion = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handleAddPost = (post: Post) => {
    setPosts([post, ...posts]);
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-medium px-5">Discussions</h1>
      <div className="max-w-3xl mx-auto">
        <PostForm onAddPost={handleAddPost} />
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discussion;
