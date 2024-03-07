"use client";
import React, { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomButton from "../shared/CustomButton";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { signUpSchema } from "@/lib/validations";
import { signIn } from "next-auth/react";
const SignUpForm = () => {
  const [message, setMessage] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullname: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    const { fullname, username, password } = form.getValues();

    try {
      startTransition(async () => {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fullname, username, password }),
        });

        if (res.ok) {
          await signIn("credentials", {
            redirect: true,
            username,
            password,
            callbackUrl: "/",
          });
        } else {
          setFormError(res.statusText);
        }
      });
    } catch (err: any) {
      setMessage(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-3-medium text-white-300">
                Full Name
              </FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>

              <FormMessage title={message} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-3-medium text-left ">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  className="text-white-300"
                  placeholder="example@example.com"
                  {...field}
                />
              </FormControl>

              <FormMessage title={message} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-3-medium text-left text-white-300">
                Password
              </FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
              </FormControl>
              <FormDescription className="text-white-300">
                Password must be at least 8 characters long.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {formError && (
          <span className="paragraph-3-medium text-red-600">{formError}</span>
        )}
        <CustomButton buttonType="primary" type="submit" disabled={isPending}>
          Sign Up
        </CustomButton>
      </form>
    </Form>
  );
};

export default SignUpForm;
