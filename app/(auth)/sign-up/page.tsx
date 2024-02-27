import React from "react";

import SignUp from "@/components/forms/auth/SignUp";
const SignUpPage = () => {
  return (
    <div className="flex-center flex-col">
      <span className="justify-start display-2-bold text-white-100">
        Sign Up
      </span>
      <SignUp />
    </div>
  );
};

export default SignUpPage;
