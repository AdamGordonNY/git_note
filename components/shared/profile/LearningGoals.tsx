import React from "react";
import LearningGoal from "./LearningGoal";
interface LearningGoalsProps {
  learningGoals?: {
    name: string;
    completed: boolean;
  }[];
}

export const LearningGoals = async ({ learningGoals }: LearningGoalsProps) => {
  return (
    <section className="border-profile-top flex w-full flex-col gap-7 ">
      <div>
        <span className="paragraph-1-bold text-white-100/90">
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
