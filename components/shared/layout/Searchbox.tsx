"use client";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import Image from "next/image";
import searchIcon from "@/public/icons/search.svg";
import cmdKIcon from "@/public/icons/cmd-k.svg";
import useDebounce from "@/lib/hooks/useDebounce";
interface Props {
  otherClasses?: string | undefined;
  containerClasses?: string;
}
const Searchbox = ({ otherClasses, containerClasses }: Props) => {
  // modeled after my searchbox from devoverflow
  // placeholder code for now
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const query = searchParams.get("q");
  const [search, setSearch] = useState(query || "");
  // const [isOpen, setIsOpen] = useState(false);
  const debouncedSearch = useDebounce<string>(search, 300);
  useEffect(() => {
    if (debouncedSearch) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "q",
        value: debouncedSearch,
      });

      router.push(newUrl, { scroll: false });
    } else {
      if (query) {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["q"],
        });

        router.push(newUrl, { scroll: false });
      }
    }
  }, [debouncedSearch, router, pathname, searchParams, query]);
  return (
    <div
      className={`${containerClasses} relative flex max-w-full gap-x-2 rounded-sm bg-black-700 px-2 max-sm:hidden`}
    >
      <Image src={searchIcon} alt="search" className="sidebar-icon_border" />
      <Input
        className="paragraph-4-medium no-outline   bg-black-700 text-white-500"
        onChange={(e) => {
          setSearch(e.target.value);
          /*  if (!isOpen) setIsOpen(true);
          if (e.target.value === "") setIsOpen(false); */
        }}
        placeholder="Search.."
        value={search}
      ></Input>
      <Image src={cmdKIcon} alt="cmd-k" className="gap-[2px]" />
    </div>
  );
};

export default Searchbox;
