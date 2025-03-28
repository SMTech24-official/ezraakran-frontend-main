import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get("accessToken")?.value;
  // // console.log(token, 'tok')
  if (!token) {
    // Redirect to home if no token is present
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Decode token to get user info
  let userInfo: { role?: string, isSubscribed?: boolean } = {};

  try {
    userInfo = jwtDecode(token as string) as { role?: string };
  } catch (error) {
    if (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return;
  }
  if (!userInfo.isSubscribed) {
    return NextResponse.redirect(new URL("/subscription", request.url));
  }

  const currentPath = request.nextUrl.pathname;
  // Restrict access to admin paths if user is not an ADMIN
  if (
    currentPath.startsWith("/dashboard") &&
    userInfo?.role !== "SUPER_ADMIN"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/shop","/shop/:id", "/groups","/members", "/messages/:id", "/profile","/groups/:id" ],
};






// import { NextRequest, NextResponse } from "next/server";
// import { jwtDecode } from "jwt-decode";


// const authRoutes = ["/login", "/signup"];

// export async function middleware(request: NextRequest) {
//   //   console.log("middle", request);
//   const { pathname } = request.nextUrl;
//   // console.log("pa", pathname);

//   const accessToken = request.cookies.get("accessToken")?.value;
//   if (!accessToken) {
//     //Protecting hybrid routes
//     if (authRoutes.includes(pathname)) {
//       return NextResponse.next();
//     } else {
//       //   return NextResponse.redirect(new URL("/login", request.url));
//       return NextResponse.redirect(
//         new URL(`/login?redirect=${encodeURIComponent(pathname)}`, request.url)
//       );
//     }
//   }

//   //role based authorization

//   let decodedToken: any;
//   try {
//     decodedToken = jwtDecode(accessToken);
//   } catch (error) {
//     console.error("Failed to decode accessToken", error);
//     return NextResponse.redirect(new URL("/login", request.url));
//   }


//   const role = decodedToken?.role;
//   // Restrict access to admin paths if user is not an ADMIN
//   if (
//     pathname.startsWith("/dashboard") &&
//     role !== "SUPER_ADMIN"
//   ) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // if (!decodedToken.isSubscribed) {
//   //     return NextResponse.redirect(new URL("/subscription", request.url));
//   //   }

//   if (pathname === "/shop") {
//     return NextResponse.next();
//   }
//   if (pathname === "/shop/:id") {
//     return NextResponse.next();
//   }
//   if (pathname === "/groups") {
//     return NextResponse.next();
//   }
//   if (pathname === "/groups/:id") {
//     return NextResponse.next();
//   }
//   if (pathname === "/members") {
//     return NextResponse.next();
//   }
//   if (pathname === "/messages/:id") {
//     return NextResponse.next();
//   }
//   if (pathname === "/profile") {
//     return NextResponse.next();
//   }
//   return NextResponse.redirect(new URL("/", request.url));
// }

// export const config = {
//   matcher: [
//     "/login",
//     "/signup",
//     "/subscription",
//     "/shop",
//     "/shop/:id*",
//     "/groups",
//     "/members",
//     "/messages/:id",
//     "/profile",
//     "/groups/:id*"
//   ],
// };

