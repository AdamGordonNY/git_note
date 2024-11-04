"use client";

import React, { useState } from "react";
import Image from "next/image";
import logo from "@/public/images/site-logo.png";
import burger from "@/public/burger.svg";
import MobileSidebar from "./MobileSidebar";
import { useData } from "@/context/DataProvider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const MobileHeader = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };
  const { posts } = useData();
  return (
    <>
      <div className="flex min-h-[70px] w-full min-w-[430px] flex-1 items-center justify-between bg-black-800 px-3.5  py-6 lg:hidden">
        <Image
          src={logo}
          alt="logo"
          aria-label="logo"
          width={100}
          height={24}
        />
        <Popover>
          <PopoverTrigger>
            <button onClick={toggleSidebar} aria-label="Open Sidebar">
              <Image src={burger} alt="dropdown" width={21} height={18} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="bg-black-800">
            {" "}
            <MobileSidebar
              isVisible={isSidebarVisible}
              onClose={() => setIsSidebarVisible(false)}
              posts={posts}
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default MobileHeader;
