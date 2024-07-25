import React from "react";
import ComponentIcon from "@/components/ui/icons/ComponentIcon";
import KnowledgeIcon from "@/components/ui/icons/KnowledgeIcon";
import WorkflowIcon from "@/components/ui/icons/WorkflowIcon";
import { IPost } from "@/database/models/post.model";
import Link from "next/link";
import { getUniqueTags } from "@/lib/actions/post.actions";
import ResourceTag from "../ResourceTag";
const SidebarTag = ({ post }: { post: IPost }) => {
  return (
    <Link href={`/posts/${post.postType}/${post._id}`}>
      <div className="flex items-center justify-start gap-x-3 ">
        {post.postType === "component" && (
          <ComponentIcon className="stroke-purple-500" size={16} />
        )}
        {post.postType === "knowledge" && (
          <KnowledgeIcon className="stroke-green-500" size={16} />
        )}
        {post.postType === "workflow" && (
          <WorkflowIcon className="stroke-blue-500" size={16} />
        )}
        <span className="paragraph-3-medium text-white-300">{post.title}</span>
      </div>
    </Link>
  );
};

export const SidebarTags = async () => {
  const tags = await getUniqueTags();
  const sliceTags = tags?.slice(0, 10);
  return (
    <div className="flex flex-col gap-y-3">
      {tags?.length! > 0 &&
        sliceTags?.map((tag) => (
          <ResourceTag key={tag} type="plain" text={tag} />
        ))}
    </div>
  );
};
export default SidebarTag;
