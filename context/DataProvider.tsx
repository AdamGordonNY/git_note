"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getRecentPosts,
  getPostCount,
  getUniqueTags,
} from "@/lib/actions/post.actions";
import { IUser } from "@/database/models/user.model";
import { IPost } from "@/database/models/post.model";

interface DataContextType {
  user: IUser | undefined;
  posts: IPost[];
  commitArray: number[];
  tags: string[];
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({
  children,
  userData,
}: {
  children: React.ReactNode;
  userData: IUser;
}) => {
  const [data, setData] = useState<{
    user: IUser | undefined;
    posts: IPost[];
    commitArray: number[];
    tags: string[];
    loading: boolean;
  }>({
    user: userData,
    posts: [],
    commitArray: [],
    tags: [],
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const posts = await getRecentPosts(10);
      const commitArray = (await getPostCount()) ?? [];
      const tags = await getUniqueTags();

      setData({
        user: JSON.parse(JSON.stringify(data.user)),
        posts: (posts ?? []).slice(0, 5),
        commitArray,
        tags: tags.slice(0, 11),
        loading: false,
      });
    };

    fetchData();
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
