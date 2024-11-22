import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const request = await req.json();
  console.log(request);
}
