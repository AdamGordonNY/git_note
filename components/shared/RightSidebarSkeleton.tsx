import React from "react";
import { Skeleton } from "../ui/skeleton";
const RightSidebarSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Skeleton />
      <div className="mt-10 flex justify-center">
        <Skeleton className="size-9 rounded-full" />
      </div>
    </div>
  );
};

export default RightSidebarSkeleton;
