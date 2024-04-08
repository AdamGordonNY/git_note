import React from "react";
import CreatePost from "@/components/shared/posts/CreatePost";
import { getUniqueTags } from "@/lib/actions/post.actions";
import dbConnect from "@/database/dbConnect";
import Post from "@/database/models/post.model";
const Page = async () => {
  await dbConnect();
  const posts = await Post.find({});
  console.log(posts);
  const uniqueTags = await getUniqueTags();
  console.log(uniqueTags);
  return (
    <div className="flex w-full flex-col px-[30px]">
      <CreatePost uniqueTags={uniqueTags} />
    </div>
  );
};

export default Page;
