import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import React, { useEffect, useState } from "react";
import ResourceTag from "../ResourceTag";
interface AddNewTagProps {
  postTags: string[];
  setPostTags: (tags: string[]) => void;
  uniqueTags: string[];
}
const AddNewTag = ({ postTags, setPostTags, uniqueTags }: AddNewTagProps) => {
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
    const results = data.filter((item) => item.includes(search));
    setResults(results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  return (
    <>
      <section className="flex gap-2">
        {postTags.map((tag, i) => (
          <ResourceTag
            key={i}
            type="plain"
            text={tag}
            onClick={() => removeTag(tag)}
          />
        ))}
      </section>
      <Command>
        <CommandInput
          ref={inputRef}
          value={search}
          onValueChange={(e) => setSearch(e)}
          placeholder="Type a command or search..."
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
                <CommandItem>{result}</CommandItem>
              </div>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
};

export default AddNewTag;
