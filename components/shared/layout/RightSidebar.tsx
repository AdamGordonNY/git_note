"use client";
import React, { Suspense } from "react";
import { IUser } from "@/database/models/user.model";
import RightSidebarSkeleton from "../RightSidebarSkeleton";
import SidebarAvatars from "./SidebarAvatars";
import EditSocials from "../profile/edit/EditSocials";

const RightSidebar = ({
  user,
  isProfile,

  children,
}: {
  user: Partial<IUser>;

  isProfile: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <Suspense fallback={<RightSidebarSkeleton />}>
      <section className=" flex w-[282px] flex-col items-center   border-l-[1.5px] bg-black-800 text-white-100 max-lg:hidden">
        <SidebarAvatars user={user!} />{" "}
        {isProfile && <EditSocials user={user} />}
        {children}
      </section>
    </Suspense>
  );
};

export default RightSidebar;
