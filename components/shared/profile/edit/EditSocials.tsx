"use client";
import React from "react";
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

import { updateUserSocials } from "@/lib/actions/user.actions";
import { z } from "zod";

interface EditSocialsProps {
  user: Partial<IUser>;
}

const EditSocials = ({ user }: EditSocialsProps) => {
  const { handleSubmit, register, setValue, getValues } = useForm({
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
  const onSubmit: SubmitHandler<z.infer<typeof SocialsSchema>> = async () => {
    try {
      const { twitter, instagram, linkedin, github, dribbble, facebook } =
        getValues();
      await updateUserSocials({
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
    } catch (error) {
      // Handle error
    }
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
      <DialogContent className="flex flex-1 flex-col   rounded-[10px] border-2 border-white-100 bg-black-800   max-sm:max-w-[290px] ">
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
          className=" flex w-full flex-col justify-between gap-[22px] space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-row gap-6">
            <Image
              src={twitter}
              alt="twitter"
              height={32}
              width={32}
              className="mr-[4px]"
            />
            <div className="flex h-6 flex-row gap-2 ">
              <Input
                {...register("twitter.username")}
                defaultValue={"@" + user.socials?.twitter?.username!}
                onChange={(e) => setValue("twitter.username", e.target.value)}
                className="w-1/2 bg-black-700 text-white-300 "
              />
              <Input
                {...register("twitter.url")}
                onChange={(e) => setValue("twitter.url", e.target.value)}
                className="w-1/2 bg-black-700 text-white-300 "
                defaultValue={user.socials?.twitter?.url!}
              />
            </div>
          </div>

          <div className="flex flex-row gap-6">
            <Image src={instagram} alt="ig" height={32} width={32} />
            <div className="flex h-6 flex-row gap-2 ">
              <Input
                {...register("instagram.username")}
                defaultValue={"@" + user.socials?.instagram?.username!}
                className="w-1/2 bg-black-700 text-white-300 "
                onChange={(e) => setValue("instagram.username", e.target.value)}
              />
              <Input
                {...register("instagram.url")}
                className="w-1/2 bg-black-700 text-white-300 "
                defaultValue={user.socials?.instagram?.url!}
                onChange={(e) => setValue("instagram.url", e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-row gap-6">
            <Image src={linkedin} alt="twitter" height={32} width={32} />
            <div className="flex h-6 flex-row gap-2 ">
              <Input
                className="w-1/2 bg-black-700 text-white-300 "
                {...register("linkedin.username")}
                defaultValue={"@" + user?.socials?.linkedin?.username!}
                onChange={(e) => setValue("linkedin.username", e.target.value)}
              />
              <Input
                className="w-1/2 bg-black-700 text-white-300 "
                {...register("linkedin.url")}
                defaultValue={user.socials?.linkedin?.url!}
                onChange={(e) => setValue("linkedin.url", e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-row gap-6">
            <Image src={facebook} alt="twitter" height={32} width={32} />
            <div className="flex h-6 flex-row gap-2 ">
              <Input
                {...register("facebook.username")}
                className="w-1/2 bg-black-700 text-white-300 "
                defaultValue={"@" + user.socials?.facebook?.username!}
                onChange={(e) => setValue("facebook.username", e.target.value)}
              />
              <Input
                {...register("facebook.url")}
                className="w-1/2 bg-black-700 text-white-300 "
                defaultValue={user.socials?.facebook?.url!}
                onChange={(e) => setValue("facebook.url", e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-row gap-6">
            <Image src={dribble} alt="twitter" height={32} width={32} />
            <div className="flex h-6 flex-row gap-2 ">
              <Input
                {...register("dribbble.username")}
                className="w-1/2 bg-black-700 text-white-300 "
                defaultValue={"@" + user.socials?.dribbble?.username!}
                onChange={(e) => setValue("dribbble.username", e.target.value)}
              />
              <Input
                {...register("dribbble.url")}
                className="w-1/2 bg-black-700 text-white-300 "
                defaultValue={"@" + user?.socials?.dribbble?.url!}
                onChange={
                  (e) => setValue("dribbble.url", e.target.value) // Updated argument to "dribbble"
                }
              />
            </div>
          </div>

          <div className="flex flex-row gap-6">
            <Image src={github} alt="gh" height={32} width={32} />
            <div className="flex h-6 flex-row gap-2 ">
              <Input
                {...register("github.username")}
                defaultValue={"@" + user.socials?.github?.username!}
                className="w-1/2 bg-black-700 text-white-300 "
                onChange={(e) => setValue("github.username", e.target.value)}
              />
              <Input
                {...register("github.url")}
                defaultValue={user.socials?.github?.url!}
                className="w-1/2 bg-black-700 text-white-300 "
                onChange={(e) => setValue("github.url", e.target.value)}
              />
            </div>
          </div>
          <CustomButton buttonType="primary">Update Socials</CustomButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSocials;
