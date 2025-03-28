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













import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const protectedPaths = ["/shop", "/groups", "/members", "/messages", "/profile"];
  const isProtectedRoute = protectedPaths.some(path => pathname.startsWith(path));

  // If not a protected route, continue
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Get token from cookies
  const token = request.cookies.get("accessToken")?.value;

  // For API routes or auth routes, continue
  if (pathname.startsWith('/api') || pathname.startsWith('/login')) {
    return NextResponse.next();
  }

  // Redirect to login if no token
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Decode token
  let userInfo: { role?: string } = {};
  try {
    userInfo = jwtDecode(token) as { role?: string };
  } catch (error) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin route protection
  if (pathname.startsWith("/dashboard") && userInfo?.role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/shop",
    "/shop/:id",
    "/groups",
    "/members",
    "/messages/:id",
    "/profile",
    "/groups/:id",
    "/dashboard/:path*"
  ],
};