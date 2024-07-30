import { getOneUser } from "@/lib/actions/user.actions"; // Removed unused import
import { getSession } from "@/lib/authOptions";
import React from "react";
import { IUser } from "@/database/models/user.model";
import ProfileContent from "@/components/shared/profile/ProfileContent";

const ProfilePage = async () => {
  const session = await getSession();
  let user;

  if (session) {
    user = await getOneUser(session?.user?.email!);
  }
  const cleanUser: IUser = JSON.parse(JSON.stringify(user));

  return <ProfileContent cleanUser={cleanUser} />;
};

export default ProfilePage;
