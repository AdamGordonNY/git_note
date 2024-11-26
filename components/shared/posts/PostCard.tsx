import React from "react";
import ResourceTag, { ResourceTagType } from "../ResourceTag";
import { IPost } from "@/database/models/post.model";
import Link from "next/link";
import { CreateTypeBadge } from "@/components/ui/createTypeBadge";
import { usePathname } from "next/navigation";

interface PostCardProps {
  post: Partial<IPost>;
}
const PostCard = async ({ post }: PostCardProps) => {
  const pathName = usePathname();
  pathName === "/posts"
    ? (post.tags = post.tags?.slice(0, 3))
    : (post.tags = post.tags!);
  return (
    <Link
      href={`/posts/${post?._id!}`}
      className="px-4.5 flex h-[184px] min-w-full  cursor-pointer break-inside-avoid-column flex-col gap-4 rounded-[8px] bg-black-800 py-6 max-lg:justify-between lg:px-9 "
    >
      <div className="justify-start max-sm:gap-1 lg:gap-2.5 lg:p-2">
        {(post.postType === "knowledge" ||
          post.postType === "component" ||
          post.postType === "workflow") && (
          <CreateTypeBadge variant={post.postType!} />
        )}
      </div>
      <div className="flex gap-6">
        <span className="display-2-bold line-clamp-2 gap-[14px] text-white-100">
          {post?.title}
        </span>
      </div>

      <div className="flex gap-x-3">
        {post.tags &&
          post.tags.map((tag, idx) => (
            <div key={idx} className="flex flex-wrap overflow-hidden">
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
