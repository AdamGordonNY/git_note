"use client";
import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";
import { format } from "date-fns";

import HeatmapLegend from "./HeatmapLegend";
const HeatMap = ({ values }: { values: Date[] }) => {
  const dateCountMap = new Map<string, number>();
  console.log(values);
  values.forEach((date: any) => {
    const dateString = date.split("T")[0]; // Extract date in YYYY-MM-DD format
    if (dateCountMap.has(dateString)) {
      dateCountMap.set(dateString, dateCountMap.get(dateString)! + 1);
    } else {
      dateCountMap.set(dateString, 1);
    }
  });

  const heatMapValues = Array.from(dateCountMap, ([date, count]) => ({
    date,
    count,
  }));

  return (
    <>
      {values && (
        <CalendarHeatmap
          startDate={"01/01/2024"}
          endDate={new Date("12/31/2024")}
          showWeekdayLabels={true}
          weekdayLabels={["S", "M", "T", "W", "T", "F", "S"]}
          showOutOfRangeDays={false}
          gutterSize={5}
          tooltipDataAttrs={(value: { date: string; count: number }) => {
            if (!value?.date) {
              return null;
            }

            return {
              "data-tooltip-id": "my-tooltip",
              "data-tooltip-content": `${format(new Date(value.date), "MMM do")} Contributions: ${value.count}`,
            };
          }}
          classForValue={(value) => {
            if (!value || value.count === 0) {
              return "color-github-0";
            }

            const thresholds = [1, 3, 5, 10];

            let className = "color-github-";
            if (value.count >= thresholds[3]) {
              className += "4";
            } else if (value.count >= thresholds[2]) {
              className += "3";
            } else if (value.count >= thresholds[1]) {
              className += "2";
            } else if (value.count >= thresholds[0]) {
              className += "1";
            } else {
              className += "0";
            }

            return className;
          }}
          values={heatMapValues}
        />
      )}
      <Tooltip id="my-tooltip" />
      <div className="flex w-full flex-row justify-between px-[30px]">
        <span className="text-white-300">Learn how we count contributions</span>
        <div className="flex flex-row gap-x-2 text-white-300">
          Less
          <HeatmapLegend />
          More
        </div>
      </div>
    </>
  );
};

export default HeatMap;
