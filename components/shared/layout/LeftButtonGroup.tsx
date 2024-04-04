"use client";
import React from "react";

import Searchbox from "./Searchbox";
import pluscircle from "@/public/icons/pluscircle.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
interface LeftButtonGroupProps {
  children?: React.ReactNode;
  className?: string;
}

const LeftButtonGroup = ({ children, className }: LeftButtonGroupProps) => {
  return (
    <div className="flex-between mt-[110px] flex-col space-y-2 ">
      <Link href="/posts/add">
        <Button
          className="justify-center; flex h-[38px] w-[235px] items-center gap-1 rounded-md bg-gradient-to-r from-[#43b7fe] to-[#4f48e6] px-1.5 py-3 text-white-100"
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
      <Searchbox containerClasses="gap=1" />
    </div>
  );
};

export default LeftButtonGroup;
