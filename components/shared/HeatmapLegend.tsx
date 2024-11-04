import React from "react";

import { SquareIcon } from "lucide-react";
const classes = [
  "fill-contribution-100",
  "fill-contribution-200",
  "fill-contribution-300",
  "fill-contribution-400",
  "fill-contribution-500",
];
const HeatmapLegend = () => {
  return (
    <div className="flex flex-row max-lg:justify-center">
      {classes.map((className, index) => (
        <SquareIcon key={index} className={className} />
      ))}
    </div>
  );
};

export default HeatmapLegend;
