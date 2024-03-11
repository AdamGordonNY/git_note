import React from "react";
import { Badge } from "@/components/ui/badge";
import { IUser } from "@/database/models/user.model";

interface TechStacksProps {
  user: IUser;
  technologies: string[];
}
const TechStacks = ({ user }: TechStacksProps) => {
  const tech = user.technologyStack;
  return (
    <div className="flex flex-col">
      <span className="profile-page_section-header">Technology Stacks</span>
      {/* Wrap in a div to apply same font styling - can control sizing as well */}
      {tech &&
        tech?.map((technology) => {
          return <Badge key={technology} slot="slot" />;
        })}
    </div>
  );
};

export default TechStacks;
