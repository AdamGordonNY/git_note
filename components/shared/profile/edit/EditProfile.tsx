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
import { CompleteProfileEditSchema } from "@/lib/profileValidations";
import { Button } from "@/components/ui/button";
interface EditProfileProps {
  user?: Partial<IUser>;
  _id?: string;
}
const EditProfile = ({ user }: EditProfileProps) => {
  const pathname = usePathname();
  const dbGoals = user?.learningGoals?.map((goal, idx) => ({
    name: goal.name,

    completed: goal.completed,
  }));
  const experienceNames = user?.experiences?.map((experience) => ({
    name: experience,
  }));
  const techStackNames = user?.technologies?.map((tech) => ({ name: tech }));
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof CompleteProfileEditSchema>>({
    resolver: zodResolver(CompleteProfileEditSchema),
    defaultValues: {
      email: user?.email || "",
      fullname: user?.fullname || "",
      location: user?.location || "",
      portfolio: user?.portfolio || "",
      learningGoals: dbGoals || [],
      experiences: experienceNames || [],
      technologies: techStackNames || [],
    },
  });
  useEffect(() => {
    console.log(errors);
  }, [errors]);
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
    const { fullname, portfolio, learningGoals, experiences } = data;
    const dbExperiences = experiences?.map((experience) => experience.name);
    if (user?._id) {
      try {
        await updateUser({
          updateData: {
            fullname,
            portfolio,
            learningGoals,
            experiences: dbExperiences,
          },
          path: pathname,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // TODO: substitute FormFields with regular tags
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col space-y-6 px-[30px]"
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
      {goalFields.map((field, index: number) => (
        <div key={field.id} className="profile-goals-wrapper">
          <Input
            type="checkbox"
            color="green"
            className="order-1 size-9 bg-black-700 text-white-100"
            id={`learningGoals[${index}]CB`}
            {...register(`learningGoals[${index}].completed` as any)}
          />
          <Input
            className="order-2"
            id={`learningGoals[${index}]`}
            placeholder="Enter your goal"
            {...register(`learningGoals[${index}].name` as any)}
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
      <CustomButton
        buttonType="profileButton"
        type="button"
        // @ts-ignore
        onClick={() => appendGoal({ name: "", completed: false })}
      >
        Add Goal
      </CustomButton>

      {experienceFields.map((field, index) => {
        return (
          <>
            <div className="profile-goals-wrapper" key={field.id}>
              <Button
                className="text-white-100"
                type="button"
                onClick={() => removeExperience(index)}
              >
                {" "}
                Remove
              </Button>
              <Input
                id={`experiences[${index}].name`}
                type="text"
                {...register(`experiences[${index}].name` as any)}
              />
            </div>
          </>
        );
      })}
      <Input {...register(`technologies`)} />
      <CustomButton
        buttonType="profileButton"
        type="button"
        onClick={() => appendExperience({ name: "" })}
      >
        Add Experience
      </CustomButton>
      <CustomButton buttonType={`primary`} type="submit">
        Submit
      </CustomButton>
    </form>
  );
};

export default EditProfile;
