import React, { useEffect, useState } from "react";

import { CheckSquare } from "lucide-react";
import RenderedCodeEditor from "./RenderedCodeEditor";

const Takeaways = ({
  experiences,
  postType,
  codeContent,
}: {
  experiences: string[];
  postType: "knowledge" | "component" | "workflow";
  codeContent?: string;
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

  const [code, setCode] = useState("");

  useEffect(() => {
    if (postType === "component" || codeContent!) {
      setCode(codeContent!);
    }
  }, [codeContent, postType]);
  return (
    <div className="paragraph-1-bold flex w-full flex-col gap-y-2.5 px-[30px] py-6 text-white-100">
      <span className="">{label}</span>
      {experiences.length > 0
        ? experiences.map((experience, index) => (
            <div
              className="gap-x-1.6 inline-flex  flex-row items-center align-middle"
              key={index}
            >
              <CheckSquare
                key={index}
                size={16}
                className="mr-[8px] mt-[2px] stroke-green-400"
              />{" "}
              <span className="paragraph-2-regular"> {experience} </span>
            </div>
          ))
        : null}
      {code && <RenderedCodeEditor code={code} />}
    </div>
  );
};

export default Takeaways;
