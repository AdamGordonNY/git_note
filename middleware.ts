import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  console.log("Middleware invoked for:", req.nextUrl.pathname);

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Session:", session);

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-up";
    console.log("No session found, redirecting to /sign-up");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export default withAuth({
  callbacks: {
    authorized({ req, token }: { req: NextRequest; token: any }) {
      if (req.nextUrl.pathname === "/admin") {
        return token?.userRole === "admin";
      }
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|sign-in|sign-up|onboarding|favicon.ico).*)",
  ],
};
