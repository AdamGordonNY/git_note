"use client";
import React from "react";
import HeatMap from "../HeatMap";
import { useData } from "@/context/DataProvider";

const ProflieGrid = () => {
  const { commitArray } = useData();

  return (
    <div className="border-profile-top flex w-full flex-col gap-y-2">
      <span className="display-1-bold text-left text-white-100">
        Contribution Grid
      </span>
      <HeatMap
        values={commitArray && JSON.parse(JSON.stringify(commitArray))}
      />
    </div>
  );
};

export default ProflieGrid;
