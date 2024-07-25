import React from "react";
import SidebarAvatars from "../layout/SidebarAvatars";
import { usePathname } from "next/navigation";
import { IUser } from "@/database/models/user.model";
import SocialLinks from "./SocialLinks";
import EditSocials from "./edit/EditSocials";
import { Separator } from "@/components/ui/separator";
interface ProfileSidebarContentProps {
  user: Partial<IUser>;
  tags: string[];
}
const ProfileSidebarContent = ({ user, tags }: ProfileSidebarContentProps) => {
  const pathName = usePathname();
  if (pathName === "/profile")
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="mt-10 flex justify-center">
          <SidebarAvatars user={user} />
        </div>
        <div className="w-full gap-2 px-2 py-3.5">
          <EditSocials user={user} />
          <span className=""></span>
          <Separator />
          <SocialLinks
            twitter={user.socials?.twitter!}
            github={user.socials?.github!}
            dribbble={user.socials?.dribbble!}
            linkedin={user.socials?.linkedin!}
            facebook={user.socials?.facebook!}
            instagram={user.socials?.instagram!}
          />
        </div>
      </div>
    );
};

export default ProfileSidebarContent;
