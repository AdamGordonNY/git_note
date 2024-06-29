"use client";
import React from "react";
import jsmProLogo from "@/public/jsmProLogo.svg";
import githubOutline from "@/public/githubOutline.svg";
import pluscircle from "@/public/icons/pluscircle.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NavSection from "./NavSection";
import QuickLink from "./QuickLink";
import { signOut } from "next-auth/react";

import Search from "../posts/Search";
import logoutIcon from "@/public/icons/logout.svg";
interface LeftButtonGroupProps {
  children?: React.ReactNode;
  className?: string;
}

const LeftButtonGroup = ({ children, className }: LeftButtonGroupProps) => {
  return (
    <div>
      <div className="mt-20 flex flex-col items-center justify-center space-y-2 ">
        <Link href="/posts/add">
          <Button
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
          </Button>
        </Link>
        <div className="w-[235px]">
          {" "}
          <Search />
        </div>
      </div>
      <div>
        <div className="space-y-4 pb-12"></div>
      </div>
      <NavSection title="POSTS"> placeholder for posts</NavSection>

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
    </div>
  );
};

export default LeftButtonGroup;
