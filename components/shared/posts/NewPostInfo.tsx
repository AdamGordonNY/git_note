import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import React from "react";
import CustomButton from "../CustomButton";
import ResourceTag from "../ResourceTag";
import { Controller } from "react-hook-form";
interface NewPostInfoProps {
  register: any;
  errors?: any;
  control: any;
}

const NewPostInfo = ({ register, errors, control }: NewPostInfoProps) => {
  return (
    <section className="w-full gap-4">
      <label className="paragraph-3-regular text-white-500" htmlFor="title">
        Title
      </label>
      <Input
        className="profile-input bg-black-700 text-white-100 focus:bg-black-700"
        {...register("title")}
      />
      <div className="flex justify-between">
        <div>{}</div>
        <Controller
          control={control}
          name="postType"
          render={({ field }) => (
            <Select onValueChange={field.onChange} {...field}>
              <SelectTrigger className=" flex w-[full] flex-1 bg-black-700">
                <SelectValue defaultValue="knowledge"></SelectValue>
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
    </section>
  );
};

export default NewPostInfo;
