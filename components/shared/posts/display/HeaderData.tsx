import { format } from "date-fns";
import { Badge, Calendar, Eye, Star } from "lucide-react";
import React from "react";
import Image from "next/image";
import threeDots from "@/public/icons/threeDots.svg";
import ResourceTag from "../../ResourceTag";
interface HeaderDataProps {
  title: string;
  description: string;
  postType: string;
  tags: string[];
  createdAt: string;
  views?: number;
}
const HeaderData = ({
  title,
  description,
  createdAt,
  views,
  tags,
  postType,
}: HeaderDataProps) => {
  return (
    <div className="flex w-full flex-col  gap-5  ">
      <div className="flex h-10 justify-between">
        <h1 className="display-1-bold text-white-100">{title}</h1>
        <div className="gap-2.5">
          <Badge>{postType}</Badge>
          <Image src={threeDots} alt="three dots" />
        </div>
      </div>
      <span className="paragraph-3-regular text-white-300">{description}</span>
      <div className="flex w-full flex-col gap-4 text-white-300">
        <div className="flex gap-3.5 px-2">
          <span className=" flex gap-1">
            {format(createdAt!, "MM dd, yyyy")} <Calendar size={16} />
          </span>
          <span className="flex justify-between gap-1">
            <Star size={16} /> 1k Stars
          </span>
          <span className="flex justify-between gap-1">
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
  );
};

export default HeaderData;
