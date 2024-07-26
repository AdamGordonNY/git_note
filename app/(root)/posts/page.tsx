import AllPosts from "@/components/shared/posts/AllPosts";
import PostCard from "@/components/shared/posts/PostCard";
import { ResourceTagType } from "@/components/shared/ResourceTag";
import { IPost } from "@/database/models/post.model";
import { getFilteredPosts } from "@/lib/actions/post.actions";

import React, { Suspense } from "react";

const AllPostsPage = async ({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | undefined };
  params: string[];
}) => {
  console.log(params);
  const filter = searchParams.filter as
    | "knowledge"
    | "workflow"
    | "component"
    | "all";
  const page = Number(searchParams.page) || 1;

  const result = await getFilteredPosts({
    createType: filter,
    page,
    postsPerPage: 10,
  });
  const posts = result?.posts || [];
  const cleanPosts = JSON.parse(JSON.stringify(posts)) as IPost[];

  return (
    <section className="flex w-full flex-col">
      <div className="columns-2 space-y-[18px] px-4">
        <Suspense fallback={<div>Loading...</div>}>
          <AllPosts posts={posts} filter={filter || "all"} />
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

export default AllPostsPage;
