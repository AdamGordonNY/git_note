import { SidebarLink } from "@/types/global";
import React from "react";
import { FaPhp } from "react-icons/fa";
import { TbBrandNextjs, TbBrandPrisma, TbBrandVscode } from "react-icons/tb";
import {
  BiLogoMongodb,
  BiLogoTailwindCss,
  BiLogoTypescript,
} from "react-icons/bi";

import {
  DiCss3,
  DiGithub,
  DiHtml5,
  DiJava,
  DiJavascript,
  DiLaravel,
  DiNodejs,
  DiPython,
  DiReact,
} from "react-icons/di";

export const githubClientID = process.env.GITHUB_CLIENT_ID!;
export const githubClientSecret = process.env.GITHUB_CLIENT_SECRET!;

export const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME!;
export const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY!;
export const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET!;

export const quickLinks: SidebarLink[] = [
  {
    linkType: "plain",
    route: "https://github.com/agordon123",
    label: "Github Page",
    iconSrc: "/icons/github-icon.png",
  },
  {
    linkType: "plain",
    route: "/home/posts/",
    label: "Placeholder 2",
    iconSrc: "/icons/jsm-logo.png",
  },
  {
    linkType: "plain",
    route: "/api/sign-out/",
    label: "Placeholder 3",
    iconSrc: "/icons/jsm-logo.png",
  },
];

export interface TechStackBadge {
  name: string;
  icon: (size?: number) => React.JSX.Element;
  color?: string;
  displayName?: string;
}

export const techStackBadges: TechStackBadge[] = [
  {
    name: "react",
    icon: (size) => <DiReact fill="rgb(0, 255, 255)" size={size} />,
    displayName: "React.Js",
  },
  {
    name: "node",
    icon: (size) => <DiNodejs fill="rgb(0, 255, 255)" size={size} />,
    displayName: "Node.Js",
  },
  {
    name: "html",
    icon: (size) => <DiHtml5 fill="red" size={size} />,
    displayName: "HTML",
  },
  {
    name: "css",
    icon: (size) => <DiCss3 fill="blue" size={size} />,
    displayName: "CSS",
  },
  {
    name: "javascript",
    icon: (size) => <DiJavascript fill="yellow" size={size} />,
    displayName: "JavaScript",
  },
  {
    name: "python",
    icon: (size) => <DiPython fill="yellow" size={size} />,
    displayName: "Python",
  },
  {
    name: "java",
    icon: (size) => <DiJava fill="red" size={size} />,
    displayName: "Java",
  },
  {
    name: "github",
    icon: (size) => <DiGithub fill="gray" size={size} />,
    displayName: "GitHub",
  },
  {
    name: "tailwind",
    icon: (size) => <BiLogoTailwindCss fill="rgb(0, 255, 255)" size={size} />,
    displayName: "Tailwind CSS",
  },
  {
    name: "nextjs",
    icon: (size) => <TbBrandNextjs fill="white" stroke="black" size={size} />,
    displayName: "Next.Js",
  },
  {
    name: "laravel",
    icon: (size) => <DiLaravel fill="red" stroke="black" size={size} />,
    displayName: "Laravel",
  },
  {
    name: "php",
    icon: (size) => <FaPhp fill="blue" size={size} />,
    displayName: "PHP",
  },
  {
    name: "typescript",
    icon: (size) => <BiLogoTypescript fill="blue" size={size} />,
    displayName: "TypeScript",
  },
  {
    name: "mongodb",
    icon: (size) => <BiLogoMongodb fill="green" size={size} />,
    displayName: "MongoDB",
  },
  {
    name: "prisma",
    icon: (size) => <TbBrandPrisma fill="green" size={size} />,
    displayName: "Prisma",
  },
  {
    name: "visualstudiocode",
    icon: (size) => (
      <TbBrandVscode fill="rgb(0, 255, 255)" stroke="black" size={size} />
    ),
    displayName: "Visual Studio Code",
  },
];
