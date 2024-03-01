// Code: SocialAuthGroup Component
import React from "react";
import SocialAuthButton from "@/components/auth/SocialAuthButton";
import google from "@/public/icons/google.svg";
import github from "@/public/icons/github.svg";
export const SocialAuthGroup = async () => {
  return (
    <section>
      <SocialAuthButton
        className="social-login-btn social-login-shadow"
        icon={google}
        provider="Google"
      />
      <SocialAuthButton
        className="social-login-btn social-login-shadow"
        icon={github}
        provider="Github"
      />
    </section>
  );
};
