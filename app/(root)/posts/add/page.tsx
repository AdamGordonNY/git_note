import React, { Suspense } from "react";
import CreatePost from "@/components/shared/posts/form-components/CreatePost";
import { getUniqueTags } from "@/lib/actions/post.actions";
import dbConnect from "@/database/dbConnect";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
const Page = async () => {
  await dbConnect();

  const uniqueTags = await getUniqueTags();

  return (
    <div className="mb-10 flex w-full flex-col justify-normal lg:px-[30px]">
      <Suspense fallback={<LoadingSpinner />}>
        <CreatePost uniqueTags={uniqueTags} />
      </Suspense>
    </div>
  );
};

export default Page;
