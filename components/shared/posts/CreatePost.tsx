"use client";
import React from "react";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { CreatePostSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";

import CustomButton from "../CustomButton";

import { z } from "zod";
import { createNewPost } from "@/lib/actions/post.actions";

import { IUser } from "@/database/models/user.model";

import NewResourceLink from "./NewResourceLink";
import NewContent from "./NewContent";
import NewPostInfo from "./NewPostInfo";

import NewExperience from "./NewExperience";
interface CreatePostProps {
  user: Partial<IUser>;
}
const CreatePost = ({ user }: CreatePostProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      postType: "knowledge",
      description: "",
      content: "",
      tags: [],
      code: "",
      experiences: [],
      resourceLinks: [],
    },
  });
  const {
    fields: experience,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray<z.infer<typeof CreatePostSchema>, "experiences">({
    control,
    name: "experiences",
  });
  const {
    fields: resourceLinks,
    append: appendResourceLink,
    remove: removeResourceLink,
  } = useFieldArray<z.infer<typeof CreatePostSchema>, "resourceLinks">({
    control,
    name: "resourceLinks",
  });
  const onSubmit: SubmitHandler<z.infer<typeof CreatePostSchema>> = async (
    data
  ) => {
    const {
      title,
      postType,
      content,
      description,
      tags = [],
      code,
      experiences,
      resourceLinks,
    } = data;
    const dbResources =
      resourceLinks?.map((link) => ({
        title: link?.title,
        url: link?.url,
      })) || [];

    try {
      await createNewPost({
        title,
        postType,
        content,
        tags,
        code,
        description,
        experiences: experiences?.map((experience) => experience.name) || [],
        resourceLinks: dbResources.map((link) => ({
          title: link?.title || "",
          url: link?.url || "",
        })),
        author: user?._id!,
      });
      // toast({ title: "Post Created Successfully" });
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full gap-[40px]">
      <span className="display-1-bold text-white-100">Create a Post</span>
      <NewPostInfo register={register} control={control} errors={errors} />
      <NewExperience
        experienceFields={experience}
        appendExperience={appendExperience}
        removeExperience={removeExperience}
        register={register}
      />
      <NewContent register={register} control={control} />
      <NewResourceLink
        resourceLinks={resourceLinks}
        appendResourceLink={appendResourceLink}
        removeResourceLink={removeResourceLink}
        register={register}
      />

      <CustomButton buttonType="primary" type="submit">
        Create Post
      </CustomButton>
    </form>
  );
};

export default CreatePost;
