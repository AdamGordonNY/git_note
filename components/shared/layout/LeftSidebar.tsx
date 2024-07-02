import React from "react";
import siteLogo from "@/public/images/site-logo.png";
import Image from "next/image";
import LeftButtonGroup from "./LeftButtonGroup";

import { Separator } from "@/components/ui/separator";
import SignOutButton from "@/components/auth/SignOutButon";
import { getRecentPosts } from "@/lib/actions/post.actions";

const LeftSidebar = async () => {
  const posts = await getRecentPosts();
  const cleanPosts = JSON.parse(JSON.stringify(posts));

  return (
    <section className="flex min-h-screen w-[292px] flex-col border-r-[1.5px] bg-black-700">
      <Image
        src={siteLogo}
        alt="logo"
        className="ml-[28px] mt-[40px] h-[24px] w-[102px]"
      />
      <LeftButtonGroup posts={cleanPosts} />

      <div className="ml-4 flex flex-col  justify-end align-bottom">
        <Separator />
        <SignOutButton />
      </div>
    </section>
  );
};

export default LeftSidebar;
