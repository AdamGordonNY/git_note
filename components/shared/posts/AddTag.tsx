import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import React, { useEffect, useState } from "react";
import ResourceTag from "../ResourceTag";
interface AddTagProps {
  setError: any;
  setTags: (newTag: string[]) => void;
  trigger: any;
  clearErrors: any;
  tags: string[];
}
const AddTag = ({
  setError,
  setTags,
  trigger,
  clearErrors,
  tags,
}: AddTagProps) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [newTag, setNewTag] = useState<string>("");
  const addTag = (tag: string) => {
    const newTag = [...tags, tag];
    setTags(newTag);
  };

  const removeTags = (tag: string) => {
    const newTag = tags.filter((t) => t !== tag);
    setTags(newTag);
  };
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
          setTags([...field.value, tagValue]);
          tagInput.value = "";
          clearErrors("tags");
        }
      } else {
        trigger();
      }
    }
  };

  useEffect(() => {
    const results = tags.filter((choice: any) =>
      choice.name.toLowerCase().includes(search.toLowerCase())
    );

    setResults(results as any);
  }, [search, tags]);
  return (
    <div className="flex-start mt-2.5 gap-2.5">
      {/* Placeholder, plan on doing this area similar to the edit technology */}
      <label htmlFor="tags" className="justify-start space-y-2 text-white-300">
        Add or Search Tags
      </label>
      <div className="flex w-full">
        <div className="mt-10 box-border  flex w-full bg-black-700 px-2">
          <div className="flex flex-row  content-center items-center justify-center  gap-x-3 ">
            {tags && // eslint-disable-next-line array-callback-return
              tags.map((tag: any, index: number) => {
                return (
                  <React.Fragment key={tag.name}>
                    <div className="flex flex-wrap content-center items-center justify-stretch">
                      <button onClick={() => removeTags(tag)}>
                        <span
                          key={index}
                          className="paragraph-3-medium profile-shadow flex h-5 content-center items-center justify-center rounded bg-black-600 p-2 capitalize text-white-100"
                        >
                          <ResourceTag type="plain" />
                        </span>
                      </button>
                    </div>
                  </React.Fragment>
                );
              })}
          </div>{" "}
          <div className="min-w-1/2   justify-self-stretch bg-black-700">
            <Input
              className=" bg-black-700 text-white-100"
              value={newTag}
              onKeyDown={(e) => handleInputKeyDown(e, tags)}
            />
            <Input
              className=" bg-black-700 text-white-100"
              value={search}
              placeholder="Search Tech..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col content-stretch justify-items-center  bg-black-700 ">
        {search &&
          results.length > 0 &&
          // eslint-disable-next-line array-callback-return
          results.map((result: any, index: number) => {
            if (tags?.includes(result.name)) {
              return false;
            }

            return (
              <React.Fragment key={result.name}>
                <div className="flex flex-col gap-x-2" key={index}>
                  <Button
                    key={index}
                    className="w-full text-white-100"
                    onClick={() => addTag(result.name)}
                  >
                    <li
                      key={result.name}
                      className="z-20 flex h-9 w-full flex-row content-center  items-center overflow-y-hidden rounded-[3px]   p-1"
                    >
                      <span className="paragraph-3-medium profile-shadow flex h-5 content-center items-center justify-center rounded bg-black-600 p-2 capitalize text-white-100">
                        {result.name}
                      </span>
                    </li>
                  </Button>
                </div>
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default AddTag;
