import React from "react";
import { DotIcon, InfoIcon } from "lucide-react";
import KnowledgeIcon from "./icons/KnowledgeIcon";
import WorkflowIcon from "./icons/WorkflowIcon";
import ComponentIcon from "./icons/ComponentIcon";
interface BadgeProps extends React.PropsWithChildren {
  icon?: "info" | "dot" | "knowledge" | "component" | "workflow";
  color?: "blue" | "orange" | "red" | "green" | "gray" | "purple";
  size?: "small" | "medium";
  variant?: "outline" | "solid";
  hover?: boolean;
}

const colorClassMap = {
  blue: "bg-primary-900 text-primary-500",
  orange: "bg-orange-100 text-orange-900",
  red: "bg-red-100 text-red-900",
  green: "bg-green-900 text-green-500",
  gray: "bg-gray-100 text-gray-900",
  purple: "bg-purple-900 text-purple-500",
  default: "bg-black-700 text-white-300",
};

const outlineColorClassMap = {
  blue: "border border-blue-200 text-blue-800",
  orange: "border border-orange-200 text-orange-900",
  red: "border border-red-200 text-red-900",
  green: "border border-green-500 text-green-800",
  purple: "border border-green-500 text-green-800",
  gray: "border border-gray-100/20 text-gray-600",
  default: "border border-gray-100/20 text-gray-600",
};

const textSizeClassMap = {
  small: "paragraph-4-medium",
  medium: "paragraph-3-medium",
  default: "paragraph-3-medium",
};

const iconSizeClassMap = {
  small: "12px",
  medium: "16px",
  default: "12px",
};

const IconMap = {
  info: InfoIcon,
  dot: DotIcon,
  knowledge: KnowledgeIcon,
  component: ComponentIcon,
  workflow: WorkflowIcon,
  default: null,
};

const baseclass =
  "flex items-center content-center px-2 py-0.5 rounded-[3px] w-min text-nowrap";

const Badge = ({
  children,
  icon,
  color,
  size,
  variant,
  hover = false,
}: BadgeProps) => {
  const colorClass = colorClassMap[color || "default"];
  const outlineColorClass = outlineColorClassMap[color || "default"];
  const textSizeClass = textSizeClassMap[size || "default"];
  const iconSizeClass = iconSizeClassMap[size || "default"];
  const IconComponent = IconMap[icon || "default"];

  return (
    <div
      className={`${baseclass} ${textSizeClass} ${
        variant === "outline" ? outlineColorClass : colorClass
      } ${icon !== "dot" ? "gap-1" : "pr-4"} ${
        hover && "hover:rounded hover:bg-black-600 hover:px-2 hover:py-0.5"
      }`}
    >
      {IconComponent && (
        <IconComponent size={icon === "dot" ? "24px" : iconSizeClass} />
      )}
      {children}
    </div>
  );
};

export default Badge;
