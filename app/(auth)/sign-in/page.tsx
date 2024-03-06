import SignIn from "@/components/auth/SignInForm";
import { SocialAuthGroup } from "@/components/auth/SocialAuthGroup";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const SignInPage = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/home");
  }
  return (
    <section>
      <SignIn />
      <SocialAuthGroup />
    </section>
  );
};

export default SignInPage;
