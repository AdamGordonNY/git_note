import { SidebarLink, SocialLink } from "@/types/global";
import {
  FaCss3,
  FaDribbble,
  FaGithub,
  FaHtml5,
  FaInstagram,
  FaJava,
  FaJs,
  FaLinkedin,
  FaNodeJs,
  FaPython,
  FaReact,
  FaTwitter,
} from "react-icons/fa";
import { BiLogoTailwindCss } from "react-icons/bi";
import { IconType } from "react-icons/lib";

export const githubClientID = process.env.GITHUB_CLIENT_ID!;
export const githubClientSecret = process.env.GITHUB_CLIENT_SECRET!;
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
    route: "/rss.xml",
    label: "RSS",
    icon: FaInstagram,
  },
];
export interface TechStackBadges {
  key: string;
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
];
export const techStackBadges: TechStackBadges[] = [
  {
    key: "react",
    icon: TechIcons[0],
  },
  {
    key: "node",
    icon: TechIcons[1],
  },
  {
    key: "html",
    icon: TechIcons[2],
  },
  {
    key: "css",
    icon: TechIcons[3],
  },
  {
    key: "javascript",
    icon: TechIcons[4],
  },
  {
    key: "python",
    icon: TechIcons[5],
  },
  {
    key: "java",
    icon: TechIcons[6],
  },
  {
    key: "github",
    icon: TechIcons[7],
  },
  {
    key: "tailwind",
    icon: TechIcons[8],
  },
];
