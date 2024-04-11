import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import React, { useEffect, useState } from "react";
import ResourceTag from "../ResourceTag";
import { ErrorMessage } from "@hookform/error-message";
interface AddNewTagProps {
  postTags: string[];
  setPostTags: (tags: string[]) => void;
  uniqueTags: string[];
  errors?: any;
}
const AddNewTag = ({
  postTags,
  setPostTags,
  uniqueTags,
  errors,
}: AddNewTagProps) => {
  const data = uniqueTags;
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const inputRef = React.createRef<HTMLInputElement>();
  const addTag = (tag: string) => {
    if (postTags.includes(tag)) return;
    const newTags = [...postTags, tag];
    setPostTags(newTags);
    setResults([]);
  };
  const removeTag = (tag: string) => {
    const newtags = postTags.filter((t) => t !== tag);
    setPostTags(newtags);
    setResults([]);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (inputRef.current === document.activeElement) {
          setSearch("");
          addTag(search);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, inputRef]);

  useEffect(() => {
    if (!search) {
      setResults([]);
      return;
    }
    const results = data.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );
    setResults(results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  return (
    <>
      <section className="flex flex-col gap-2">
        <span className="paragraph-3-medium text-white-300">Tags</span>
        <div className="flex gap-x-2">
          {postTags.map((tag, i) => (
            <ResourceTag
              key={i}
              type="plain"
              text={tag}
              onClick={() => removeTag(tag)}
              className="cursor-pointer rounded-md !p-2 capitalize text-white-100 "
            />
          ))}
        </div>
      </section>
      <Command className="bg-black-700 text-white-100">
        <CommandInput
          className="bg-black-700 text-white-100"
          ref={inputRef}
          value={search}
          onValueChange={(e) => setSearch(e)}
          placeholder="Enter or Search for a Tag"
        />
        <CommandList>
          <CommandGroup>
            {results.map((result, i) => (
              <div
                key={i}
                onClick={() => {
                  addTag(result);
                  setSearch("");
                }}
              >
                <CommandItem className="!capitalize !text-white-100 !opacity-100">
                  {result}
                </CommandItem>
              </div>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
      {errors && <ErrorMessage errors={errors} name="tags" />}
    </>
  );
};

export default AddNewTag;
