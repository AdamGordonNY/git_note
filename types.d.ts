import React from "react";
import { IPost } from "@/database/models/post.model";
export type CreateType = "knowledge" | "component" | "workflow";
export type CreateTypeListItemType = {
  icon: (props: any) => React.JSX.Element;
  name: "knowledge" | "component" | "workflow";
  uiName: string;
  badgeColor: "blue" | "orange" | "red" | "green" | "gray" | "purple";
  color: string;
};

export type SearchParams = {
  page: string;
  type: CreateType | "all";
  term: string;
  tag: string;
};
export type PostReturnType = {
  posts: IPost[];
  totalPosts: number;
};
export type HeatMapData = {
  date: string;
  count: number;
};
export type HeatMapReturnType = {
  data: HeatMapData[];
};
export type CommitReturnType = {
  dates: Date[];
};
export type PostFetchType = {
  filter: "knowledge" | "all" | "component" | "workflow" | string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  path?: string;
};
