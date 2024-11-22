"use client";
// eslint-disable-next-line no-unused-vars
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

import { CreateTypeBadge } from "@/components/ui/createTypeBadge";
import { removeKeysFromQuery } from "@/lib/utilities";
const PostFilter = ({ setPosts }: { setPosts: any }) => {
  const searchParams = useSearchParams();
  const [active, setActive] = React.useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const postType = searchParams.get("filter");
    setActive(postType);
  }, [searchParams]);

  const handleSelectButton = (item: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", item.toLowerCase());

    router.push(`${window.location.pathname}?${params.toString()}`, undefined);
  };

  const handleRemoveFilter = () => {
    const currentQuery = window.location.search;
    const newQuery = removeKeysFromQuery({
      params: currentQuery,
      keysToRemove: ["filter"],
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
        onClick={() =>
          active === "workflow"
            ? handleRemoveFilter()
            : handleSelectButton("workflow")
        }
        className="max-h-10"
      />
      <CreateTypeBadge
        variant="component"
        onClick={() =>
          active === "component"
            ? handleRemoveFilter()
            : handleSelectButton("component")
        }
        className="max-h-10"
      />
    </div>
  );
};

export default PostFilter;
