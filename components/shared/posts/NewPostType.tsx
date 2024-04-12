import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Controller } from "react-hook-form";
import ResourceTag from "../ResourceTag";
interface NewPostTypeProps {
  control: any;
}
const NewPostType = ({ control }: NewPostTypeProps) => {
  return (
    <div className="flex flex-col justify-between gap-2">
      <label className="paragraph-3-regular text-white-300" htmlFor="postType">
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
              <SelectValue defaultValue="knowledge" ref={field.ref} />
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
  );
};

export default NewPostType;
