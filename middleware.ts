import { withAuth } from "next-auth/middleware";
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // Skip middleware for static files and API routes
  const url = req.nextUrl;

  // List of file extensions for static assets
  const staticAssetExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp", // Images
    ".css",
    ".js", // CSS and JavaScript
    ".svg",
    ".ico",
    ".woff",
    ".woff2",
    ".ttf", // Fonts and icons
    // Add any other file extensions as needed
  ];

  // Check if the request is for a static asset
  const isStaticAsset = staticAssetExtensions.some((ext) =>
    url.pathname.endsWith(ext)
  );
  if (isStaticAsset) {
    return NextResponse.next(); // Bypass middleware for static assets
  }
  if (
    req.nextUrl.pathname.startsWith("/_next/static") || // Handles static files
    req.nextUrl.pathname.startsWith("/_next/image") || // Handles optimized images
    req.nextUrl.pathname.startsWith("/api") || // Handles API requests
    req.nextUrl.pathname === "/favicon.ico" ||
    req.nextUrl.pathname === "/public/(*.)" // Handles favicon
  ) {
    return NextResponse.next();
  }

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Redirect to sign-up if there's no session and not on the sign-up page
  if (!session && pathname !== "/sign-up") {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-up";
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
