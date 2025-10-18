"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
    hasRole,
    hasAnyRole,
    isAdmin,
    isInstructor,
    isVerified,
    getUserRole,
    canAccessRoute,
    hasMinimumRole,
    type UserRole,
} from "@/lib/auth/roleGuard";

/**
 * Hook for role-based access control
 */
export function useRBAC() {
    const { data: session, status } = useSession();

    return {
        session,
        status,
        loading: status === "loading",
        authenticated: status === "authenticated",

        // Role checks
        hasRole: (role: UserRole | UserRole[]) => hasRole(session, role),
        hasAnyRole: (roles: UserRole[]) => hasAnyRole(session, roles),
        isAdmin: () => isAdmin(session),
        isInstructor: () => isInstructor(session),
        isVerified: () => isVerified(session),
        hasMinimumRole: (role: UserRole) => hasMinimumRole(session, role),

        // User info
        userRole: getUserRole(session),
        userId: (session?.user as any)?.id,
        userName: session?.user?.name,
        userEmail: session?.user?.email,

        // Route access
        canAccessRoute: (route: string) => canAccessRoute(session, route),
    };
}

/**
 * Hook to require specific role (redirects if not authorized)
 */
export function useRequireRole(
    requiredRole: UserRole | UserRole[],
    options?: {
        redirectTo?: string;
        requireVerified?: boolean;
    }
) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const rbac = useRBAC();

    useEffect(() => {
        if (status === "loading") return;

        // Not authenticated
        if (!session) {
            router.push(options?.redirectTo || "/auth/signin");
            return;
        }

        // Check verification if required
        if (options?.requireVerified && !rbac.isVerified()) {
            router.push("/auth/verify-email");
            return;
        }

        // Check role
        if (!rbac.hasRole(requiredRole)) {
            router.push("/dashboard");
            return;
        }
    }, [session, status, router, rbac, requiredRole, options]);

    return {
        loading: status === "loading",
        authorized: status === "authenticated" && rbac.hasRole(requiredRole),
    };
}

/**
 * Hook to require admin role
 */
export function useRequireAdmin(redirectTo?: string) {
    return useRequireRole("admin", { redirectTo });
}

/**
 * Hook to require instructor or admin role
 */
export function useRequireInstructor(redirectTo?: string) {
    return useRequireRole(["instructor", "admin"], { redirectTo });
}

/**
 * Hook to require authentication
 */
export function useRequireAuth(options?: {
    redirectTo?: string;
    requireVerified?: boolean;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const rbac = useRBAC();

    useEffect(() => {
        if (status === "loading") return;

        if (!session) {
            router.push(options?.redirectTo || "/auth/signin");
            return;
        }

        if (options?.requireVerified && !rbac.isVerified()) {
            router.push("/auth/verify-email");
            return;
        }
    }, [session, status, router, rbac, options]);

    return {
        loading: status === "loading",
        authenticated: status === "authenticated",
    };
}
