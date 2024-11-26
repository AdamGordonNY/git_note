import PostPage from "@/components/shared/layout/PostsPage";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

import { getSession } from "@/lib/authOptions";
import { redirect } from "next/navigation";

import React, { Suspense } from "react";

const Page = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <PostPage />
      </Suspense>
    </>
  );
};

export default Page;
