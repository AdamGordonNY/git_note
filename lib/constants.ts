import { SidebarLink, SocialLink } from "@/types/global";
import {
  FaDribbble,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
export const githubClientID = process.env.GITHUB_CLIENT_ID!;
export const githubClientSecret = process.env.GITHUB_CLIENT_SECRET!;
export const quickLinks: SidebarLink[] = [
  {
    linkType: "plain",
    route: "https://github.com/agordon123",
    label: "Github Page",
  },
  {
    linkType: "plain",
    route: "/home/posts/",
    label: "Placeholder 2",
  },
  {
    linkType: "plain",
    route: "/home/posts/",
    label: "Placeholder 3",
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
