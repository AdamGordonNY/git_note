import React from "react";
import ResourceTag, { ResourceTagType } from "../ResourceTag";
import { IPost } from "@/database/models/post.model";
import Link from "next/link";
import { CreateTypeBadge } from "@/components/ui/createTypeBadge";

interface PostCardProps {
  post: Partial<IPost>;
  type: ResourceTagType;
}
const PostCard = async ({ post, type }: PostCardProps) => {
  return (
    <Link
      href={`/posts/${post?._id!}`}
      className="flex h-[184px] min-w-full  cursor-pointer break-inside-avoid-column flex-col space-y-4 rounded-[8px] bg-black-800 px-9 py-6 max-lg:px-1 "
    >
      <div className="gap-2.5 p-2 max-sm:gap-3.5">
        {(post.postType === "knowledge" ||
          post.postType === "component" ||
          post.postType === "workflow") && (
          <CreateTypeBadge variant={post.postType!} />
        )}
      </div>

      <span className="display-2-bold line-clamp-2 gap-[14px] text-white-100 max-lg:line-clamp-1">
        {post?.title}
      </span>

      <div className="flex gap-x-3">
        {post.tags &&
          post.tags.map((tag, idx) => (
            <div key={idx} className="overflow-hidden">
              <ResourceTag
                key={tag}
                type="plain"
                text={tag as ResourceTagType}
              />
            </div>
          ))}
      </div>
    </Link>
  );
};

export default PostCard;
