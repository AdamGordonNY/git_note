"use client";
import React, { useTransition } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import CustomButton from "../../CustomButton";
import { IUser } from "@/database/models/user.model";
import twitter from "@/public/icons/icn-twitter.svg";
import instagram from "@/public/icons/icn-instagram.svg";
import linkedin from "@/public/icons/icn-linkedin.svg";
import github from "@/public/icons/icn-github.svg";
import dribble from "@/public/icons/icn-dribbble.svg";
import facebook from "@/public/icons/icn-facebook.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SocialsSchema } from "@/lib/profileValidations";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "../../LoadingSpinner";
import { updateUserSocials } from "@/lib/actions/user.actions";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";

interface EditSocialsProps {
  user: Partial<IUser>;
}

const EditSocials = ({ user }: EditSocialsProps) => {
  const [isPending, startTransition] = useTransition();

  const { handleSubmit, register } = useForm({
    resolver: zodResolver(SocialsSchema),
    defaultValues: {
      twitter: {
        username: user.socials?.twitter?.username || "",
        url: user.socials?.twitter?.url || "",
      },
      instagram: {
        username: user.socials?.instagram?.username || "",
        url: user.socials?.instagram?.url || "",
      },
      linkedin: {
        username: user.socials?.linkedin?.username || "",
        url: user.socials?.linkedin?.url || "",
      },
      github: {
        username: user.socials?.github?.username || "",
        url: user.socials?.github?.url || "",
      },
      dribbble: {
        username: user.socials?.dribbble?.username || "",
        url: user.socials?.dribbble?.url || "",
      },
      facebook: {
        username: user.socials?.facebook?.username || "",
        url: user.socials?.facebook?.url || "",
      },
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof SocialsSchema>> = async (
    values
  ) => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const { twitter, instagram, linkedin, github, dribbble, facebook } =
        values;
      const user = await updateUserSocials({
        twitter: {
          username: twitter?.username ?? "",
          url: twitter?.url ?? "",
        },
        instagram: {
          username: instagram?.username ?? "",
          url: instagram?.url ?? "",
        },
        linkedin: {
          username: linkedin?.username ?? "",
          url: linkedin?.url ?? "",
        },
        github: {
          username: github?.username ?? "",
          url: github?.url ?? "",
        },
        dribbble: {
          username: dribbble?.username ?? "",
          url: dribbble?.url ?? "",
        },
        facebook: {
          username: facebook?.username ?? "",
          url: facebook?.url ?? "",
        },
      });
      if (user) {
        toast({
          title: "Socials updated successfully",
          type: "foreground",
          variant: "default",
        });
      } else {
        toast({
          title: "Failed to update socials",
          type: "foreground",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <CustomButton
          className="profile-shadow mt-[60px] gap-2 px-2 py-3.5"
          buttonType="profileButton"
        >
          Add Social Links
        </CustomButton>
      </DialogTrigger>
      <DialogContent className="flex flex-1 flex-col   rounded-[10px]  bg-black-800   max-sm:max-w-[290px] ">
        <DialogHeader className="display-1-bold flex w-full flex-row content-center  items-center justify-between text-white-100">
          <DialogTitle>Social Media Links</DialogTitle>{" "}
          <DialogClose asChild>
            <Button type="button">
              {" "}
              <X fill="white" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <form
          className=" flex w-full flex-col justify-between gap-[22px] "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-row gap-3">
            <Image
              src={twitter}
              alt="twitter"
              height={32}
              width={32}
              className="mr-[4px]"
            />
            <div className="flex h-12  w-[574px] flex-row  gap-2 ">
              <Input
                placeholder="@TwitterHandle"
                {...register("twitter.username")}
                defaultValue={"@" + user.socials?.twitter?.username!}
                className="w-1/2 rounded bg-black-700 text-white-300/50 "
              />
              <Input
                placeholder="Twitter Profile"
                {...register("twitter.url")}
                className="w-1/2 rounded bg-black-700 text-white-300/50 "
                defaultValue={user.socials?.twitter?.url!}
              />
            </div>
          </div>

          <div className="flex flex-row gap-3 align-top ">
            <Image src={instagram} alt="ig" height={32} width={32} />
            <div className="flex h-12  w-[574px] flex-row  gap-2 ">
              <Input
                {...register("instagram.username")}
                placeholder="@InstagramHandle"
                defaultValue={"@" + user.socials?.instagram?.username!}
                className="w-1/2 rounded bg-black-700 text-white-300/50 "
              />
              <Input
                {...register("instagram.url")}
                placeholder="Instagram Profile"
                className="w-1/2 rounded bg-black-700 text-white-300/50 "
                defaultValue={user.socials?.instagram?.url!}
              />
            </div>
          </div>

          <div className="flex flex-row gap-3 align-top">
            <Image src={linkedin} alt="twitter" height={32} width={32} />
            <div className="flex h-12  w-[574px] flex-row  gap-2 ">
              <Input
                className="w-1/2 rounded bg-black-700 text-white-300/50 "
                {...register("linkedin.username")}
                defaultValue={"@" + user?.socials?.linkedin?.username!}
                placeholder="@LinkedInHandle"
              />
              <Input
                className="w-1/2 rounded bg-black-700 text-white-300/50 "
                {...register("linkedin.url")}
                defaultValue={user.socials?.linkedin?.url!}
                placeholder="LinkedIn Profile URL"
              />
            </div>
          </div>

          <div className="flex flex-row gap-3 align-top">
            <Image src={facebook} alt="twitter" height={32} width={32} />
            <div className="flex h-12  w-[574px] flex-row   gap-2">
              <Input
                {...register("facebook.username")}
                placeholder="@FacebookHandle"
                className="w-1/2 rounded bg-black-700 text-white-300/50 "
                defaultValue={"@" + user.socials?.facebook?.username!}
              />
              <Input
                {...register("facebook.url")}
                placeholder="Facebook Profile URL"
                className="w-1/2 bg-black-700 text-white-300/50 "
                defaultValue={user.socials?.facebook?.url!}
              />
            </div>
          </div>

          <div className="flex flex-row gap-3 align-top">
            <Image src={dribble} alt="twitter" height={32} width={32} />
            <div className="flex h-12  w-[574px] flex-row  gap-2 ">
              <Input
                {...register("dribbble.username")}
                placeholder="@DribbbleHandle"
                className="w-1/2 rounded bg-black-700 text-white-300/50 "
                defaultValue={"@" + user.socials?.dribbble?.username!}
              />
              <Input
                {...register("dribbble.url")}
                className="w-1/2 rounded bg-black-700 text-white-300/50 "
                placeholder="Dribbble Profile URL"
                defaultValue={"@" + user?.socials?.dribbble?.url!}
              />
            </div>
          </div>

          <div className="flex flex-row gap-3 align-top">
            <Image src={github} alt="gh" height={32} width={32} />
            <div className="flex h-12  w-[574px] flex-row   gap-2">
              <Input
                {...register("github.username")}
                defaultValue={"@" + user.socials?.github?.username!}
                className="w-1/2 rounded bg-black-700 text-white-300/50 "
                placeholder="@GithubHandle"
              />
              <Input
                {...register("github.url")}
                defaultValue={user.socials?.github?.url!}
                className="w-1/2 rounded bg-black-700 text-white-300/50 "
                placeholder="Github Profile URL"
              />
            </div>
          </div>
          <CustomButton buttonType="primary" disabled={isPending}>
            Update Socials {isPending && <LoadingSpinner />}
          </CustomButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSocials;
