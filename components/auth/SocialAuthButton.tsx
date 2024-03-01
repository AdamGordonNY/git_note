"use client";
import React from "react";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { signIn } from "next-auth/react";
interface SocialButtonProps {
  icon: string;
  provider: string;
  className?: string;
}
const SocialAuthButton = ({ icon, provider, className }: SocialButtonProps) => {
  const onClick = async () => {
    await signIn(provider.toLowerCase());
  };
  return (
    <Button
      onClick={onClick}
      className={twMerge(`social-login-btn social-login-shadow ${className}`)}
    >
      <Image
        src={icon}
        alt={provider}
        width={20}
        height={20}
        className="mr-2"
      />
      Continue with {provider}
    </Button>
  );
};

export default SocialAuthButton;
