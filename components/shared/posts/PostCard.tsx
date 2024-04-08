import React from "react";
import ResourceTag from "../ResourceTag";
import { IPost } from "@/database/models/post.model";

interface PostCardProps {
  post: IPost;
}
const PostCard = ({ post }: PostCardProps) => {
  return (
    <section className="py-7.5 flex h-[184px] w-full flex-col gap-4 rounded-[8px] bg-black-800 px-6 ">
      <ResourceTag type={post?.postType!} />
      <span className="heading-1-medium gap-[14px] text-white-100">
        {post?.title}
      </span>
      {post.tags &&
        post.tags.map((tag) => (
          <ResourceTag key={tag} type={post.postType} text={tag} />
        ))}
    </section>
  );
};

export default PostCard;
