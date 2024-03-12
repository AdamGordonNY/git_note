import dbConnect from "@/database/dbConnect";

import { revalidatePath } from "next/cache";
import {
  UpdateUserParams,
  CreateUserParams,
  DeleteUserParams,
} from "./shared.types";

import bcryptjs from "bcryptjs";
import userModel, { IUser } from "@/database/models/user.model";

export const getOneUser = async (email: string) => {
  try {
    await dbConnect();
    const user = (await userModel.findOne({ email })) as IUser;
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async ({ _id }: { _id: string }) => {
  try {
    await dbConnect();
    const user = (await userModel.findById(_id)) as IUser;
    return user as IUser;
  } catch (error) {
    console.log(error);
  }
};
// having issues with  forms and updating user data
export async function updateUser({ _id, updateData, path }: UpdateUserParams) {
  try {
    await dbConnect();

    const user = await userModel.findOneAndUpdate({ _id }, updateData, {
      new: true,
    });

    revalidatePath(path);
    return user as IUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export const createNewUser = async (userData: CreateUserParams) => {
  try {
    await dbConnect();
    const hashedPassword = await bcryptjs.hash(userData.password, 5);
    const newUser = await userModel.create({
      fullname: userData.fullname,
      email: userData.email,
      password: hashedPassword,
    });

    return newUser as IUser;
  } catch (error) {
    console.log(error);
  }
};
export const deleteUserById = async ({ _id }: DeleteUserParams) => {
  try {
    await dbConnect();
    await userModel.findByIdAndDelete(_id);
    return true;
  } catch (error) {
    console.log(error);
  }
};
