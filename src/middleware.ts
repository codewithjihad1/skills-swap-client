import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define protected routes that require authentication
const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/matchmaking",
    "/messages",
    "/skills",
    "/requests",
    "/setting",
];

// Define admin-only routes
const adminRoutes = ["/dashboard/manageUsers", "/dashboard/admin", "/admin"];

// Define instructor-only routes
const instructorRoutes = [
    "/dashboard/courses",
    "/dashboard/students",
    "/instructor",
];

// Define auth routes that should redirect to dashboard if already authenticated
const authRoutes = ["/auth/signin", "/auth/signup"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get the JWT token from the request
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const isAuthenticated = !!token;
    const userRole = (token?.role as string) || "user";

    // Check if the current path is a protected route
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // Check if the current path is an admin route
    const isAdminRoute = adminRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // Check if the current path is an instructor route
    const isInstructorRoute = instructorRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // Check if the current path is an auth route
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    // Redirect unauthenticated users trying to access protected routes
    if (isProtectedRoute && !isAuthenticated) {
        const signInUrl = new URL("/auth/signin", request.url);
        signInUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(signInUrl);
    }

    // Redirect authenticated users trying to access auth routes
    if (isAuthRoute && isAuthenticated) {
        // Role-based redirect after authentication
        switch (userRole) {
            case "admin":
                return NextResponse.redirect(
                    new URL("/dashboard/manageUsers", request.url)
                );
            case "instructor":
                return NextResponse.redirect(
                    new URL("/dashboard/courses", request.url)
                );
            default:
                return NextResponse.redirect(
                    new URL("/dashboard", request.url)
                );
        }
    }

    // Role-based access control for admin routes
    if (isAdminRoute && isAuthenticated && userRole !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Role-based access control for instructor routes
    if (
        isInstructorRoute &&
        isAuthenticated &&
        userRole !== "instructor" &&
        userRole !== "admin"
    ) {
        // Admin can access instructor routes
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
