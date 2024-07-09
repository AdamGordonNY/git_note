import React from "react";
import { CheckSquare } from "lucide-react";
interface ExperienceProps {
  experiences: string[];
}

const Experience = async ({ experiences }: ExperienceProps) => {
  return (
    <div className="py-7.5 flex w-full gap-2.5 px-6">
      <span className="paragraph-1-bold text-white-100">
        <div className="h-6 gap-2">
          {experiences?.map((exp, idx) => (
            <span
              key={idx}
              className="paragraph-2-regular flex gap-1.5 text-white-300"
            >
              <CheckSquare stroke="green-400" size={16} />
              {exp}
            </span>
          ))}
        </div>
      </span>
    </div>
  );
};

export default Experience;
