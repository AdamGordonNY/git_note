import React from "react";
import Onboarding from "@/components/auth/Onboarding";
interface PageProps {
  step: "1" | "2" | "3" | "4";
}
// TODO : look at each 4 onboarding step design files and determine the props to pass to the Onboarding component
// could use each step as a key to determine the props to pass to the Onboarding component
const OnboardingPage = ({ step }: PageProps) => {
  return <div>OnboardingPage</div>;
};

export default OnboardingPage;
