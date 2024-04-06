import React from "react";
import ResourceTag from "../ResourceTag";
import { IPost } from "@/database/models/post.model";

interface PostCardProps {
  post: IPost;
}
const PostCard = ({ post }: PostCardProps) => {
  return (
    <section className="flex h-[184px] w-1/2 flex-col gap-4 rounded-[8px] bg-black-800">
      <ResourceTag type={post?.postType!} />
    </section>
  );
};

export default PostCard;
