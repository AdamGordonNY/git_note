"use server";

import RightSidebar from "@/components/shared/layout/RightSidebar";
import React, { Suspense } from "react";

import LeftSidebar from "@/components/shared/layout/LeftSidebar";
import { getRecentPosts, getUniqueTags } from "@/lib/actions/post.actions";
import { getSession } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { IPost } from "@/database/models/post.model";
import { getOneUser } from "@/lib/actions/user.actions";
import RightSidebarSkeleton from "@/components/shared/RightSidebarSkeleton";
const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }
  const user = JSON.parse(
    JSON.stringify(await getOneUser(session.user?.email!))
  );
  const posts = await getRecentPosts();
  const cleanPosts = JSON.parse(JSON.stringify(posts)) as IPost[];
  // eslint-disable-next-line array-callback-return

  const postTags: string[] = await getUniqueTags();

  return (
    <main className="flex min-h-screen w-full bg-black-900">
      <LeftSidebar posts={cleanPosts} />

      <section className="flex w-fit flex-1">{children}</section>
      <Suspense fallback={<RightSidebarSkeleton />}>
        <RightSidebar postTags={postTags.slice(0, 12)!} user={user} />
      </Suspense>
    </main>
  );
};

export default MainLayout;
