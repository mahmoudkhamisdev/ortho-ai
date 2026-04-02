import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  // Protect Auth
  // if (
  //   userData &&
  //   [
  //     "/login",
  //     "/register",
  //     "/forgot-password",
  //     "/reset-password",
  //     "/verify-code",
  //   ].some((route) => pathname.startsWith(route))
  // ) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // // Protect All Dashboard
  // if (!userData && pathname.startsWith("/dashboard")) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // // Protect Dashboard By Role
  // if (userData) {
  //   const allowedRoles = dashboardAccess[pathname];
  //   if (!allowedRoles?.includes(userData?.role) && pathname.startsWith("/dashboard")) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }

  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
