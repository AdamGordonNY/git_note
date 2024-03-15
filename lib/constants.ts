import { SidebarLink, SocialLink } from "@/types/global";
import {
  FaCss3,
  FaDribbble,
  FaGithub,
  FaHtml5,
  FaInstagram,
  FaJava,
  FaJs,
  FaLaravel,
  FaLinkedin,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaReact,
  FaTwitter,
} from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { BiLogoTailwindCss, BiLogoTypescript } from "react-icons/bi";
import { IconType } from "react-icons/lib";

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
    icon: FaGithub,
  },
  {
    linkType: "linkedin",
    route: "https://www.linkedin.com/in/aaron-gordon-1a1a0a1b7/",
    label: "adamgordon-119",
    icon: FaLinkedin,
  },
  {
    linkType: "twitter",
    route: "https://twitter.com/AGordon123",
    label: "@agordon123",
    icon: FaTwitter,
  },
  {
    linkType: "dribbble",
    route: "https://dribbble.com/agordon123",
    label: "Email",
    icon: FaDribbble,
  },
  {
    linkType: "instagram",
    route: "https://instagram.com",
    label: "InstaGram",
    icon: FaInstagram,
  },
];
export interface TechStackBadges {
  text: string;
  icon: IconType;
}
export const TechIcons: IconType[] = [
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3,
  FaJs,
  FaPython,
  FaJava,
  FaGithub,
  BiLogoTailwindCss,
  TbBrandNextjs,
  FaLaravel,
  FaPhp,
  BiLogoTypescript,
];
export const techStackBadges: TechStackBadges[] = [
  {
    text: "react",
    icon: TechIcons[0],
  },
  {
    text: "node",
    icon: TechIcons[1],
  },
  {
    text: "html",
    icon: TechIcons[2],
  },
  {
    text: "css",
    icon: TechIcons[3],
  },
  {
    text: "javascript",
    icon: TechIcons[4],
  },
  {
    text: "python",
    icon: TechIcons[5],
  },
  {
    text: "java",
    icon: TechIcons[6],
  },
  {
    text: "github",
    icon: TechIcons[7],
  },
  {
    text: "tailwind",
    icon: TechIcons[8],
  },
  {
    text: "nextjs",
    icon: TechIcons[9],
  },
  {
    text: "laravel",
    icon: TechIcons[10],
  },
  {
    text: "php",
    icon: TechIcons[11],
  },
  {
    text: "typescript",
    icon: TechIcons[12],
  },
];
