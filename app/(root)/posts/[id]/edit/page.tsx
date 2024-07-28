import CreatePost from "@/components/shared/posts/form-components/CreatePost";
import { IPost } from "@/database/models/post.model";
import { fetchPost, getUniqueTags } from "@/lib/actions/post.actions";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const post = await fetchPost(params.id);
  const uniqueTags = await getUniqueTags();
  const cleanPost = JSON.parse(JSON.stringify(post)) as IPost;

  return (
    <div className="mb-10 flex w-full flex-col justify-normal px-[30px]">
      {" "}
      {cleanPost && <CreatePost uniqueTags={uniqueTags} post={cleanPost} />}
    </div>
  );
};

export default Page;
