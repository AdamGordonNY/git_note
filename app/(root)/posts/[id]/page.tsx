import { fetchPost } from "@/lib/actions/post.actions";
import React from "react";
import DisplayPost from "@/components/shared/posts/display/DisplayPost";
import { notFound } from "next/navigation";
import DisplayPostHeader from "@/components/shared/posts/display/DisplayPostHeader";

const Page = async ({ params }: { params: { id: string } }) => {
  const fetchedPost = await fetchPost(params.id);
  if (!fetchedPost) {
    notFound();
  }
  const cleanPost = JSON.parse(JSON.stringify(fetchedPost));
  console.log({ cleanPost });

  return (
    <section className="py-7.5 h-[248px] w-full gap-[20px] pl-[40px] pr-[32px]">
      <DisplayPostHeader
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
