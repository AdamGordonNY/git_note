"use client";
import { Button } from "@/components/ui/button";

import React, { useEffect, useState } from "react";
import ResourceTag from "../ResourceTag";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { CommandList } from "cmdk";

interface AddTagProps {
  setTags: (newTag: string[]) => void;
  tags: string[];

  uniqueTags: string[];
  setError: any;

  clearErrors: any;
  trigger: any;
}

const AddTag = ({
  setTags,
  tags,
  uniqueTags,
  setError,
  clearErrors,
  trigger,
}: AddTagProps) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [items, setItems] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState("");
  // const addTag = (tag: string) => {
  //  const newTag = [...tags, tag];
  //  setTags(newTag);
  // } ;
  const addTag = (tag: string) => {
    const newTag = [...tags, tag];
    setTags(newTag);
    setResults([]);
  };

  const removeTag = (tag: string) => {
    const newtag = tags.filter((t) => t !== tag);
    setTags(newtag);
    setResults([]);
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
          setTags("tags", [...field.value, tagValue]);
          tagInput.value = "";
          clearErrors("tags");
        }
      } else {
        trigger();
      }
    }
  };

  useEffect(() => {
    async function getItems() {
      console.log(uniqueTags);
      if (uniqueTags && uniqueTags.length > 0) {
        // Check if uniqueTags is defined
        const newItems = uniqueTags.map((tag) => tag);
        setItems(newItems as string[]);
        console.log(items);
      }
    }

    getItems();
  }, []);
  useEffect(() => {
    const results = items.filter((choice) =>
      choice.toLowerCase().includes(search.toLowerCase())
    );

    setResults(results as any);
  }, [items, search]);
  return (
    <section className="py-7.5 mt-2.5 flex  w-full flex-col gap-2.5 px-6">
      {/* Placeholder, plan on doing this area similar to the edit tagnology */}
      <label
        htmlFor="tags"
        className="paragraph-3-medium space-y-2 text-white-300"
      >
        Tags
      </label>
      <div className="flex w-full">
        <div className="flex flex-row  content-center items-center justify-center  gap-x-3 ">
          {tags &&
            tags?.map((tag, index) => (
              <Button
                className=""
                type="button"
                onClick={(e) => removeTag(tag)}
                key={tag}
              >
                <ResourceTag key={tag} text={tag} type="plain" />
              </Button>
            ))}
          <Separator /> {/* This is a separator transform it 90 deg */}
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-[150px] justify-start"
            >
              Add Tag
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" side="right" align="start">
            <CommandDialog open={open} onOpenChange={setOpen}>
              <Command label="Add Tags" shouldFilter={false}>
                <CommandInput
                  value={search!}
                  onValueChange={setSearch}
                ></CommandInput>
                <CommandEmpty>No Tags Found</CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {results.map((result: string, index: number) => (
                      <CommandItem
                        key={index}
                        onSelect={() => addTag(result)}
                        title={result}
                      />
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </CommandDialog>
          </PopoverContent>
        </Popover>
      </div>

      <div className=" flex  w-1/2 flex-col   ">
        {search &&
          results.length > 0 &&
          // eslint-disable-next-line array-callback-return
          results.map((result: any, index: number) => {
            if (tags.includes(result.name)) {
              return false;
            }

            return (
              <React.Fragment key={result}>
                <div className="flex flex-col gap-x-2" key={index}>
                  <Button
                    key={index}
                    className="w-full text-white-100"
                    onClick={() => addTag(result)}
                  >
                    <ResourceTag text={result} type="plain" />
                  </Button>
                </div>
              </React.Fragment>
            );
          })}
      </div>
    </section>
  );
};

export default AddTag;
