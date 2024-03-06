import React from "react";
import SignUpForm from "@/components/auth/SignUpForm";
import { SocialAuthGroup } from "@/components/auth/SocialAuthGroup";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
const SignUpPage = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <section>
      <span className="display-2-bold text-white-100">Create An Account</span>
      <SignUpForm />
      <SocialAuthGroup />
    </section>
  );
};

export default SignUpPage;
