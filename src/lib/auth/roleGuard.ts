import { Session } from "next-auth";

export type UserRole = "user" | "instructor" | "admin";

export interface RoleBasedSession extends Session {
    user: Session["user"] & {
        id: string;
        role: UserRole;
        isVerified: boolean;
    };
}

/**
 * Check if a user has the required role
 */
export function hasRole(
    session: Session | null,
    requiredRole: UserRole | UserRole[]
): boolean {
    if (!session?.user) return false;

    const userRole = (session.user as any).role as UserRole;

    if (!userRole) return false;

    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

    // Admin has access to everything
    if (userRole === "admin") return true;

    return roles.includes(userRole);
}

/**
 * Check if user has at least one of the required roles
 */
export function hasAnyRole(
    session: Session | null,
    roles: UserRole[]
): boolean {
    if (!session?.user) return false;

    const userRole = (session.user as any).role as UserRole;

    if (!userRole) return false;

    // Admin has access to everything
    if (userRole === "admin") return true;

    return roles.includes(userRole);
}

/**
 * Check if user is admin
 */
export function isAdmin(session: Session | null): boolean {
    return hasRole(session, "admin");
}

/**
 * Check if user is instructor or admin
 */
export function isInstructor(session: Session | null): boolean {
    return hasAnyRole(session, ["instructor", "admin"]);
}

/**
 * Check if user is verified
 */
export function isVerified(session: Session | null): boolean {
    if (!session?.user) return false;
    return (session.user as any).isVerified === true;
}

/**
 * Get user role from session
 */
export function getUserRole(session: Session | null): UserRole | null {
    if (!session?.user) return null;
    return (session.user as any).role || null;
}

/**
 * Role hierarchy levels
 */
export const ROLE_HIERARCHY: Record<UserRole, number> = {
    user: 1,
    instructor: 2,
    admin: 3,
};

/**
 * Check if user has higher or equal role than required
 */
export function hasMinimumRole(
    session: Session | null,
    minimumRole: UserRole
): boolean {
    if (!session?.user) return false;

    const userRole = getUserRole(session);
    if (!userRole) return false;

    return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[minimumRole];
}

/**
 * Route access control configuration
 */
export const ROUTE_ACCESS: Record<string, UserRole[]> = {
    // Dashboard routes
    "/dashboard": ["user", "instructor", "admin"],
    "/dashboard/profile": ["user", "instructor", "admin"],
    "/dashboard/skills": ["user", "instructor", "admin"],
    "/dashboard/requests": ["user", "instructor", "admin"],
    "/dashboard/messages": ["user", "instructor", "admin"],
    "/dashboard/wallet": ["user", "instructor", "admin"],
    "/dashboard/reviews": ["user", "instructor", "admin"],

    // Instructor routes
    "/dashboard/courses": ["instructor", "admin"],
    "/dashboard/courses/create": ["instructor", "admin"],
    "/dashboard/students": ["instructor", "admin"],
    "/dashboard/analytics": ["instructor", "admin"],

    // Admin routes
    "/dashboard/manageUsers": ["admin"],
    "/dashboard/reports": ["admin"],
    "/dashboard/system-settings": ["admin"],
};

/**
 * Check if user can access a specific route
 */
export function canAccessRoute(
    session: Session | null,
    route: string
): boolean {
    // Find matching route pattern
    const matchingRoute = Object.keys(ROUTE_ACCESS).find((pattern) => {
        // Exact match
        if (route === pattern) return true;
        // Starts with pattern (for nested routes)
        if (route.startsWith(pattern + "/")) return true;
        return false;
    });

    if (!matchingRoute) {
        // No specific access control, allow all authenticated users
        return !!session?.user;
    }

    const allowedRoles = ROUTE_ACCESS[matchingRoute];
    return hasAnyRole(session, allowedRoles);
}
