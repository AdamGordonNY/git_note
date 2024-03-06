"use client";
import React from "react";
import { signOut } from "next-auth/react";

const SignOutButton = () => <button onClick={() => signOut()}>Sign out</button>;

export default SignOutButton;
