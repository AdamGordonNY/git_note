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
  postData,
  tagData,
}: {
  children: React.ReactNode;
  userData: IUser;
  postData: IPost[];
  tagData: string[];
}) => {
  const [data, setData] = useState<DataContextType>({
    user: userData,
    posts: postData || [],
    commitArray: [],
    tags: tagData || [],
    loading: true,
  });

  useEffect(() => {
    if (!userData || !postData || !tagData) {
      const fetchData = async () => {
        const posts = await getRecentPosts(10);
        const commitArray = (await getPostCount()) ?? [];
        const tags = await getUniqueTags();

        setData({
          user: userData,
          posts: (posts ?? []).slice(0, 5),
          commitArray,
          tags: tags.slice(0, 11),
          loading: false,
        });
      };

      fetchData();
    } else {
      setData((prevData) => ({
        ...prevData,
        loading: false,
      }));
    }
  }, [userData, postData, tagData]);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
