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
    <section className="flex w-full flex-1 flex-col overflow-auto max-md:min-w-full ">
      <div className="mt-10 flex flex-col   px-10 py-5 ">
        <span className="display-2-bold text-white-100">Hello {name}!</span>{" "}
        <Separator />
        <span className="max-lg:paragraph-1-regular max-lg:text-white-300">
          {" "}
          Jot down your latest learnings and thoughts today!
        </span>
      </div>
      <div className="flex w-full flex-col px-10">
        <Suspense fallback={<Skeleton className="flex w-full  px-10 " />}>
          <HeatMap
            values={commitArray && JSON.parse(JSON.stringify(commitArray))}
          />
        </Suspense>
      </div>

      <div className="flex w-full  flex-col gap-4 px-12 pt-5   max-md:columns-1">
        <div className="display-1-bold max-lg:display-2-bold flex w-full justify-between text-white-100 max-lg:flex-col">
          <span className="text-left">Recent Posts</span>
          <PostFilter />
        </div>
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
