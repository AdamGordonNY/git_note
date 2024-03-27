"use client";

import React, { useCallback, useEffect } from "react";

import OnboardingOne from "./OnboardingOne";
import { IUser } from "@/database/models/user.model";
import OnboardingTwo from "./OnboardingTwo";

import { useFieldArray, useForm } from "react-hook-form";
import { CompleteProfileEditSchema } from "@/lib/profileValidations";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import OnboardingThree from "./OnboardingThree";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname } from "next/navigation";
import OnboardingFour from "./OnboardingFour";
import CustomButton from "../CustomButton";
import { Progress } from "@/components/ui/progress";
import OnboardingTick from "./OnboardingTick";
import UploadPhoto from "../profile/edit/UploadPhoto";

interface OnboardingProps {
  children?: React.ReactNode;
  step: string;
  user: Partial<IUser>;
}

const Onboarding = ({ step, user }: OnboardingProps) => {
  const [currentStep, setCurrentStep] = React.useState(step);
  const [progress, setProgress] = React.useState(0);
  const path = usePathname();

  const {
    handleSubmit,
    control,
    register,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof CompleteProfileEditSchema>>({
    resolver: zodResolver(CompleteProfileEditSchema),
    defaultValues: {
      learningGoals: user.learningGoals || [],
      experiences: user.experiences?.map((exp) => ({ name: exp })) || [],
      availability: {
        startTime: user?.startTime || new Date(),
        endTime: user?.endTime || new Date(),
      },
      newProjects: user?.newProjects || false,
      technologies: user?.technologies || [],
      portfolio: user?.portfolio || "",
      email: user?.email || "",
    },
  });
  const {
    fields: goalFields,
    append: appendGoal,
    remove: removeGoal,
  } = useFieldArray<z.infer<typeof CompleteProfileEditSchema>>({
    control,
    name: "learningGoals",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray<z.infer<typeof CompleteProfileEditSchema>>({
    control,
    name: "experiences",
  });
  const changeStep = async () => {
    const nextStep = parseInt(currentStep) + 1;
    const {
      fullname,

      portfolio,
      availability,
      learningGoals,
      email,
      experiences,
      newProjects,
    } = getValues();
    try {
      if (nextStep === 2) {
        await updateUser({
          updateData: {
            fullname,
            portfolio,
            email,
          },
          path,
        });
      }
      if (nextStep === 3) {
        await updateUser({
          updateData: {
            learningGoals,
          },
          path,
        });
      }
      if (nextStep === 4) {
        await updateUser({
          updateData: {
            experiences: experiences?.map((experience) => experience.name),
          },
          path,
        });
      }
      if (nextStep === 5) {
        await updateUser({
          updateData: {
            newProjects,

            startTime: availability?.startTime,
            endTime: availability?.endTime,
          },
          path,
        });
      }
    } catch (error) {}

    setCurrentStep(nextStep.toString());

    if (nextStep === 3) {
      setProgress(66);
    }
    if (nextStep === 4) {
      setProgress(100);
    }
  };
  const onSubmit = async () => {
    console.log(getValues());
    try {
      const {
        portfolio,
        availability,
        learningGoals,
        email,
        experiences,
        newProjects,
      } = getValues();
      const dbExperiences = experiences?.map((experience) => experience.name);
      const startTime = availability?.startTime;
      const endTime = availability?.endTime;
      if (currentStep === "1") {
        await updateUser({
          updateData: {
            portfolio,

            email,
            startTime,
            endTime,
            experiences: dbExperiences,
          },
          path,
        });
      } else if (currentStep === "2") {
        await updateUser({
          updateData: {
            learningGoals,
          },
          path,
        });
        changeStep();
      } else if (currentStep === "3") {
        await updateUser({
          updateData: {
            learningGoals,
          },
          path,
        });
        changeStep();
      } else if (currentStep === "4") {
        await updateUser({
          updateData: {
            newProjects,
            startTime,
            endTime,
          },
          path,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  console.log(path);
  const renderForm = useCallback(() => {
    switch (currentStep) {
      case "1":
        return (
          <>
            <OnboardingOne
              user={user}
              step={step}
              register={register}
              errors={errors}
            />
          </>
        );
      case "2":
        return (
          <OnboardingTwo
            goalFields={goalFields}
            register={register}
            appendGoal={appendGoal}
            removeGoal={removeGoal}
          />
        );
      case "3":
        return (
          <OnboardingThree
            register={register}
            step={step}
            experiences={experienceFields}
            errors={errors}
            appendExperience={appendExperience}
            removeExperience={removeExperience}
          />
        );
      case "4":
        return (
          <OnboardingFour
            startTime={user.startTime}
            endTime={user.endTime}
            newProjects={user.newProjects}
          />
        );
      default:
        return (
          <OnboardingOne
            user={user}
            step={step}
            register={register}
            errors={errors}
          />
        );
    }
  }, [
    appendExperience,
    appendGoal,
    currentStep,
    errors,
    experienceFields,
    goalFields,
    register,
    removeExperience,
    removeGoal,
    step,
    user,
  ]);
  useEffect(() => {
    switch (step) {
      case "1":
        setCurrentStep("1");
        setProgress(33);
        renderForm();
        break;
      case "2":
        setCurrentStep("2");
        setProgress(33);
        renderForm();
        break;
      case "3":
        setCurrentStep("3");
        setProgress(66);
        renderForm();
        break;
      case "4":
        setCurrentStep("4");
        setProgress(100);
        renderForm();
        break;
      default:
        setCurrentStep("1");
        break;
    }
  }, [renderForm, step]);

  return (
    <>
      {" "}
      <div className="p-1 align-top">
        <Progress
          value={progress}
          onChange={() => setProgress(progress)}
          onProgress={() => setProgress}
        />
        <OnboardingTick step={parseInt(currentStep)} />
      </div>
      {currentStep === "1" && (
        <div className="box-border justify-around border-white-500">
          {" "}
          <UploadPhoto image={user.image} />
        </div>
      )}
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        {currentStep && renderForm()}

        <CustomButton
          buttonType="primary"
          className="w-full "
          type="submit"
          onClick={changeStep}
        >
          {currentStep !== "4" ? "Next" : "Finish"}
        </CustomButton>
      </form>
    </>
  );
};

export default Onboarding;
