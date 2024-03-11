import { getPostById } from "@/lib/actions/post.actions";
import React from "react";

const Page = async ({ _id }: { _id: string }) => {
  const post = await getPostById(_id);
  return <div>{post?.body}</div>;
};

export default Page;
