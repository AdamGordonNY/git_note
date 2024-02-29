import { withAuth } from "next-auth/middleware";
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // If there's no session and the user is requesting a protected route,
  // redirect them to the sign-in page.
  if (!session && pathname !== "/sign-up") {
    const url = req.nextUrl.clone();
    url.pathname = "sign-up";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export default withAuth({
  callbacks: {
    authorized({ req, token }: { req: NextRequest; token: any }) {
      // `/admin` requires admin role
      if (req.nextUrl.pathname === "/admin") {
        return token?.userRole === "admin";
      }
      // `/me` only requires the user to be logged in
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
