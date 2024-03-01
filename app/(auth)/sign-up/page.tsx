import React from "react";
import SignUpForm from "@/components/auth/SignUpForm";
import { SocialAuthGroup } from "@/components/auth/SocialAuthGroup";
const SignUpPage = async () => {
  return (
    <div className="flex-center flex-col">
      <span className="display-2-bold text-white-100">Create An Account</span>
      <div className="h-[472px] w-[400px]">
        <SignUpForm />
        <SocialAuthGroup />
      </div>
    </div>
  );
};

export default SignUpPage;