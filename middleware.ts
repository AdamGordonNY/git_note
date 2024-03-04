import { withAuth } from "next-auth/middleware";
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // Skip middleware for static files and API routes

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // Redirect to sign-up if there's no session
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-up";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export default withAuth({
  callbacks: {
    authorized({ req, token }: { req: NextRequest; token: any }) {
      // TODO: Need to figure out how to bypass this in development
      // if (process.env.NODE_ENV === "development") {
      //   // Automatically authorize all routes in development
      //   return true;
      // }
      if (req.nextUrl.pathname === "/admin") {
        return token?.userRole === "admin";
      }
      // `/me` only requires the user to be logged in
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|sign-in|sign-up|home|favicon.ico).*)",
  ],
};
