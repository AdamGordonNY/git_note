"use client";
import React, { Suspense, useEffect } from "react";
import { IUser } from "@/database/models/user.model";
import RightSidebarSkeleton from "../RightSidebarSkeleton";
import SidebarAvatars from "./SidebarAvatars";
import EditSocials from "../profile/edit/EditSocials";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const RightSidebar = ({
  user,
  children,
}: {
  user: Partial<IUser>;
  children: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const isProfile = pathName === "/profile" || pathName === "/profile/edit";

  useEffect(() => {
    if (pathName === "/posts") {
      const mySearchParams = new URLSearchParams(searchParams.toString());
      mySearchParams.delete("tag");
      router.replace("/dashboard?" + mySearchParams.toString());
    }
  });

  return (
    <section className=" fixed inset-y-0 right-0 max-w-[292px] border-l-[1.5px] bg-black-800 text-white-100 max-xl:hidden">
      <Suspense fallback={<RightSidebarSkeleton />}>
        <div className="flex flex-col items-center justify-center">
          <div className="mt-10 flex justify-center">
            <SidebarAvatars user={user!} />
          </div>
          <div className="mt-10 w-full gap-2 px-2 py-3.5">
            {isProfile && <EditSocials user={user} />}
          </div>
          <Separator />
          <div className="flex flex-col gap-3">{children}</div>
        </div>
      </Suspense>
    </section>
  );
};

export default RightSidebar;
