import { filterPostsByType } from "@/lib/actions/post.actions";
import { CreateType } from "@/types";
import React from "react";

const Page = async ({ params }: { params: string[] }) => {
  const postType = params[0].toLowerCase() as CreateType;
  const handleFilter = async () => {
    await filterPostsByType({ postType });
  };
  if (postType) {
    const posts = await filterPostsByType({ postType });
  }
  return <div></div>;
};

export default Page;
