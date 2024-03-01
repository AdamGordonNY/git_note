/* eslint-disable tailwindcss/no-custom-classname */
import React from "react";
import Image from "next/image";
import logo from "@/public/images/site-logo.png";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="auth-layout">
      <Image src={logo} alt="logo" width={212} height={50} />

      {children}
    </main>
  );
};

export default AuthLayout;
