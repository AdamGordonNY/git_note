import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/database/models/user.model";

import EditSocials from "./edit/EditSocials";
import { Separator } from "@/components/ui/separator";
interface ProfileSidebarContentProps {
  user: Partial<IUser>;
}
const ProfileSidebarContent = ({ user }: ProfileSidebarContentProps) => {
  return (
    <div className=" flex-1 flex-col items-center justify-center ">
      <div className="ml-[28px] mt-[50px] flex gap-[6px]">
        <Avatar className="sidebar-avatar">
          <AvatarImage src={user.image!} alt="user avatar" />
          <AvatarFallback>{user.fullname?.slice(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="paragraph-3-medium text-white-100">
            {user.fullname}
          </span>
          <span className="paragraph-4-regular text-white-300">
            {user.email}
          </span>
        </div>
      </div>
      <Separator />
      <div className="gap-2 px-2 py-3.5">
        <EditSocials user={user} />
      </div>
    </div>
  );
};

export default ProfileSidebarContent;
