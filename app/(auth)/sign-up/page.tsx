import React from "react";
import SignUpForm from "@/components/auth/SignUpForm";
import { SocialAuthGroup } from "@/components/auth/SocialAuthGroup";
import Divider from "@/components/shared/Divider";
const SignUpPage = async () => {
  return (
    <section>
      <span className="display-2-bold text-white-100">Create An Account</span>
      <SignUpForm />
      <Divider />
      <SocialAuthGroup />
    </section>
  );
};

export default SignUpPage;
