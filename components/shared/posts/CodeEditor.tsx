"use client";
import { Textarea } from "@/components/ui/textarea";

import { CodeIcon, Eye } from "lucide-react";
import React, { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ErrorMessage } from "@hookform/error-message";
import { uploadImage } from "@/lib/actions/cloudinary.actions";
import { LuUploadCloud } from "react-icons/lu";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
interface CodeEditorProps {
  register: any;
  watch: any;
  errors?: any;
  className?: string;
  setValue: any;
  postType?: string;
}
const CodeEditor = ({
  register,
  watch,
  errors,
  className,
  setValue,
  postType,
}: CodeEditorProps) => {
  const code = watch("code");
  const watchInput = watch("image");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(
    watchInput
  );
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register("image");

  const generateLineNumbers = () => {
    const lines = code.split("\n");
    return lines.map((_: string, idx: number) => (
      <div key={idx}>{idx + 1}</div>
    ));
  };
  const readFileAsDataURL = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileData = await readFileAsDataURL(file);

    try {
      const uploadResult = await uploadImage(fileData, {
        action: "postCreation",
      });
      setUploadedImageUrl(uploadResult);
      if (uploadResult) {
        setValue("image", uploadResult);
      }
      toast({
        type: "foreground",
        variant: "default",
        title: "Image Uploaded Successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        type: "foreground",
        variant: "destructive",
        title: "Error Uploading Image",
      });
    }
  };

  return (
    <>
      <Tabs className={` w-full ga space-y-2 text-white-300` + `${className}`}>
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
        <TabsContent value="code" className="mt-10">
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
              {postType === "component" && generateLineNumbers()}
            </div>
          </div>
          {errors && (
            <ErrorMessage
              errors={errors}
              name="code"
              as="p"
              render={({ message }) => (
                <p className="text-red-500">{message}</p>
              )}
            />
          )}
        </TabsContent>
        <TabsContent value="preview">
          <div className="gap-7.5 relative flex h-[361px] w-full flex-col content-center items-center justify-center space-y-2 bg-black-800 ">
            <div
              style={{ backgroundImage: ` "url('/images/placeholder.png')"` }}
            >
              {uploadedImageUrl && (
                <Image
                  src={uploadedImageUrl}
                  alt="uploaded image"
                  className=" object-cover"
                  height={200}
                  width={200}
                  sizes="200px"
                />
              )}
            </div>
            <input
              type="hidden"
              {...rest}
              ref={(e) => {
                ref(e);
                inputRef.current = e;
              }}
            />
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
              ref={inputRef}
            />
            <button
              type="button"
              onClick={() =>
                inputRef.current !== null && inputRef.current.click()
              }
              className="paragraph-3-medium r flex h-[40px] w-[250px] flex-row items-center justify-between gap-2 rounded-[5px] bg-black-700 px-3.5 py-2 align-middle text-white-300  shadow shadow-gray-800/10 "
            >
              {" "}
              <LuUploadCloud size={32} />
              <span className="text-nowrap">Upload Component Preview</span>
            </button>
          </div>
        </TabsContent>
      </Tabs>
      {errors && (
        <ErrorMessage
          errors={errors}
          name="image"
          render={({ message }) => <p className="text-red-500">{message}</p>}
        />
      )}
    </>
  );
};

export default CodeEditor;
