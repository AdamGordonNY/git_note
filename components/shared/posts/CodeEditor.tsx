"use client";
import { Textarea } from "@/components/ui/textarea";

import { CodeIcon, Eye } from "lucide-react";
import React, { useRef } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ErrorMessage } from "@hookform/error-message";
import { uploadImage } from "@/lib/actions/cloudinary.actions";
import { LuUploadCloud } from "react-icons/lu";
import { toast } from "@/components/ui/use-toast";

interface CodeEditorProps {
  register: any;
  watch: any;
  errors?: any;
}
const CodeEditor = ({ register, watch, errors }: CodeEditorProps) => {
  const code = watch("code");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { ref: urlRef, ...urlRest } = register("image");

  const onClick = () => {
    inputRef.current?.click();
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const fileData = reader.result;
      try {
        const imageUrl = await uploadImage(fileData, {
          action: "postCreation",
        });

        toast({
          type: "foreground",
          variant: "default",
          title: "Image uploaded successfully",
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };
  };

  const generateLineNumbers = () => {
    const lines = code.split("\n");

    return lines.map((_: string, idx: number) => {
      return <div key={idx}>{idx + 1} </div>;
    });
  };

  return (
    <>
      <Tabs className=" w-full space-y-2 text-white-300 ">
        {" "}
        <TabsList className=" rounded-[5px] bg-black-600 px-0.5 ">
          <TabsTrigger
            value="code"
            className="paragraph-3-medium flex gap-x-2 rounded-[5px] px-1.5 py-4"
          >
            <CodeIcon size={16} /> Code
          </TabsTrigger>

          <TabsTrigger
            className="paragraph-3-medium flex gap-x-2 rounded-[5px] px-1.5 py-4"
            value="preview"
          >
            <Eye size={16} /> Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="code">
          <div className="code-editor-container">
            <Textarea
              contentEditable
              id="code"
              className="code-editor-textarea bg-black-700 px-3.5 py-3"
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
          <div className="gap-7.5 flex h-[361px] w-full flex-col content-center items-center justify-center space-y-2 bg-black-800">
            <input
              type="hidden"
              {...urlRest}
              ref={(e) => {
                urlRef(e);
                inputRef.current = e;
              }}
            />

            <input
              type="file"
              className="display-none"
              onChange={onFileChange}
            />

            <button
              type="button"
              onClick={onClick}
              className="paragraph-3-medium r flex h-[40px] w-[250px] flex-row items-center justify-between gap-2 rounded-[5px] bg-black-700 px-3.5 py-2 align-middle text-white-300  shadow shadow-gray-800/10 "
            >
              {" "}
              <LuUploadCloud size={32} />
              <span className="text-nowrap">Upload Component Preview</span>
            </button>
          </div>
        </TabsContent>
      </Tabs>
      {errors && <ErrorMessage errors={errors} name="code" />}
    </>
  );
};

export default CodeEditor;
