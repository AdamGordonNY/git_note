import { IconType } from "react-icons/lib";

export interface ParamsProps {
  params: { id: string };
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}
export interface SidebarLink {
  linkType: "plain" | "component" | "knowledge" | "workflow";
  route: string;
  label: string;
  iconSrc: string;
}
export interface SocialLink {
  linkType:
    | "github"
    | "linkedin"
    | "twitter"
    | "dribbble"
    | "instagram"
    | "facebook";
  route: string;
  label: string;
  icon?: IconType;
}
export interface TechnologyStack {
  name: string;
  icon: IconType;
}
