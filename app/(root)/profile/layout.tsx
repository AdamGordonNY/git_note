"use server";

import React from "react";
import { getSession } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import LeftSidebar from "@/components/shared/layout/LeftSidebar";
import { getRecentPosts } from "@/lib/actions/post.actions";
import RightSidebar from "@/components/shared/layout/RightSidebar";
import { getOneUser } from "@/lib/actions/user.actions";
import SocialLinks from "@/components/shared/profile/SocialLinks";
import { IUser } from "@/database/models/user.model";

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }
  const user = await getOneUser(session?.user?.email!);
  const userPosts = await getRecentPosts(10);
  const cleanUser = JSON.parse(JSON.stringify(user)) as IUser;
  const cleanPosts = JSON.parse(JSON.stringify(userPosts));
  return (
    <main className="flex min-h-screen w-full bg-black-900">
      <LeftSidebar posts={cleanPosts!}></LeftSidebar>
      <section className="flex w-full flex-col px-[292px]">{children}</section>
      <RightSidebar user={cleanUser}>
        {cleanUser.socials && (
          <SocialLinks
            github={cleanUser.socials?.github!}
            instagram={cleanUser.socials?.instagram!}
            twitter={cleanUser.socials?.dribbble!}
            linkedin={cleanUser.socials?.linkedin!}
            dribbble={cleanUser.socials?.dribbble!}
            facebook={cleanUser.socials?.facebook!}
          />
        )}
      </RightSidebar>
    </main>
  );
};

export default ProfileLayout;
