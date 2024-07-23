import { fetchPost } from "@/lib/actions/post.actions";
import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { IPost } from "@/database/models/post.model";
import DisplayPost from "@/components/shared/posts/display/DisplayPost";
const Page = async ({ params }: { params: { id: string } }) => {
  const fetchedPost = await fetchPost(params.id);
  if (!fetchedPost) {
    notFound();
  }
  const cleanPost = JSON.parse(JSON.stringify(fetchedPost)) as IPost;

  return (
    <section className=" mb-20 w-full gap-[20px]">
      <Suspense fallback={"loading..."}>
        <DisplayPost post={cleanPost} />
      </Suspense>
    </section>
  );
};

export default Page;
