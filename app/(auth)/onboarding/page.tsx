import React from "react";
import { getSession } from "@/lib/authOptions";
import { getOneUser } from "@/lib/actions/user.actions";

import { redirect } from "next/navigation";
import Onboarding from "@/components/shared/onboarding/Onboarding";

const OnboardingPage = async () => {
  const session = await getSession();
  let user;
  if (session) {
    user = await getOneUser(session?.user?.email!);
  } else {
    redirect("/sign-in");
  }
  const cleanUser = JSON.parse(JSON.stringify(user));

  return (
    <section className="flex w-[600px] flex-col content-center items-center bg-black-800 p-4 align-middle max-sm:w-[380px] ">
      <Onboarding user={cleanUser} step="1"></Onboarding>
    </section>
  );
};

export default OnboardingPage;
