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
  Controller,
} from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "../../CustomButton";
import { Input } from "@/components/ui/input";
import { CompleteProfileEditSchema } from "@/lib/profileValidations";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { DayPicker } from "react-day-picker";
import { techStackBadges } from "@/lib/constants";
import { Calendar, X } from "lucide-react";
import blueCheck from "@/public/icons/checksquare.svg";
import Image from "next/image";
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
  // manage the search state
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof CompleteProfileEditSchema>>({
    resolver: zodResolver(CompleteProfileEditSchema),
    defaultValues: {
      email: user?.email || "",
      fullname: user?.fullname || "",
      location: user?.location || "",
      portfolio: user?.portfolio || "",
      learningGoals: dbGoals || [],
      experiences: experienceNames || [],
      technologies: user?.technologies || [],
      availability:
        { startTime: user?.startTime, endTime: user?.endTime } || {},
      newProjects: user?.newProjects || false,
    },
  });

  const technologies = useWatch({ control, name: "technologies" });
  const availability = useWatch({ control, name: "availability" });

  useEffect(() => {
    console.log(errors);
    console.log(availability);
  }, [errors, availability]);
  useEffect(() => {
    const results = techStackBadges.filter((choice) =>
      choice.name.toLowerCase().includes(search.toLowerCase())
    );

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
  // After useForm

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

  const onSubmit: SubmitHandler<
    z.infer<typeof CompleteProfileEditSchema>
  > = async (data) => {
    const {
      fullname,
      portfolio,
      learningGoals,
      experiences,
      technologies,
      newProjects,
      availability,
    } = data;
    const dbExperiences = experiences?.map((experience) => experience.name);
    const startTime = availability?.startTime;
    const endTime = availability?.endTime;
    if (user?._id) {
      try {
        await updateUser({
          updateData: {
            fullname,
            portfolio,
            learningGoals,
            experiences: dbExperiences,
            technologies,
            startTime,
            endTime,
            newProjects,
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
      <div className="my-10 space-y-4 py-10">
        <label
          htmlFor="learningGoals"
          className="paragraph-3-regular text-white-300"
        >
          {" "}
          Learning Goals
        </label>
        {goalFields.map((field, index: number) => (
          <React.Fragment key={field.id}>
            <div
              key={field.id}
              className="paragraph-3-regular flex w-full flex-row items-center justify-between gap-[14px] space-y-4 bg-black-700 "
            >
              <Input
                type="checkbox"
                color="green-500"
                className="order-1 size-6 bg-black-700 text-white-100"
                id={`learningGoals[${index}]CB`}
                {...register(`learningGoals[${index}].completed` as any)}
              />
              <Input
                className=" order-2 bg-black-700 text-white-100 ring-black-700"
                id={`learningGoals[${index}]`}
                placeholder="Enter your goal"
                {...register(`learningGoals[${index}].name` as any)}
              />
              <Button
                type="button"
                className="order-3 text-white-100"
                onClick={() => removeGoal(index)}
              >
                <X size={20} />
              </Button>
            </div>
          </React.Fragment>
        ))}
        <CustomButton
          buttonType="profileButton"
          type="button"
          // @ts-ignore
          onClick={() => appendGoal({ name: "", completed: false })}
        >
          Add Goal
        </CustomButton>
      </div>
      <div className="my-10 py-10">
        <label
          className="paragraph-3-bold text-white-300"
          htmlFor="experiences"
        >
          Knowledge{" "}
        </label>
        {experienceFields.map((field, index) => {
          return (
            <React.Fragment key={field.id}>
              <div
                className="paragraph-3-regular flex h-[48px] w-full flex-row items-center justify-between gap-[14px] space-y-4"
                key={field.id}
              >
                <Button
                  className="paragraph-3-regular order-2 bg-black-800 text-white-100"
                  type="button"
                  onClick={() => removeExperience(index)}
                >
                  {" "}
                  <X size={20} />
                </Button>
                <Input
                  id={`experiences[${index}].name`}
                  type="text"
                  className="paragraph-3-regular order-1 bg-black-700 text-white-100 ring-transparent  focus:ring-transparent"
                  {...register(`experiences[${index}].name` as any)}
                />
                <Image src={blueCheck} alt="knowledge" width={16} height={16} />
              </div>
            </React.Fragment>
          );
        })}
        <CustomButton
          className="mt-[16px]"
          buttonType="profileButton"
          type="button"
          onClick={() => appendExperience({ name: "" })}
        >
          Add Knowledge
        </CustomButton>
      </div>
      {/* Technologies Section with Search Box */}
      <div className="flex flex-col justify-stretch gap-2 px-3.5 py-3  ">
        <label
          htmlFor="technologies"
          className="justify-start space-y-2 text-white-300"
        >
          Tech Stacks
        </label>
        <div className="box-border flex  w-full bg-black-700">
          {technologies && // eslint-disable-next-line array-callback-return
            technologies?.map((tech: any, index) => {
              const icon = techStackBadges.find((badge) => badge.name === tech);
              const capitalized = tech.charAt(0).toUpperCase() + tech.slice(1);
              if (icon)
                return (
                  <React.Fragment key={tech}>
                    <div className="box-border flex max-w-full flex-1 flex-row bg-black-600">
                      <span
                        key={index}
                        className=" paragraph-3-medium shadow-custom flex flex-row  justify-between bg-black-600 p-2 text-white-100"
                      >
                        {icon.icon}
                        {capitalized}
                      </span>
                    </div>
                  </React.Fragment>
                );
            })}

          <Input
            className=" w-1/2  bg-black-700 text-white-100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex h-9 w-full flex-row">
          {search &&
            results.length > 0 &&
            // eslint-disable-next-line array-callback-return
            results.map((result: any, index) => {
              if (technologies?.includes(result.name)) {
                return false;
              }
              const icon = techStackBadges.find(
                (badge) => badge.name === result.name
              );
              const capitalized =
                result.name.charAt(0).toUpperCase() + result.name.slice(1);
              if (icon)
                return (
                  <React.Fragment key={result.name}>
                    <div className="flex  flex-col bg-black-700" key={index}>
                      <Button
                        key={index}
                        className="w-full text-white-100"
                        onClick={(e) =>
                          setValue(`technologies`, [
                            ...technologies!,
                            result.name,
                          ])
                        }
                      >
                        <div
                          key={result.name}
                          className="flex h-8 flex-row items-center gap-x-[12px] rounded-[3px] bg-black-600 px-2  py-0.5"
                        >
                          <span className="paragraph-3-medium">
                            {icon?.icon}
                            {capitalized}
                          </span>
                        </div>
                      </Button>
                    </div>
                  </React.Fragment>
                );
            })}
        </div>
      </div>
      <div className="border-top box-border flex flex-col items-start">
        <label className="text-white-300" htmlFor="availability">
          Schedule and Availability
        </label>

        <div className="flex flex-row gap-2">
          <label htmlFor="newProjects" className="py-[30px]">
            {" "}
            <input
              height={16}
              width={16}
              type="checkbox"
              {...register("newProjects")}
            />
            <span className="paragraph-3-medium text-white-100">
              {" "}
              Are You Available for new projects?
            </span>
          </label>
        </div>
        <div className="flex w-full grow flex-row justify-around gap-x-2">
          <div className="flex w-full flex-col">
            {" "}
            <label className="text-white-100" htmlFor="availability.startTime">
              Start Date{" "}
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button className=" profile-shadow max-w-full grow bg-black-600 text-white-500">
                  <Calendar size={16} /> Select Start Time
                </Button>
              </PopoverTrigger>

              <PopoverContent className="z-20 w-full flex-none grow self-stretch rounded-[4px] bg-black-700 text-white-100">
                <Controller
                  control={control}
                  name="availability.startTime"
                  render={({ field: { onChange } }) => (
                    <DayPicker
                      key="from"
                      className="bg-black-700 text-white-500"
                      onSelect={(selectedDate) => onChange(selectedDate)}
                      showOutsideDays
                      weekStartsOn={0}
                      selected={selectedFrom}
                      defaultMonth={new Date()}
                      mode="single"
                      onDayClick={(selectedFrom) => {
                        handleDaySelectFrom(selectedFrom);
                      }}
                    />
                  )}
                />
              </PopoverContent>
            </Popover>
            <span className="paragraph-4-medium space-y-2 text-white-500">
              Set to Local Time
            </span>
            <div>
              <span className="mt-[20px] text-white-100">
                {selectedFrom?.toDateString()}
              </span>
            </div>
          </div>

          <div className="flex w-full flex-col">
            <label className="text-white-100" htmlFor="availability.endTime">
              End Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button className=" max-w-full grow bg-black-600 text-white-500">
                  <Calendar size={16} /> Select End Time
                </Button>
              </PopoverTrigger>
              <PopoverContent className="z-20  w-full flex-none  self-stretch  rounded-[4px] bg-black-700 text-white-100">
                <Controller
                  control={control}
                  name="availability.endTime"
                  render={({ field: { onChange } }) => (
                    <DayPicker
                      key="to"
                      className="bg-black-700 text-white-500"
                      onSelect={(selectedDate) => onChange(selectedDate)}
                      showOutsideDays
                      weekStartsOn={0}
                      selected={selectedTo}
                      defaultMonth={new Date()}
                      mode="single"
                      onDayClick={(selectedFrom) => {
                        handleDaySelectTo(selectedFrom);
                      }}
                    />
                  )}
                />
              </PopoverContent>
            </Popover>
            <span className="paragraph-4-medium space-y-2 text-white-300">
              Set to Local Time
            </span>
            <div>
              <span className="mt-[20px] text-white-100">
                {selectedTo?.toDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      <CustomButton buttonType={`primary`} type="submit">
        Submit
      </CustomButton>
    </form>
  );
};
export default EditProfile;
