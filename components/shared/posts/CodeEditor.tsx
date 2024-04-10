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
import "prismjs/themes/prism.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodeEditorProps {
  register: any;
  watch: any;
}
const CodeEditor = ({ register, watch }: CodeEditorProps) => {
  const setRef = (element: any) => {
    // Call the register ref function to ensure the input is registered
    register("code").ref(element);

    if (element) {
      element.style.height = "auto";
      element.style.height = element.scrollHeight + "px";
    }
  };

  const codeValue = watch("code");

  useEffect(() => {
    Prism.highlightAll();
  }, [codeValue]); // Rerun Prism.highlightAll when codeValue changes
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
              className="code-editor-textarea bg-black-600 px-3.5 py-3"
              spellCheck={false}
              placeholder="Write your code here"
              {...register("code")}
              ref={setRef}
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
