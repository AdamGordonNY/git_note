"use client";
import { Textarea } from "@/components/ui/textarea";

import { CodeIcon } from "lucide-react";
import React from "react";
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
  const code = watch("code");
  const generateLineNumbers = () => {
    const lines = code.split("\n");
    // @ts-ignore
    return lines.map((_, idx) => {
      return <div key={idx}>{idx + 1} </div>;
    });
  };
  // const setRef = (element: any) => {
  //   // Call the register ref function to ensure the input is registered
  //   register("code").ref(element);

  //   if (element) {
  //     element.style.height = "auto";
  //     element.style.height = element.scrollHeight + "px";
  //   }
  // };

  // const codeValue = watch("code");

  // useEffect(() => {
  //   Prism.highlightAll();
  // }, [codeValue]);
  return (
    <>
      <Tabs className="w-full space-y-2">
        {" "}
        <TabsList className="grid w-[222px]  grid-cols-2">
          <TabsTrigger value="code" className="bg-black-600 text-white-300">
            <CodeIcon fill="black-700" stroke="white-300" size={16} /> Code
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
            />

            <div className="code-editor-line-numbers">
              {generateLineNumbers()}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="preview">
          <div className="gap-7.5 h-[361px] w-full">
            <div></div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default CodeEditor;
