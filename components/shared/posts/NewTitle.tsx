"use client";
import { Input } from "@/components/ui/input";
import React from "react";
interface NewTitleProps {
  register: any;
}
const NewTitle = ({ register }: NewTitleProps) => {
  return (
    <section className="flex w-full flex-col">
      {" "}
      <label className="paragraph-3-regular text-white-300" htmlFor="title">
        Title
      </label>
      <Input
        className="profile-input bg-black-700 text-white-100 focus:bg-black-700"
        id="title"
        {...register("title")}
      />
    </section>
  );
};

export default NewTitle;
