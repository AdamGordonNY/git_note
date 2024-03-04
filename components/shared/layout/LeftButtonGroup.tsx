"use client";
import React from "react";

import Searchbox from "./Searchbox";
import pluscircle from "@/public/icons/pluscircle.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
interface LeftButtonGroupProps {
  children?: React.ReactNode;
  className?: string;
}

const LeftButtonGroup = ({ children, className }: LeftButtonGroupProps) => {
  return (
    <div className="flex-between mt-[110px] flex-col ">
      <Button className="sidebar-btn  gap-1">
        <Image
          src={pluscircle}
          alt="pluscircle"
          className="object-fit p-[4px]"
        />{" "}
        <span className="paragraph-3-bold">Create Post</span>
      </Button>
      <Searchbox containerClasses="gap=1" />
    </div>
  );
};

export default LeftButtonGroup;
