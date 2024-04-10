"use client";
import { Textarea } from "@/components/ui/textarea";

import { CodeIcon, Eye } from "lucide-react";
import React from "react";

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
      <Tabs className="w-full space-y-2 ">
        {" "}
        <TabsList className="h-[36px] bg-black-600 text-white-100">
          <TabsTrigger value="code" className="flex gap-x-2">
            <CodeIcon size={16} /> Code
          </TabsTrigger>

          <TabsTrigger className="flex gap-x-2" value="preview">
            <Eye size={16} /> Preview
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
