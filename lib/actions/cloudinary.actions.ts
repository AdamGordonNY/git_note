"use server";
import { v2 as cloudinary } from "cloudinary";
import { getSession } from "../authOptions";
import { updateUser } from "./user.actions";

interface UploadOptions {
  action: "updateUser" | "postCreation";
}
export const uploadImage = async (file: any, options: UploadOptions) => {
  const session = await getSession();
  if (!session) {
    throw new Error("You must be logged in to upload an image");
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const result = await cloudinary.uploader.upload(file, {
    folder: "gitnote",
  });
  if (options.action === "updateUser") {
    await updateUser({
      updateData: { image: result.secure_url },
    });
  }

  return result.secure_url;
};
