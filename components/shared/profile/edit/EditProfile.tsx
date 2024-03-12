"use client";
import User, { IUser } from "@/database/models/user.model";
import React, { use, useEffect, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import UploadPhoto from "./UploadPhoto";
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
import { useForm } from "react-hook-form";
import UserEditZodSchema from "@/lib/validations";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "../../CustomButton";
import { Input } from "@/components/ui/input";
interface EditProfileProps {
  user: IUser;
  _id: string;
}
const EditProfile = ({ user, _id }: EditProfileProps) => {
  const pathname = usePathname();
  const [theUser, setTheUser] = useState<IUser | null>(user);
  const [pending, startTransition] = useTransition();
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  const [userLocation, setUserLocation] = useState<string>("");
  const [userPortfolio, setUserPortfolio] = useState<string>("");
  const [userLearningGoals, setUserLearningGoals] = useState<string[]>([]);
  const [userExperienceLevel, setUserExperienceLevel] = useState<string[]>([]);
  const [userAvailability, setUserAvailability] = useState<Date[]>([]);

  const form = useForm<z.infer<typeof UserEditZodSchema>>({
    resolver: zodResolver(UserEditZodSchema),
    defaultValues: {
      email: userEmail,
      fullname: userName,
      location: userLocation,
      portfolio: userPortfolio,
      learningGoals: userLearningGoals,
      experienceLevel: userExperienceLevel,
      availability: userAvailability,
    },
  });
  const onSubmit = async () => {
    const { fullname, email, portfolio } = form.getValues();

    if (user._id) {
      try {
        await updateUser({
          _id,
          updateData: { fullname, email, portfolio },
          path: pathname,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (user) {
      startTransition(() => {
        setTheUser(user);
        if (theUser?.location !== null) {
          setUserLocation(theUser?.location!);
        }
        if (theUser?.fullname !== null) {
          setUserName(theUser?.fullname!);
        }
        if (theUser?.email !== null) {
          setUserEmail(theUser?.email!);
        }
        if (theUser?.portfolio !== null) {
          setUserPortfolio(theUser?.portfolio!);
        }
        if (theUser?.learningGoals !== null) {
          setUserLearningGoals(theUser?.learningGoals!);
        }
        if (theUser?.experienceLevel !== null) {
          setUserExperienceLevel(theUser?.experienceLevel!);
        }
      });
    }
  });
  return (
    <div className="px-[30px] ">
      <UploadPhoto email={user?.email} />
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
          <CustomButton buttonType={`primary`} type="submit" disabled={pending}>
            Submit
          </CustomButton>
        </form>
      </Form>
    </div>
  );
};

export default EditProfile;
