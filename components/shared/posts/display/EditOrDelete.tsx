"use client";
import { Button } from "@/components/ui/button";
import React, { startTransition } from "react";
import { useRouter } from "next/navigation";
import { deletePostById } from "@/lib/actions/post.actions";
import { Edit } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import VerticalEllipsisIcon from "@/components/ui/icons/VerticalEllipsisIcon";
import ResourceTag from "../../ResourceTag";
import { CreateType } from "@/types";
interface EditOrDeleteProps {
  action: "edit" | "delete";
  postId: string;
}
const EditOrDelete = ({ action, postId }: EditOrDeleteProps) => {
  const router = useRouter();
  const handleAction = async () => {
    startTransition(() => {
      if (action === "edit") {
        router.push(`/posts/${postId}/edit`);
      } else {
        deletePostById({ _id: postId });
      }
    });
  };
  const className = ` flex   w-full justify-start gap-x-1  rounded-[5px]  text-white-100`;
  return (
    <Button
      onClick={handleAction}
      className={
        action === "edit"
          ? ` ${className} bg-black-700`
          : `${className} bg-black-600`
      }
    >
      <Edit size={14} />
      {action === "edit" ? "Edit Post" : "Delete Post"}
    </Button>
  );
};
export const EditOrDeletePopover = ({
  postId,
  postType,
}: {
  postId: string;
  postType: string;
}) => {
  return (
    <Popover key={postId}>
      <div className="relative flex items-center">
        <ResourceTag type={postType as CreateType} />
        <PopoverTrigger>
          <VerticalEllipsisIcon />
        </PopoverTrigger>
        <PopoverContent className="absolute left-0 top-full mt-2 flex w-[175px] flex-col gap-y-1 bg-transparent p-2">
          <EditOrDelete action="edit" postId={postId} />
          <EditOrDelete action="delete" postId={postId} />
        </PopoverContent>
      </div>
    </Popover>
  );
};
export default EditOrDelete;
