"use client";
import React from "react";
import { Loader2 } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  SubmitHandler,
  useForm,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/ui/toast";

import { CreatePostSchema } from "@/lib/validations";
import { updatePost } from "@/lib/actions/post.actions";

import BasicInformationPost from "./BasicInformationPost";
import Content from "./Content";
import Resources from "./Resource";
import { IPost } from "@/database/models/post.model";
import { Button } from "@/components/ui/button";

const UpdatePost = ({ post }: { post: IPost & { resources?: any } }) => {
  const router = useRouter();
  const useFormHelpers = useForm<typeof CreatePostSchema>({
    defaultValues: {
      name: post.title ?? "",
      postType: post.createType ?? "component",
      description: post.description ?? "",
      codeEditor: post.codeEditor ?? "",
      content: post.content ?? "",
      steps: post.steps ?? [],
      learnings: post.learnings ?? [],
      tags: post.tags ?? [],
      resources: post.resources ?? [],
    },
    resolver: zodResolver(CreatePostSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, defaultValues },
  } = useFormHelpers;
  const { control } = useFormHelpers;

  // const onSubmit: SubmitHandler<typeof CreatePostSchema> = async (data) => {
  //     const postId = post.id;
  //     try {
  //         await updatePost(data);
  //         router.push("/");
  //     } catch (error) {
  //         console.log("error in catch", error);

  //     };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-10">
      <h1 className="display-2-bold mb-5">Update Post</h1>
      <div className="space-y-14">
        <section className="space-y-8">
          <BasicInformationPost
            useFormHelpers={useFormHelpers}
            register={register}
            useFieldArray={useFieldArray}
          />
          <Controller
            control={control}
            name="content"
            render={({ field: { onChange } }) => (
              <Content onChange={onChange} content={defaultValues?.content} />
            )}
          />

          <Resources
            register={register}
            useFieldArray={useFieldArray}
            control={control}
            errors={errors}
          />
        </section>

        <Button color="blue" type="submit">
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Update Post"}
        </Button>
      </div>
    </form>
  );
};

export default UpdatePost;
