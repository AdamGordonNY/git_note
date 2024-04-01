"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/database/models/user.model";
interface ProfileSidebarContentProps {
  user: Partial<IUser>;
  socialLinks: {
    label: string;
    route: string;
    icon: React.JSX.Element;
  }[];
}
const ProfileSidebarContent = ({
  socialLinks,
  user,
}: ProfileSidebarContentProps) => {
  return (
    <div className="right-sidebar-profile_wrapper">
      <div className="profile-sidebar-avatar_wrapper">
        <Avatar className="rounded-[2px]">
          <AvatarImage src={user.image!} alt="user avatar" />
          <AvatarFallback>{user.fullname?.slice(0)}</AvatarFallback>
        </Avatar>
        <span className="">{user.fullname}</span>
      </div>
      <div></div>
    </div>
  );
};

export default ProfileSidebarContent;
