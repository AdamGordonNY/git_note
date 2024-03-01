"use client";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import Image from "next/image";
import searchIcon from "@/public/icons/search.svg";
import cmdKIcon from "@/public/icons/cmd-k.svg";
interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string | undefined;
  containerClasses?: string;
}
const Searchbox = ({ filters, otherClasses, containerClasses }: Props) => {
  // modeled after my searchbox from devoverflow
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const query = searchParams.get("q");
  const [search, setSearch] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["global", "type"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, router, pathname, searchParams, query]);
  return (
    <div
      className={`${containerClasses} relative max-w-full bg-black-700 max-sm:hidden`}
    >
      <div>
        <Image src={searchIcon} alt="search" />
        <Input />
      </div>
    </div>
  );
};

export default Searchbox;
