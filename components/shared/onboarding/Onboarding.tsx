"use client";

import React from "react";
import OnboardingOne from "./OnboardingOne";
import { IUser } from "@/database/models/user.model";

import { useFieldArray, useForm } from "react-hook-form";
import { CompleteProfileEditSchema } from "@/lib/profileValidations";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUser } from "@/lib/actions/user.actions";
import CustomButton from "../CustomButton";
import { Progress } from "@/components/ui/progress";
import OnboardingTick from "./OnboardingTick";
import UploadPhoto from "../profile/edit/UploadPhoto";
import { useRouter } from "next/navigation";
import EditExperience from "../profile/edit/EditExperience";
import EditGoals from "../profile/edit/EditGoals";
import EditAvailability from "../profile/edit/EditAvailability";
interface OnboardingProps {
  step: string;
  user: Partial<IUser>;
}

const Onboarding = ({ step, user }: OnboardingProps) => {
  const [currentStep, setCurrentStep] = React.useState(step);
  const router = useRouter();

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
        startTime: user?.startTime ? new Date(user.startTime) : new Date(), // changes requested on this part for the date crashing
        endTime: user?.endTime ? new Date(user.endTime) : new Date(),
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

    const fields = stepMap[currentStep].fields;

    const filteredObject = Object.keys(getValues()).reduce((acc, key) => {
      if (fields.includes(key)) {
        // @ts-ignore
        acc[key] = getValues()[key];
      }
      return acc;
    }, {} as any);

    if (filteredObject.experiences) {
      filteredObject.experiences = filteredObject.experiences.map(
        (experience: any) => experience.name
      );
    }
    if (filteredObject.availability) {
      filteredObject.availability.startTime =
        filteredObject.availability.startTime.toISOString();
      filteredObject.availability.endTime =
        filteredObject.availability.endTime.toISOString();
    }
    try {
      await updateUser({
        updateData: filteredObject,
      });
    } catch (error) {
      console.log(error);
    }

    setCurrentStep(nextStep.toString());
  };
  const onSubmit = async () => {
    try {
      const { availability, newProjects } = getValues();
      const startTime = availability?.startTime;
      const endTime = availability?.endTime;

      updateUser({
        updateData: {
          newProjects,
          startTime,
          endTime,
        },
      });
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const stepMap: {
    [key: string]: {
      component: React.ReactNode;
      fields: string[];
    };
  } = {
    1: {
      fields: ["fullname", "portfolio", "email"],
      component: (
        <OnboardingOne
          user={user}
          step={step}
          register={register}
          errors={errors}
        />
      ),
    },
    2: {
      fields: ["learningGoals"],
      component: (
        <EditGoals
          step={step}
          goalFields={goalFields}
          register={register}
          appendGoal={appendGoal}
          removeGoal={removeGoal}
        />
      ),
    },
    3: {
      fields: ["experiences"],
      component: (
        <EditExperience
          step={step}
          experienceFields={experienceFields}
          register={register}
          removeExperience={removeExperience}
          appendExperience={appendExperience}
        />
      ),
    },
    4: {
      fields: ["newProjects", "availability"],
      component: (
        <EditAvailability register={register} control={control} step={step} />
      ),
    },
  };

  return (
    <>
      <section className="relative w-full align-top ">
        <div className="absolute top-[50%] h-1 w-full bg-gray-400/30"></div>
        <Progress
          className="absolute top-[25%]"
          value={(Number(currentStep) - 1) * 33}
          max={4}
        />

        <OnboardingTick step={parseInt(currentStep)} />
      </section>
      {currentStep === "1" && (
        <section className="box-border flex w-full flex-col  justify-between space-y-2 border-white-500 p-2">
          {" "}
          <span className="display-2-bold align-top text-white-100">
            Basic Information
          </span>
          <UploadPhoto className="justify-betweeh" image={user.image} />
        </section>
      )}
      <form
        className="flex-0 w-full overflow-y-hidden py-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {stepMap[currentStep].component}

        {currentStep !== "4" ? (
          <CustomButton
            className="mt-4"
            type="button"
            buttonType="primary"
            onClick={changeStep}
          >
            Next
          </CustomButton>
        ) : (
          <CustomButton buttonType="primary" type="submit">
            {" "}
            Finish
          </CustomButton>
        )}
      </form>
    </>
  );
};

export default Onboarding;
