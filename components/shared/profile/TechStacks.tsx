import React from "react";

import { IUser } from "@/database/models/user.model";
import { techStackBadges } from "@/lib/constants";
interface TechStacksProps {
  user: IUser;
  technologies: string[];
}
const TechStacks = async ({ user }: TechStacksProps) => {
  const tech = user.technologies;
  console.log(tech);
  return (
    <section className="flex flex-col">
      <span className=" paragraph-1-bold text-white-100">
        Technology Stacks
      </span>
      {/* Wrap in a div to apply same font styling - can control sizing as well */}
      <div className="flex flex-row">
        {tech &&
          tech?.map((technology: any) => {
            console.log(technology);
            const icon = techStackBadges.find(
              (badge: any) => badge.name === technology
            );
            console.log(icon);
            if (icon)
              return (
                <div className="size-16 gap-2">
                  <span key={technology.name} className="size-8  bg-black-600">
                    {icon.icon(32)}
                  </span>
                </div>
              );
            else return null; // Add a return statement here
          })}
      </div>
    </section>
  );
};

export default TechStacks;
