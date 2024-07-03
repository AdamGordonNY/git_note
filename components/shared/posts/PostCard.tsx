import React from "react";
import ResourceTag, { ResourceTagType } from "../ResourceTag";
import { IPost } from "@/database/models/post.model";
import Link from "next/link";

interface PostCardProps {
  post: Partial<IPost>;
  type: ResourceTagType;
}
const PostCard = async ({ post, type }: PostCardProps) => {
  console.log(post);
  return (
    <Link
      href={`/posts/${post?._id!}`}
      className="py-7.5 col-span-1 flex h-[184px] flex-col gap-4 rounded-[8px] bg-black-800 px-6 "
    >
      <div>
        <ResourceTag type={type} />
      </div>

      <span className="display-2-bold gap-[14px] text-white-100">
        {post?.title}
      </span>

      <div className="flex flex-row">
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
