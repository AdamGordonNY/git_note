import React from "react";

import { getSession } from "@/lib/authOptions";

interface PageProps {
  step: "1" | "2" | "3" | "4";
}
// TODO : look at each 4 onboarding step design files and determine the props to pass to the Onboarding component
// could use each step as a key to determine the props to pass to the Onboarding component
const OnboardingPage = async ({ step }: PageProps) => {
  const session = await getSession();
  if (session?.user) {
    step = "1";
  }
  return <div>OnboardingPage</div>;
};

export default OnboardingPage;
