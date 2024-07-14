"use client";
import React from "react";
import DisplayPostHeader from "./DisplayPostHeader";
import { IPost } from "@/database/models/post.model";
import Experience from "./Experience";
import RenderedCodeEditor from "./RenderedCodeEditor";
import Takeaways from "./Takeaways";
import { CreateType } from "@/types";

interface DisplayPostProps {
  post: Partial<IPost>;
}
const DisplayPost = ({ post }: DisplayPostProps) => {
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
      <Takeaways
        experiences={post.experiences!}
        postType={post.postType! as CreateType}
      />
      {post.postType! === "component" && post.code! && (
        <RenderedCodeEditor code={post?.code!} />
      )}
    </>
  );
};

export default DisplayPost;
