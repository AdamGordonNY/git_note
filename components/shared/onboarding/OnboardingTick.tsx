import React from "react";
import Image from "next/image";
import completedTick from "@/public/icons/completedtick.svg";
import currentTick from "@/public/icons/currenttick.svg";
import incompleteTick from "@/public/icons/incompletetick.svg";

const OnboardingTick = ({ step }: { step: number }) => {
  return (
    <div className="relative h-8 w-full align-middle ">
      <div className="absolute left-0 top-0 h-1 w-full bg-gray-400"></div>
      <div className="absolute left-0 top-0 h-1 w-1/4 bg-primary-500"></div>
      <div className="absolute left-0 top-0 flex w-full justify-between">
        <Image
          src={
            step >= 1
              ? step === 1
                ? currentTick
                : completedTick
              : incompleteTick
          }
          alt="tick"
        />
        <Image
          src={
            step >= 2
              ? step === 2
                ? currentTick
                : completedTick
              : incompleteTick
          }
          alt="tick"
        />
        <Image
          src={
            step >= 3
              ? step === 3
                ? currentTick
                : completedTick
              : incompleteTick
          }
          alt="tick"
        />
        <Image
          src={
            step >= 4
              ? step === 4
                ? currentTick
                : completedTick
              : incompleteTick
          }
          alt="tick"
        />
      </div>
    </div>
  );
};

export default OnboardingTick;
