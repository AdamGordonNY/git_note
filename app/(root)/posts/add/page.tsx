import React from "react";
import CreatePost from "@/components/shared/posts/CreatePost";
import { getUniqueTags } from "@/lib/actions/post.actions";
import dbConnect from "@/database/dbConnect";
const Page = async () => {
  await dbConnect();

  const uniqueTags = await getUniqueTags();

  return (
    <div className="mb-10 flex w-full flex-col justify-normal px-[30px]">
      <CreatePost uniqueTags={uniqueTags} />
    </div>
  );
};

export default Page;
