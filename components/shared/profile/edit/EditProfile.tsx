"use client";
import User, { IUser } from "@/database/models/user.model";
import React, { useEffect, useState, useTransition } from "react";
import UploadPhoto from "./UploadPhoto";
import EditBasics from "./EditBasics";
import EditTech from "./EditTech";
import EditGoals from "./EditGoals";
import EditSchedule from "./EditSchedule";

interface EditProfileProps {
  user: IUser;
}
const EditProfile = ({ user }: EditProfileProps) => {
  const [theUser, setTheUser] = useState<IUser | null>(user);
  const [pending, startTransition] = useTransition();
  const [userLocation, setUserLocation] = useState<string>("");
  const [userGoals, setUserGoals] = useState<string[]>([]);
  const [userPortfolio, setUserPortfolio] = useState<string>("");
  const [userLearningGoals, setUserLearningGoals] = useState<string[]>([]);
  const [userExperienceLevel, setUserExperienceLevel] = useState<string[]>([]);
  const [userAvailability, setUserAvailability] = useState<Date[]>([]);

  useEffect(() => {
    if (user) {
      startTransition(() => {
        setTheUser(user);
      });
    }
  });
  return (
    <div className="px-[30px] ">
      <UploadPhoto email={user?.email} />
      <EditBasics
        _id={user._id}
        email={user.email}
        fullname={user.fullname}
        portfolio={user.portfolio!}
      />
      <EditTech />
      <EditGoals goals={user.learningGoals!} _id={user.id} />
      <EditSchedule availability={userAvailability} />
    </div>
  );
};

export default EditProfile;
