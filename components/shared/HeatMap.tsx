"use client";
import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
const HeatMap = ({ values }: { values: any[] }) => {
  return (
    <div className="flex w-full">
      <CalendarHeatmap
        values={values}
        monthLabels={[
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ]}
        startDate={new Date("2024-01-01")}
        endDate={new Date("2024-12-31")}
        classForValue={(value) => {
          if (!value) {
            return "fill-green-900";
          }
          return `color-scale-${value.count}`;
        }}
        weekdayLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        showMonthLabels
        showWeekdayLabels
        gutterSize={4}
      />
      <div className="">
        <p className="paragraph-4-medium text-white-100"></p>
      </div>
    </div>
  );
};

export default HeatMap;
