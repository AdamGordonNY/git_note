import React from "react";
import DisplayPostHeader from "./DisplayPostHeader";
import { IPost } from "@/database/models/post.model";
import Experience from "./Experience";
import RenderedCodeEditor from "./RenderedCodeEditor";

interface DisplayPostProps {
  post: Partial<IPost>;
}
const DisplayPost = async ({ post }: DisplayPostProps) => {
  console.log(post);
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
      {post.postType! === "component" && post.code! && (
        <RenderedCodeEditor code={post.code!} />
      )}
    </>
  );
};

export default DisplayPost;
