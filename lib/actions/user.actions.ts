import dbConnect from "@/database/dbConnect";
import User from "@/database/models/user.model";

export const getOneUser = async (email: string) => {
  try {
    await dbConnect();
    const user = await User.findOne({ email });
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
    return user?._id;
  } catch (error) {
    console.log(error);
  }

  return undefined;
};
export const getUserById = async ({ _id }: { _id: string }) => {
  try {
    await dbConnect();
    const user = await User.findById(_id);
    return user;
  } catch (error) {
    console.log(error);
  }
};
