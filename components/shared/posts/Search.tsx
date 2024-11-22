"use client";

import { Command } from "cmdk";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import searchIcon from "@/public/searchIcon.svg";
import { Layers } from "lucide-react";
import shortcutIcon from "@/public/shortcutIcon.svg";
import Image from "next/image";
import useDebounce from "@/lib/hooks/useDebounce";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utilities";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import SearchItem from "./SearchItem";
import { useData } from "@/context/DataProvider";
import { IPost } from "@/database/models/post.model";

const Search = () => {
  const ref = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [loading, setLoading] = React.useState(false);
  const query = searchParams.get("filter");
  const [search, setSearch] = useState(query || "");
  const [knowledgePosts, setKnowledgePosts] = useState<IPost[]>([]);
  const [componentPosts, setComponentPosts] = useState<IPost[]>([]);
  const [workflowPosts, setWorkflowPosts] = useState<IPost[]>([]);
  const debouncedSearch = useDebounce<string>(search, 300);
  const pathName = usePathname();
  const posts = useData().posts;
  useEffect(() => {
    const down = (e: {
      key: string;
      metaKey: any;
      ctrlKey: any;
      preventDefault: () => void;
    }) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (debouncedSearch) {
      const newUrl = formUrlQuery(
        { params: searchParams.toString() },
        { key: searchParams.keys(), value: debouncedSearch },
        {
          params: searchParams.toString(),
          key: searchParams.keys(),
          value: debouncedSearch,
        }
      );

      router.push(newUrl);
    } else {
      if (query) {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["title"],
        });

        router.push(newUrl);
      }
    }
  }, [debouncedSearch, router, pathname, searchParams, query]);
  React.useEffect(() => {
    async function getItems() {
      open && setLoading(true);

      setKnowledgePosts(
        JSON.parse(
          JSON.stringify(
            posts.filter((post: IPost) => post.postType === "knowledge")
          )
        )
      );
      setComponentPosts(
        JSON.parse(
          JSON.stringify(
            posts.filter((post: IPost) => post.postType === "component")
          )
        )
      );
      setWorkflowPosts(
        JSON.parse(
          JSON.stringify(
            posts.filter((post: IPost) => post.postType === "workflow")
          )
        )
      );
      setLoading(false);
    }

    getItems();
  }, [open, search]);

  return (
    <>
      <div
        className="paragraph-4-medium flex  cursor-pointer items-center justify-between rounded-md border bg-black-700 p-4"
        onClick={() => setOpen((open) => !open)}
      >
        <div className="flex w-full gap-x-2">
          <Image
            src={searchIcon}
            alt="Search Icon"
            className="pointer-events-none"
          />
          <p className="text-white-500">Search...</p>
        </div>
        <Image
          src={shortcutIcon}
          alt="Shortcut Icon"
          className="pointer-events-none"
        />
      </div>

      <Command.Dialog
        ref={ref}
        open={open}
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="fixed inset-0 z-40 flex w-full items-center justify-center backdrop-blur"
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="z-50 flex w-full flex-col rounded-lg border border-white-100 bg-black-800 max-lg:w-full lg:w-[75%]">
          <div className="flex w-full items-center gap-x-2 border-none bg-black-700 p-4  py-3">
            <Command.Input
              value={search}
              onValueChange={(searchString) => setSearch(searchString)}
              className="paragraph-3-regular w-full border-none bg-black-700 p-0 py-1 text-white-300 placeholder:text-white-300 max-lg:w-full"
              placeholder="Type a command or search..."
            />
            <div className="paragraph-4-regular rounded bg-black-800 p-1 text-white-300">
              ESC
            </div>
          </div>

          <Command.List className="paragraph-3-regular h-fit max-h-64 w-full overflow-auto p-4 text-white-300">
            <Command.Empty>No results found.</Command.Empty>
            <Command.Group>
              <Link href="/posts" onClick={() => setOpen((open) => !open)}>
                <Command.Item className="flex cursor-pointer items-center gap-x-2 p-2 hover:rounded hover:bg-black-600 hover:py-2">
                  <Layers size={18} />
                  Explore all posts
                </Command.Item>
              </Link>{" "}
              {knowledgePosts.length > 0 &&
                knowledgePosts.map((post) => (
                  <SearchItem item={post} setOpen={setOpen} key={post.id} />
                ))}{" "}
              {componentPosts &&
                componentPosts.length > 0 &&
                componentPosts.map((post) => {
                  return (
                    <SearchItem item={post} setOpen={setOpen} key={post.id} />
                  );
                })}
              {workflowPosts &&
                workflowPosts.length > 0 &&
                workflowPosts.map((post) => {
                  return (
                    <SearchItem item={post} setOpen={setOpen} key={post.id} />
                  );
                })}
              <Command.Group></Command.Group>
            </Command.Group>
          </Command.List>
        </div>
      </Command.Dialog>
    </>
  );
};

export default Search;
