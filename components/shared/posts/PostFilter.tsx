"use client";
// eslint-disable-next-line no-unused-vars
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { CreateTypeBadge } from "@/components/ui/createTypeBadge";
import { removeKeysFromQuery } from "@/lib/utilities";
const PostFilter = () => {
  // const searchParams = useSearchParams();
  const [active, setActive] = React.useState<string | null>(null);
  const router = useRouter();
  // useEffect(() => {
  //   const postType = searchParams.get("postType");
  //   setActive(postType);
  // }, [searchParams]);
  const handleSelectButton = (item: string) => {
    // const mySearchParams = new URLSearchParams(searchParams.toString());
    // mySearchParams.set("postType", item.toLowerCase());
    // mySearchParams.set("page", "1");
    // formUrlQuery({ params: active!, key: mySearchParams.keys(), value });
    // router.push(
    //   `${window.location?.origin}/posts/?${mySearchParams.get("postType")?.toString()}`,
    //   undefined
    // );
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
