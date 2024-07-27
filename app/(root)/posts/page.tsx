import PostCard from "@/components/shared/posts/PostCard";
import PostFilter from "@/components/shared/posts/PostFilter";
import { ResourceTagType } from "@/components/shared/ResourceTag";
import { IPost } from "@/database/models/post.model";
import { getAllPosts } from "@/lib/actions/post.actions";

import React, { Suspense } from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const page = Number(searchParams.page) || 1;
  const postType =
    searchParams.postType ||
    ("all" as "knowledge" | "all" | "component" | "workflow" | string);
  const response = await getAllPosts({
    filter: postType,
    page,
    pageSize: 10,
    searchQuery: "",
    path: "/posts", // Replace "/your/path" with the actual path value
  });
  const postArray: IPost[] = [];
  response.forEach((post) => {
    postArray.push(...post.posts);
  });

  const cleanPosts = JSON.parse(JSON.stringify(postArray)) as IPost[];

  return (
    <section className="flex w-full flex-col">
      <div className="display-1-bold flex w-full flex-row justify-between px-10 py-5 text-white-100">
        <span>Browse Posts</span> <PostFilter />
      </div>
      <div className="columns-2 space-y-[18px] px-4">
        <Suspense fallback={JSON.stringify(searchParams)}>
          {cleanPosts &&
            cleanPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                type={post?.postType! as ResourceTagType}
              />
            ))}
        </Suspense>
      </div>
    </section>
  );
};

export default Page;
