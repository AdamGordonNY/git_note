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
import LearningGoal from "../LearningGoal";

interface EditProfileProps {
  user?: Partial<IUser>;
  _id?: string;
}
const EditProfile = ({ user }: EditProfileProps) => {
  const pathname = usePathname();

  const form = useForm<z.infer<typeof UserEditZodSchema>>({
    resolver: zodResolver(UserEditZodSchema),
    defaultValues: {
      email: user?.email || "",
      fullname: user?.fullname || "",
      location: user?.location || "",
      portfolio: user?.portfolio || "",
      learningGoals: user?.learningGoals || [],
      technologies: user?.technologies || [],

      availability: user?.availability || [],
      socials: user?.socials || [],
      experiences: user?.experiences || [], // Added 'experienceLevel' property
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "learningGoals",
  });
  // https://react-hook-form.com/docs/usefieldarray
  const onSubmit = async (data: z.infer<typeof UserEditZodSchema>) => {
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
    console.log(data);
    if (user?._id) {
      try {
        await updateUser({
          updateData: {
            fullname,
            portfolio,
            experiences,
            technologies,
            location,
            learningGoals,
            availability,
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

  return (
    <div className="flex-auto px-[30px] ">
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
          {fields.map((goal, idx) => {
            return (
              <>
                <LearningGoal key={goal.name} {...goal}></LearningGoal>
                <CustomButton
                  buttonType={`primary`}
                  onClick={() => remove(idx)}
                  type="button"
                >
                  Remove Goal
                </CustomButton>
              </>
            );
          })}
          <CustomButton
            onClick={() => append({ name: "dsgrgrgg", completed: true })}
            buttonType="profileButton"
          ></CustomButton>
          <FormField
            control={form.control}
            name="learningGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Learning Goals</FormLabel>
                <FormControl></FormControl>
                <FormDescription>
                  Select the goals you have achieved.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experiences"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Levels</FormLabel>
                <FormControl></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="technologies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technology Stack</FormLabel>
                <FormControl></FormControl>
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
                <FormControl></FormControl>
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
