"use server";
import { v2 as cloudinary } from "cloudinary";

export const uploadImage = async (file: any) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const result = await cloudinary.uploader.upload(file, {
    folder: "gitnote",
  });
  return result.secure_url;
};
