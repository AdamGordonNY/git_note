import { Textarea } from "@/components/ui/textarea";
import React from "react";
interface CodeProps {
  code: string;
}
const Code = ({ code }: CodeProps) => {
  const generateLineNumbers = () => {
    const lines = code.split("\n");
    return lines.map((_: string, idx: number) => (
      <div key={idx}>{idx + 1}</div>
    ));
  };
  return (
    <div className="code-editor-container">
      <Textarea
        contentEditable={false}
        id="code"
        className="code-editor-textarea bg-black-700 px-3.5 py-3"
        spellCheck={false}
        placeholder="Write your code here"
      />

      <div className="code-editor-line-numbers">{generateLineNumbers()}</div>
    </div>
  );
};

export default Code;
