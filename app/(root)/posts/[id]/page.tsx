import { fetchPost } from "@/lib/actions/post.actions";
import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { IPost } from "@/database/models/post.model";
import DisplayPost from "@/components/shared/posts/display/DisplayPost";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
const Page = async ({ params }: { params: { id: string } }) => {
  const fetchedPost = await fetchPost(params.id);
  if (!fetchedPost) {
    notFound();
  }
  const cleanPost = JSON.parse(JSON.stringify(fetchedPost)) as IPost;

  return (
    <section className="flex w-full flex-col gap-[20px] bg-black-900">
      <Suspense fallback={<LoadingSpinner />}>
        <DisplayPost post={cleanPost} />
      </Suspense>
    </section>
  );
};

export default Page;
