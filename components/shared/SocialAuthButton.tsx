import React from "react";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";

interface SocialButtonProps {
  icon: React.JSX.Element;
  text: string;
  onClick: () => void;
  classname?: string;
}
const SocialAuthButton = ({
  icon,
  text,
  onClick,
  classname,
}: SocialButtonProps) => {
  return (
    <Button
      onClick={onClick}
      title={text}
      className={twMerge(`social-login-btn ${classname}`)}
    >
      {icon}
      {text}
    </Button>
  );
};

export default SocialAuthButton;
