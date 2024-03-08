"use client";
import React from "react";
import currentTick from "@/public/icons/currenttick.svg";
import completedTick from "@/public/icons/completedtick.svg";
import incompleteTick from "@/public/icons/incompletetick.svg";
interface OnboardingFormProps {
  step: "1" | "2" | "3" | "4";
}
const OnboardingForm = ({ step }: OnboardingFormProps) => {
  return <div>OnboardingForm</div>;
};

export default OnboardingForm;
