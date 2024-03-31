import { SidebarLink, SocialLink } from "@/types/global";
import React from "react";
import {
  FaDribbble,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPhp,
  FaTwitter,
} from "react-icons/fa";
import {
  TbBrandNextjs,
  TbBrandPrisma,
  TbBrandVisualStudio,
} from "react-icons/tb";
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
export const socialLinks: SocialLink[] = [
  {
    linkType: "github",
    route: "https://github.com/agordon123",
    label: "agordon123",
    icon: <FaGithub />,
  },
  {
    linkType: "linkedin",
    route: "https://www.linkedin.com/in/aaron-gordon-1a1a0a1b7/",
    label: "adamgordon-119",
    icon: <FaLinkedin />,
  },
  {
    linkType: "twitter",
    route: "https://twitter.com/AGordon123",
    label: "@agordon123",
    icon: <FaTwitter />,
  },
  {
    linkType: "dribbble",
    route: "https://dribbble.com/agordon123",
    label: "Email",
    icon: <FaDribbble />,
  },
  {
    linkType: "instagram",
    route: "https://instagram.com",
    label: "InstaGram",
    icon: <FaInstagram />,
  },
];
export interface TechStackBadges {
  name: string;
  icon: (size?: number) => React.JSX.Element;
  color?: string;
}

export const techStackBadges: TechStackBadges[] = [
  {
    name: "react",
    icon: (size) => <DiReact fill="rgb(0, 255, 255)" size={size} />,
  },
  {
    name: "node",
    icon: (size) => <DiNodejs fill="rgb(0, 255, 255)" size={size} />,
  },
  {
    name: "html",
    icon: (size) => <DiHtml5 fill="red" size={size} />,
  },
  {
    name: "css",
    icon: (size) => <DiCss3 fill="blue" size={size} />,
  },
  {
    name: "javascript",
    icon: (size) => <DiJavascript fill="yellow" size={size} />,
  },
  {
    name: "python",
    icon: (size) => <DiPython fill="yellow" size={size} />,
  },
  {
    name: "java",
    icon: (size) => <DiJava fill="red" size={size} />,
  },
  {
    name: "github",
    icon: (size) => <DiGithub fill="gray" size={size} />,
  },
  {
    name: "tailwind",
    icon: (size) => <BiLogoTailwindCss fill="rgb(0, 255, 255)" size={size} />,
  },
  {
    name: "nextjs",
    icon: (size) => <TbBrandNextjs fill="white" stroke="black" size={size} />,
  },
  {
    name: "laravel",
    icon: (size) => <DiLaravel fill="red" stroke="black" size={size} />,
  },
  {
    name: "php",
    icon: (size) => <FaPhp fill="blue" size={size} />,
  },
  {
    name: "typescript",
    icon: (size) => <BiLogoTypescript fill="blue" size={size} />,
  },
  {
    name: "mongodb",
    icon: (size) => <BiLogoMongodb fill="green" size={size} />,
  },
  {
    name: "prisma",
    icon: (size) => <TbBrandPrisma fill="green" size={size} />,
  },
  {
    name: "visualstudiocode",
    icon: (size) => <TbBrandVisualStudio fill="blue" size={size} />,
  },
];
