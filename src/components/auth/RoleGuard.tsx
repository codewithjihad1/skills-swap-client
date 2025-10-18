"use client";

import { useSession } from "next-auth/react";
import { hasRole, hasAnyRole, type UserRole } from "@/lib/auth/roleGuard";

interface RoleGuardProps {
    children: React.ReactNode;
    role?: UserRole | UserRole[];
    fallback?: React.ReactNode;
    requireVerified?: boolean;
}

/**
 * Component that renders children only if user has the required role
 */
export function RoleGuard({
    children,
    role,
    fallback = null,
    requireVerified = false,
}: RoleGuardProps) {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <>{fallback}</>;
    }

    if (!session) {
        return <>{fallback}</>;
    }

    // Check verification if required
    if (requireVerified) {
        const isVerified = (session.user as any)?.isVerified;
        if (!isVerified) {
            return <>{fallback}</>;
        }
    }

    // Check role if specified
    if (role) {
        const roles = Array.isArray(role) ? role : [role];
        if (!hasAnyRole(session, roles)) {
            return <>{fallback}</>;
        }
    }

    return <>{children}</>;
}

/**
 * Show content only to admins
 */
export function AdminOnly({
    children,
    fallback = null,
}: Omit<RoleGuardProps, "role">) {
    return (
        <RoleGuard role="admin" fallback={fallback}>
            {children}
        </RoleGuard>
    );
}

/**
 * Show content only to instructors and admins
 */
export function InstructorOnly({
    children,
    fallback = null,
}: Omit<RoleGuardProps, "role">) {
    return (
        <RoleGuard role={["instructor", "admin"]} fallback={fallback}>
            {children}
        </RoleGuard>
    );
}

/**
 * Show content only to regular users (excluding instructors/admins)
 */
export function UserOnly({
    children,
    fallback = null,
}: Omit<RoleGuardProps, "role">) {
    return (
        <RoleGuard role="user" fallback={fallback}>
            {children}
        </RoleGuard>
    );
}

/**
 * Show content only to verified users
 */
export function VerifiedOnly({
    children,
    fallback = null,
}: Omit<RoleGuardProps, "role" | "requireVerified">) {
    return (
        <RoleGuard requireVerified={true} fallback={fallback}>
            {children}
        </RoleGuard>
    );
}
