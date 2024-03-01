import dbConnect from "@/database/dbConnect";
import User from "@/database/models/user.model";

export const getOneUser = async (email: string) => {
  try {
    await dbConnect();
    const user = await User.findOne({ email });
    return user;
  } catch (error) {}
};
