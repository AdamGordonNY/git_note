import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Controller } from "react-hook-form";
import { CreateTypeBadge } from "@/components/ui/createTypeBadge";
interface NewPostTypeProps {
  control: any;
}
const NewPostType = ({ control }: NewPostTypeProps) => {
  return (
    <div className="flex flex-col justify-between gap-2">
      <p className="paragraph-3-regular text-white-300" id="postType">
        Select Post Type
      </p>
      <Controller
        control={control}
        name="postType"
        render={({ field }) => (
          <Select
            onValueChange={(value) => field.onChange(value)}
            defaultValue={field.value}
          >
            <SelectTrigger
              className="flex w-full flex-1 bg-black-800 text-white-100 hover:bg-transparent"
              id="postType"
            >
              <SelectValue>
                {field.value ? (
                  <CreateTypeBadge variant={field.value} />
                ) : (
                  <CreateTypeBadge variant="knowledge" />
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="flex w-full bg-black-700 group-focus-within:fill-mode-forwards data-[state=open]:bg-black-700">
              <SelectItem
                value="knowledge"
                className="ring-0 focus:bg-black-800"
              >
                <CreateTypeBadge variant="knowledge" />
              </SelectItem>
              <SelectItem value="component">
                <CreateTypeBadge variant="component" />
              </SelectItem>
              <SelectItem value="workflow">
                <CreateTypeBadge variant="workflow" />
              </SelectItem>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
};

export default NewPostType;
