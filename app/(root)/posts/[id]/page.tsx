import { fetchPost } from "@/lib/actions/post.actions";
import React from "react";

import { notFound } from "next/navigation";
import DisplayPostHeader from "@/components/shared/posts/display/DisplayPostHeader";
import { IPost } from "@/database/models/post.model";
import Takeaways from "@/components/shared/posts/display/Takeaways";
import parse from "html-react-parser";
import { CreateType } from "@/types";
const Page = async ({ params }: { params: { id: string } }) => {
  const fetchedPost = await fetchPost(params.id);
  if (!fetchedPost) {
    notFound();
  }
  const cleanPost = JSON.parse(JSON.stringify(fetchedPost)) as IPost;

  return (
    <section className=" w-full gap-[20px]">
      <DisplayPostHeader
        post={cleanPost as IPost}
        title={cleanPost.title}
        description={cleanPost.description}
        postType={cleanPost.postType}
        createdAt={cleanPost?.createdAt!}
        tags={cleanPost.tags!}
      />

      <>
        <Takeaways
          experiences={cleanPost.experiences!}
          postType={cleanPost.postType as CreateType}
        />
        <div className="gap-x-30 flex p-[30px] text-white-100">
          {parse(cleanPost.content)}
        </div>
      </>
    </section>
  );
};

export default Page;
