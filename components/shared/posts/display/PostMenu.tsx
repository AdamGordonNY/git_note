"use client";
import React, { useState } from "react";
import ResourceTag from "../../ResourceTag";
import { CreateType } from "@/types";
import { Button } from "@/components/ui/button";
import VerticalEllipsisIcon from "@/components/ui/icons/VerticalEllipsisIcon";
import EditOrDelete from "./EditOrDelete";

interface PostMenuProps {
  postType: string;
  postId: string;
}
const PostMenu = ({ postType, postId }: PostMenuProps) => {
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };
  return (
    <div className="flex items-center justify-center ">
      <ResourceTag type={postType as CreateType} />
      <Button className="" onClick={toggleDropdown}>
        <VerticalEllipsisIcon size={24} />
      </Button>
      {dropdown && (
        <div className="flex flex-col px-6 py-2">
          <EditOrDelete action="edit" postId={postId} />
          <EditOrDelete action="delete" postId={postId} />
        </div>
      )}
    </div>
  );
};

export default PostMenu;
