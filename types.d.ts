import React from "react";
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
