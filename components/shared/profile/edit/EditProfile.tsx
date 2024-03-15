"use client";
import { IUser } from "@/database/models/user.model";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { updateUser } from "@/lib/actions/user.actions";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "../../CustomButton";
import { Input } from "@/components/ui/input";
import LearningGoal from "../LearningGoal";

import ExperienceLevels from "../ExperienceLevels";

import plusCircle from "@/public/icons/pluscircle.svg";
import {
  AvailabilitySchema,
  CompleteProfileEditSchema,
} from "@/lib/profileValidations";
import { PlusSquareIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface EditProfileProps {
  user?: Partial<IUser>;
  _id?: string;
}
type Goal = {
  name: string;
  completed: boolean;
};

const EditProfile = ({ user }: EditProfileProps) => {
  const pathname = usePathname();
  const dbGoalNames = user?.learningGoals?.map((goal, idx) => ({
    name: goal.name,
    key: idx,
    completed: goal.completed,
  }));
  const dbGoalCompleted = user?.learningGoals?.map((goal) => ({
    name: goal.completed === true ? goal.name : "",
    completed: goal.completed === true ? goal.name : false,
  }));
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setFocus,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof CompleteProfileEditSchema>>({
    resolver: zodResolver(CompleteProfileEditSchema),
    defaultValues: {
      email: user?.email || "",
      fullname: user?.fullname || "",
      location: user?.location || "",
      portfolio: user?.portfolio || "",
      learningGoals: dbGoalNames || [],
      technologies: user?.technologies || [],
      availability: user?.availability || [],
      socials: user?.socials || [],
      experiences: user?.experiences?.map((experience) => experience) || [], // Added 'experienceLevel' property
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
  // https://react-hook-form.com/docs/usefieldarray
  const onSubmit: SubmitHandler<
    z.infer<typeof CompleteProfileEditSchema>
  > = async (data) => {
    const {
      fullname,
      portfolio,
      experiences,
      technologies,
      location,
      learningGoals,
      availability,
      socials,
    } = data;
    const goalArray = learningGoals.map((goal: any, idx: number) => ({
      name: goal.name,
      completed: goal.completed,
    }));
    console.log(data);
    if (user?._id) {
      try {
        await updateUser({
          updateData: {
            fullname,
            portfolio,
            experiences: experiences?.map(
              (experience: any) => experience.name as string
            ),
            technologies,
            location,
            learningGoals: goalArray,
            availability: availability.map((date: any) => date),
            socials,
          },
          path: pathname,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {});
  // TODO: substitute FormFields with regular tags
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 flex flex-col px-[30px] w-full"
    >
      <div className="space-y-2">
        <label htmlFor="fullname" className="block text-white-300">
          Full Name
        </label>
        <Input
          {...register("fullname")}
          className="input bg-black-700 text-white-100"
          placeholder="fullname"
        />
        {errors.fullname && (
          <p className="text-red-500">{errors.fullname.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-white-300">
          Username
        </label>
        <Input
          {...register("email")}
          className="input bg-black-700 text-white-100"
          placeholder="email"
          readOnly
        />
      </div>
      {/* Portfolio URL */}
      <div className="space-y-2">
        <label htmlFor="portfolio" className="block  text-white-300">
          Portfolio URL
        </label>
        <Input
          {...register("portfolio")}
          className="bg-black-700 text-white-100"
          placeholder="portfolio"
        />
      </div>
      {user?.learningGoals &&
        user.learningGoals.map((goal) => (
          <div key={goal.name}>
            <LearningGoal
              completed={goal.completed}
              name={goal.name}
              onChange={() => removeGoal(...goal)}
            />
          </div>
        ))}
      {goalFields.map((field, index: number) => (
        <div key={field.id} className="profile-goals-wrapper">
          <Input
            type="checkbox"
            color="green"
            className="size-9 order-1 bg-black-700 text-white-100"
            id={`goals[${index}]CB`}
            {...register(`goals[${index}].checked` as any)}
          />
          <Input
            className="order-2"
            id={`goals[${index}]`}
            placeholder="Enter your goal"
            {...register(`goals[${index}].name` as any)}
          />
          <Button
            type="button"
            className="text-white-100"
            onClick={() => removeGoal(index)}
          >
            Remove
          </Button>
        </div>
      ))}
      {/* @ts-ignore */}
      <CustomButton
        buttonType="profileButton"
        type="button"
        onClick={() => appendGoal({ name: "", completed: false })}
      >
        Add Goal
      </CustomButton>

      <ExperienceLevels experienceLevels={user?.experiences || []} />
      {experienceFields.map((field, index) => {
        return (
          <>
            <div key={field.id}>
              <Input id={`experiences[${index}]`} type="text" />
            </div>
          </>
        );
      })}
      <CustomButton buttonType={`primary`} type="submit">
        Submit
      </CustomButton>
    </form>
  );
};

export default EditProfile;
