import React from "react";

import { CheckSquare } from "lucide-react";

const Takeaways = ({
  experiences,
  postType,
}: {
  experiences: string[];
  postType: "knowledge" | "component" | "workflow";
}) => {
  let label;
  switch (postType) {
    case "knowledge":
      label = "Takeaways";
      break;
    case "component":
      label = "Features";
      break;
    case "workflow":
      label = "Steps";
      break;
    default:
      label = "Takeaways";
      break;
  }
  return (
    <div className="paragraph-1-bold flex w-full flex-col gap-y-2.5 px-[30px] py-6 text-white-100">
      <span className="">{label}</span>
      {experiences.length > 0
        ? experiences.map((experience, index) => (
            <>
              <span className="paragraph-2-regular flex gap-2 text-white-300 ">
                {" "}
                <CheckSquare
                  size={16}
                  className="mr-[8px] mt-[2px] stroke-green-400"
                />{" "}
                {experience}{" "}
              </span>
            </>
          ))
        : null}
    </div>
  );
};

export default Takeaways;
