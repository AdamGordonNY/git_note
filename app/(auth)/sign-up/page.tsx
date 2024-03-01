import React from "react";
import SignUpForm from "@/components/auth/SignUpForm";
import { SocialAuthGroup } from "@/components/auth/SocialAuthGroup";
const SignUpPage = async () => {
  return (
    <section>
      <span className="display-2-bold text-white-100">Create An Account</span>
      <SignUpForm />
      <SocialAuthGroup />
    </section>
  );
};

export default SignUpPage;
