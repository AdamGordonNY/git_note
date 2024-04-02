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
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompleteProfileEditSchema } from "@/lib/profileValidations";
import Image from "next/image";
import { Button } from "@/components/ui/button";
interface EditSocialsProps {
  user: Partial<IUser>;
}
const EditSocials = ({ user }: EditSocialsProps) => {
  const { handleSubmit, register } = useForm({
    resolver: zodResolver(CompleteProfileEditSchema),
    defaultValues: {
      user: {
        socials: {
          twitter: user.socials?.twitter,
          instagram: user.socials?.instagram,
          linkedin: user.socials?.linkedin,
          github: user.socials?.github,
          dribbble: user.socials?.dribbble,
          facebook: user.socials?.facebook,
        },
      },
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
    // functionality to updae socials here
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CustomButton className="gap-2 px-2 py-3.5" buttonType="profileButton">
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
            <Image src={twitter} alt="twitter" height={32} width={32} />
            <div className="flex h-6 flex-row gap-2 ">
              <Input
                {...register("user.socials.twitter.username")}
                defaultValue={"@" + user.socials?.twitter?.username}
                className="w-1/2 bg-black-700 text-white-300 "
              />
              <Input
                {...register("user.socials.twitter.url")}
                className="w-1/2 bg-black-700 text-white-300 "
                defaultValue={user.socials?.twitter?.url}
              />
            </div>
          </div>

          <div className="flex flex-row gap-6">
            <Image src={instagram} alt="ig" height={32} width={32} />
            <div className="flex h-6 flex-row gap-2 ">
              <Input
                {...register("user.socials.instagram.username")}
                defaultValue={"@" + user.socials?.instagram?.username}
                className="w-1/2 bg-black-700 text-white-300 "
              />
              <Input
                {...register("user.socials.instagram.url")}
                className="w-1/2 bg-black-700 text-white-300 "
                defaultValue={user.socials?.instagram?.url}
              />
            </div>
          </div>

          <div className="flex flex-row gap-6">
            <Image src={linkedin} alt="twitter" height={32} width={32} />
            <div className="flex h-6 flex-row gap-2 ">
              <Input
                className="w-1/2 bg-black-700 text-white-300 "
                {...register("user.socials.linkedin.username")}
                defaultValue={"@" + user?.socials?.linkedin?.username}
              />
              <Input
                className="w-1/2 bg-black-700 text-white-300 "
                {...register("user.socials.linkedin.url")}
                defaultValue={user.socials?.linkedin?.url}
              />
            </div>
          </div>

          <div className="flex flex-row gap-6">
            <Image src={facebook} alt="twitter" height={32} width={32} />
            <div className="flex h-6 flex-row gap-2 ">
              <Input
                {...register("user.socials.facebook.username")}
                className="w-1/2 bg-black-700 text-white-300 "
                defaultValue={"@" + user.socials?.facebook?.username}
              />
              <Input
                {...register("user.socials.facebook.url")}
                className="w-1/2 bg-black-700 text-white-300 "
                defaultValue={user.socials?.facebook?.url}
              />
            </div>
          </div>

          <div className="flex flex-row gap-6">
            <Image src={dribble} alt="twitter" height={32} width={32} />
            <div className="flex h-6 flex-row gap-2 ">
              <Input
                {...register("user.socials.dribbble.username")}
                className="w-1/2 bg-black-700 text-white-300 "
                defaultValue={"@" + user.socials?.dribbble?.username}
              />
              <Input
                {...register("user.socials.dribbble.url")}
                className="w-1/2 bg-black-700 text-white-300 "
                defaultValue={"@" + user.socials?.dribbble?.url}
              />
            </div>
          </div>

          <div className="flex flex-row gap-6">
            <Image src={github} alt="gh" height={32} width={32} />
            <div className="flex h-6 flex-row gap-2 ">
              <Input
                {...register("user.socials.github.username")}
                defaultValue={"@" + user.socials?.twitter?.username}
                className="w-1/2 bg-black-700 text-white-300 "
              />
              <Input
                {...register("user.socials.github.url")}
                defaultValue={user.socials?.twitter?.url}
                className="w-1/2 bg-black-700 text-white-300 "
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
