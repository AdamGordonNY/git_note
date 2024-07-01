import React from "react";
import siteLogo from "@/public/images/site-logo.png";
import Image from "next/image";
import LeftButtonGroup from "./LeftButtonGroup";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const LeftSidebar = () => {
  return (
    <section className="flex min-h-screen w-[292px] flex-col border-r-[1.5px] bg-black-700">
      <Image
        src={siteLogo}
        alt="logo"
        className="ml-[28px] mt-[40px] h-[24px] w-[102px]"
      />
      <LeftButtonGroup />
      <div className="my-20">
        <Separator />
      </div>

      <div className="flex flex-col content-center justify-end  align-bottom"></div>
    </section>
  );
};

export default LeftSidebar;
