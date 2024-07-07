import React from "react";
import ResourceTag, { ResourceTagType } from "../ResourceTag";
import { IPost } from "@/database/models/post.model";
import Link from "next/link";

interface PostCardProps {
  post: Partial<IPost>;
  type: ResourceTagType;
}
const PostCard = async ({ post, type }: PostCardProps) => {
  return (
    <Link
      href={`/posts/${post?._id!}`}
      className="flex h-[184px] break-inside-avoid-column  flex-col gap-y-4 rounded-[8px] bg-black-800 px-9 py-6 "
    >
      <div className="p-2">
        <ResourceTag type={type} />
      </div>

      <span className="display-2-bold line-clamp-2 gap-[14px] text-white-100">
        {post?.title}
      </span>

      <div className="flex  gap-x-3">
        {post.tags &&
          post.tags.map((tag, idx) => (
            <div key={idx}>
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
