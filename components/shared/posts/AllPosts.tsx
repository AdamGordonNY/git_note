"use client";
import { IPost } from "@/database/models/post.model";
import React from "react";
import PostCard from "./PostCard";
import { ResourceTagType } from "../ResourceTag";

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
            <PostCard post={post} type={post.postType as ResourceTagType} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default AllPosts;
