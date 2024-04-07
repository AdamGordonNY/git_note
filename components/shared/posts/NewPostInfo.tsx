"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import ResourceTag from "../ResourceTag";
import { Controller } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { getAllTags } from "@/lib/actions/tag.actions";

interface NewPostInfoProps {
  register: any;
  errors?: any;
  control: any;
  tags: string[];
  setTags: (newTag: string[]) => void;
}

const NewPostInfo = ({
  register,
  errors,
  control,
  tags,
  setTags,
}: NewPostInfoProps) => {
  const [dbTags, setDbTags] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
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
          return;
        }

        if (!field.value.includes(tagValue as never)) {
          setTags([...field.value, tagValue]);
          tagInput.value = "";
        }
      }
    }
  };
  const getTags = async () => {
    const tags = await getAllTags();
    return tags;
  };

  useEffect(() => {
    getTags().then((tags) => {
      const parsedTags = JSON.parse(JSON.stringify(tags));
      const dbSearch = parsedTags?.map((tag: any) => tag.name);
      if (dbSearch !== undefined) {
        setDbTags(dbSearch as string[]); // Fix: Pass dbSearch as an argument and cast it to string[]
      } else {
        setDbTags([]);
      }
    });
  }, []);

  return (
    <section className="py-7.5 flex w-full flex-col gap-4">
      <span className="paragraph-3-regular text-white-500">
        Basic Information
      </span>
      <label className="paragraph-3-regular text-white-300" htmlFor="title">
        Title
      </label>
      <Input
        className="profile-input bg-black-700 text-white-100 focus:bg-black-700"
        id="title"
        {...register("title")}
      />
      <div className="flex flex-col justify-between gap-2">
        <label
          className="paragraph-3-regular text-white-300"
          htmlFor="postType"
        >
          Select Post Type
        </label>
        <Controller
          control={control}
          name="postType"
          render={({ field }) => (
            <Select onValueChange={field.onChange} {...field}>
              <SelectTrigger
                className=" flex w-[full] flex-1 bg-black-700 text-white-100"
                id="postType"
              >
                <SelectValue defaultValue="knowledge" />
              </SelectTrigger>
              <SelectContent className="flex w-full bg-black-700 group-focus-within:fill-mode-forwards data-[state=open]:bg-black-700">
                <SelectItem value="knowledge">
                  <ResourceTag type="knowledge" />
                </SelectItem>
                <SelectItem value="component">
                  {" "}
                  <ResourceTag type="component" />
                </SelectItem>
                <SelectItem value="workflow">
                  {" "}
                  <ResourceTag type="workflow" />
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="mt-2.5 flex h-14  w-full flex-col gap-2.5">
        {/* Placeholder, plan on doing this area similar to the edit technology */}
        <label
          htmlFor="tags"
          className="paragraph-3-medium justify-start space-y-2 text-white-300"
        >
          Tags
        </label>
        <div className="flex w-1/2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center justify-between rounded-md bg-black-700 px-3 py-1"
            >
              <span className="text-white-100">{tag}</span>
              <Button
                onClick={() => removeTags(tag)}
                className="bg-black-700 text-white-100"
              >
                {tag}
              </Button>
            </div>
          ))}
        </div>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <Popover open={open} onOpenChange={setOpen} {...field}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  Search for tags
                  <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search tag..."
                    value={search}
                    className="bg-black-700 text-white-300"
                    onValueChange={() => setSearch(field.value)}
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  <CommandEmpty>
                    No tag found.{" "}
                    <Button onClick={() => addTag(field.value)}>Add Tag</Button>
                  </CommandEmpty>
                  <CommandGroup>
                    {dbTags.map((tag: any) => (
                      <CommandItem
                        key={tag.name}
                        value={tag.name}
                        onSelect={(currentValue: string) => {
                          setTags(
                            currentValue === field.value ? [] : [currentValue]
                          );
                          setOpen(false);
                        }}
                      >
                        <ResourceTag type="plain" />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        />
      </div>

      <div>
        <label
          className="paragraph-3-regular text-white-500"
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
      </div>
    </section>
  );
};

export default NewPostInfo;
