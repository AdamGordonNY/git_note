import React from "react";
import DisplayPostHeader from "./DisplayPostHeader";
import { IPost } from "@/database/models/post.model";

interface DisplayPostProps {
  post: Partial<IPost>;
}
const DisplayPost = ({ post }: DisplayPostProps) => {
  return (
    <>
      <DisplayPostHeader
        title={post.title!}
        description={post.description!}
        createdAt={post.createdAt!}
        postType={post.postType!}
        tags={post.tags!}
      />
    </>
  );
};

export default DisplayPost;
