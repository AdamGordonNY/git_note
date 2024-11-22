import PostPage from "@/components/shared/layout/PostsPage";

import { IPost } from "@/database/models/post.model";
import { getRecentPosts, getUniqueTags } from "@/lib/actions/post.actions";
import { getSession } from "@/lib/authOptions";
import { redirect } from "next/navigation";

import React, { Suspense } from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const postTags: string[] = await getUniqueTags();
  postTags.slice(0, 12);
  // const page = Number(searchParams.page) || 1;
  // const postType =
  //   searchParams.postType ||
  //   ("all" as "knowledge" | "all" | "component" | "workflow" | string);
  // const response = await getAllPosts({
  //   filter: postType,
  //   page,
  //   pageSize: 10,
  //   searchQuery: "",
  //   path: "/posts",
  // });
  // const postArray: IPost[] = [];
  // response.forEach((post) => {
  //   postArray.push(...post.posts);
  // });

  return (
    <>
      <Suspense>
        <PostPage params={JSON.parse(JSON.stringify(searchParams))} />
      </Suspense>
    </>
  );
};

export default Page;
