"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense, useEffect, useState } from "react";
import HeatMap from "../HeatMap";
import PostFilter from "../posts/PostFilter";
import { IPost } from "@/database/models/post.model";
import PostCard from "../posts/PostCard";
import { CreateType } from "@/types";
import { useData } from "@/context/DataProvider";
import HeatmapLegend from "../HeatmapLegend";
import LoadingSpinner from "../LoadingSpinner";
import { useSearchParams } from "next/navigation";

const Dashboard = () => {
  const { user, posts: allPosts, commitArray } = useData();
  const { name } = JSON.parse(JSON.stringify(user));
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
    <section className="flex w-full flex-1 flex-col overflow-auto max-lg:min-w-full max-lg:px-3 ">
      <div className="mt-10 flex flex-col    py-5 lg:px-10 ">
        <span className="display-2-bold text-white-100 max-lg:text-center">
          Hello {name}!
        </span>{" "}
        <Separator />
        <span className="max-lg:paragraph-1-regular max-lg:text-white-300 ">
          {" "}
          Jot down your latest learnings and thoughts today!
        </span>
      </div>
      <div className="flex w-full flex-col max-lg:my-3 lg:px-10">
        <Suspense fallback={<Skeleton className="flex w-full  lg:px-10 " />}>
          <HeatMap
            values={commitArray && JSON.parse(JSON.stringify(commitArray))}
          />
        </Suspense>
        <div className="my-5 flex w-full flex-row justify-between  gap-y-3 max-lg:justify-center">
          <span className="text-white-300 max-lg:hidden">
            Learn how we count contributions
          </span>
          <div className="max-lg:paragraph-4-regular flex flex-row items-center gap-x-2 text-white-300 max-lg:w-full max-lg:justify-center max-lg:text-center">
            Less
            <HeatmapLegend />
            More
          </div>
        </div>
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="display-1-bold max-lg:display-2-bold flex w-full justify-between gap-y-3 text-white-100 max-lg:flex-col lg:px-10">
          <span className="pl-3 text-left">Recent Posts</span>
          <PostFilter />
        </div>
        <div className="flex w-full  flex-col gap-4 pt-5 max-md:columns-1   lg:px-12">
          <div className="columns-1 space-y-[18px] px-0">
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
            )}
          </div>
        </div>
      </Suspense>
    </section>
  );
};

export default Dashboard;
