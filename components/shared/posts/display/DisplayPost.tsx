import React from "react";
import DisplayPostHeader from "./DisplayPostHeader";
import { IPost } from "@/database/models/post.model";
import Experience from "./Experience";

interface DisplayPostProps {
  post: Partial<IPost>;
}
const DisplayPost = async ({ post }: DisplayPostProps) => {
  return (
    <>
      <DisplayPostHeader
        post={post}
        title={post.title!}
        description={post.description!}
        createdAt={new Date(post.createdAt!)}
        postType={post.postType! as string}
        tags={post.tags!}
      />
      <Experience experiences={post?.experiences!} />
    </>
  );
};

export default DisplayPost;
