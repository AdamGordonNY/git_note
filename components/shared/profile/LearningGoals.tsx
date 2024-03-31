import React from "react";
import LearningGoal from "./LearningGoal";
import { IUser } from "@/database/models/user.model";
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
  return (
    <section className="border-profile-top flex w-full flex-col space-y-6">
      <div>
        <span className="paragraph-1-bold text-white-100">
          {" "}
          Learning Goals{" "}
        </span>
      </div>
      <div className="space-y-1.5">
        {learningGoals?.map((goal, idx) => {
          return (
            <React.Fragment key={goal.name}>
              <LearningGoal
                key={goal.name}
                name={goal.name}
                completed={goal.completed}
              />
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default LearningGoals;
