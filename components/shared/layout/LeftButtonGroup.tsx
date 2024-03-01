"use client";
import React from "react";
import CustomButton from "../CustomButton";
import Searchbox from "./Searchbox";
import pluscircle from "@/public/icons/pluscircle.svg";
import Image from "next/image";
const LeftButtonGroup = () => {
  return (
    <div className="flex-between flex-col ">
      <CustomButton text="Create Post" className="sidebar-btn">
        <Image src={pluscircle} alt="pluscircle" width={14} height={14} />
      </CustomButton>
      <Searchbox containerClasses="" />
    </div>
  );
};

export default LeftButtonGroup;
