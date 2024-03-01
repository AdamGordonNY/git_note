import { getProviders } from "next-auth/react";
import React from "react";
import SocialAuthButton from "@/components/auth/SocialAuthButton";
import google from "@/public/icons/google.svg";
import github from "@/public/icons/github.svg";
export const SocialAuthGroup = async () => {
  const providers = await getProviders();
  return (
    <div>
      {" "}
      <SocialAuthButton
        className="social-login-btn social-login-shadow"
        icon={google}
        text={`${providers?.google.name || ""}`}
        provider={providers?.google.name || ""}
      ></SocialAuthButton>
      <SocialAuthButton
        className="social-login-btn social-login-shadow"
        icon={github}
        text={`${providers?.github.name || ""}`}
        provider={providers?.github.name || ""}
      />
    </div>
  );
};
