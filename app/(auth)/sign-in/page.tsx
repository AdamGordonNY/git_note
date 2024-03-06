import SignIn from "@/components/auth/SignInForm";
import { SocialAuthGroup } from "@/components/auth/SocialAuthGroup";
import React from "react";

const SignInPage = () => {
  return (
    <div className="flex-center flex-col">
      <span className="display-2-bold justify-start text-white-100">Login</span>

      <SignIn />
      <SocialAuthGroup />
    </div>
  );
};

export default SignInPage;
