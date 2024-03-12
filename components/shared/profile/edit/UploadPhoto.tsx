"use client";
import React from "react";

import { useForm } from "react-hook-form";
import Image from "next/image";
import { FaCloudUploadAlt } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { uploadImage } from "@/lib/actions/cloudinary.actions";
interface UploadPhotoProps {
  email: string;
  image?: string;
}
const UploadPhoto = ({ email, image }: UploadPhotoProps) => {
  const { register, handleSubmit, getValues } = useForm();
  const fileInputRef = React.useRef(getValues("file"));
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const onSubmit = async () => {
    const file = getValues("file")[0];
    // confused as to how this worked in the video but it's not working for me
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const fileData = reader.result;
      const uploadResponse = uploadImage(fileData);
      console.log("File Uploaded Successfully", uploadResponse);
    };
  };

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
          <Input type="file" className="hidden" {...register("file")} />
          <button
            onClick={handleButtonClick}
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
