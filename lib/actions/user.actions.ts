"use server";
// in .ts files need use server
import dbConnect from "@/database/dbConnect";

import {
  UpdateUserParams,
  CreateUserParams,
  DeleteUserParams,
} from "./shared.types";
import { revalidateTag, unstable_cache as cache } from "next/cache";

import bcryptjs from "bcryptjs";
import User, { IUser } from "@/database/models/user.model";
import { getSession } from "../authOptions";
import Post, { IPost } from "@/database/models/post.model";
export const _getOneUser = async (email: string) => {
  try {
    await dbConnect();
    const user = (await User.findOne({ email })) as IUser;
    return user;
  } catch (error) {
    console.log(error);
  }
};
export const getOneUser = cache(_getOneUser, ["getOneUser"], {
  tags: ["user"],
});
export const getUserById = async ({ _id }: { _id: string }) => {
  try {
    await dbConnect();
    const user = (await User.findById(_id)) as IUser;
    return user as IUser;
  } catch (error) {
    console.log(error);
  }
};
// having issues with  forms and updating user data
export async function updateUser({ updateData }: UpdateUserParams) {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session?.user?.email) {
      throw new Error("You are not authorized to update this user");
    }

    await User.findOneAndUpdate({ email: session.user.email }, updateData, {
      new: true,
    });
    revalidateTag("user");
    return true;
  } catch (error) {
    return false;
  }
}
export const createNewUser = async (userData: CreateUserParams) => {
  try {
    await dbConnect();
    const hashedPassword = await bcryptjs.hash(userData.password, 5);
    const newUser = await User.create({
      fullname: userData.fullname,
      email: userData.email,
      password: hashedPassword,
    });

    return { user: newUser, ok: true };
  } catch (error) {
    console.log(error);
  }
};
export const deleteUserById = async ({ _id }: DeleteUserParams) => {
  try {
    await dbConnect();
    await User.findByIdAndDelete(_id);
    return true;
  } catch (error) {
    console.log(error);
  }
};
export const updateUserSocials = async (socials: Partial<IUser["socials"]>) => {
  try {
    await dbConnect();
    const session = await getSession();
    const email = session?.user?.email;
    await User.findOneAndUpdate({ email }, { socials }, { new: true });
    revalidateTag("user");
    return true;
  } catch (error) {
    return false;
  }
};
export const getUserWithPosts = async () => {
  try {
    await dbConnect();
    const session = await getSession();
    const email = session?.user?.email!;
    const user = (await User.findOne({ email })) as IUser;
    const posts = (await Post.find({ author: user._id })
      .sort({ createdAt: -1 })
      .limit(10)) as IPost[];
    return { posts, user };
  } catch (error) {
    return false;
  }
};
