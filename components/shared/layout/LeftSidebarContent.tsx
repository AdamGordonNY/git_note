import React from "react";

import Image from "next/image";
import jsmProLogo from "@/public/jsmProLogo.svg";
import githubOutline from "@/public/githubOutline.svg";
import pluscircle from "@/public/icons/pluscircle.svg";
import { Separator } from "@/components/ui/separator";
import SignOutButton from "@/components/auth/SignOutButon";
import NavSection from "./NavSection";
import QuickLink from "./QuickLink";
import Search from "../posts/Search";
import Link from "next/link";
import SidebarTag from "./SidebarTags";
import { IPost } from "@/database/models/post.model";
import logo from "@/public/images/site-logo.png";
interface SidebarContentProps {
  posts?: IPost[];
}

const LeftSidebarContent = ({ posts }: SidebarContentProps) => {
  const tenMostRecentPosts = posts?.slice(0, 10)!;
  return (
    <>
      <Link href={"/dashboard"}>
        <Image
          src={logo}
          alt="logo"
          className="ml-[28px] mt-10 h-[24px] w-[102px] max-lg:hidden"
        />
      </Link>
      <div className="my-10 flex flex-col  items-center justify-center gap-6 space-y-2 border-b-[.68px] border-white-500 pb-10">
        <Link href="/posts/add">
          <button
            className="flex h-[38px] w-[235px] items-center justify-center gap-x-2 gap-y-1 rounded-md bg-gradient-to-r from-[#43b7fe] to-[#4f48e6] px-1.5 py-3 text-white-100"
            type="button"
          >
            <Image src={pluscircle} alt="pluscircle" width={20} height={20} />{" "}
            <span className="paragraph-3-bold">Create Post</span>
          </button>
        </Link>
        <div className="w-[235px]">
          {" "}
          <Search />
        </div>
      </div>
      <NavSection title="POSTS">
        {" "}
        {tenMostRecentPosts &&
          tenMostRecentPosts.map((post, idx) => (
            <SidebarTag key={idx} post={post} />
          ))}
      </NavSection>
      <NavSection title="QUICK LINKS">
        <QuickLink
          icon={jsmProLogo}
          href="https://www.jsmastery.pro/"
          name="JSM Courses"
        />
        <QuickLink
          icon={githubOutline}
          href="https://github.com/AdamGordonNY"
          name="My Github Repositories"
        />
      </NavSection>

      <div className="ml-4 mt-10 flex flex-col ">
        <Separator />
        <SignOutButton />{" "}
      </div>
    </>
  );
};

export default LeftSidebarContent;
