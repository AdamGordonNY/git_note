"use client";
import React, { Suspense, useEffect, useState } from "react";
import PostFilter from "../posts/PostFilter";
import { useSearchParams } from "next/navigation";
import PostCard from "../posts/PostCard";
import { IPost } from "@/database/models/post.model";
import { CreateType } from "@/types";
import { useData } from "@/context/DataProvider";
import LoadingSpinner from "../LoadingSpinner";

const PostPage = () => {
  const { posts: allPosts } = useData();
  const [displayedPosts, setDisplayedPosts] = useState<IPost[]>(allPosts || []);

  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  useEffect(() => {
    if (filter && filter !== "all") {
      const filteredPosts = allPosts?.filter(
        (post) => post.postType === filter
      );
      setDisplayedPosts(filteredPosts || []);
    } else {
      setDisplayedPosts(allPosts || []);
    }
  }, [filter, allPosts]);
  return (
    <>
      <div className="display-1-bold flex w-full flex-row justify-between px-10 py-5 text-white-100">
        <span>Browse Posts</span> <PostFilter />
      </div>
      <div className="columns-2 space-y-[18px] px-4">
        {" "}
        <Suspense fallback={<LoadingSpinner />}>
          {displayedPosts &&
            displayedPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                type={post.postType as CreateType}
              />
            ))}
          {!displayedPosts.length && (
            <div className="flex w-full">No posts found</div>
          )}{" "}
        </Suspense>
      </div>
    </>
  );
};

export default PostPage;
