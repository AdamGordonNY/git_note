"use client";
import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
const HeatMap = ({ values }: { values: any[] }) => {
  console.log(values);
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
        gutterSize={4}
      />
    </div>
  );
};

export default HeatMap;
