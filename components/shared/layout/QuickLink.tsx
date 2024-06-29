import React from "react";
import Image from "next/image";

const QuickLink = ({
  icon,
  href,
  name,
}: {
  icon: string;
  href: string;
  name: string;
}) => {
  return (
    <div className="flex gap-2">
      <Image src={icon} alt={`${name} Icon`} />
      <a target="_blank" href={href}>
        {name}
      </a>
    </div>
  );
};

export default QuickLink;
