"use client";
import { IUser } from "@/database/models/user.model";
import React, { useEffect, useTransition } from "react";
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
import { Calendar } from "lucide-react";
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
      learningGoals: user.learningGoals || [],
      technologyStack: user.technologyStack || [],
      experienceLevel: user.experienceLevel || [],
      availability: user.availability || [],
      socials: user.socials || [],
    },
  });

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
    fields: availabilityFields,
    append: appendAvailability,
    remove: removeAvailability,
  } = useFieldArray({
    name: "availability",
    control: form.control,
  });

  const onSubmit = async () => {
    const updateData = form.getValues();

    if (user._id) {
      try {
        await updateUser({
          email: user.email,
          updateData,
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
                  {learningGoalsFields.map((goal, index) => (
                    <div key={goal.id} className="flex items-center space-x-2">
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
          <FormField
            control={form.control}
            name="technologyStack"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technologies</FormLabel>
                <FormControl>
                  {technologyStackFields.map((item, index) => (
                    <div key={item.name}>
                      <Input
                        {...form.register(`technologyStack.${index}.name`)}
                        defaultValue={item.name} // This will make each input controlled
                      />
                      <button
                        type="button"
                        onClick={() => removeTechnologyStack(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => appendTechnologyStack({ name: "" })}
                  >
                    Add Technology
                  </button>
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
                <FormLabel>Availability</FormLabel>
                <FormControl>
                  {availabilityFields.map((item, index) => (
                    <div key={index}>
                      <Calendar
                        {...form.register(`availability.${index}`)}
                        selected={item} // Assuming you are using a date picker that accepts a 'selected' prop
                      />
                      <button
                        type="button"
                        onClick={() => removeAvailability(index)}
                      >
                        Remove Date
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => appendAvailability(new Date())}
                  >
                    Add Date
                  </button>
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
