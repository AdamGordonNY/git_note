import DisplayPostHeader from "@/components/shared/posts/DisplayPostHeader";
import { getPostById } from "@/lib/actions/post.actions";
import React from "react";

const Page = async ({ postId }: { postId: string }) => {
  const post = await getPostById(postId!);

  return (
    <section className="py-7.5 h-[248px] w-full gap-[20px] pl-[40px] pr-[32px]">
      <DisplayPostHeader
        title={post?.title!}
        description={post?.description!}
        postType={post?.postType!}
        tags={post?.tags!}
        createdAt={post?.createdAt!}
      />
    </section>
  );
};

export default Page;
