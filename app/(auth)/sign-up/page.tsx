import React from "react";

import SignUp from "@/components/auth/SignUpForm";
const SignUpPage = () => {
  return (
    <div className="flex-center flex-col">
      <span className="display-2-bold justify-start text-white-100">
        Create An Account
      </span>
      <div className="w-[400px h-[472px]">
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
