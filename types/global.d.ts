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
}
