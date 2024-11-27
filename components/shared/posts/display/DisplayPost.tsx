"use client";
import React from "react";
import DisplayPostHeader from "./DisplayPostHeader";
import { IPost } from "@/database/models/post.model";

import RenderedCodeEditor from "./RenderedCodeEditor";
import Takeaways from "./Takeaways";
import { CreateType } from "@/types";

import DisplayPostContent from "./DisplayPostContent";
import DisplayPostResources from "./DisplayPostResources";

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
      <hr className="text-white-300" />
      <h1 className="display-2-bold pl-[30px] text-white-100">Post Content </h1>
      <DisplayPostContent content={post?.content!} />
      <DisplayPostResources resources={post?.resourceLinks!} />
    </>
  );
};

export default DisplayPost;
