"use client";
import { IUser } from "@/database/models/user.model";
import React, { useTransition } from "react";
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
import UploadPhoto from "./UploadPhoto";
import EditExperience from "./EditExperience";
import EditGoals from "./EditGoals";
import EditAvailability from "./EditAvailability";
import Divider from "../../Divider";
import EditTech from "./EditTech";
import EditBasicInfo from "./EditBasicInfo";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../../LoadingSpinner";
import { toast } from "@/components/ui/use-toast";
interface EditProfileProps {
  user?: Partial<IUser>;
  _id?: string;
}

const EditProfile = ({ user }: EditProfileProps) => {
  console.log(user);
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const dbGoals = user?.learningGoals?.map((goal, idx) => ({
    name: goal.name,
    completed: goal.completed,
  }));

  const experienceNames = user?.experiences?.map((experience) => ({
    name: experience,
  }));

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
        {
          startTime: new Date(user?.startTime!),
          endTime: new Date(user?.endTime!),
        } || {},
      newProjects: user?.newProjects || false,
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
        startTransition(async () => {
          const success = await updateUser({
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
          });
          if (success) {
            toast({
              title: "Profile updated successfully",
              variant: "default",
              type: "foreground",
              onTransitionEnd: () => {
                router.push(`/profile/${user._id}`);
              },
            });
          } else {
            toast({
              title: "Error updating profile",
              variant: "destructive",
              type: "foreground",
            });
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  const technologies = useWatch({ control, name: "technologies" });
  const handleTechChange = (newTech: any) => {
    setValue("technologies", newTech);
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
          technologies={technologies!}
          setTechnologies={handleTechChange}
        />
        <Divider />
        <EditAvailability register={register} control={control} />
        <div className="py-10">
          <CustomButton buttonType="primary" type="submit" disabled={pending}>
            Submit {pending && <LoadingSpinner />}
          </CustomButton>
        </div>
      </form>
    </>
  );
};
export default EditProfile;
