"use client";
import { IUser } from "@/database/models/user.model";
import React, { useCallback, useEffect, useState } from "react";
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

import { CompleteProfileEditSchema } from "@/lib/profileValidations";

import { techStackBadges } from "@/lib/constants";
import UploadPhoto from "./UploadPhoto";
import EditExperience from "./EditExperience";
import EditGoals from "./EditGoals";
import EditAvailability from "./EditAvailability";
import Divider from "../../Divider";
import EditTech from "./EditTech";
import EditBasicInfo from "./EditBasicInfo";
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
  const handleRemoveTech = useCallback(
    (techToRemove: any) => {
      setValue(
        "technologies",
        technologies
          ? technologies?.filter((tech) => tech !== techToRemove)
          : []
      );
    },
    [setValue, technologies]
  );

  useEffect(() => {
    if (user?.startTime) {
      const startDate = new Date(user.startTime);
      setValue("availability.startTime", startDate);

      setSelectedFrom(startDate);
    }
    if (user?.endTime) {
      const endDate = new Date(user.endTime);
      setValue("availability.endTime", endDate);

      setSelectedTo(endDate);
    }
  }, [user?.startTime, user?.endTime, setValue]);
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
    <>
      <section className="flex w-full flex-col px-[30px] py-6">
        <span className="paragraph-3-regular py-[30px] align-top text-white-500">
          BASIC INFORMATION
        </span>
        <UploadPhoto image={user?.image} className="space-y-6" />
      </section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col p-[30px]"
      >
        <EditBasicInfo register={register} errors={errors} />

        <Divider />

        <EditGoals
          register={register}
          goalFields={goalFields}
          removeGoal={removeGoal}
          appendGoal={appendGoal}
        />
        <Divider />

        <EditExperience
          register={register}
          experienceFields={experienceFields}
          removeExperience={removeExperience}
          appendExperience={appendExperience}
        />

        <EditTech
          handleRemoveTech={handleRemoveTech}
          techStackBadges={techStackBadges}
          technologies={technologies}
          search={search}
          setSearch={setSearch}
          setValue={setValue}
          results={results}
        />
        <Divider />
        <EditAvailability
          handleDaySelectTo={handleDaySelectTo}
          register={register}
          control={control}
          selectedFrom={selectedFrom}
          selectedTo={selectedTo}
          handleDaySelectFrom={handleDaySelectFrom}
        />
        <div className="py-10">
          <CustomButton
            buttonType={`primary`}
            className="profile-shadow "
            type="submit"
          >
            Submit
          </CustomButton>
        </div>
      </form>
    </>
  );
};
export default EditProfile;
