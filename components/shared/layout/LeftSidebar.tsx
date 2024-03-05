import React from "react";
import siteLogo from "@/public/images/site-logo.png";
import Image from "next/image";
import LeftButtonGroup from "./LeftButtonGroup";
const LeftSidebar = () => {
  return (
    <section className="w-72 border-r-[1.5px] bg-black-800">
      <Image
        src={siteLogo}
        alt="logo"
        className="ml-[28px] mt-[40px] h-[24px] w-[102px]"
      />
      <LeftButtonGroup />
    </section>
  );
};

export default LeftSidebar;
