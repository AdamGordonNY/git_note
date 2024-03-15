"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import CustomButton from "../../CustomButton";
type Goal = {
  name: string;
  completed: boolean;
};

const FieldArrays = ({
  register,
  fields,
  remove,
  category,
  hasChecked,
}: any) => {
  return (
    <>
      {fields?.map((field: any, index: number) => {
        <div
          key={field.id}
          className="inline-flex w-full flex-row gap-x-[4px] paragraph-3-medium"
        >
          <Input
            id={`${category}[${index}]AA`}
            type="checkbox"
            className="gap-x-1 bg-green-400 text-black-900"
            checked={hasChecked}
            {...register(`${category}[${index}].checked` as any)}
          />
          <Input
            id={`${category}[${index}]AB`}
            placeholder="Enter a Learning Goal"
            type="text"
            className="paragraph-3-regular gap-x-1 align-top text-white-100"
            {...register(`${category}[${index}].name` as any)}
          />
          <CustomButton
            type="button"
            buttonType="profileButton"
            onClick={() => remove(index)}
          ></CustomButton>
        </div>;
      })}
    </>
  );
};

export default FieldArrays;
