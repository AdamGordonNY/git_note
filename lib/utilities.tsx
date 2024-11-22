"use client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getToken } from "next-auth/jwt";

import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import {
  DiCss3,
  DiGithub,
  DiHtml5,
  DiJava,
  DiJavascript,
  DiLaravel,
  DiNodejs,
  DiPython,
  DiReact,
} from "react-icons/di";

import { BiLogoTailwindCss, BiLogoTypescript } from "react-icons/bi";
import queryString from "query-string";
import React, { RefObject, useEffect } from "react";

export const useOutsideClickHandler = (
  ref: RefObject<HTMLDivElement>,
  onClick: () => void
) => {
  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current?.contains(event.target as Element)) {
        onClick();
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [onClick, ref]);
};

export const useEscapeHandler = (onClick: () => void) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClick();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClick]);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// This is an example of how to read a JSON Web Token from an API route

export async function handler(req: NextApiRequest, res: NextApiResponse) {
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
export const formUrlQuery = (
  p0: { params: string },
  p1: { key: URLSearchParamsIterator<string>; value: any },
  { params, key, value }: URLQueryParams
) => {
  const currentURL = queryString.parse(params);
  currentURL[key] = value;
  return queryString.stringifyUrl(
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
  const currentURL = queryString.parse(params);
  keysToRemove.forEach((key) => delete currentURL[key]);
  return queryString.stringifyUrl(
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

export const turnNameToIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case "react":
      return <DiReact />;
    case "nodejs":
      return <DiNodejs />;
    case "javascript":
      return <DiJavascript />;
    case "python":
      return <DiPython />;
    case "java":
      return <DiJava />;
    case "html5":
      return <DiHtml5 />;
    case "css3":
      return <DiCss3 />;
    case "typescript":
      return <BiLogoTypescript />;
    case "tailwind css":
      return <BiLogoTailwindCss />;
    case "laravel":
      return <DiLaravel />;
    case "github":
      return <DiGithub />;
    default:
      return <DiReact />;
  }
};

const urlManager = (
  params: string,
  change: Partial<URLSearchParams>,
  options = { includePathname: false, pathname: "" }
): string => {
  // Parse the current query string
  const currentParams = queryString.parse(params);

  // Merge changes while skipping null or undefined values
  const updatedParams = {
    ...currentParams,
    ...Object.fromEntries(
      Object.entries(change).filter(
        ([_, value]) => value !== null && value !== undefined
      )
    ),
  };

  // Stringify the updated query string
  const query = queryString.stringify(updatedParams, {
    skipEmptyString: true,
    skipNull: true,
  });

  // Include pathname if required
  return options.includePathname
    ? `${options.pathname || window.location.pathname}?${query}`
    : query;
};

export default urlManager;
