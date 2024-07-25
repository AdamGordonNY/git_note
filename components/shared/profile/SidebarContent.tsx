"use client";
import React from "react";
import { IUser } from "@/database/models/user.model";

import EditSocials from "./edit/EditSocials";
import { Separator } from "@/components/ui/separator";

import { usePathname } from "next/navigation";
import SocialLinks from "./SocialLinks";
import SidebarAvatars from "../layout/SidebarAvatars";
import { SidebarTags } from "../layout/SidebarTags";

interface ProfileSidebarContentProps {
  user: Partial<IUser>;
  tags: string[];
}
const SidebarContent = ({ user, tags }: ProfileSidebarContentProps) => {
  const pathName = usePathname();
  const paths = ["/profile", "/profile/edit", "posts", "/"];
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-10 flex justify-center">
        <SidebarAvatars user={user} />
      </div>
      <div className="w-full gap-2 px-2 py-3.5">
        {pathName === "/profile" && <EditSocials user={user} />}
        {pathName === "/profile" && (
          <SocialLinks
            twitter={user.socials?.twitter!}
            github={user.socials?.github!}
            dribbble={user.socials?.dribbble!}
            linkedin={user.socials?.linkedin!}
            facebook={user.socials?.facebook!}
            instagram={user.socials?.instagram!}
          />
        )}
        {pathName !== "profile" && <SidebarTags />}
      </div>
      <Separator />

      {/* 1. Fill Other Pages 2. Expand - path can be an array of values, multiple paths can render the same/diff components */}
    </div>
  );
};

export default SidebarContent;
