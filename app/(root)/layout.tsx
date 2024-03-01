import LeftSidebar from "@/components/shared/layout/LeftSidebar";
// import RightSidebar from "@/components/shared/layout/RightSidebar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-black-900">
      <LeftSidebar />
      {children}
      {/* <RightSidebar /> */}
    </main>
  );
};

export default MainLayout;
