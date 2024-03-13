import { NextRequest, NextResponse } from "next/server";
import { createNewUser, getOneUser } from "@/lib/actions/user.actions";

export const POST = async (request: NextRequest) => {
  try {
    const { fullname, email, password } = await request.json();
    const existingUser = await getOneUser(email);
    if (existingUser) {
      // User already exists, return an error message
      return new NextResponse(JSON.stringify(Error), {
        status: 409,
        statusText: "User already Exists",
      });
    }
    const user = await createNewUser({
      email,
      password,
      fullname,
    });
    return new NextResponse(
      "User has been created" + JSON.stringify({ user }),
      {
        status: 201,
      }
    );
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
