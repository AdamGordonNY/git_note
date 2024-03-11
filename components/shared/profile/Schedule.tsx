import { IUser } from "@/database/models/user.model";
import React from "react";

interface ScheduleProps {
  user: IUser;
  schedule: string[];
}
const Schedule = async ({ user, schedule }: ScheduleProps) => {
  return <div>Schedule</div>;
};

export default Schedule;
