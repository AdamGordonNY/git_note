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

import { DayPicker, DayClickEventHandler } from "react-day-picker";
import { techStackBadges } from "@/lib/constants";
import { Calendar } from "lucide-react";
import { getMonth, toDate } from "date-fns";

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

  const today = Date.now();
  const defaultMonth = toDate(getMonth(today));
  const [timeValueFrom, setTimeValueFrom] = React.useState("00:00");
  const [selectedFrom, setSelectedFrom] = React.useState();
  const [timeValueTo, setTimeValueTo] = React.useState("00:00");
  const [selectedTo, setSelectedTo] = React.useState<Date>();
  //
  //  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e:number | undefined) => {
  //    const time = e.target.value;
  //    if (!selectedFrom) {
  //      setTimeValueTo(time);
  //      return;
  //    }
  //    if (!selectedTo) {
  //      setTimeValueFrom(time);
  //      return;
  //    }
  //    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
  //
  //    const newSelectedDate = new Date(
  //      selectedFrom?.getFullYear(),
  //      selected.getMonth(),
  //      selected.getDate(),
  //      hours,
  //      minutes
  //    );
  //    setSelected(newSelectedDate);
  //    setTimeValue(time);
  //  };
  //
  //  const handleDaySelect = (date: Date | undefined) => {
  //    if (!timeValue || !date) {
  //      setSelected(date);
  //      return;
  //    }
  //    const [hours, minutes] = timeValue
  //      .split(":")
  //      .map((str) => parseInt(str, 10));
  //    const newDate = new Date(
  //      date.getFullYear(),
  //      date.getMonth(),
  //      date.getDate(),
  //      hours,
  //      minutes
  //    );
  //    setSelected(newDate);
  //  };
  //
  //
  //
  const onSubmit: SubmitHandler<
    z.infer<typeof CompleteProfileEditSchema>
  > = async (data) => {
    const { fullname, portfolio, learningGoals, experiences, technologies } =
      data;
    const dbExperiences = experiences?.map((experience) => experience.name);

    if (user?._id) {
      try {
        await updateUser({
          updateData: {
            fullname,
            portfolio,
            learningGoals,
            experiences: dbExperiences,
            technologies,
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
      <div className="flex flex-col justify-stretch gap-2 bg-black-700 px-3.5 py-3  ">
        <label
          htmlFor="technologies"
          className="justify-start space-y-2 text-white-300"
        >
          Tech Stacks
        </label>
        <div className="inline-flex w-full  bg-black-700 ">
          {technologies?.map((tech: any, index) => {
            const icon = techStackBadges.find((badge) => badge.name === tech);
            if (icon)
              return (
                <>
                  <span
                    key={index}
                    className="tech-badges paragraph-3-medium shadow-custom w-1/2   flex-row justify-between bg-black-600 text-white-100"
                  >
                    {icon.icon}
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
        <div className="flex h-9 w-full flex-row  bg-black-700">
          {search &&
            results.length > 0 &&
            results.map((result: any, index) => {
              if (technologies?.includes(result.name)) {
                return null;
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
      <div className="wrapper border-top">
        <label
          className="pl-[30px] pt-[30px] text-white-300"
          htmlFor="availability"
        >
          Schedule and availability
        </label>

        <div className="box-border flex flex-row gap-2">
          <input
            height={16}
            width={16}
            color="green"
            type="checkbox"
            {...register("newProjects")}
            value={"false"}
          />
          <span className="paragraph-3-medium text-white-100">
            {" "}
            Are You Available for new projects?
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="order-1 bg-black-600 text-white-500">
                <Calendar size={16} /> Select Start Time
              </Button>
            </PopoverTrigger>
            <PopoverContent className="z-20 w-1/2 flex-none grow-0 self-stretch rounded-[4px] bg-black-700">
              <Controller
                control={control}
                name="availability.startTime"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <DayPicker
                    key="from"
                    className="bg-black-700 text-white-100"
                    onSelect={(e) => console.log(e)}
                    showOutsideDays
                    weekStartsOn={0}
                    defaultMonth={defaultMonth}
                    onMonthChange={(e) => console.log(e)}
                    mode="single"
                    onDayClick={(e: any) => setSelectedFrom(e)}
                    footer={
                      <>
                        <p>
                          Select a Time:
                          <Input
                            type="time"
                            value={timeValueFrom}
                            onChange={(e) => setTimeValueFrom(e.target.value)}
                          ></Input>
                        </p>
                      </>
                    }
                  />
                )}
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button className="bg-black-600 text-white-500">
                <Calendar size={16} /> Select End Time
              </Button>
            </PopoverTrigger>
            <PopoverContent className="date-input">
              <Controller
                control={control}
                name="availability.endTime"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <DayPicker
                    className="bg-black-700 text-white-100"
                    onSelect={(e) => console.log(e)}
                    showOutsideDays
                    weekStartsOn={0}
                    mode="single"
                    defaultMonth={defaultMonth}
                    month={new Date()}
                    footer={
                      <>
                        <p className="bg-black-700 text-white-100">
                          Select a Time:
                          <Input
                            type="time"
                            value={timeValueFrom}
                            onChange={(e) => setTimeValueFrom(e.target.value)}
                          ></Input>
                        </p>
                      </>
                    }
                  />
                )}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <CustomButton buttonType={`primary`} type="submit">
        Submit
      </CustomButton>
    </form>
  );
};
export default EditProfile;
