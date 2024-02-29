import React from "react";

import SignUp from "@/components/auth/SignUpForm";
const SignUpPage = () => {
  return (
    <div className="flex-center flex-col">
      <span className="justify-start text-2xl leading-8 text-white-100">
        Create An Account
      </span>
      <div className="h-[472px] w-[400px]">
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
