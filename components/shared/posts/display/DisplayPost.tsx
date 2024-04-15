import React from "react";
import DisplayPostHeader from "./DisplayPostHeader";
import { IPost } from "@/database/models/post.model";
import Experience from "./Experience";

interface DisplayPostProps {
  post: Partial<IPost>;
  postType: "knowledge" | "component" | "workflow";
}
const DisplayPost = async ({ post, postType }: DisplayPostProps) => {
  if (post.postType === "knowledge") {
    postType = "knowledge";
  }
  if (post.postType === "component") {
    postType = "component";
  }
  if (post.postType === "workflow") {
    postType = "workflow";
  }
  return (
    <>
      <DisplayPostHeader
        title={post.title!}
        description={post.description!}
        createdAt={post.createdAt!}
        postType={postType}
        tags={post.tags!}
      />
      <Experience experiences={post?.experiences!} />
    </>
  );
};

export default DisplayPost;
