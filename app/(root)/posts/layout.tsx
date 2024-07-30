"use server";

import React from "react";
import { getSession } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { getOneUser } from "@/lib/actions/user.actions";
import { getRecentPosts, getUniqueTags } from "@/lib/actions/post.actions";
import { IPost } from "@/database/models/post.model";
import LeftSidebar from "@/components/shared/layout/LeftSidebar";
import RightSidebar from "@/components/shared/layout/RightSidebar";
import ResourceTag from "@/components/shared/ResourceTag";

const PostLayout = async ({ children }: { children: React.ReactNode }) => {
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
  const tagsToRender = postTags.slice(0, 12);
  return (
    <main className="flex min-h-screen w-full bg-black-900">
      {" "}
      <LeftSidebar posts={cleanPosts!}></LeftSidebar>
      <section className="flex w-full flex-col px-[292px]">{children}</section>
      <RightSidebar user={user!}>
        {tagsToRender &&
          tagsToRender.map((tag) => (
            <ResourceTag type="plain" text={tag} key={tag} />
          ))}
      </RightSidebar>
    </main>
  );
};

export default PostLayout;
