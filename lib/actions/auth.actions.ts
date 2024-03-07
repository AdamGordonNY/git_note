"use server";

import dbConnect from "@/database/dbConnect";
import { signIn } from "next-auth/react";
import { createNewUser, getOneUser } from "./user.actions";
// confused as to whether this will work or not, since signIn says client side only.  but if this doesnt work, where does the logic go?
interface Credentials {
  fullname: string;
  username: string;
  password: string;
}

export const authWithCredentials = async ({
  fullname,
  username,
  password,
}: Credentials) => {
  try {
    await dbConnect();
    const credentials = { username, password };
    const existingUser = await getOneUser(credentials.username);
    if (!existingUser) {
      const user = await createNewUser({ fullname, username, password });
      return await signIn("credentials", user.newUser);
    }
    const user = await signIn("credentials", {
      username: credentials.username,
      password: credentials.password,
    });
    return user;
  } catch (err) {
    return console.log(err);
  }
};
