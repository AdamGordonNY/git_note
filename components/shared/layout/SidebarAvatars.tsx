import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/database/models/user.model";
import Link from "next/link";
import React from "react";

const SidebarAvatars = ({ user }: { user: Partial<IUser> }) => {
  return (
    <Link
      href={`/profile`}
      className="mx-[60px] flex-1 flex-col items-center justify-center "
    >
      <div className=" mt-[50px] flex gap-[6px]">
        <Avatar className="sidebar-avatar">
          <AvatarImage src={user?.image!} alt="user avatar" />
          <AvatarFallback>{user?.fullname?.slice(0)}</AvatarFallback>
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
    </Link>
  );
};

export default SidebarAvatars;
