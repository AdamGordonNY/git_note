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
import { Calendar } from "lucide-react";

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

  const [selectedFrom, setSelectedFrom] = React.useState();
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
      {goalFields.map((field, index: number) => (
        <>
          <div key={field.id} className="profile-goals-wrapper">
            <Input
              type="checkbox"
              color="green-500"
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
        </>
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
      <div className="flex flex-col justify-stretch gap-2 px-3.5 py-3  ">
        <label
          htmlFor="technologies"
          className="justify-start space-y-2 text-white-300"
        >
          Tech Stacks
        </label>
        <div className="flex w-full  bg-black-700 ">
          {technologies && // eslint-disable-next-line array-callback-return
            technologies?.map((tech: any, index) => {
              const icon = techStackBadges.find((badge) => badge.name === tech);
              if (icon)
                return (
                  <>
                    <span
                      key={index}
                      className="tech-badges paragraph-3-medium shadow-custom w-1/2   flex-row justify-between bg-black-600 text-white-100"
                    >
                      {icon.icon({ size: 16 })}
                      {tech}
                    </span>
                  </>
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
              if (icon)
                return (
                  <>
                    <div className="flex  flex-col bg-black-700" key={index}>
                      <Button
                        key={index}
                        className="text-white-100"
                        onClick={(e) =>
                          setValue(`technologies`, [
                            ...technologies!,
                            result.name,
                          ])
                        }
                      >
                        <div
                          key={index}
                          className="h-8 flex-row gap-x-[12px] rounded-[3px] bg-black-600 px-2  py-0.5"
                        >
                          <span className="tech-badges paragraph-3-medium grow">
                            {icon.icon({ size: 16 })}
                            {result.name}
                          </span>
                        </div>
                      </Button>
                    </div>
                  </>
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
              color="green"
              type="checkbox"
              {...register("newProjects")}
              checked={user?.newProjects}
              onChange={(e) => setValue("newProjects", e.target.checked)}
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
                  render={({ field: { onChange, onBlur, value, ref } }) => (
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
