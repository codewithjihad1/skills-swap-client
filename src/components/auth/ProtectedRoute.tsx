"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { canAccessRoute } from "@/lib/auth/roleGuard";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?:
        | "user"
        | "instructor"
        | "admin"
        | ("user" | "instructor" | "admin")[];
    requireVerified?: boolean;
    fallbackUrl?: string;
}

/**
 * Wrapper component to protect routes based on authentication and role
 */
export function ProtectedRoute({
    children,
    requiredRole,
    requireVerified = false,
    fallbackUrl = "/auth/signin",
}: ProtectedRouteProps) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;

        // Not authenticated
        if (!session) {
            router.push(fallbackUrl);
            return;
        }

        // Check verification if required
        if (requireVerified) {
            const isVerified = (session.user as any)?.isVerified;
            if (!isVerified) {
                router.push("/auth/verify-email");
                return;
            }
        }

        // Check role if specified
        if (requiredRole) {
            const userRole = (session.user as any)?.role;
            const roles = Array.isArray(requiredRole)
                ? requiredRole
                : [requiredRole];

            // Admin has access to everything
            if (userRole === "admin") return;

            if (!roles.includes(userRole)) {
                router.push("/dashboard");
                return;
            }
        }
    }, [session, status, router, requiredRole, requireVerified, fallbackUrl]);

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    // Additional role check
    if (requiredRole) {
        const userRole = (session.user as any)?.role;
        const roles = Array.isArray(requiredRole)
            ? requiredRole
            : [requiredRole];

        if (userRole !== "admin" && !roles.includes(userRole)) {
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center max-w-md">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Access Denied
                        </h1>
                        <p className="text-gray-600 mb-6">
                            You don't have permission to access this page.
                        </p>
                        <button
                            onClick={() => router.push("/dashboard")}
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            );
        }
    }

    return <>{children}</>;
}

/**
 * Protect admin-only routes
 */
export function AdminRoute({ children }: { children: React.ReactNode }) {
    return <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>;
}

/**
 * Protect instructor routes (instructors and admins)
 */
export function InstructorRoute({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute requiredRole={["instructor", "admin"]}>
            {children}
        </ProtectedRoute>
    );
}
