import React from "react";
interface NewTagProps {
  setError: any;
  setValue: any;
  trigger: any;
  clearErrors: any;
}
const NewTag = ({ setError, setValue, trigger, clearErrors }: NewTagProps) => {
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters.",
          });
        }

        if (!field.value.includes(tagValue as never)) {
          setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          clearErrors("tags");
        }
      } else {
        trigger();
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);

    setValue("tags", newTags);
  };
  return <div>NewTag</div>;
};

export default NewTag;
