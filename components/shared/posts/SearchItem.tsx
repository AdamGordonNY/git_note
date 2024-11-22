"use client";
import { IPost } from "@/database/models/post.model";
import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { CommandItem } from "@/components/ui/command";
import ComponentIcon from "@/components/ui/icons/ComponentIcon";
import KnowledgeIcon from "@/components/ui/icons/KnowledgeIcon";
import { WorkflowIcon } from "lucide-react";
const SearchItem = ({
  item,
  setOpen,
}: {
  item: IPost;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { postType, _id, title } = item;
  console.log(item);
  const iconMatch = () => {
    switch (postType) {
      case "component":
        return (
          <>
            <ComponentIcon className="text-purple-500" size={18} />
            <span className="text-white-300">{title}</span>
          </>
        );
      case "workflow":
        return (
          <>
            <WorkflowIcon className="text-primary-500" size={18} />
            <span className="text-white-300">{title}</span>
          </>
        );
      case "knowledge":
        return (
          <>
            <KnowledgeIcon className="text-green-500" size={18} />
            <span className="text-white-300">{title}</span>
          </>
        );
    }
  };
  return (
    <Link
      key={_id}
      href={`/posts/${_id}`}
      onClick={() => {
        setOpen((open) => !open);
      }}
    >
      <CommandItem
        value={item.title}
        key={item.id}
        className="flex cursor-pointer items-center gap-x-2 p-2 hover:rounded hover:bg-black-600 hover:py-2"
      >
        {iconMatch()}
      </CommandItem>
    </Link>
  );
};

export default SearchItem;
