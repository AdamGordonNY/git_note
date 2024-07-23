"use server";

import RightSidebar from "@/components/shared/layout/RightSidebar";
import React, { Suspense } from "react";

import LeftSidebar from "@/components/shared/layout/LeftSidebar";

const MainLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string[] };
}) => {
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
