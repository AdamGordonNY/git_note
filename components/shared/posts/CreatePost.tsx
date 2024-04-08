"use client";
import React, { useEffect, useTransition } from "react";
import {
  SubmitHandler,
  useForm,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { CreatePostSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomButton from "../CustomButton";

import { z } from "zod";
import { createNewPost } from "@/lib/actions/post.actions";

import NewResourceLink from "./NewResourceLink";
import NewContent from "./NewContent";

import NewExperience from "./NewExperience";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "@/components/ui/use-toast";
import NewTitle from "./NewTitle";
import NewPostType from "./NewPostType";

import NewDescription from "./NewDescription";

import { Form } from "@/components/ui/form";

import AddTag from "./AddTag";

interface CreatePostProps {
  uniqueTags: string[];
}
const CreatePost = ({ uniqueTags }: CreatePostProps) => {
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    shouldFocusError: true,
    criteriaMode: "all",
    defaultValues: {
      title: "",
      postType: "knowledge",
      description: "",
      content: "",
      tags: [""],
      code: "",
      experiences: [{ name: "" }],
      resourceLinks: [],
    },
  });

  const {
    fields: experience,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray<z.infer<typeof CreatePostSchema>, "experiences">({
    control: form.control,
    name: "experiences",
  });
  const {
    fields: resourceLinks,
    append: appendResourceLink,
    remove: removeResourceLink,
  } = useFieldArray<z.infer<typeof CreatePostSchema>, "resourceLinks">({
    control: form.control,
    name: "resourceLinks",
  });
  const watchTags = useWatch({ control: form.control, name: "tags" });
  const handleTagChange = (tags: string[]) => {
    form.setValue("tags", tags);
  };
  const onSubmit: SubmitHandler<z.infer<typeof CreatePostSchema>> = async (
    data
  ) => {
    const {
      title,
      postType,
      content,
      description,
      tags,
      code,
      experiences,
      resourceLinks,
    } = data;
    console.log(data);
    const dbResources =
      resourceLinks?.map((link) => ({
        title: link?.title,
        url: link?.url,
      })) || [];

    try {
      startTransition(async () => {
        const result = await createNewPost({
          title,
          postType,
          content,
          tags,
          code,
          description,
          experiences: experiences?.map((experience) => experience.name),
          resourceLinks: dbResources.map((link) => ({
            title: link?.title || "",
            url: link?.url || "",
          })),
        });
        if (result) {
          toast({ title: "Post Created Successfully" });
          form.reset({
            title: "",
            postType: "knowledge",
            description: "",
            content: "",
            tags: [],
            code: "",
            experiences: [],
            resourceLinks: [],
          });
        } else {
          toast({ title: "Failed to create post", variant: "destructive" });
        }
      });
    } catch (error) {}
  };

  useEffect(() => {
    console.log(watchTags);
  });

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="py-7.5 flex w-full flex-1 flex-col gap-6"
        >
          <span className="display-1-bold pt-10 text-white-100">
            Create a Post
          </span>
          <span className="paragraph-3-regular text-white-500">
            Basic Information
          </span>
          <NewTitle register={form.register} />
          <NewPostType control={form.control} />
          <AddTag
            tags={watchTags}
            trigger={form.trigger}
            clearErrors={form.clearErrors}
            uniqueTags={uniqueTags}
            setError={form.setError}
            setTags={handleTagChange}
          />
          <NewDescription register={form.register} />
          <NewExperience
            errors={form.setError}
            experienceFields={experience}
            appendExperience={appendExperience}
            removeExperience={removeExperience}
            register={form.register}
          />
          {/* Placeholder for Code Blocks under a Create Component */}
          <NewContent register={form.register} control={form.control} />
          <NewResourceLink
            errors={form.setError}
            resourceLinks={resourceLinks}
            appendResourceLink={appendResourceLink}
            removeResourceLink={removeResourceLink}
            register={form.register}
          />

          <CustomButton buttonType="primary" type="submit" disabled={pending}>
            Create Post {pending && <LoadingSpinner />}
          </CustomButton>
        </form>
      </Form>
    </section>
  );
};

export default CreatePost;
