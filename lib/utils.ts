import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getToken } from "next-auth/jwt";
import qs from "query-string";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
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
interface URLQueryParams {
  params: string;
  key: string;
  value: string | null;
}
export const formUrlQuery = ({ params, key, value }: URLQueryParams) => {
  const currentURL = qs.parse(params);
  currentURL[key] = value;
  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentURL },
    { skipNull: true }
  );
};
interface RemoveURLQueryParams {
  params: string;
  keysToRemove: string[];
}
export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveURLQueryParams) => {
  const currentURL = qs.parse(params);
  keysToRemove.forEach((key) => delete currentURL[key]);
  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentURL },
    { skipNull: true }
  );
};

export const validatePassword = async (
  hashedPassword: string,
  password: string
) => {
  const isMatch = await bcrypt.compare(hashedPassword, password);
  if (isMatch) {
    return true;
  } else {
    throw new Error("Passwords don't match.");
  }
};
