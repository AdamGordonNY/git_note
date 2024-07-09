import React from "react";
import { format } from "date-fns";
import { IPost } from "@/database/models/post.model";
import { Calendar, Eye, Star } from "lucide-react";
import ResourceTag from "../../ResourceTag";

import { EditOrDeletePopover } from "./EditOrDelete";

interface DisplayPostHeaderProps {
  post: Partial<IPost>;
  title: string;
  description: string;
  postType: string;
  tags: string[];
  createdAt: string;
  views?: number;
}
const DisplayPostHeader = async ({
  post,
  title,
  description,
  views,
  createdAt,
  tags,
  postType,
}: DisplayPostHeaderProps) => {
  console.log({ post });
  return (
    <section className="flex h-[248px] w-full items-center justify-between gap-x-5 px-[30px] pb-[32px] pt-[40px] ">
      <div className="flex w-full flex-col  gap-x-5    ">
        <div className="flex items-center justify-between">
          <h1 className="display-1-bold line-clamp-1 w-4/5 text-white-100">
            {title}
          </h1>
          <EditOrDeletePopover postId={post._id!} postType={post.postType!} />
        </div>
        <div className="mt-3 flex w-full flex-col gap-4 text-white-300">
          <span className="paragraph-3-regular text-white-300">
            {description}
          </span>
          <div className="paragraph-3-regular flex items-center gap-3.5 ">
            <span className="flex items-center gap-1">
              <Calendar size={16} className="" />
              {format(createdAt!, "MM dd, yyyy")}{" "}
            </span>
            <span className="flex items-center justify-between gap-1">
              <Star size={16} /> 1k Stars
            </span>
            <span className="flex items-center justify-between gap-1">
              <Eye size={16} /> {(views && views) || 1000} Views
            </span>
          </div>
          <div>
            <div className="flex gap-3.5 capitalize">
              {tags.map((tag, index) => (
                <ResourceTag key={index} type="plain" text={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisplayPostHeader;
