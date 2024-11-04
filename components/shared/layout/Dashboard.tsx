"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import HeatMap from "../HeatMap";
import PostFilter from "../posts/PostFilter";
import { IPost } from "@/database/models/post.model";
import PostCard from "../posts/PostCard";
import { CreateType } from "@/types";
import { useData } from "@/context/DataProvider";
import HeatmapLegend from "../HeatmapLegend";

const Dashboard = ({
  commitArray,
  cleanPosts,
}: {
  commitArray: any[];
  cleanPosts: IPost[];
}) => {
  const searchParams = useSearchParams();
  const data = useData();
  const { name } = JSON.parse(JSON.stringify(data?.user));
  return (
    <section className="flex w-full flex-1 flex-col overflow-auto px-3 max-lg:min-w-full ">
      <div className="mt-10 flex flex-col    py-5 lg:px-10 ">
        <span className="display-2-bold text-white-100">Hello {name}!</span>{" "}
        <Separator />
        <span className="max-lg:paragraph-1-regular max-lg:text-white-300 ">
          {" "}
          Jot down your latest learnings and thoughts today!
        </span>
      </div>
      <div className="flex w-full flex-col lg:px-10">
        <Suspense fallback={<Skeleton className="flex w-full  px-10 " />}>
          <HeatMap
            values={commitArray && JSON.parse(JSON.stringify(commitArray))}
          />
        </Suspense>
        <div className="flex w-full flex-row justify-between lg:px-[30px]">
          <span className="text-white-300 max-lg:hidden">
            Learn how we count contributions
          </span>
          <div className="flex flex-row items-center gap-x-2 text-white-300 max-lg:w-full max-lg:text-center">
            Less
            <HeatmapLegend />
            More
          </div>
        </div>
      </div>
      <div className="display-1-bold max-lg:display-2-bold flex w-full justify-between text-white-100 max-lg:flex-col">
        <span className="text-left">Recent Posts</span>
        <PostFilter />
      </div>
      <div className="flex w-full  flex-col gap-4 pt-5 max-md:columns-1   lg:px-12">
        <div className="columns-1 space-y-[18px]">
          <Suspense fallback={JSON.stringify({ searchParams })}>
            {cleanPosts &&
              cleanPosts?.map((post, idx) => (
                <PostCard
                  key={post._id}
                  post={post}
                  type={post.postType as CreateType}
                />
              ))}
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
