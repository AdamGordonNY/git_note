import React, { Suspense } from "react";
import SidebarContent from "../profile/SidebarContent";
import { IUser } from "@/database/models/user.model";
import { getSession } from "@/lib/authOptions";
import { getOneUser } from "@/lib/actions/user.actions";
import RightSidebarSkeleton from "../RightSidebarSkeleton";

const RightSidebar = async ({ params }: { params?: string[] }) => {
  const session = await getSession();
  let user;

  if (session) {
    user = await getOneUser(session?.user?.email!);
  }
  const cleanUser: IUser = JSON.parse(JSON.stringify(user));

  return (
    <section className=" max-w-[292px] border-l-[1.5px] bg-black-800 text-white-100 max-xl:hidden">
      <Suspense fallback={<RightSidebarSkeleton />}>
        <SidebarContent user={cleanUser} />
      </Suspense>
    </section>
  );
};

export default RightSidebar;
