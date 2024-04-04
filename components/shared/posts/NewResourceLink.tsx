import React from "react";

interface NewResourceLinkProps {
  resourceLinks: any;
  removeResourceLink: (index: number) => void;
  appendResourceLink: (experience: { name: string }) => void;
  register: any;
}
const NewResourceLink = ({
  resourceLinks,
  register,
  removeResourceLink,
  appendResourceLink,
}: NewResourceLinkProps) => {
  return <div>NewResourceLink</div>;
};

export default NewResourceLink;
