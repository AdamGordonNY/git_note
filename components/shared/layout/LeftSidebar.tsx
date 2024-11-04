import React from "react";
import { IPost } from "@/database/models/post.model";
import LeftSidebarContent from "./LeftSidebarContent";
interface LeftSidebarProps {
  posts: IPost[];
}
const LeftSidebar = ({ posts }: LeftSidebarProps) => {
  return (
    <section
      className={`flex min-h-screen w-72 flex-col content-center border-r-[1.5px] bg-black-800 text-white-300 max-lg:hidden `}
    >
      <LeftSidebarContent posts={posts} />
    </section>
  );
};

export default LeftSidebar;
