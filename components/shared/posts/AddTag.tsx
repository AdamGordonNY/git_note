"use client";
import { Button } from "@/components/ui/button";

import React, { useEffect, useState } from "react";
import ResourceTag from "../ResourceTag";
import { Separator } from "@/components/ui/separator";

import { Input } from "@/components/ui/input";

interface AddTagProps {
  setTags: (newTag: string[]) => void;
  tags: string[];

  uniqueTags: string[];
}

const AddTag = ({ setTags, tags, uniqueTags }: AddTagProps) => {
  const [results, setResults] = useState([]);
  const [items, setItems] = useState<string[]>(uniqueTags);
  const [search, setSearch] = useState("");

  const addTag = (tag: string) => {
    if (tag.length !== 0 && !tags.includes(tag)) {
      const newTag = [...tags, tag];
      setTags(newTag);
      setResults([]);
    }
  };
  const removeTag = (tag: string) => {
    const newtag = tags.filter((t) => t !== tag);
    setTags(newtag);
    setResults([]);
  };
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      addTag(search);
      setResults([]);
      setSearch("");
    }
  };
  useEffect(() => {
    setItems(uniqueTags);
  }, [uniqueTags]);
  useEffect(() => {
    const results = items.filter((item: string) =>
      item.toLowerCase().includes(search.toLowerCase())
    );

    setResults(results as any);
  }, [search, items]);
  return (
    <section className="flex  w-full flex-col gap-2.5">
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
              <ResourceTag
                key={index}
                text={tag}
                type="plain"
                onClick={() => removeTag(tag)}
              />
            ))}
          <Separator className="transform-[90deg]" />{" "}
          {/* This is a separator transform it 90 deg */}
        </div>
        <div className="min-w-1/2   justify-self-stretch bg-black-700">
          <Input
            className=" bg-black-700 text-white-100"
            value={search}
            id="tags"
            placeholder="Search Tags..."
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </div>

        <div className=" flex  w-1/2 flex-row space-y-2">
          {search &&
            results.length > 0 &&
            // eslint-disable-next-line array-callback-return
            results.map((result: string, index: number) => {
              if (tags.includes(result)) {
                return false;
              }

              return (
                <React.Fragment key={result}>
                  <div className="flex flex-row gap-x-2" key={index}>
                    <Button
                      key={index}
                      className="w-full text-white-100"
                      onClick={() => addTag(result)}
                    >
                      <ResourceTag
                        className="capitalize"
                        text={result}
                        type="plain"
                      />
                    </Button>
                  </div>
                </React.Fragment>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default AddTag;
