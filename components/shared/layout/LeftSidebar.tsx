import React from "react";
import siteLogo from "@/public/images/site-logo.png";
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
import { IPost } from "@/database/models/post.model";
import SidebarTag from "./SidebarTags";

const LeftSidebar = async ({ posts }: { posts: IPost[] }) => {
  return (
    <section className="flex min-h-screen w-[292px] flex-col border-r-[1.5px] bg-black-700">
      <Link href={"/"}>
        <Image
          src={siteLogo}
          alt="logo"
          className="ml-[28px] mt-[40px] h-[24px] w-[102px]"
        />
      </Link>
      <>
        <div className="mt-20 flex  flex-col items-center justify-center space-y-2 border-b border-white-500">
          <Link href="/posts/add">
            <button
              className="flex h-[38px] w-[235px] items-center justify-center gap-1 rounded-md bg-gradient-to-r from-[#43b7fe] to-[#4f48e6] px-1.5 py-3 text-white-100"
              type="button"
            >
              <Image
                src={pluscircle}
                alt="pluscircle"
                width={16}
                height={16}
                className="p-[4px]"
              />{" "}
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
          {posts &&
            posts.map((post, idx) => <SidebarTag key={idx} post={post} />)}
        </NavSection>

        <NavSection title="QUICK LINKS">
          <QuickLink
            icon={jsmProLogo}
            href="https://www.jsmastery.pro/"
            name="JSM Courses"
          />
          <QuickLink
            icon={githubOutline}
            href="https://github.com/"
            name="Github Organization"
          />
        </NavSection>
      </>

      <div className="ml-4 mt-10 flex flex-col ">
        <Separator />
        <SignOutButton />{" "}
      </div>
    </section>
  );
};

export default LeftSidebar;
