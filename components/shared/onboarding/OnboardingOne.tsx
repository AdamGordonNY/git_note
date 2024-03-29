import React from "react";
import EditBasicInfo from "../profile/edit/EditBasicInfo";

import { IUser } from "@/database/models/user.model";

interface OnboardingOneProps {
  user?: Partial<IUser>;
  step: string;
  register: any;
  errors: any;
  className?: string;
}
const OnboardingOne = ({ register, errors, step }: OnboardingOneProps) => {
  return (
    <>
      <EditBasicInfo step={step} register={register} errors={errors} />
    </>
  );
};

export default OnboardingOne;
