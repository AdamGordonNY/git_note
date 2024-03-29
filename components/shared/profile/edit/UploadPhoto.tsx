"use client";
import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import Image from "next/image";
import { LuUploadCloud, LuImage } from "react-icons/lu";

import { Input } from "@/components/ui/input";
import { uploadImage } from "@/lib/actions/cloudinary.actions";
interface UploadPhotoProps {
  image?: string;
  className?: string;
  step?: string;
}
const UploadPhoto = ({ image, className, step }: UploadPhotoProps) => {
  const { register, handleSubmit, getValues, watch } = useForm();
  const watchInput = watch("file");
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register("file");
  const onSubmit = async () => {
    inputRef.current?.click();
  };
  if (step) {
    className = "justify-betweeh gap-6";
  }
  useEffect(() => {
    const file = getValues("file")[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const fileData = reader.result;
      await uploadImage(fileData);
    };
  }, [getValues, watchInput]);
  return (
    <>
      <div
        className={
          step
            ? `flex w-full  flex-row items-center justify-between  gap-x-[14px] space-y-2 rounded-md  border-white-500 align-middle`
            : "inline-flex flex-row items-center gap-x-[14px] space-y-2 align-middle"
        }
      >
        {image && (
          <Image
            src={image!}
            alt="profile picture"
            width={90}
            height={90}
            className="inset-inline-start rounded-[5px] "
          />
        )}
        {!image && (
          <div className="bg-black-500  flex size-[90px] items-center justify-center rounded-[5px] border-white-500 text-white-500">
            <LuImage size={32} />
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="file"
            className="hidden"
            {...rest}
            ref={(e) => {
              ref(e);
              inputRef.current = e;
            }}
          />
          <button
            type="submit"
            className="paragraph-3-medium r flex h-[40px] w-[200px] flex-row items-center justify-between gap-2 rounded-[5px] bg-black-700 px-3.5 py-2 align-middle text-white-300  shadow shadow-gray-800/10 "
          >
            {" "}
            <LuUploadCloud size={32} />
            <span className="text-nowrap">Upload Profile Picture</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default UploadPhoto;
