import React from "react";
import componentBadge from "@/public/icons/component.svg";
import knowledgeBadge from "@/public/icons/knowledge.svg";
import workflowBadge from "@/public/icons/workflow.svg";
import Link from "next/link";
import Image from "next/image";
type SidebarLinkType =
  | "knowledge"
  | "component"
  | "workflow"
  | "plain"
  | "profile";
interface SidebarLinkProps extends React.PropsWithChildren {
  linkType?: SidebarLinkType;
  href: string;
}
const ReusableSidebarLink = ({
  linkType = "plain",
  children,
  href,
  ...props
}: SidebarLinkProps) => {
  const linkTypes = {
    knowledge: {
      iconSrc: knowledgeBadge,
    },
    component: {
      iconSrc: componentBadge,
    },
    workflow: {
      iconSrc: workflowBadge,
    },
    plain: {
      iconSrc: null,
    },
    profile: {
      iconSrc: null,
    },
  };

  const link = linkTypes[linkType];
  if (link)
    return (
      <Link href={href} className="inline-flex justify-center">
        {link.iconSrc && (
          <Image
            src={link.iconSrc}
            alt="linkType"
            className="size-4 flex-none gap-x-[12px]"
          />
        )}
        <span
          {...props}
          className="paragraph-3-medium  w-full bg-black-700 text-left  align-top text-white-300 hover:text-primary-500"
        >
          {children}
        </span>
      </Link>
    );
};

export default ReusableSidebarLink;
