import { NextRequest, NextResponse } from "next/server";
import { createNewUser } from "@/lib/actions/user.actions";

export const POST = async (request: NextRequest) => {
  try {
    const { fullname, username, password } = await request.json();
    // connect to db and save user
    const user = await createNewUser({
      username,
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
