import React from "react";
import ComponentIcon from "@/components/ui/icons/ComponentIcon";
import KnowledgeIcon from "@/components/ui/icons/KnowledgeIcon";
import WorkflowIcon from "@/components/ui/icons/WorkflowIcon";
import { IPost } from "@/database/models/post.model";
import Link from "next/link";
const SidebarTag = ({ post }: { post: IPost }) => {
  return (
    <Link href={`/posts/${post._id}`}>
      <div className="flex items-center justify-start gap-x-3 ">
        {post.postType === "component" && (
          <ComponentIcon className="text-purple-500" size={16} />
        )}
        {post.postType === "knowledge" && (
          <KnowledgeIcon className="text-blue-500" size={16} />
        )}
        {post.postType === "workflow" && (
          <WorkflowIcon className="text-green-500" size={16} />
        )}
        <span className="paragraph-3-medium text-white-300">{post.title}</span>
      </div>
    </Link>
  );
};

export default SidebarTag;
