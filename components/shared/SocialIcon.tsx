import React from "react";
import Image from "next/image";
interface IconProps {
  name: string;
  width?: number;
  height?: number;
  className?: string;
}
const SocialIcon = ({ name, width, height, className }: IconProps) => {
  const iconPath = `/icons/${name}.svg`;
  return (
    <Image
      src={iconPath}
      alt={name}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default SocialIcon;
