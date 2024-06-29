"use client";
import { IPost } from "@/database/models/post.model";
import React from "react";
import PostCard from "./PostCard";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

import Badge from "@/components/shared/ui/Badge";
import PostOverview from "@/components/post/PostOverview";

import urlManager from "@/lib/utils";
interface AllPostsProps {
  posts: IPost[];
}
const AllPosts = ({ posts }: AllPostsProps) => {
  return (
    <section className="flex flex-col">
      <span className=""></span>
      <div className="grid  grid-cols-2">
        {posts.map((post, idx) => (
          <React.Fragment key={idx}>
            <PostCard post={post} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default AllPosts;
