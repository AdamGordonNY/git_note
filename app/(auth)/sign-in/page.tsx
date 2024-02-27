import SignIn from "@/components/forms/auth/SignIn";
import React from "react";

const SignInPage = () => {
  return (
    <div className="flex-center flex-col">
      <span className="justify-start display-2-bold text-white-100">Login</span>

      <SignIn />
    </div>
  );
};

export default SignInPage;
