"use client";

import React from "react";
import { Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";
import Learnings from "./Learnings";
import CodeEditor from "./CodeEditor";
import Steps from "./Steps";
import Tags from "./Tags";
import CreateTypeDropdown from "./CreateTypeDropdown";

const BasicInformationPost = ({
  useFormHelpers,
  register,
  useFieldArray,
}: {
  useFormHelpers: any;
  register: any;
  useFieldArray: any;
}) => {
  const { trigger, control, watch, setValue, formState } = useFormHelpers;
  const postType = watch("createType");
  const codeContent = watch("codeEditor");
  const { tags } = formState.defaultValues;

  return (
    <section className="space-y-6">
      <h3 className="paragraph-3-medium mb-6 text-white-500">
        BASIC INFORMATION
      </h3>

      <Controller
        control={control}
        name="title"
        render={({
          field: { name, onChange, ...rest },
          formState: { errors },
        }) => (
          <Input
            id={name}
            {...rest}
            onChange={(event) => {
              onChange(event);
              trigger(name);
            }}
            placeholder="Enter your title of your post"
          />
        )}
      />

      <CreateTypeDropdown setValue={setValue} postType={postType} />

      <Tags setValue={setValue} defaultValueTags={tags} />

      <div className="flex flex-col text-white-300">
        <label className="paragraph-3-medium mb-2">Description</label>
        <textarea
          className="paragraph-3-regular rounded-md border-none bg-black-700 p-3"
          placeholder="Enter a short description"
          {...register("description")}
        />
      </div>

      {postType === "knowledge" && (
        <Learnings
          useFieldArray={useFieldArray}
          useFormHelpers={useFormHelpers}
          register={register}
        />
      )}

      {postType === "component" && (
        <Controller
          control={control}
          name="codeEditor"
          render={({ field: { onChange } }) => (
            <CodeEditor onChange={onChange} codeContent={codeContent} />
          )}
        />
      )}

      {postType === "workflow" && (
        <Steps
          useFieldArray={useFieldArray}
          useFormHelpers={useFormHelpers}
          register={register}
        />
      )}
    </section>
  );
};

export default BasicInformationPost;
