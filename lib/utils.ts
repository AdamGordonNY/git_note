import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getToken } from "next-auth/jwt";

import type { NextApiRequest, NextApiResponse } from "next";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// This is an example of how to read a JSON Web Token from an API route

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // If you don't have the NEXTAUTH_SECRET environment variable set,
  // you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({ req });
  res.send(JSON.stringify(token, null, 2));
}
