"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import React from "react";

import { Textarea } from "@/components/ui/textarea";
import ResourceTag from "../ResourceTag";
import { Controller } from "react-hook-form";
interface NewPostInfoProps {
  register: any;
  errors?: any;
  control: any;
}

const NewPostInfo = ({ register, errors, control }: NewPostInfoProps) => {
  return (
    <section className="py-7.5 flex w-full flex-col gap-4">
      <span className="paragraph-3-regular text-white-500">
        Basic Information
      </span>
      <label className="paragraph-3-regular text-white-500" htmlFor="title">
        Title
      </label>
      <Input
        className="profile-input bg-black-700 text-white-100 focus:bg-black-700"
        id="title"
        {...register("title")}
      />
      <div className="flex flex-col justify-between gap-2">
        <label
          className="paragraph-3-regular text-white-500"
          htmlFor="postType"
        >
          Select Post Type
        </label>
        <Controller
          control={control}
          name="postType"
          render={({ field }) => (
            <Select onValueChange={field.onChange} {...field}>
              <SelectTrigger
                className=" flex w-[full] flex-1 bg-black-700 text-white-100"
                id="postType"
              >
                <SelectValue defaultValue="knowledge" />
              </SelectTrigger>
              <SelectContent className="flex w-full bg-black-700 group-focus-within:fill-mode-forwards data-[state=open]:bg-black-700">
                <SelectItem value="knowledge">
                  <ResourceTag type="knowledge" />
                </SelectItem>
                <SelectItem value="component">
                  {" "}
                  <ResourceTag type="component" />
                </SelectItem>
                <SelectItem value="workflow">
                  {" "}
                  <ResourceTag type="workflow" />
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div>
        <label
          className="paragraph-3-regular text-white-500"
          htmlFor="description"
        >
          Description
        </label>
        <Textarea
          className="profile-input bg-black-700 px-3.5 py-3 text-white-100 focus:bg-black-700"
          placeholder="Describe this post..."
          id="description"
          {...register("description")}
        />
      </div>
    </section>
  );
};

export default NewPostInfo;
