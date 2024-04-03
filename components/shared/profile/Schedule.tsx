import { IUser } from "@/database/models/user.model";
import React from "react";
import userCheck from "@/public/icons/usercheck.svg";
import Image from "next/image";
import iconClock from "@/public/icons/icn-clock.svg";
import { format } from "date-fns";
interface ScheduleProps {
  user: Partial<IUser>;
}
const Schedule = async ({ user }: ScheduleProps) => {
  const { startTime, endTime, newProjects } = user;

  return (
    <section className="flex w-full flex-col gap-8">
      <span className="paragraph-1-bold text-white-100">Schedule</span>
      <div className="space-y-2">
        <div className="paragraph-3-regular flex gap-2 text-white-300">
          <Image src={userCheck} alt="userCheck" />
          {newProjects === true
            ? "Available for New Projects"
            : "Currently working on a Project"}
        </div>
        <div className="pargraph-3-regular flex gap-2 text-white-300">
          <Image src={iconClock} alt="iconClock" />
          <span className="paragraph-3-regular text-white-300">
            {format(startTime!, "MMMM do , yyyy")} -{" "}
            {format(endTime!, "MMMM do , yyyy")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
