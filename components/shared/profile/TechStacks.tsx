import React from "react";

import { IUser } from "@/database/models/user.model";

import TechBadge from "./TechBadge";

interface TechStacksProps {
  user: IUser;
  technologies: string[];
}
const TechStacks = async ({ user }: TechStacksProps) => {
  const tech = user.technologies;

  return (
    <section className="flex flex-col gap-7">
      <span className=" paragraph-1-bold text-white-100">
        Technology Stacks
      </span>

      <div className="flex flex-row">
        {tech &&
          tech?.map((technology: any) => {
            return (
              <>
                {" "}
                <TechBadge key={technology} technology={technology} />
              </>
            );
          })}
      </div>
    </section>
  );
};

export default TechStacks;
