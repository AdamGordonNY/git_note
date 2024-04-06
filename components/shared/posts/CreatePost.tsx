"use client";
import React, { useEffect, useTransition } from "react";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { CreatePostSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomButton from "../CustomButton";

import { z } from "zod";
import { createNewPost } from "@/lib/actions/post.actions";

import { IUser } from "@/database/models/user.model";

import NewResourceLink from "./NewResourceLink";
import NewContent from "./NewContent";
import NewPostInfo from "./NewPostInfo";

import NewExperience from "./NewExperience";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "@/components/ui/use-toast";

interface CreatePostProps {
  user: Partial<IUser>;
}
const CreatePost = ({ user }: CreatePostProps) => {
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    control,
    watch,
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
    console.log(data);
    try {
      startTransition(async () => {
        const result = await createNewPost({
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
        });
        if (result) {
          toast({ title: "Post Created Successfully" });
        }
      });
    } catch (error) {}
  };
  useEffect(() => {
    console.log(watch());
  });
  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-7.5 flex w-full flex-1 flex-col gap-6"
      >
        <span className="display-1-bold pt-10 text-white-100">
          Create a Post
        </span>
        <NewPostInfo register={register} control={control} errors={errors} />
        <NewExperience
          experienceFields={experience}
          appendExperience={appendExperience}
          removeExperience={removeExperience}
          register={register}
        />
        {/* Placeholder for Code Blocks under a Create Component */}
        <NewContent register={register} control={control} />
        <NewResourceLink
          resourceLinks={resourceLinks}
          appendResourceLink={appendResourceLink}
          removeResourceLink={removeResourceLink}
          register={register}
        />

        <CustomButton buttonType="primary" type="submit" disabled={pending}>
          Create Post {pending && <LoadingSpinner />}
        </CustomButton>
      </form>
    </section>
  );
};

export default CreatePost;
