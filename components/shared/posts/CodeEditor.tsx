"use client";
import { Textarea } from "@/components/ui/textarea";
import Prism from "prismjs";
import { Code } from "lucide-react";
import React, { useEffect } from "react";
import "prismjs/components/prism-javascript";

import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-solidity";
import "prismjs/components/prism-json";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-mongodb";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "@/styles/prism.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Controller } from "react-hook-form";
interface CodeEditorProps {
  register: any;
  control: any;
}
const CodeEditor = ({ register, control }: CodeEditorProps) => {
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
      <Tabs>
        {" "}
        <TabsList className="grid w-[222px]  grid-cols-2">
          <TabsTrigger value="code" className="w-1/2">
            <Code size={16} /> Code{" "}
          </TabsTrigger>
          <TabsTrigger className="w-1/2" value="preview">
            Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="code">
          <div className="code-editor-container">
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <Textarea
                  contentEditable
                  id="code"
                  value={field.value}
                  onChange={(e) => {
                    setCode(e.target.value);
                    field.onChange(e);
                  }}
                  className="code-editor-textarea px-3.5 py-3"
                  spellCheck={false}
                  ref={codeEditorRef}
                />
              )}
            />
            <div className="code-editor-line-numbers">
              {generateLineNumbers()}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="preview">
          <pre>
            <code ref={codeEditorRef} className="language-html">
              {" "}
              {code}
            </code>
          </pre>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default CodeEditor;
