import React from "react";
import { Skeleton } from "../ui/skeleton";

const PostFormSkeleton = () => {
  return (
    <div className="mb-10 flex w-full flex-col justify-normal px-[30px]">
      <Skeleton className="" />
    </div>
  );
};

export default PostFormSkeleton;
