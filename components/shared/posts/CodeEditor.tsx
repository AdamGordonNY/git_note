"use client";
import { Textarea } from "@/components/ui/textarea";
import Prism from "prismjs";
import React, { useEffect } from "react";
interface CodeEditorProps {
  register: any;
}
const CodeEditor = ({ register }: CodeEditorProps) => {
  const [code, setCode] = React.useState("");
  const codeEditorRef = React.useRef<HTMLTextAreaElement>(null);
  const generateLineNumbers = () => {
    const lines = code.split("\n");
    return lines.map((_, idx) => {
      return <div key={idx}>{idx + 1} </div>;
    });
  };
  useEffect(() => {
    if (codeEditorRef.current) {
      codeEditorRef.current.style.height = "auto";
      codeEditorRef.current.style.height =
        codeEditorRef.current.scrollHeight + "px";
    }
    Prism.highlightAll();
  }, [code]);
  return (
    <>
      <div className="code-editor-container">
        <Textarea
          ref={codeEditorRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="code-editor-textarea"
          spellCheck={false}
          {...register("code")}
        />
        <div className="code-editor-line-numbers">{generateLineNumbers()}</div>
        <pre className="language-javascript">
          <code> {code}</code>
        </pre>
      </div>
    </>
  );
};

export default CodeEditor;
