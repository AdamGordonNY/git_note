"use client";
import { IPost } from "@/database/models/post.model";
import React from "react";
import PostCard from "./PostCard";

import PostFilter from "./PostFilter";
import { CreateType } from "@/types";
import { usePathname } from "next/navigation";

export const dynamic = "force-dynamic";
interface AllPostsProps {
  postType: "knowledge" | "workflow" | "component" | "all";
  page?: string;
  pageSize?: string;
  posts: IPost[];
}
const AllPosts = ({
  postType = "all",
  page = "1",
  pageSize,
  posts,
}: AllPostsProps) => {
  const pathName = usePathname();
  if (pathName === "/") {
    postType = "all";
  }
  return (
    <section className="flex columns-1 flex-col gap-y-5">
      <div className="mt-10 flex w-full justify-between px-9 py-5">
        <div className="flex flex-col">
          <span className="display-2-bold flex flex-col text-white-100">
            Recent Posts
          </span>
        </div>
        {page !== "/" && <PostFilter postType={postType!} />}
      </div>

      {posts &&
        posts.map((post) => {
          return (
            <PostCard
              key={post._id}
              post={post}
              type={post.postType as CreateType}
            />
          );
        })}
      {/* <Pagination hasNextPage={} pageSize={pageSize!} /> */}
    </section>
  );
};

export default AllPosts;
