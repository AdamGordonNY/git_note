import ProfileHeader from "@/components/shared/profile/ProfileHeader";

import { getOneUser } from "@/lib/actions/user.actions";
import { getSession } from "@/lib/authOptions";

import React from "react";
// profile of the user will go here

const ProfilePage = async () => {
  const session = await getSession();

  const user = await getOneUser(session?.user?.email!);

  return (
    <div className="flex-center flex-col">{user && <ProfileHeader />}</div>
  );
};

export default ProfilePage;
