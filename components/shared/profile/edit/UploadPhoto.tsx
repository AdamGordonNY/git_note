"use client";
import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import Image from "next/image";
import { FaCloudUploadAlt } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { uploadImage } from "@/lib/actions/cloudinary.actions";
interface UploadPhotoProps {
  image?: string;
}
const UploadPhoto = ({ image }: UploadPhotoProps) => {
  const { register, handleSubmit, getValues, watch } = useForm();
  const watchInput = watch("file");
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register("file");
  const onSubmit = async () => {
    inputRef.current?.click();
  };
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
      <div className="inline-flex flex-row px-[30px]">
        <Image
          src={image!}
          alt="profile picture"
          width={90}
          height={90}
          className="inset-inline-start mr-[8px]"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="file"
            className="hidden"
            {...rest}
            ref={(e) => {
              ref(e);
              inputRef.current = e; // you can still assign to ref
            }}
          />
          <button
            type="submit"
            className="paragraph-3-medium h-[40px] w-[200px] rounded-[5px] border-[5px] bg-black-700 text-white-300"
          >
            {" "}
            <span className="paragraph-3-medium text-white-300">
              <FaCloudUploadAlt size={32} /> Upload a Picture
            </span>
          </button>
        </form>
      </div>
    </>
  );
};

export default UploadPhoto;
