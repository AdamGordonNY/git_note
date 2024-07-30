"use client";
import React, { Suspense, useEffect, useState } from "react";
import PostFilter from "../posts/PostFilter";
import { useSearchParams } from "next/navigation";
import PostCard from "../posts/PostCard";
import { ResourceTagType } from "../ResourceTag";
import { IPost } from "@/database/models/post.model";
import { Skeleton } from "@/components/ui/skeleton";

const PostPage = ({ posts }: { posts: IPost[] }) => {
  const [cleanPosts, setCleanPosts] = useState(posts ?? []);
  const searchParams = useSearchParams();
  useEffect(() => {
    if (posts) {
      setCleanPosts(posts);
    }
  }, [cleanPosts, posts]);
  return (
    <section className="flex w-full flex-col px-[292px]">
      <div className="display-1-bold flex w-full flex-row justify-between px-10 py-5 text-white-100">
        <span>Browse Posts</span> <PostFilter />
      </div>
      <div className="columns-2 space-y-[18px] px-4">
        <Suspense fallback={<Skeleton />}>
          {cleanPosts &&
            cleanPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                type={post?.postType! as ResourceTagType}
              />
            ))}
        </Suspense>
      </div>
    </section>
  );
};

export default PostPage;
