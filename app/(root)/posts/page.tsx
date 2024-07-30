import LeftSidebar from "@/components/shared/layout/LeftSidebar";
import PostPage from "@/components/shared/layout/PostsPage";
import RightSidebar from "@/components/shared/layout/RightSidebar";
import ResourceTag from "@/components/shared/ResourceTag";

import { IPost } from "@/database/models/post.model";
import { getRecentPosts, getUniqueTags } from "@/lib/actions/post.actions";
import { getOneUser } from "@/lib/actions/user.actions";
import { getSession } from "@/lib/authOptions";
import { redirect } from "next/navigation";

import React from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }
  const user = JSON.parse(
    JSON.stringify(await getOneUser(session.user?.email!))
  );

  const posts = await getRecentPosts(12);

  const cleanPosts = JSON.parse(JSON.stringify(posts)) as IPost[];

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
      <LeftSidebar posts={cleanPosts} />
      <PostPage posts={cleanPosts} />
      <RightSidebar user={user!}>
        {postTags &&
          postTags.map((tag) => (
            <ResourceTag type="plain" text={tag} key={tag} />
          ))}
      </RightSidebar>
    </>
  );
};

export default Page;
