"use client";
import React, { Suspense } from "react";
import RightSidebarSkeleton from "../RightSidebarSkeleton";
import SidebarAvatars from "./SidebarAvatars";
import EditSocials from "../profile/edit/EditSocials";
import { usePathname } from "next/navigation";
import SocialLinks from "../profile/SocialLinks";
import { useData } from "@/context/DataProvider";

const RightSidebar = ({ children }: { children?: React.ReactNode }) => {
  const pathName = usePathname();
  const [isProfile, setIsProfile] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  React.useEffect(() => {
    setIsProfile(pathName === "/profile");
    setIsEdit(pathName === "/profile/edit");
  }, [pathName]);

  const { user } = useData(); // Access user from the context

  return (
    <Suspense fallback={<RightSidebarSkeleton />}>
      <section className="flex min-h-full w-[282px] flex-col items-center border-l-[1.5px] bg-black-800 text-white-100 max-md:hidden">
        <SidebarAvatars user={user!} />
        {isEdit && <EditSocials user={user!} />}
        {isProfile && (
          <SocialLinks
            twitter={user?.socials?.twitter! || ""}
            github={user?.socials?.github! || ""}
            dribbble={user?.socials?.dribbble! || ""}
            linkedin={user?.socials?.linkedin! || ""}
            instagram={user?.socials?.instagram! || ""}
            facebook={user?.socials?.facebook! || ""}
          />
        )}
        {children}
      </section>
    </Suspense>
  );
};

export default RightSidebar;
