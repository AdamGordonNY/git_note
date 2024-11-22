"use client";
// eslint-disable-next-line no-unused-vars
import { useRouter, useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect } from "react";

import { CreateTypeBadge } from "@/components/ui/createTypeBadge";
import { removeKeysFromQuery } from "@/lib/utilities";
import { IPost } from "@/database/models/post.model";
const PostFilter = ({
  setPosts,
}: {
  setPosts: Dispatch<SetStateAction<IPost[]>>;
}) => {
  const searchParams = useSearchParams();
  const [active, setActive] = React.useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const postType = searchParams.get("postType");
    setActive(postType);
  }, [searchParams]);

  const handleSelectButton = (item: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", item.toLowerCase());
    params.set("page", "1");
    router.push(`${window.location.pathname}?${params.toString()}`, undefined);
  };

  const handleRemoveFilter = () => {
    const currentQuery = window.location.search;
    const newQuery = removeKeysFromQuery({
      params: currentQuery,
      keysToRemove: ["postType", "page", "pageSize"],
    });

    setActive(null);
    router.push(newQuery);
  };

  return (
    <div className="flex justify-end gap-x-3.5 max-lg:w-full max-lg:justify-between max-lg:gap-5">
      <CreateTypeBadge
        variant="knowledge"
        onClick={() =>
          active === "knowledge"
            ? handleRemoveFilter()
            : handleSelectButton("knowledge")
        }
        className="max-h-10"
      />
      <CreateTypeBadge
        variant="workflow"
        onClick={() => handleSelectButton("workflow")}
        className="max-h-10"
      />
      <CreateTypeBadge
        variant="component"
        onClick={() => handleSelectButton("component")}
        className="max-h-10"
      />
    </div>
  );
};

export default PostFilter;
