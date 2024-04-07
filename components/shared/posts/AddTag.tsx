import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useEffect, useState } from "react";
import ResourceTag from "../ResourceTag";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllTags } from "@/lib/actions/tag.actions";
import { Input } from "@/components/ui/input";
interface AddTagProps {
  setTags: (newTag: string[]) => void;
  tags: string[];
}
const AddTag = ({ setTags, tags }: AddTagProps) => {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");
  const addTag = (tag: string) => {
    const newTag = [...tags, tag];
    setTags(newTag);
  };

  const removeTags = (tag: string) => {
    const newTag = tags.filter((t) => t !== tag);
    setTags(newTag);
  };

  useEffect(() => {
    const getTags = async () => {
      const tags = await getAllTags();
      return tags;
    };
    const results = getTags();
    if (results) {
      setResults(results as any);
    }
  }, [search, tags]);
  return (
    <section className="mt-2.5 flex  h-14 w-full gap-2.5">
      {/* Placeholder, plan on doing this area similar to the edit technology */}
      <label
        htmlFor="tags"
        className="paragraph-3-medium justify-start space-y-2 text-white-300"
      >
        tags
      </label>
      <div className="flex w-full bg-black-700">
        <Input />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value ? tags.find((tag) => tag === value) : "Select tag..."}
              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search tag..." />
              <CommandEmpty>
                No tag found. <Button onClick={() => addTag(value)}></Button>
              </CommandEmpty>
              <CommandGroup>
                {tags.map((tag: string) => (
                  <CommandItem
                    key={tag}
                    value={tag}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === tag ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {tag}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </section>
  );
};

export default AddTag;
