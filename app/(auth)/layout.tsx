/* eslint-disable tailwindcss/no-custom-classname */
import React from "react";
import "../globals.css";
import Image from "next/image";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="auth-background">
      <div className="flex-center mt-[72px]">
        <Image src="/images/site-logo.svg" alt="logo" width={212} height={50} />
      </div>
      {children}
    </main>
  );
};

export default AuthLayout;
