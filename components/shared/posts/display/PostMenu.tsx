"use client";
import React from "react";
import ResourceTag from "../../ResourceTag";
import { CreateType } from "@/types";
import { Button } from "@/components/ui/button";
import VerticalEllipsisIcon from "@/components/ui/icons/VerticalEllipsisIcon";

interface PostMenuProps {
  postType: string;
}
const PostMenu = ({ postType }: PostMenuProps) => {
  return (
    <div className="flex items-center justify-center ">
      <ResourceTag type={postType as CreateType} />
      <Button className="" onClick={() => {}}>
        <VerticalEllipsisIcon size={24} />
      </Button>
    </div>
  );
};

export default PostMenu;
