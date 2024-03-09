import React from "react";
import { Badge } from "@/components/ui/badge";

interface TechStacksProps {
  user: {
    technologies: string[];
  };
}
const TechStacks = ({ user }: TechStacksProps) => {
  const tech = user.technologies;
  return (
    <div className="flex flex-col">
      <span className="profile-page_section-header">Technology Stacks</span>
      {/* Wrap in a div to apply same font styling - can control sizing as well */}
      {user &&
        tech.map((technology) => {
          return <Badge key={technology.indexOf(technology)} slot="" />;
        })}
    </div>
  );
};

export default TechStacks;
