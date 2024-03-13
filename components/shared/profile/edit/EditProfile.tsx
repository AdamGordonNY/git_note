"use client";
import { IUser } from "@/database/models/user.model";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { updateUser } from "@/lib/actions/user.actions";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
import UserEditZodSchema from "@/lib/validations";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "../../CustomButton";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import LearningGoal from "../LearningGoal";

interface EditProfileProps {
  user: IUser;
  _id: string;
}
const EditProfile = ({ user }: EditProfileProps) => {
  const pathname = usePathname();

  const form = useForm<z.infer<typeof UserEditZodSchema>>({
    resolver: zodResolver(UserEditZodSchema),
    defaultValues: {
      email: user.email || "",
      fullname: user.fullname || "",
      location: user.location || "",
      portfolio: user.portfolio || "",
      learningGoals: (
        (user?.learningGoals || []) as { name: string; completed: boolean }[]
      ).map((goal) => ({
        name: goal.name,
        completed: goal.completed === true ? true : goal.completed === false,
      })),
      technologyStack: (user.technologyStack || []).map((item) => ({
        name: item,
      })),
      experienceLevel: user.experienceLevel || [],
      availability: user.availability || [],
      socials: {
        twitter: "",
        facebook: "",
        linkedin: "",
        github: "",
        instagram: "",
        dribbble: "",
      } as {
        twitter?: string;
        facebook?: string;
        linkedin?: string;
        github?: string;
        instagram?: string;
        dribbble?: string;
      },
    },
  });
  const formValues = form.watch();
  useEffect(() => {}, [formValues]);
  const {
    fields: learningGoalsFields,
    append: appendLearningGoal,
    remove: removeLearningGoal,
  } = useFieldArray({
    name: "learningGoals",
    control: form.control,
  });

  const {
    fields: technologyStackFields,
    append: appendTechnologyStack,
    remove: removeTechnologyStack,
  } = useFieldArray({
    name: "technologyStack",
    control: form.control,
  });

  const {
    fields: experienceLevelFields,
    append: appendExperienceLevel,
    remove: removeExperienceLevel,
  } = useFieldArray({
    name: "experienceLevel",
    control: form.control,
  });

  const {
    fields: availabilityFields,
    append: appendAvailability,
    remove: removeAvailability,
  } = useFieldArray({
    name: "availability",
    control: form.control,
  });

  const onSubmit = async () => {
    const {
      portfolio,
      learningGoals,
      technologyStack,
      fullname,
      location,
      experienceLevel,
      availability,
    } = form.getValues();

    if (user._id) {
      try {
        await updateUser({
          email: user.email,
          updateData: {
            fullname,
            portfolio,
            experienceLevel,
            ...technologyStack,
            location,
            ...learningGoals,
            ...availability,
          },
          path: pathname,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {});

  return (
    <div className="px-[30px] ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-3-medium text-white-300">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-black-700 text-white-100"
                    placeholder="fullname"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            disabled
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white-300">Username</FormLabel>
                <FormControl>
                  <Input
                    className="bg-black-700 text-white-100"
                    placeholder="email"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portfolio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio URL</FormLabel>
                <FormControl>
                  <Input placeholder="portfolio" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="learningGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Learning Goals</FormLabel>
                <FormControl>
                  {user?.learningGoals &&
                    learningGoalsFields.map((goal, index) => (
                      <div
                        key={goal.id}
                        className="flex items-center space-x-2"
                      >
                        <LearningGoal
                          name={goal.name}
                          completed={goal.completed}
                        />
                        <Checkbox
                          {...form.register(`learningGoals.${index}.completed`)}
                          checked={goal.completed}
                          className="bg-primary-500"
                        />
                        <span>{goal.name}</span>
                      </div>
                    ))}
                </FormControl>
                <FormDescription>
                  Select the goals you have achieved.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <CustomButton
            buttonType="profileButton"
            onClick={() => removeLearningGoal()}
          ></CustomButton>
          <CustomButton
            buttonType="profileButton"
            onClick={() => appendLearningGoal}
          >
            Add Goal{" "}
          </CustomButton>
          <FormField
            control={form.control}
            name="experienceLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Levels</FormLabel>
                <FormControl>
                  {experienceLevelFields.map((item, index) => (
                    <div key={item.name}>
                      <Input
                        {...form.register(`technologyStack.${index}.name`)}
                        defaultValue={item.name} // This will make each input controlled
                      />
                      <CustomButton
                        buttonType="profileButton"
                        onClick={() => removeExperienceLevel(index)}
                      >
                        Remove
                      </CustomButton>
                    </div>
                  ))}
                  <CustomButton
                    buttonType="profileButton"
                    type="button"
                    onClick={() => appendExperienceLevel({ name: field.name })}
                  >
                    Add Experience
                  </CustomButton>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="technologyStack"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technology Stack</FormLabel>
                <FormControl>
                  {technologyStackFields.map((tech, index) => (
                    <div key={tech.id}>
                      <Input
                        {...form.register(`technologyStack.${index}.name`)}
                        defaultValue={tech.name} // Ensure defaultValue is correctly set
                      />
                      <CustomButton
                        buttonType="profileButton"
                        onClick={() => removeTechnologyStack(index)}
                      >
                        Remove
                      </CustomButton>
                    </div>
                  ))}
                  <CustomButton
                    buttonType="profileButton"
                    onClick={() => appendTechnologyStack({ name: "" })}
                  >
                    Add Technology
                  </CustomButton>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white-300">Availability</FormLabel>
                <FormControl>
                  {availabilityFields.map((item, index) => (
                    <div key={index}>
                      <Calendar
                        onSelect={(date: any) => {
                          const dateString = date.toISOString(); // Or format the date as needed
                          form.setValue(`availability.${index}`, dateString);
                        }}
                        {...form.register(`availability.${index}`)}
                        defaultMonth={new Date()} // Convert the string representation of the current date to a Date object
                      />
                      <CustomButton
                        buttonType="profileButton"
                        type="button"
                        onClick={() => removeAvailability(index)}
                      >
                        Remove Date
                      </CustomButton>
                      <CustomButton
                        buttonType="profileButton"
                        type="button"
                        onClick={() => appendAvailability(item)}
                      >
                        Add Date
                      </CustomButton>
                    </div>
                  ))}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <CustomButton buttonType={`primary`} type="submit">
            Submit
          </CustomButton>
        </form>
      </Form>
      <div></div>
    </div>
  );
};

export default EditProfile;
