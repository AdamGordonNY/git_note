"use client";
import { IUser } from "@/database/models/user.model";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { updateUser } from "@/lib/actions/user.actions";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  useWatch,
} from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "../../CustomButton";
import { Input } from "@/components/ui/input";
import { CompleteProfileEditSchema } from "@/lib/profileValidations";
import { Button } from "@/components/ui/button";

import { techStackBadges } from "@/lib/constants";

interface EditProfileProps {
  user?: Partial<IUser>;
  _id?: string;
}
const EditProfile = ({ user }: EditProfileProps) => {
  const pathname = usePathname();
  // instantiates the form with the user's data
  const dbGoals = user?.learningGoals?.map((goal, idx) => ({
    name: goal.name,
    completed: goal.completed,
  }));
  // instantiates the form with the user's data
  const experienceNames = user?.experiences?.map((experience) => ({
    name: experience,
  }));
  const techStackNames = [] as any;
  // manage the search state
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  // form state
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
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

  const technologies = useWatch({ control, name: "technologies" });
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  useEffect(() => {
    const results = techStackBadges.filter((choice) =>
      choice.name.toLowerCase().includes(search.toLowerCase())
    );
    console.log(results);
    setResults(results as any);
  }, [search]);
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
    const { fullname, portfolio, learningGoals, experiences, technologies } =
      data;
    const dbExperiences = experiences?.map((experience) => experience.name);
    console.log(dbExperiences);
    const dbTechnologies = technologies?.map((name) => name) || [];

    if (user?._id) {
      try {
        await updateUser({
          updateData: {
            fullname,
            portfolio,
            learningGoals,
            experiences: dbExperiences,
            technologies: dbTechnologies || [],
          },
          path: pathname,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

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
      <CustomButton
        buttonType="profileButton"
        type="button"
        onClick={() => appendExperience({ name: "" })}
      >
        Add Experience
      </CustomButton>
      {/* Technologies Section with Search Box */}
      <div className="profile-goals-wrapper bg-black-700  ">
        <label
          htmlFor="technologies"
          className="block space-y-2 text-white-300"
        >
          Tech Stacks
        </label>
        <div className="flex  w-full shrink flex-col">
          {technologies?.map((tech: any, index) => {
            return (
              <div
                key={index}
                className="paragraph-3-bold order-2 flex h-7 w-1/2 flex-col items-center justify-start bg-black-600 p-3 text-white-100"
              >
                {" "}
                {tech}
              </div>
            );
          })}

          <Input
            className="w-full justify-end text-white-100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex h-6 grow-0 bg-black-700">
          {search &&
            results.length > 0 &&
            results.map((result: any, index) => {
              return (
                <div className="flex grow-0 flex-col bg-black-700" key={index}>
                  <Button
                    key={index}
                    className="overflow-auto overflow-y-hidden text-white-100"
                    onClick={(e) =>
                      setValue(`technologies`, [...technologies!, result.name])
                    }
                  >
                    {result.icon()}
                    {result.name}
                  </Button>
                </div>
              );
            })}
        </div>
      </div>
      <CustomButton buttonType={`primary`} type="submit">
        Submit
      </CustomButton>
    </form>
  );
};
export default EditProfile;
