import React from "react";
import LearningGoal from "./LearningGoal";
import { IUser } from "@/database/models/user.model";
import { getSession } from "next-auth/react";
import { getOneUser } from "@/lib/actions/user.actions";
interface LearningGoalsProps {
  user: Partial<IUser>;
  learningGoals?: {
    name: string;
    completed: boolean;
  }[];
}

export const LearningGoals = async ({
  user,
  learningGoals,
}: LearningGoalsProps) => {
  const session = await getSession();
  if (session) {
    user = await getOneUser(session.user?.email!);
  }
  let cleanUser;
  if (user && session?.user?.email === user?.email) {
    cleanUser = JSON.parse(JSON.stringify(user));
  }

  return (
    <div className="w-full px-[30px]">
      {learningGoals?.map((goal, idx) => {
        return (
          <LearningGoal
            key={goal.name}
            name={goal.name}
            completed={goal.completed}
          />
        );
      })}
    </div>
  );
};

export default LearningGoals;
