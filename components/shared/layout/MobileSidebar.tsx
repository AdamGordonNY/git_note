// components/MobileSidebar.tsx
"use client";

import React from "react";

import { IPost } from "@/database/models/post.model";
import LeftSidebarContent from "./LeftSidebarContent";
interface MobileSidebarProps {
  isVisible: boolean;
  onClose: () => void;
  posts?: IPost[];
}

const MobileSidebar = ({ isVisible, onClose, posts }: MobileSidebarProps) => {
  return (
    <>
      {/* Overlay */}
      {isVisible && (
        <div className="fixed inset-0 z-30" onClick={onClose}></div>
      )}

      {/* Sidebar Sheet */}
      <div className="my-10 flex flex-col  items-center justify-center gap-6 space-y-2 border-b-[.68px] border-white-500 pb-10 md:hidden">
        {/* <Link href="/posts/add">
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
        </div> */}
        <LeftSidebarContent posts={posts} />
      </div>
    </>
  );
};

export default MobileSidebar;
