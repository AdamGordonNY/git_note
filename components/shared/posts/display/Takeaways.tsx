import React, { useEffect, useState } from "react";

import { CheckSquare } from "lucide-react";
import RenderedCodeEditor from "./RenderedCodeEditor";
import "prismjs/themes/prism.css";

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
            <>
              <CheckSquare
                size={16}
                className="mr-[8px] mt-[2px] stroke-green-400"
              />{" "}
              {experience}{" "}
            </>
          ))
        : null}
      {code && <RenderedCodeEditor code={code} />}
    </div>
  );
};

export default Takeaways;
