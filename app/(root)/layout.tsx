"use server";

import RightSidebar from "@/components/shared/layout/RightSidebar";
import React, { Suspense } from "react";

import LeftSidebar from "@/components/shared/layout/LeftSidebar";
import { getUniqueTags } from "@/lib/actions/post.actions";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const tags = await getUniqueTags();
  tags?.slice(0, 10);

  return (
    <main className="flex min-h-screen w-full bg-black-900">
      <Suspense fallback={"loading..."}>
        <LeftSidebar />
      </Suspense>
      <section className="flex w-fit flex-1">{children}</section>
      <Suspense>
        <RightSidebar />
      </Suspense>
    </main>
  );
};

export default MainLayout;
