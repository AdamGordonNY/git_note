import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";
interface NewDescriptionProps {
  register: any;
  errors?: any;
}
const NewDescription = ({ register, errors }: NewDescriptionProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <label
        className="paragraph-3-regular text-white-300"
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
      {errors && <ErrorMessage errors={errors} name="description" />}
    </div>
  );
};

export default NewDescription;
