// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtDecode } from "jwt-decode";

// export function middleware(request: NextRequest) {
//   // Get token from cookies
//   const token = request.cookies.get("accessToken")?.value;
//   // // console.log(token, 'tok')
//   if (!token) {
//     // Redirect to home if no token is present
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // Decode token to get user info
//   let userInfo: { role?: string, isSubscribed?: boolean } = {};

//   try {
//     userInfo = jwtDecode(token as string) as { role?: string };
//   } catch (error) {
//     if (error) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//     return;
//   }
//   // if (!userInfo.isSubscribed) {
//   //   return NextResponse.redirect(new URL("/subscription", request.url));
//   // }

//   const currentPath = request.nextUrl.pathname;
//   // Restrict access to admin paths if user is not an ADMIN
//   if (
//     currentPath.startsWith("/dashboard") &&
//     userInfo?.role !== "SUPER_ADMIN"
//   ) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // Allow the request to proceed
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/shop","/shop/:id", "/groups","/members", "/messages/:id", "/profile","/groups/:id" ],
// };




import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const publicRoutes = ["/login", "/signup"];
const protectedRoutes = [
  "/shop",
  "/shop/:id",
  "/groups",
  "/members",
  "/messages/:id",
  "/profile",
  "/groups/:id",
  "/subscription"
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  // 1. Handle public routes
  if (publicRoutes.includes(pathname)) {
    // If user is already logged in, redirect from auth pages to home
    if (accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // 2. Handle protected routes
  if (protectedRoutes.includes(pathname)) {
    // If no token, redirect to login with return URL
    if (!accessToken) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${encodeURIComponent(pathname)}`, request.url)
      );
    }

    // Verify token
    let decodedToken: any;
    try {
      decodedToken = jwtDecode(accessToken);
    } catch (error) {
      console.error("Failed to decode token", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Subscription check (except for subscription page itself)
    if (pathname !== "/subscription" && !decodedToken.isSubscribed) {
      return NextResponse.redirect(
        new URL(`/subscription?redirect=${encodeURIComponent(pathname)}`, request.url)
      );
    }

    return NextResponse.next();
  }

  // 3. Handle all other routes - redirect to home
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/subscription",
    "/shop",
    "/shop/:id",
    "/groups",
    "/members",
    "/messages/:id",
    "/profile",
    "/groups/:id",
  ],
};