import dbConnect from "@/database/dbConnect";
import User, { IUser } from "@/database/models/user.model";
import { revalidatePath } from "next/cache";
import { UpdateUserParams, CreateUserParams } from "./shared.types";

import bcryptjs from "bcryptjs";

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

export async function updateUser(params: UpdateUserParams) {
  try {
    await dbConnect();

    const { _id, updateData, path } = params;

    await User.findOneAndUpdate({ _id }, updateData, {
      new: true,
    });

    revalidatePath(path);
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
      username: userData.username,
      password: hashedPassword,
    });

    return newUser as IUser;
  } catch (error) {
    console.log(error);
  }
};
export const deleteUserById = async ({ _id }: { _id: string }) => {
  try {
    await dbConnect();
    await User.findByIdAndDelete(_id);
    return true;
  } catch (error) {
    console.log(error);
  }
};
