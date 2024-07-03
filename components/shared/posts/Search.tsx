"use client";

import { Command } from "cmdk";
import { useState, useEffect } from "react";
import Link from "next/link";

import searchIcon from "@/public/searchIcon.svg";
import { Layers } from "lucide-react";
import shortcutIcon from "@/public/shortcutIcon.svg";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

import KnowledgeIcon from "@/components/ui/icons/KnowledgeIcon";
import ComponentIcon from "@/components/ui/icons/ComponentIcon";
import WorkflowIcon from "@/components/ui/icons/WorkflowIcon";
import { IPost } from "@/database/models/post.model";

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<IPost[]>();

  // useEffect(() => {
  //   const getPosts = async () => {
  //     const posts = await getAllPosts({ searchQuery: searchTerm });
  //     if (posts) setPosts(posts as IPost[]);
  //   };

  //   const setParams = async () => {
  //     const newParams = urlManager(searchParams.toString(), {
  //       page: "1",
  //       term: searchTerm,
  //     });
  //     router.push(`?${newParams}`);
  //   };

  //   const timeout = setTimeout(() => {
  //     setParams();
  //     getPosts();
  //   }, 250);

  //   return () => clearTimeout(timeout);
  // }, [searchTerm]);

  // Toggle the menu when ⌘K is pressed
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

  const iconMatch = (post: IPost) => {
    switch (post.postType) {
      case "component":
        return (
          <>
            <ComponentIcon className="text-purple-500" size={18} />
            <span>{post.title}</span>
          </>
        );
      case "workflow":
        return (
          <>
            <WorkflowIcon className="text-primary-500" size={18} />
            <span>{post.title}</span>
          </>
        );
      case "knowledge":
        return (
          <>
            <KnowledgeIcon className="text-green-500" size={18} />
            <span>{post.title}</span>
          </>
        );
    }
  };
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
        open={open}
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="fixed inset-0 z-50 flex size-full items-center justify-center backdrop-blur"
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="flex w-full flex-col bg-black-800">
          <div className="flex w-full items-center gap-x-2 border-none bg-black-700 p-4  py-3">
            <Command.Input
              value={searchTerm}
              onValueChange={setSearchTerm}
              className="paragraph-3-regular w-full border-none bg-black-700 p-0 py-1 text-white-300 placeholder:text-white-300"
              placeholder="Type a command or search..."
            />
            <div className="paragraph-4-regular rounded bg-black-800 p-1 text-white-300">
              ESC
            </div>
          </div>
          <Command.List className="paragraph-3-regular h-fit max-h-64 overflow-auto p-4 text-white-300">
            <Command.Empty>No results found.</Command.Empty>
            <Command.Group>
              <Link href="/posts" onClick={() => setOpen((open) => !open)}>
                <Command.Item className="flex cursor-pointer items-center gap-x-2 p-2 hover:rounded hover:bg-black-600 hover:py-2">
                  <Layers size={18} />
                  Explore all posts
                </Command.Item>
              </Link>
              {posts &&
                posts.length > 0 &&
                posts.map((post) => {
                  return (
                    <Link
                      key={post.id}
                      href={`/posts/${post.id}`}
                      onClick={() => setOpen((open) => !open)}
                    >
                      <Command.Item
                        className="flex cursor-pointer items-center gap-x-2 p-2 hover:rounded hover:bg-black-600 hover:py-2"
                        value={post.title}
                      >
                        {iconMatch(post)}
                      </Command.Item>
                    </Link>
                  );
                })}
            </Command.Group>
          </Command.List>
        </div>
      </Command.Dialog>
    </>
  );
};

export default Search;
