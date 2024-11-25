import React from "react";
import { IPost } from "@/database/models/post.model";
import Link from "next/link";
import Image from "next/image";
import componentBadge from "@/public/icons/component.svg";
import knowledgeBadge from "@/public/icons/knowledge.svg";
import workflowBadge from "@/public/icons/workflow.svg";
const SidebarTag = ({ post }: { post: IPost }) => {
  return (
    <Link href={`/posts/${post._id}`}>
      <div className="flex items-center justify-start gap-x-3 ">
        {post.postType === "component" && (
          <Image
            className="stroke-purple-500"
            width={16}
            height={16}
            alt="component logo"
            src={componentBadge}
          />
        )}
        {post.postType === "knowledge" && (
          <Image
            src={knowledgeBadge}
            className="stroke-green-500"
            width={16}
            height={16}
            alt="component logo"
          />
        )}
        {post.postType === "workflow" && (
          <Image
            className=" stroke-blue-500"
            width={16}
            height={16}
            src={workflowBadge}
            alt="component logo"
          />
        )}
        <span className="paragraph-3-medium text-white-300">{post.title}</span>
      </div>
    </Link>
  );
};

export default SidebarTag;
