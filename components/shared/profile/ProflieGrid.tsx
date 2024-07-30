import React from "react";
import HeatMap from "../HeatMap";
import { getPostCount } from "@/lib/actions/post.actions";

const ProflieGrid = async () => {
  const commitArray = await getPostCount();
  return (
    <div className="border-profile-top flex w-full flex-col gap-y-2">
      <span className="display-1-bold text-left text-white-100">
        Contribution Grid
      </span>
      <HeatMap values={commitArray!} />
    </div>
  );
};

export default ProflieGrid;
