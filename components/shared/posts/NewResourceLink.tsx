"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import React from "react";
import CustomButton from "../CustomButton";

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
              defaultValue={link?.title || "Label"}
              className="w-1/2 rounded bg-black-700 text-white-300/50 "
            />
            <Input
              {...register(`resourceLinks[${index}].url`)}
              className="w-1/2 rounded bg-black-700 text-white-300/50 "
              defaultValue={link?.url || "URL"}
            />
          </div>
        );
      })}
      {resourceLinks?.length === 0 && (
        <React.Fragment key={resourceLinks.title}>
          <div className="flex gap-2">
            <div className="flex h-12  w-full flex-row  gap-2 ">
              <Input
                placeholder="Label"
                {...register(`resourceLinks[0].title`)}
                defaultValue={resourceLinks[0]?.title || "Label"}
                className="w-1/2 rounded bg-black-700 text-white-300/50 "
              />
              <Input
                {...register("resourceLinks[0].url")}
                className="w-1/2 rounded bg-black-700 text-white-300/50 "
                defaultValue={resourceLinks[0]?.url || "URL"}
              />
            </div>
            <Button
              className="paragraph-3-regular order-2 bg-black-700  text-white-100"
              type="button"
            >
              {" "}
              <X size={20} />
            </Button>
          </div>
        </React.Fragment>
      )}
      <CustomButton buttonType="profileButton" type="button">
        Add Resource
      </CustomButton>
    </section>
  );
};

export default NewResourceLink;
