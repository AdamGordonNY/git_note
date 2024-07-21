"use client";
import { IUser } from "@/database/models/user.model";
import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
const HeatMap = ({ values, user }: { values: any[]; user: Partial<IUser> }) => {
  return (
    <>
      <CalendarHeatmap
        startDate={new Date("07/01/2024")}
        endDate={"6/01/2025"}
        showWeekdayLabels={false}
        showOutOfRangeDays={false}
        gutterSize={5}
        tooltipDataAttrs={(value: { date: string; count: number }) => {
          if (!value?.date) {
            return null;
          }

          return {
            "data-tooltip-id": "my-tooltip",
            "data-tooltip-content": `${value.date} has count: ${value.count}`,
          };
        }}
        classForValue={(value) => {
          if (!value || value.count === 0) {
            return "color-github-0";
          }

          const thresholds = [1, 5, 10, 15];

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
        values={values}
      />
      <span className="text-white-300">Learn how we count contributions</span>
    </>
  );
};

export default HeatMap;
