import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { techStackBadges } from "@/lib/constants";

interface TechBadgesProps {
  technology: string;
}
const TechBadge = ({ technology }: TechBadgesProps) => {
  const icon = techStackBadges.find(
    (badge: any) => badge.name === technology
  )?.icon;
  const size = 32;
  const displayName = techStackBadges.find(
    (badge: any) => badge.name === technology
  )?.displayName;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="cursor-pointer ">{icon && icon(size)}</Button>
        </TooltipTrigger>
        <TooltipContent className=" gap-2.5 text-nowrap rounded-[4px] bg-black-700 px-1 py-2.5 capitalize text-white-300">
          <p>{displayName}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TechBadge;
