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
        <LeftSidebarContent posts={posts} />
      </div>
    </>
  );
};

export default MobileSidebar;
