"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UserEditZodSchema from "@/lib/validations";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname } from "next/navigation";
import CustomButton from "../../CustomButton";

interface EditProfileFormProps {
  _id: string;
  email: string;
  fullname: string;
  portfolio: string;
}

const EditBasics = ({
  _id,

  email,
  fullname,
  portfolio,
}: EditProfileFormProps) => {
  const pathname = usePathname();
  const form = useForm<z.infer<typeof UserEditZodSchema>>({
    resolver: zodResolver(UserEditZodSchema),
    defaultValues: {
      email,
      fullname,
      portfolio,
    },
  });

  const onSubmit = async () => {
    const { fullname, email, portfolio } = form.getValues();

    if (_id) {
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

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-[30px] space-y-8"
        >
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
          <CustomButton buttonType={`primary`} type="submit">
            Submit
          </CustomButton>
        </form>
      </Form>
    </>
  );
};

export default EditBasics;
