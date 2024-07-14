import React, { useEffect, useState } from "react";

import { CheckSquare } from "lucide-react";
import Prism from "prismjs";
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
  const [isPreview, setIsPreview] = useState(false);
  useEffect(() => {
    if (postType === "component" || codeContent!) {
      setCode(codeContent!);
      if (isPreview) Prism.highlightAll();
    }
  }, [codeContent, isPreview, postType]);
  return (
    <div className="paragraph-1-bold flex w-full flex-col gap-y-2.5 px-[30px] py-6 text-white-100">
      <span className="">{label}</span>
      {experiences.length > 0
        ? experiences.map((experience, index) => (
            <React.Fragment key={index}>
              <button
                className="paragraph-2-regular flex gap-2 text-white-300 "
                onClick={() => setIsPreview(!isPreview)}
              >
                {" "}
                <CheckSquare
                  size={16}
                  className="mr-[8px] mt-[2px] stroke-green-400"
                />{" "}
                {experience}{" "}
              </button>
            </React.Fragment>
          ))
        : null}
      {isPreview && <RenderedCodeEditor active={isPreview} code={code} />}
    </div>
  );
};

export default Takeaways;
