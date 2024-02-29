/* eslint-disable tailwindcss/no-custom-classname */
import React from "react";
import Image from "next/image";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-w-screen min-h-screen bg-black-900">
      <div className="flex-center flex-col">
        <Image
          src="/images/site-logo.png"
          alt="logo"
          width={212}
          height={50}
          className="mt-[72px]"
        />
      </div>
      {children}
    </main>
  );
};

export default AuthLayout;
