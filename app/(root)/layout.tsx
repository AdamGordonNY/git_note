"use server";
import Image from "next/image";
import Link from "next/link";
import siteLogo from "@/public/images/site-logo.png";
import logoutIcon from "@/public/icons/logout.svg";
import { signOut } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import RightSidebar from "@/components/shared/layout/RightSidebar";
import React from "react";
import SignOutButton from "@/components/auth/SignOutButon";
import LeftButtonGroup from "@/components/shared/layout/LeftButtonGroup";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen bg-black-900">
      <section className="flex w-72 flex-col content-center border-r-[1.5px] bg-black-800 text-white-300">
        <Link href="/">
          <Image
            src={siteLogo}
            alt="logo"
            className="ml-[28px] mt-[40px] h-[24px] w-[102px]"
          />
        </Link>
        <LeftButtonGroup />
        <div className="py-20">
          <Separator />
        </div>

        <div className="flex flex-col content-center justify-end pb-10 align-bottom">
          <SignOutButton />
        </div>
      </section>
      <section className="flex-1">{children}</section>

      <RightSidebar />
    </main>
  );
};

export default MainLayout;
