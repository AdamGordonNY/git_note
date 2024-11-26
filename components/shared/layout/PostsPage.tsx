"use client";
import React, { Suspense, useEffect, useState } from "react";
import PostFilter from "../posts/PostFilter";
import { useSearchParams } from "next/navigation";
import PostCard from "../posts/PostCard";
import { IPost } from "@/database/models/post.model";
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
    <div className="flex min-h-screen min-w-full flex-1 flex-col gap-5">
      <div className="display-1-bold flex w-full justify-between p-3.5 text-white-100 max-lg:flex-col lg:px-10 lg:py-5">
        <span className="max-lg:display-2-bold">Browse Posts</span>{" "}
        <PostFilter />
      </div>
      <div className="px-4.5 columns-2 space-y-[18px] max-lg:columns-1">
        {" "}
        <Suspense fallback={<LoadingSpinner />}>
          {displayedPosts &&
            displayedPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          {!displayedPosts.length && (
            <div className="flex w-full">No posts found</div>
          )}{" "}
        </Suspense>
      </div>
    </div>
  );
};

export default PostPage;
