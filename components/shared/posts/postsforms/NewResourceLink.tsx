"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import React from "react";
import CustomButton from "../../CustomButton";

interface NewResourceLinkProps {
  resourceLinks: any;
  removeResourceLink: (index: number) => void;
  appendResourceLink: (resourceLink: { title: string; url: string }) => void;
  register: any;
}
const NewResourceLink = ({
  resourceLinks,
  register,
  removeResourceLink,
  appendResourceLink,
}: NewResourceLinkProps) => {
  return (
    <section className="flex w-full flex-col gap-2">
      <label
        className="paragraph-4-medium text-white-500"
        htmlFor="resourceLinks"
      >
        RESOURCES AND LINKS
      </label>

      {resourceLinks.map((link: any, index: number) => {
        return (
          <div className="flex h-12  w-full flex-row  gap-2 " key={index}>
            <Input
              placeholder="Label"
              {...register(`resourceLinks[${index}].title`)}
              defaultValue={link?.label}
              className="w-1/2 rounded bg-black-700 text-white-300/50 "
            />
            <Input
              {...register(`resourceLinks[${index}].url`)}
              className="w-1/2 rounded bg-black-700 text-white-300/50 "
              defaultValue={link?.url}
            />
            <Button
              className="paragraph-3-regular order-2 bg-black-700  text-white-100"
              type="button"
              onClick={() => removeResourceLink(index)}
            >
              {" "}
              <X size={20} />
            </Button>
          </div>
        );
      })}
      {resourceLinks?.length === 0 && (
        <div className="flex gap-2">
          <div className="flex h-12  w-full flex-row  gap-2 ">
            <Input
              placeholder="Label"
              {...register(`resourceLinks[0].label`)}
              className="w-1/2 rounded bg-black-700 text-white-300/50 "
            />
            <Input
              {...register("resourceLinks[0].url")}
              placeholder="URL"
              className="w-1/2 rounded bg-black-700 text-white-300/50 "
            />
          </div>
          <Button
            className="paragraph-3-regular order-2 bg-black-700  text-white-100"
            type="button"
            disabled
          >
            {" "}
            <X size={20} />
          </Button>
        </div>
      )}
      <CustomButton
        buttonType="profileButton"
        type="button"
        onClick={() => appendResourceLink({ title: "", url: "" })}
      >
        Add Resource
      </CustomButton>
    </section>
  );
};

export default NewResourceLink;
