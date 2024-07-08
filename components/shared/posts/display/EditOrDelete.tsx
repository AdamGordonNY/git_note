"use client";
import { Button } from "@/components/ui/button";
import React, { startTransition } from "react";
import { useRouter } from "next/navigation";
import { deletePostById } from "@/lib/actions/post.actions";
import { Edit } from "lucide-react";
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
  return (
    <Button
      onClick={handleAction}
      className={action === "edit" ? ` bg-black-700` : `bg-black-600`}
    >
      <Edit size={14} />
      {action === "edit" ? "Edit" : "Delete"}
    </Button>
  );
};

export default EditOrDelete;
