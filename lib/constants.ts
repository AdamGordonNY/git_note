import { SidebarLink } from "@/types/global";
export const githubClientID = process.env.GITHUB_CLIENT_ID!;
export const githubClientSecret = process.env.GITHUB_CLIENT_SECRET!;

export const navlinks: SidebarLink[] = [
  {
    imgURL: "/icons/",
    route: "/home/posts/",
    label: "Placeholder 1",
  },
  {
    imgURL: "/icons/",
    route: "/home/posts/",
    label: "Placeholder 2",
  },
  {
    imgURL: "/icons/",
    route: "/home/posts/",
    label: "Placeholder 3",
  },
];
