import { fetchPost } from "@/lib/actions/post.actions";
import React from "react";

import { notFound } from "next/navigation";
import DisplayPostHeader from "@/components/shared/posts/display/DisplayPostHeader";
import { IPost } from "@/database/models/post.model";

const Page = async ({ params }: { params: { id: string } }) => {
  const fetchedPost = await fetchPost(params.id);
  if (!fetchedPost) {
    notFound();
  }
  const cleanPost = JSON.parse(JSON.stringify(fetchedPost));
  console.log({ cleanPost });

  return (
    <section className=" w-full gap-[20px]">
      <DisplayPostHeader
        post={cleanPost as IPost}
        title={cleanPost.title}
        description={cleanPost.description}
        postType={cleanPost.postTyoe}
        createdAt={cleanPost.createdAt}
        tags={cleanPost.tags}
      />
    </section>
  );
};

export default Page;
