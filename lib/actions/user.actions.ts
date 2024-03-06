import dbConnect from "@/database/dbConnect";
import User from "@/database/models/user.model";
import bcryptjs from "bcryptjs";

interface CreateUserProps {
  fullname: string;
  username: string;
  password: string;
}

export const getOneUser = async (username: string) => {
  try {
    await dbConnect();
    const user = await User.findOne({ username })!;
    return user;
  } catch (error) {
    throw new Error("");
  }
};
export const createNewUser = async ({
  username,
  fullname,
  password,
}: CreateUserProps) => {
  try {
    await dbConnect();
    const hashedPassword = await bcryptjs.hash(password, 5);
    const newUser = User.create({
      fullname,
      username,
      password: hashedPassword,
    });

    // need to route to onboarding if
    return newUser;
  } catch (error) {
    throw new Error("Error creating user. Please try again.");
  }
};
