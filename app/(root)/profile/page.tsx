import ProfileHeader from "@/components/shared/profile/ProfileHeader";
import TechStacks from "@/components/shared/profile/TechStacks";
import { getOneUser } from "@/lib/actions/user.actions"; // Removed unused import
import { getSession } from "@/lib/authOptions";
import ExperienceLevels from "@/components/shared/profile/ExperienceLevels";
import React from "react";
import LearningGoals from "@/components/shared/profile/LearningGoals";
import { IUser } from "@/database/models/user.model";
import { Separator } from "@/components/ui/separator";
import Schedule from "@/components/shared/profile/Schedule";

const ProfilePage = async () => {
  const session = await getSession();
  let user;

  if (session) {
    user = await getOneUser(session?.user?.email!);
  }
  const cleanUser: IUser = JSON.parse(JSON.stringify(user));

  return (
    <section className="mb-10 box-border flex min-h-[screen] w-full flex-col gap-8 bg-black-900 px-[30px] pt-[40px] ">
      {user && <ProfileHeader user={cleanUser} />}
      <Separator className="text-white-500" />
      {user && (
        <LearningGoals user={user} learningGoals={cleanUser.learningGoals} />
      )}
      <Separator className="text-white-500" />
      {user && (
        <ExperienceLevels
          user={user}
          experienceLevels={user.experiences ?? []}
        />
      )}
      <Separator className="text-white-500" />
      {user && (
        <TechStacks user={user} technologies={user.technologies ?? []} />
      )}
      <Separator className="text-white-500" />
      <Schedule user={cleanUser} />
    </section>
  );
};

export default ProfilePage;
