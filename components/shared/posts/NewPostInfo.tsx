import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
interface NewPostInfoProps {
  register: any;
  errors?: any;
  control: any;
}
const NewPostInfo = ({ register, errors, control }: NewPostInfoProps) => {
  return (
    <section className="w-full gap-4">
      <label
        className="paragraph-3-regular align-top text-white-500"
        htmlFor="title"
      >
        Title
      </label>
      <Input
        className="profile-input bg-black-700 text-white-100 focus:bg-black-700"
        {...register("title")}
      />
      <FormField
        control={control}
        name="postType"
        render={({ field }) => (
          <FormItem className="flex w-full gap-2">
            <FormLabel className="paragraph-3-medium text-white-300">
              Post Type
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="">
                  <SelectValue placeholder="Knowledge" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="knowledge">
                  <ResourceTag type="knowledge" />
                </SelectItem>
                <SelectItem value="component">
                  <ResourceTag type="component" />
                </SelectItem>
                <SelectItem value="workflow">
                  <ResourceTag type="workflow" />
                </SelectItem>
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />

      <CustomButton buttonType="profileButton">Add Resource</CustomButton>
    </section>
  );
};

export default NewPostInfo;
