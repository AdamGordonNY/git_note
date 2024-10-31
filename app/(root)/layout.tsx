"use server";

import React from "react";
import { IUser } from "@/database/models/user.model";
import { getRecentPosts, getUniqueTags } from "@/lib/actions/post.actions";
import LeftSidebar from "@/components/shared/layout/LeftSidebar";
import RightSidebar from "@/components/shared/layout/RightSidebar";
import { getSession } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { getOneUser } from "@/lib/actions/user.actions";
import { DataProvider } from "@/context/DataProvider";
import { Separator } from "@/components/ui/separator";
import ResourceTag from "@/components/shared/ResourceTag";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const user = await getOneUser(session?.user?.email!);
  const userPosts = await getRecentPosts(10);
  const cleanUser = JSON.parse(JSON.stringify(user)) as IUser;
  const cleanPosts = JSON.parse(JSON.stringify(userPosts));

  const postTags: string[] = await getUniqueTags();
  const tagsToRender = postTags.slice(0, 12);
  return (
    <DataProvider
      userData={cleanUser!}
      postData={cleanPosts}
      tagData={tagsToRender}
    >
      <main className="flex min-h-screen w-full bg-black-900">
        {" "}
        <LeftSidebar posts={cleanPosts!} />
        <section className="flex-1 ">{children}</section>
        <RightSidebar>
          {" "}
          <div className="mt-5  gap-2 px-2 py-3.5">
            <Separator />
            <div className="flex flex-col gap-3">
              {tagsToRender?.map((tag) => (
                <ResourceTag
                  key={tag}
                  type="plain"
                  text={tag}
                  className="text-white-100"
                />
              ))}
            </div>
          </div>
        </RightSidebar>
      </main>
    </DataProvider>
  );
};

export default MainLayout;
