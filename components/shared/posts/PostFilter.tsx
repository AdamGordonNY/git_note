"use client";
// eslint-disable-next-line no-unused-vars
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import ResourceTag from "../ResourceTag";

const PostFilter = () => {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("filter");

  const handleSelectButton = (item: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", item.toLowerCase());
    params.set("page", "1");
    console.log(`${window.location.origin}/${active}/?${params.toString()}`);
    // router.push(
    //   `${window.location.pathname}/${active}/?${params.toString()}`,
    //   undefined
    // );
  };
  return (
    <div className="flex justify-end gap-x-3.5">
      <ResourceTag
        type="knowledge"
        text="Knowledge"
        onClick={() => handleSelectButton("knowledge")}
        className={active === "knowledge" ? "active" : ""}
      />
      <ResourceTag
        type="workflow"
        text="Workflow"
        onClick={() => handleSelectButton("workflow")}
      />
      <ResourceTag
        type="component"
        text="Component"
        onClick={() => handleSelectButton("component")}
      />
    </div>
  );
};

export default PostFilter;
