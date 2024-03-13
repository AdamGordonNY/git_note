import { IUser } from "@/database/models/user.model";
import React from "react";

interface ExperienceLevelsProps {
  user: IUser;
  experienceLevels: string[];
}
const ExperienceLevels = ({
  user,
  experienceLevels,
}: ExperienceLevelsProps) => {
  return <div>ExperienceLevel</div>;
};

export default ExperienceLevels;
