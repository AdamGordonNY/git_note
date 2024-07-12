"use client";
import { Button } from "@/components/ui/button";
import React, { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deletePostById } from "@/lib/actions/post.actions";
import { Edit, Loader2, X } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import VerticalEllipsisIcon from "@/components/ui/icons/VerticalEllipsisIcon";
import ResourceTag from "../../ResourceTag"; // Ensure this import is correct
import { CreateType } from "@/types";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

interface EditOrDeleteProps {
  action: "edit" | "delete";
  postId: string;
  onClick: () => void;
}

const EditOrDelete = ({ action, postId, onClick }: EditOrDeleteProps) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const handleDelete = async () => {
    try {
      await deletePostById({ _id: postId });
      toast({
        itemID: postId,
        title: "Post deleted successfully!",
        variant: "destructive",
      });
      router.push("/");
    } catch (error) {
      console.log("error in catch", error);
      toast({
        itemID: postId,
        title: "Error deleting post",
        variant: "destructive",
      });
    }
  };

  const className = `flex w-full justify-start gap-x-1 rounded-[5px] text-white-100`;
  return (
    <>
      {" "}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={onClick}
            disabled={pending}
            className={
              action === "edit"
                ? `${className} bg-black-700`
                : `${className} bg-black-600`
            }
          >
            <Edit size={14} />
            {action === "edit" ? "Edit Post" : "Delete Post"}
            {pending && <Loader2 />}
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col space-y-8 rounded-md bg-black-800 p-8">
          <DialogClose asChild>
            <Button type="button">
              {" "}
              <X fill="white" />
            </Button>
          </DialogClose>
        </DialogContent>
        <p className="text-white-300">
          Are you sure you&apos;d like to delete this post?
        </p>
        <div className="flex justify-between gap-x-4">
          <Button
            className="text-red-500"
            type="submit"
            onClick={() => handleDelete()}
          >
            {pending ? <Loader2 className="animate-spin" /> : "Delete"}
          </Button>
          <DialogClose asChild>
            <Button type="button">
              {" "}
              <X fill="white" />
            </Button>
          </DialogClose>
        </div>
      </Dialog>
    </>
  );
};

export const EditOrDeletePopover = ({
  postId,
  postType,
}: {
  postId: string;
  postType: string;
}) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleDeleteClick = () => {
    setModalIsOpen(true);
  };

  const handleEditClick = () => {
    router.push(`/posts/${postId}/edit`);
  };

  const handleDelete = async () => {
    try {
      startTransition(async () => {
        await deletePostById({ _id: postId });
        toast({
          itemID: postId,
          title: "Post deleted successfully!",
          variant: "destructive",
        });
        router.push("/");
      });
    } catch (error) {
      console.log("error in catch", error);
      toast({
        itemID: postId,
        title: "Error deleting post",
        variant: "destructive",
      });
    } finally {
      setModalIsOpen(false);
    }
  };

  return (
    <Popover key={postId} open={isOpen}>
      <div className="relative flex items-center">
        <ResourceTag type={postType as CreateType} />
        <PopoverTrigger onClick={() => setIsOpen(!isOpen)}>
          <VerticalEllipsisIcon />
        </PopoverTrigger>
        <PopoverContent
          ref={ref}
          className="Popover-Content absolute left-0 top-full mt-2 flex w-[175px] flex-col gap-y-1 bg-transparent p-2"
        >
          <EditOrDelete
            action="edit"
            postId={postId}
            onClick={handleEditClick}
          />
          <EditOrDelete
            action="delete"
            postId={postId}
            onClick={handleDeleteClick}
          />
        </PopoverContent>
      </div>
      {modalIsOpen && (
        <Dialog open={modalIsOpen} onOpenChange={setModalIsOpen}>
          <DialogContent className="flex flex-col space-y-8 rounded-md bg-black-800 p-8">
            <DialogClose asChild>
              <Button type="button">
                <X fill="white" />
              </Button>
            </DialogClose>
            <p className="text-white-300">
              Are you sure you&apos;d like to delete this post?
            </p>
            <div className="flex justify-between gap-x-4">
              <Button
                className="text-red-500"
                type="submit"
                onClick={handleDelete}
              >
                {pending ? <Loader2 className="animate-spin" /> : "Delete"}
              </Button>
              <DialogClose asChild>
                <Button type="button">
                  <X fill="white" />
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Popover>
  );
};

export default EditOrDeletePopover;
