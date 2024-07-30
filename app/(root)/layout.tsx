"use server";

import React from "react";
import { getSession } from "@/lib/authOptions";
import { redirect } from "next/navigation";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }
  return (
    <main className="flex min-h-screen w-full bg-black-900">{children}</main>
  );
};

export default MainLayout;
