"use client";
import React from "react";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";
import SocialIcon from "../shared/SocialIcon";
import { signIn } from "next-auth/react";
interface SocialButtonProps {
  icon: string;
  text: string;
  provider: string;
  className?: string;
}
const SocialAuthButton = ({
  icon,
  text,
  provider,
  className,
}: SocialButtonProps) => {
  const onClick = async () => {
    await signIn(provider);
  };
  return (
    <Button
      onClick={onClick}
      className={twMerge(`social-login-btn social-login-shadow ${className}`)}
    >
      <SocialIcon name={icon} width={16} height={16} className="" />
      Continue with {text}
    </Button>
  );
};

export default SocialAuthButton;
