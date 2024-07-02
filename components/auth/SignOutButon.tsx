"use client";
import React from "react";
import { signOut } from "next-auth/react";
import logoutIcon from "@/public/icons/logout.svg";
import Image from "next/image";
const SignOutButton = () => (
  <div className="flex p-4">
    <Image src={logoutIcon} alt="Logout Icon" />
    <button
      className="paragraph-3-medium flex gap-2 text-white-300"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  </div>
);

export default SignOutButton;
