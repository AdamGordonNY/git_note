import PostPage from "@/components/shared/layout/PostsPage";

import { getUniqueTags } from "@/lib/actions/post.actions";
import { getSession } from "@/lib/authOptions";
import { redirect } from "next/navigation";

import React, { Suspense } from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const postTags: string[] = await getUniqueTags();
  postTags.slice(0, 12);

  return (
    <>
      <Suspense>
        <PostPage params={JSON.parse(JSON.stringify(searchParams))} />
      </Suspense>
    </>
  );
};

export default Page;
