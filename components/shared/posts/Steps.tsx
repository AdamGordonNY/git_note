"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { CheckSquare, X } from "lucide-react";

const Steps = ({
  useFormHelpers,
  register,
  useFieldArray,
}: {
  useFormHelpers: any;
  register: any;
  useFieldArray: any;
}) => {
  const { control, formState } = useFormHelpers;
  const { fields, append, remove } = useFieldArray({
    name: "steps",
    control,
  });

  return (
    <section className="space-y-6">
      <label className="paragraph-3-medium text-white-300">
        Steps to follow
      </label>
      {fields.map((field: { id: number }, index: number) => {
        return (
          <React.Fragment key={field.id}>
            <div className="my-2 flex items-center justify-between bg-black-700 px-3 py-1">
              <div className="flex items-center space-x-2">
                <CheckSquare className="text-primary-500" size={16} />
              </div>
              <input
                className="paragraph-3-regular placeholder:paragraph-3-regular ml-2 w-full rounded-md border-none bg-black-700 pl-1 text-white-100 placeholder:text-white-300 focus:outline-none"
                placeholder="Enter a step"
                {...register(`steps.${index}`)}
              />
              <button type="button" onClick={() => remove(index)}>
                <X className="text-white-500" size={16} />
              </button>
            </div>

            <div>
              {formState.errors.steps && (
                <span className="text-error-500 paragraph-3-regular mt-2">
                  {formState.errors.steps[index]?.message}
                </span>
              )}
            </div>
          </React.Fragment>
        );
      })}

      <div className="mt-2">
        <Button type="button" color="gray" onClick={() => append("")}>
          Add checkmark
        </Button>
      </div>
    </section>
  );
};

export default Steps;
