"use client";
import { IPost } from "@/database/models/post.model";
import React from "react";
import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/themes/prism-dark.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// eslint-disable-next-line no-unused-vars
import { Textarea } from "@/components/ui/textarea";
import { CodeIcon, Eye } from "lucide-react";

interface TabsProps {
  post: Partial<IPost>;
}
const DisplayTabs = ({ post }: TabsProps) => {
  // const inputRef = React.useRef<HTMLInputElement | null>(null);
  const code = post.code;
  React.useEffect(() => {
    Prism.highlightAll();
  }, [code]);
  if (post.postType !== "component") {
    return null;
  }

  return (
    <div className="tab-container">
      {" "}
      <Tabs
        defaultValue="code"
        className={` w-full space-y-2 text-white-300  `}
      >
        {" "}
        <TabsList className="tabs-shadow  bg-black-600  ">
          <TabsTrigger
            value="code"
            className="paragraph-3-medium flex w-[111px] gap-x-2  rounded-[5px] bg-black-600 px-1.5 py-4"
          >
            <CodeIcon size={16} /> Code
          </TabsTrigger>

          <TabsTrigger
            className="paragraph-3-medium flex w-[111px] gap-x-2 rounded-[5px] bg-black-700 px-1.5 py-4"
            value="preview"
          >
            <Eye size={16} /> Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="mt-10"></TabsContent>
        <TabsContent value="preview">
          <div className="gap-7.5 relative flex h-[361px] w-full flex-col content-center items-center justify-center space-y-2 bg-black-800 "></div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DisplayTabs;
