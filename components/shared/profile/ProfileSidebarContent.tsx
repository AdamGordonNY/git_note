import React from "react";

import { getSession } from "@/lib/authOptions";

import { getOneUser } from "@/lib/actions/user.actions";
import Image from "next/image";

interface ProfileSidebarContentProps {
  socialLinks: {
    label: string;
    route: string;
    icon: React.JSX.Element;
  }[];
}
const ProfileSidebarContent = async ({
  socialLinks,
}: ProfileSidebarContentProps) => {
  let user;
  const session = await getSession();
  if (session) {
    user = await getOneUser(session.user?.email!);
  }
  const freshUser = JSON.parse(JSON.stringify(user));
  return (
    <div className="right-sidebar-profile_wrapper">
      <div className="profile-sidebar-avatar_wrapper">
        <Image src={freshUser?.image!} alt="user avatar" />
      </div>
      <div></div>
    </div>
  );
};

export default ProfileSidebarContent;
