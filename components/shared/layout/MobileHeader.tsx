"use client";

import React, { useEffect, useState } from "react";
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
import Link from "next/link";
import { usePathname } from "next/navigation";
const MobileHeader = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const pathname = usePathname();
  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };
  const { posts, user } = useData();
  useEffect(() => {
    setIsSidebarVisible(false);
  }, [pathname]);
  return (
    <>
      <div className="flex min-h-[70px] min-w-full flex-1 items-center justify-between bg-black-800 py-6   sm:px-3.5 lg:hidden">
        <Link href={"/dashboard"}>
          {" "}
          <Image
            src={logo}
            alt="logo"
            aria-label="logo"
            width={100}
            height={24}
          />
        </Link>

        <Popover>
          <PopoverTrigger onClick={toggleSidebar} aria-label="Open Sidebar">
            <Image src={burger} alt="dropdown" width={21} height={18} />
          </PopoverTrigger>
          <PopoverContent className="bg-black-800">
            {" "}
            <MobileSidebar
              user={user!}
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
