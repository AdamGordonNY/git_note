"use client";
import React, { useTransition } from "react";
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
import CodeEditor from "./CodeEditor";
import NewDescription from "./NewDescription";
import { ErrorMessage } from "@hookform/error-message";
import AddNewTag from "./AddNewTag";

interface CreatePostProps {
  uniqueTags: string[];
}
const CreatePost = ({ uniqueTags }: CreatePostProps) => {
  const [pending, startTransition] = useTransition();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
    register,
    watch,
  } = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    shouldFocusError: true,
    criteriaMode: "all",
    defaultValues: {
      title: "",
      postType: "knowledge",
      description: "",
      content: "",
      tags: [],
      code: "",
      experiences: [{ name: "" }],
      resourceLinks: [],
      image: "",
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

  const postTags = useWatch({ control, name: "tags" });
  const handleTagChange = (tags: any) => {
    setValue("tags", tags);
  };
  const postType = watch("postType");
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
          image,
          experiences: experiences?.map((experience) => experience.name),
          resourceLinks: dbResources.map((link) => ({
            title: link?.title || "",
            url: link?.url || "",
          })),
        });
        if (result) {
          toast({ title: "Post Created Successfully" });
          reset({
            title: "",
            postType: "knowledge",
            description: "",
            content: "",
            tags: [],
            code: "",
            experiences: [],
            resourceLinks: [],
            image,
          });
        } else {
          toast({ title: "Failed to create post", variant: "destructive" });
        }
      });
    } catch (error) {}
  };
  const image = watch("image");

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-7.5 flex w-full flex-1 flex-col gap-6"
      >
        <span className="display-1-bold pt-10 text-white-100">
          Create a Post
        </span>
        <span className="paragraph-3-regular text-white-500">
          Basic Information
        </span>
        <NewTitle register={register} />
        <NewPostType control={control} />

        <AddNewTag
          setPostTags={handleTagChange}
          postTags={postTags}
          uniqueTags={uniqueTags}
        />
        <ErrorMessage
          className="text-red-500"
          errors={errors}
          name="tags"
          as="p"
        />
        <NewDescription register={register} />
        <ErrorMessage errors={errors} name="description" as="p" />
        {postType === "component" ? (
          <CodeEditor
            register={register}
            watch={watch}
            errors={errors}
            setValue={setValue}
          />
        ) : null}
        <NewExperience
          experienceFields={experience}
          appendExperience={appendExperience}
          removeExperience={removeExperience}
          register={register}
        />
        {/* Placeholder for Code Blocks under a Create Component */}
        <NewContent register={register} control={control} />
        <NewResourceLink
          errors={errors}
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
