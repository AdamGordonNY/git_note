"use client";
import React, { Suspense, useEffect, useState } from "react";
import PostFilter from "../posts/PostFilter";
import { useSearchParams } from "next/navigation";
import PostCard from "../posts/PostCard";
import { ResourceTagType } from "../ResourceTag";
import { SearchParams } from "@/types";
import { useData } from "@/context/DataProvider";

const PostPage = ({ params }: { params?: SearchParams }) => {
  const posts = useData().posts;
  const [cleanPosts, setCleanPosts] = useState(posts ?? []);

  // eslint-disable-next-line no-unused-vars
  const searchParams = useSearchParams();
  useEffect(() => {
    if (posts) {
      setCleanPosts(posts);
    }
  }, [cleanPosts, posts]);
  return (
    <Suspense>
      <div className="display-1-bold flex w-full flex-row justify-between px-10 py-5 text-white-100">
        <span>Browse Posts</span> <PostFilter setPosts={setCleanPosts} />
      </div>
      <div className="columns-2 space-y-[18px] px-4">
        {cleanPosts &&
          cleanPosts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              type={post?.postType! as ResourceTagType}
            />
          ))}
      </div>
    </Suspense>
  );
};

export default PostPage;
