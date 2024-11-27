import React from "react";
import parse from "html-react-parser";
import type { DOMNode } from "html-react-parser";
import RenderedCodeEditor from "./RenderedCodeEditor";
interface DisplayPostContentProps {
  content: string;
}
const DisplayPostContent = ({ content }: DisplayPostContentProps) => {
  const transformNode = (node: DOMNode) => {
    if (node.type === "tag" && node.name === "pre") {
      let codeContent: string | undefined;
      node.children.forEach((childNode) => {
        if (childNode.type === "tag" && childNode.name === "code") {
          const textChild = childNode.children.find(
            (child) => child.type === "text"
          );
          if (textChild && "data" in textChild) codeContent = textChild?.data;
        }
      });

      if (!codeContent) return;

      return <RenderedCodeEditor code={codeContent} />;
    }
  };
  return (
    <div className="flex w-full items-center justify-between gap-x-5 px-[30px] pb-10 text-white-100">
      <div className="paragraph-2-regular mt-[54px]">
        {parse(content!, {
          replace: transformNode,
        })}
      </div>
    </div>
  );
};

export default DisplayPostContent;
