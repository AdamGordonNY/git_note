import React from "react";
import workflowBadge from "@/public/icons/monitor.svg";
import knowledgeBadge from "@/public/icons/greenbubble.svg";
import componentBadge from "@/public/icons/numberlist.svg";
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
  props: any;
  href: string;
}
const SidebarLink = ({
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

export default SidebarLink;
