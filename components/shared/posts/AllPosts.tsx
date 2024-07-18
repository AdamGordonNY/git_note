import { IPost } from "@/database/models/post.model";
import React from "react";
import PostCard from "./PostCard";
import { ResourceTagType } from "../ResourceTag";

interface AllPostsProps {
  posts: IPost[];
  filter?: string;
}
const AllPosts = async ({ posts, filter }: AllPostsProps) => {
  switch (filter) {
    case "knowledge":
      posts = posts.filter((post) => post.postType === "knowledge");
      break;
    case "component":
      posts = posts.filter((post) => post.postType === "component");
      break;
    case "workflow":
      posts = posts.filter((post) => post.postType === "workflow");
      break;
    default:
      break;
  }
  return (
    <section className="flex columns-1 flex-col gap-y-5">
      {posts.map((post, idx) => (
        <React.Fragment key={idx}>
          <PostCard post={post} type={post.postType as ResourceTagType} />
        </React.Fragment>
      ))}
    </section>
  );
};

export default AllPosts;
