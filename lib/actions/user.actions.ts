"use server";
// in .ts files need use server
import dbConnect from "@/database/dbConnect";

import {
  UpdateUserParams,
  CreateUserParams,
  DeleteUserParams,
} from "./shared.types";

import bcryptjs from "bcryptjs";
import User, { IUser } from "@/database/models/user.model";
import { getSession } from "../authOptions";

export const getOneUser = async (email: string) => {
  try {
    await dbConnect();
    const user = (await User.findOne({ email })) as IUser;
    return user;
  } catch (error) {
    console.log(error);
  }
};

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
    return true;
  } catch (error) {
    console.log(error);
    throw error;
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
    return true;
  } catch (error) {
    return false;
  }
};
