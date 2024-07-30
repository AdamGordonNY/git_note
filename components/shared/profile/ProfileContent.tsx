import React from "react";
import ProfileHeader from "./ProfileHeader";
import { Separator } from "@/components/ui/separator";
import LearningGoals from "./LearningGoals";
import ExperienceLevels from "./ExperienceLevels";
import TechStacks from "./TechStacks";
import Schedule from "./Schedule";
import { IUser } from "@/database/models/user.model";
import ProflieGrid from "./ProflieGrid";

const ProfileContent = async ({ cleanUser }: { cleanUser: IUser }) => {
  if (!cleanUser) return null;
  return (
    <section className="mb-10 box-border flex  w-full flex-col gap-8 bg-black-900 px-[30px] pt-[40px] ">
      <ProfileHeader user={cleanUser} />
      <Separator className="text-white-500" />
      <ProflieGrid />
      <LearningGoals learningGoals={cleanUser.learningGoals} />

      <Separator className="text-white-500" />

      <ExperienceLevels experienceLevels={cleanUser.experiences ?? []} />

      <Separator className="text-white-500" />

      <TechStacks user={cleanUser} />

      <Separator className="text-white-500" />
      <Schedule user={cleanUser} />
    </section>
  );
};

export default ProfileContent;
