import LeftSidebar from "@/components/shared/layout/LeftSidebar";
import RightSidebar from "@/components/shared/layout/RightSidebar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen bg-black-900">
      <LeftSidebar />
      <section className="flex-1">{children}</section>

      <RightSidebar />
    </main>
  );
};

export default MainLayout;
