import { NextRequest, NextResponse } from "next/server";
import { authWithCredentials } from "@/lib/actions/auth.actions";

export const POST = async (request: NextRequest) => {
  try {
    const { fullname, username, password } = await request.json();

    await authWithCredentials({
      username,
      password,
      fullname,
    });
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
