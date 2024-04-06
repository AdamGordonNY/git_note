import React from "react";
import workflowBadge from "@/public/icons/monitor.svg";
import knowledgeBadge from "@/public/icons/greenbubble.svg";
import componentBadge from "@/public/icons/numberlist.svg";
import Image from "next/image";

type ResourceTagType = "knowledge" | "component" | "workflow" | "plain";
interface ResourceTagProps extends React.PropsWithChildren {
  type: ResourceTagType;
  icon?: React.JSX.Element;
  text?: string;
  className?: string;
}

const ResourceTag = ({ type, text, ...props }: ResourceTagProps) => {
  const { children, ...rest } = props;

  const badgeType = type || "knowledge";
  const baseClass =
    "inline-flex px-0.5 py-0.5 gap-1 rounded-[3px] items-center justify-center rounded-[3px]";

  const label = {
    component: "Component",
    workflow: "WorkFlow",
    knowledge: "Knowledge",
    plain: text || "",
  };

  const color = {
    component: "bg-black-700 text-blue-500",
    workflow: "bg-black-700 text-purple-500",
    knowledge: "bg-black-700 text-green-500",
    plain: "bg-black-700 text-white-100",
  };
  const iconSrc = {
    component: componentBadge,
    workflow: workflowBadge,
    knowledge: knowledgeBadge,
    plain: "",
  };

  return (
    <span
      className={`${baseClass} ${color[type || "plain"]} hover:${color[type || "plain"]}`}
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
