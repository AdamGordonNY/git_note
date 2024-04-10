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

interface CodeEditorProps {
  register: any;
  control: any;
  setValue?: any;
}
const CodeEditor = ({ register, control, setValue }: CodeEditorProps) => {
  const codeEditorRef = register("code").ref;
  const codeRef = React.useRef(codeEditorRef);
  const codeValue = register("code").value;
  //  const generateLineNumbers = () => {
  //    const lines = codeValue.split("\n");
  //    // @ts-ignore
  //    return lines.map((_, idx) => {
  //      return <div key={idx}>{idx + 1} </div>;
  //    });
  //  };
  useEffect(() => {
    if (codeEditorRef.current) {
      codeEditorRef.current.style.height = "auto";
      codeEditorRef.current.style.height =
        codeEditorRef.current.scrollHeight + "px";
    }

    Prism.highlightAll();
  }, [codeEditorRef, codeValue]);
  return (
    <>
      <Tabs className="space-y-2">
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
            <Textarea
              contentEditable
              id="code"
              className="code-editor-textarea px-3.5 py-3"
              spellCheck={false}
              placeholder="Write your code here"
              {...register("code")}
            />

            <div className="code-editor-line-numbers"></div>
          </div>
        </TabsContent>
        <TabsContent value="preview">
          <pre>
            <code className="language-javascript"> {codeValue}</code>
          </pre>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default CodeEditor;
