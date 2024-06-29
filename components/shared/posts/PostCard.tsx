import React from "react";
import ResourceTag from "../ResourceTag";
import { IPost } from "@/database/models/post.model";
import Link from "next/link";

interface PostCardProps {
  post: Partial<IPost>;
}
const PostCard = ({ post }: PostCardProps) => {
  console.log(post);
  return (
    <div className="py-7.5 col-span-1 flex h-[184px] flex-col gap-4 rounded-[8px] bg-black-800 px-6 ">
      <div>
        <ResourceTag type={post?.postType!} />
      </div>
      <div>
        <Link href={`/posts/${post?._id!}`}>
          <span className="display-2-bold gap-[14px] text-white-100">
            {post?.title}
          </span>
        </Link>
      </div>
      <div className="flex flex-row">
        {post.tags &&
          post.tags.map((tag, idx) => (
            <div key={idx}>
              <ResourceTag key={tag} type="plain" text={tag} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostCard;
