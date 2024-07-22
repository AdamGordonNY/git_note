"use client";
import { IUser } from "@/database/models/user.model";
import React, { useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";
import { formatDate } from "date-fns";
type mapValue = {
  date: string;
  count: number;
};

export const dynamic = "force-dynamic";
const HeatMap = ({
  values,
  user,
}: {
  values: mapValue[];
  user: Partial<IUser>;
}) => {
  const [mapValues, setMapValues] = React.useState<any[]>([]);
  const earliestPost = values.reduce((earliest, current) => {
    return new Date(current.date) < new Date(earliest.date)
      ? current
      : earliest;
  }, values[0]);

  const earliestDate = new Date(earliestPost.date);
  useEffect(() => {
    if (values) {
      const map: any[] = Array.from(values, (val, idx) => ({
        date: val.date,
        count: val.count,
      }));
      map !== null && setMapValues(map);
    }
  }, [values]);

  return (
    <>
      <CalendarHeatmap
        startDate={earliestDate}
        endDate={new Date(earliestDate).getFullYear()}
        showWeekdayLabels={false}
        showOutOfRangeDays={false}
        gutterSize={5}
        tooltipDataAttrs={(value: { date: string; count: number }) => {
          if (!value?.date) {
            return null;
          }

          return {
            "data-tooltip-id": "my-tooltip",
            "data-tooltip-content": `${formatDate(value.date, "MMM do")} Contributions: ${value.count}`,
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
        values={mapValues}
      />
      <Tooltip id="my-tooltip" />

      <span className="text-white-300">Learn how we count contributions</span>
    </>
  );
};

export default HeatMap;
