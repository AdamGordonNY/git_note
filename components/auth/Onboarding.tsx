import React from "react";

interface OnboardingProps {
  step: "1" | "2" | "3" | "4";
}
// TODO: haven't iterated through what i need for each form part yet, where it will render based on what fields are filled in.

const Onboarding = ({ step }: OnboardingProps) => {
  return <div>Onboarding</div>;
};

export default Onboarding;
