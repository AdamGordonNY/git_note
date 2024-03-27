"use client";
import React from "react";
import EditGoals from "../profile/edit/EditGoals";

const OnboardingTwo = ({
  register,
  goalFields,
  appendGoal,
  removeGoal,
}: {
  register: any;
  goalFields: any;
  appendGoal: any;
  removeGoal: any;
}) => {
  return (
    <EditGoals
      register={register}
      removeGoal={removeGoal}
      goalFields={goalFields}
      appendGoal={appendGoal}
    />
  );
};

export default OnboardingTwo;
