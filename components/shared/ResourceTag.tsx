"use client";
import React from "react";
import workflowBadge from "@/public/icons/monitor.svg";
import knowledgeBadge from "@/public/icons/greenbubble.svg";
import componentBadge from "@/public/icons/numberlist.svg";
import Image from "next/image";

export type ResourceTagType = "knowledge" | "component" | "workflow" | "plain";
interface ResourceTagProps extends React.PropsWithChildren {
  type: ResourceTagType;
  icon?: React.JSX.Element;
  text?: string | "knowledge" | "component" | "workflow" | "plain";
  className?: string;
  onClick?: () => void;
}

const ResourceTag = ({ type, text, onClick, ...props }: ResourceTagProps) => {
  const { children, className, ...rest } = props;

  const badgeType = type || "knowledge";
  const baseClass =
    "inline-flex pl-1 pr-2 py-0.5 gap-1 rounded-[3px] items-center justify-center rounded-[3px] h-fit";

  const label = {
    component: "Component",
    workflow: "WorkFlow",
    knowledge: "Knowledge",
    plain: text || "",
  };

  const color = {
    component: "bg-black-700 text-purple-500",
    workflow: "bg-black-700  text-blue-500",
    knowledge: "bg-black-700 text-green-500",
    plain: "bg-black-700 text-white-100",
  };
  const iconSrc = {
    component: workflowBadge,
    workflow: componentBadge,
    knowledge: knowledgeBadge,
    plain: "",
  };

  return (
    <span
      className={`${baseClass} ${color[type || "plain"]} hover:${color[type || "plain"]} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {type !== "plain" && (
        <Image
          src={iconSrc[badgeType]}
          alt={label[badgeType]}
          className="size-4"
        />
      )}

      {label[badgeType]}
      {children}
    </span>
  );
};

export default ResourceTag;
