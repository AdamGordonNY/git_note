import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import React from "react";
import CustomButton from "../CustomButton";
import Image from "next/image";
import blueCheck from "@/public/icons/checksquare.svg";

interface NewExperienceProps {
  experienceFields: any;
  removeExperience: (index: number) => void;
  appendExperience: (experience: { name: string }) => void;
  register: any;
  errors?: any;
}
const NewExperience = ({
  experienceFields,
  removeExperience,
  appendExperience,
  register,
  errors,
}: NewExperienceProps) => {
  return (
    <section className="flex w-full flex-col gap-2 ">
      <label
        className="paragraph-4-regular align-top text-white-300"
        htmlFor="experiences"
      >
        What was Learned
      </label>

      {experienceFields.map((field: any, index: number) => {
        return (
          <React.Fragment key={field.id}>
            <div
              className="paragraph-3-regular mx-auto flex w-full content-center items-center justify-center justify-items-center gap-[14px] bg-black-700 align-middle"
              key={field.id}
            >
              <Button
                className="paragraph-3-regular order-2 bg-black-700  text-white-100"
                type="button"
                onClick={() => removeExperience(index)}
              >
                {" "}
                <X size={20} />
              </Button>
              <Input
                id={`experiences[${index}].name`}
                type="text"
                className="paragraph-3-regular order-1 border-0  bg-black-700 text-white-100 ring-transparent focus:outline-transparent focus:ring-transparent  focus-visible:ring-0 focus-visible:ring-offset-0"
                {...register(`experiences[${index}].name` as any)}
              />
              <Image
                src={blueCheck}
                alt="knowledge"
                className="ml-2"
                width={20}
                height={20}
              />
            </div>
          </React.Fragment>
        );
      })}
      {experienceFields.length === 0 && (
        <div
          className="paragraph-3-regular mx-auto flex w-full content-center items-center justify-center justify-items-center gap-[14px] bg-black-700 align-middle"
          key="0"
        >
          <Button
            className="paragraph-3-regular order-2 bg-black-700  text-white-100"
            type="button"
            disabled
          >
            {" "}
            <X size={20} />
          </Button>
          <Input
            id={`experiences[0].name`}
            type="text"
            className="paragraph-3-regular order-1 border-0  bg-black-700 text-white-100 ring-transparent focus:outline-transparent focus:ring-transparent  focus-visible:ring-0 focus-visible:ring-offset-0"
            {...register(`experiences[0].name` as any)}
          />
          <Image
            src={blueCheck}
            alt="knowledge"
            className="ml-2"
            width={20}
            height={20}
          />
        </div>
      )}
      <CustomButton
        buttonType="profileButton"
        type="button"
        onClick={() => appendExperience({ name: "" })}
      >
        Add Knowledge
      </CustomButton>
    </section>
  );
};

export default NewExperience;
