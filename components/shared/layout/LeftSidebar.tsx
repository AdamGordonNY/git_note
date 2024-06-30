import React from "react";
import siteLogo from "@/public/images/site-logo.png";
import Image from "next/image";
import LeftButtonGroup from "./LeftButtonGroup";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const LeftSidebar = () => {
  return (
    <section className="flex w-72 flex-col border-r-[1.5px] bg-black-800">
      <Image
        src={siteLogo}
        alt="logo"
        className="ml-[28px] mt-[40px] h-[24px] w-[102px]"
      />
      <LeftButtonGroup />
      <div className="py-20">
        <Separator />
      </div>

      <div className="flex flex-col content-center justify-end pb-10 align-bottom"></div>
    </section>
  );
};

export default LeftSidebar;
