"use client";
// eslint-disable-next-line no-unused-vars
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { CreateTypeBadge } from "@/components/ui/createTypeBadge";
const PostFilter = ({ postType }: { postType: string }) => {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("filter");

  const handleSelectButton = (item: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", item.toLowerCase());
    params.set("page", "1");
    console.log(
      `${window.location?.origin}}/?${params.get("filter")?.toString()}?`
    );
    // router.push(
    //   `${window.location.pathname}/${active}/?${params.toString()}`,
    //   undefined
    // );
  };
  return (
    <div className="flex justify-end gap-x-3.5">
      <CreateTypeBadge
        variant="knowledge"
        onClick={() => handleSelectButton("knowledge")}
        className={active === "knowledge" ? "active" : ""}
      />
      <CreateTypeBadge
        variant="workflow"
        onClick={() => handleSelectButton("workflow")}
      />
      <CreateTypeBadge
        variant="component"
        onClick={() => handleSelectButton("component")}
      />
    </div>
  );
};

export default PostFilter;
