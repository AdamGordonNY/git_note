import { Badge } from "@/components/ui/badge";
import { IUser } from "@/database/models/user.model";
import React from "react";

interface LearningGoalsProps {
  user: IUser;
  learningGoals: string[];
}

const LearningGoals = ({ user, learningGoals }: LearningGoalsProps) => {
  return (
    <div>
      {learningGoals && (
        <div className="flex flex-col">
          <span className="profile-page_section-header">Learning Goals</span>
          {learningGoals?.map((goal) => {
            return <Badge key={goal} slot={goal} />;
          })}
        </div>
      )}
    </div>
  );
};

export default LearningGoals;
