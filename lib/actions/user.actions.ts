import dbConnect from "@/database/dbConnect";
import User, { IUser } from "@/database/models/user.model";
import { revalidatePath } from "next/cache";
import { UpdateUserParams } from "./shared.actions";

export const getOneUser = async (email: string) => {
  try {
    await dbConnect();
    const user = (await User.findOne({ email })) as IUser;
    return user;
  } catch (error) {
    console.log(error);
  }
};
export const getUserId = async (
  email: string
): Promise<string | null | undefined> => {
  try {
    await dbConnect();
    const user = await User.findOne({ email });
    return user?._id as string;
  } catch (error) {
    console.log(error);
  }
};
export const getUserById = async ({ _id }: { _id: string }) => {
  try {
    await dbConnect();
    const user = await User.findById(_id);
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
export const createNewUser = async (userData: Partial<IUser>) => {
  try {
    await dbConnect();
    const user = await User.create(userData);
    return user as IUser;
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
