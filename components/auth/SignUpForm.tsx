"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomButton from "@/components/shared/CustomButton";
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
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    const { fullname, email, password } = form.getValues();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
        }),
      });
      res.status === 201 && router.push("/onboarding");
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
              <FormLabel className="paragraph-3-minimum text-white-300">
                Full Name
              </FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-3-minimum text-left text-white-300">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  className="text-white-300"
                  placeholder="example@example.com"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-3-minimum text-left text-white-300">
                Password
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription className="text-white-300">
                Password must be at least 8 characters long.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <CustomButton
          type="submit"
          className="paragraph-3-medium h-9 w-full rounded bg-primary-500 px-3.5 py-2.5 text-left text-white-300"
          text="Login"
        />
      </form>
    </Form>
  );
};

export default SignUpForm;
