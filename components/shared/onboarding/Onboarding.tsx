"use client";

import React, { useEffect, useTransition } from "react";
import OnboardingOne from "./OnboardingOne";
import { IUser } from "@/database/models/user.model";
import OnboardingTwo from "./OnboardingTwo";
import { useFieldArray, useForm } from "react-hook-form";
import { CompleteProfileEditSchema } from "@/lib/profileValidations";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import OnboardingThree from "./OnboardingThree";
import { updateUser } from "@/lib/actions/user.actions";
import OnboardingFour from "./OnboardingFour";
import CustomButton from "../CustomButton";
import { Progress } from "@/components/ui/progress";
import OnboardingTick from "./OnboardingTick";
import UploadPhoto from "../profile/edit/UploadPhoto";
import { useRouter } from "next/navigation";

interface OnboardingProps {
  children?: React.ReactNode;
  step: string;
  user: Partial<IUser>;
}

const Onboarding = ({ step, user }: OnboardingProps) => {
  const [currentStep, setCurrentStep] = React.useState(step);
  const router = useRouter();
  const [pending, startTransition] = useTransition();
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
        });
      }
      if (nextStep === 3) {
        await updateUser({
          updateData: {
            learningGoals,
          },
        });
      }
      if (nextStep === 4) {
        await updateUser({
          updateData: {
            experiences: experiences?.map((experience) => experience.name),
          },
        });
      }
      if (nextStep === 5) {
        startTransition(() => {
          updateUser({
            updateData: {
              newProjects,
              startTime: availability?.startTime,
              endTime: availability?.endTime,
            },
          });
        });
      }
    } catch (error) {
      console.log(error);
    }

    setCurrentStep(nextStep.toString());
  };
  const [selectedFrom, setSelectedFrom] = React.useState<Date>();
  const [selectedTo, setSelectedTo] = React.useState<Date>();

  const handleDaySelectFrom = (date: Date | undefined) => {
    if (!date) {
      setSelectedFrom(date as any);
      return;
    }

    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    setSelectedFrom(newDate as any);
  };
  const handleDaySelectTo = (date: Date | undefined) => {
    if (!date) {
      setSelectedTo(date as any);
      return;
    }

    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    setSelectedTo(newDate as any);
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
        fullname,
      } = getValues();
      const dbExperiences = experiences?.map((experience) => experience.name);
      const startTime = availability?.startTime;
      const endTime = availability?.endTime;
      if (currentStep === "1") {
        await updateUser({
          updateData: {
            portfolio,
            email,
            fullname,
          },
        });
      } else if (currentStep === "2") {
        await updateUser({
          updateData: {
            learningGoals,
          },
        });
        changeStep();
      } else if (currentStep === "3") {
        await updateUser({
          updateData: {
            experiences: dbExperiences,
          },
        });
        changeStep();
      } else if (currentStep === "4") {
        await updateUser({
          updateData: {
            newProjects,
            startTime,
            endTime,
          },
        });
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const renderForm = () => {
    switch (currentStep) {
      case "1":
        return (
          <OnboardingOne
            user={user}
            step={step}
            register={register}
            errors={errors}
          />
        );
      case "2":
        return (
          <OnboardingTwo
            step={step}
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
            register={register}
            control={control}
            selectedFrom={selectedFrom!}
            selectedTo={selectedTo!}
            handleDaySelectFrom={handleDaySelectFrom}
            handleDaySelectTo={handleDaySelectTo}
            errors={errors}
            step={step}
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
  };
  useEffect(() => {
    switch (step) {
      case "1":
        setCurrentStep("1");
        break;
      case "2":
        setCurrentStep("2");
        break;
      case "3":
        setCurrentStep("3");
        break;
      case "4":
        setCurrentStep("4");
        break;
      default:
        setCurrentStep("1");
        break;
    }
  }, [step]);

  return (
    <>
      <section className="relative w-full">
        <div className="absolute top-[50%] h-1 w-full bg-gray-400/30"></div>
        <Progress
          className="absolute top-[25%]"
          value={(Number(currentStep) - 1) * 33}
          max={4}
        />

        <OnboardingTick step={parseInt(currentStep)} />
      </section>
      {currentStep === "1" && (
        <div className="box-border justify-between border-white-500 p-4">
          {" "}
          <UploadPhoto image={user.image} />
        </div>
      )}
      <form
        className="flex-0 w-full overflow-y-hidden"
        onSubmit={handleSubmit(onSubmit)}
      >
        {currentStep && renderForm()}

        {currentStep !== "4" ? (
          <CustomButton
            className="pb-4"
            buttonType="primary"
            onClick={changeStep}
          >
            Next
          </CustomButton>
        ) : (
          <CustomButton disabled={pending} buttonType="primary" type="submit">
            {" "}
            Finish
          </CustomButton>
        )}
      </form>
    </>
  );
};

export default Onboarding;
