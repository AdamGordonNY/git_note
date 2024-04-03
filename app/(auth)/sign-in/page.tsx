import SignIn from "@/components/auth/SignInForm";
import { SocialAuthGroup } from "@/components/auth/SocialAuthGroup";
import Divider from "@/components/shared/Divider";
import React from "react";

const SignInPage = async () => {
  return (
    <section>
      <SignIn />
      <Divider text="or" />
      <SocialAuthGroup />
    </section>
  );
};

export default SignInPage;
