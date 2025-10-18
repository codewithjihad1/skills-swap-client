"use client";

import { useSession } from "next-auth/react";
import { Shield, GraduationCap, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RoleBadgeProps {
    showIcon?: boolean;
    className?: string;
}

/**
 * Component to display the user's current role as a badge
 */
export function RoleBadge({ showIcon = true, className = "" }: RoleBadgeProps) {
    const { data: session } = useSession();

    if (!session?.user) return null;

    const userRole = (session.user as any)?.role || "user";

    const roleConfig = {
        admin: {
            label: "Admin",
            icon: Shield,
            className:
                "bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200",
        },
        instructor: {
            label: "Instructor",
            icon: GraduationCap,
            className:
                "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-200",
        },
        user: {
            label: "User",
            icon: User,
            className:
                "bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200",
        },
    };

    const config =
        roleConfig[userRole as keyof typeof roleConfig] || roleConfig.user;
    const Icon = config.icon;

    return (
        <Badge
            className={`${config.className} ${className} flex items-center gap-1.5 px-2.5 py-1`}
        >
            {showIcon && <Icon className="h-3.5 w-3.5" />}
            <span className="font-medium">{config.label}</span>
        </Badge>
    );
}

/**
 * Component to display any user's role (not just current user)
 */
export function UserRoleBadge({
    role,
    showIcon = false,
    size = "sm",
}: {
    role: "user" | "instructor" | "admin";
    showIcon?: boolean;
    size?: "xs" | "sm" | "md";
}) {
    const roleConfig = {
        admin: {
            label: "Admin",
            icon: Shield,
            className: "bg-red-100 text-red-800 border-red-300",
        },
        instructor: {
            label: "Instructor",
            icon: GraduationCap,
            className: "bg-blue-100 text-blue-800 border-blue-300",
        },
        user: {
            label: "User",
            icon: User,
            className: "bg-green-100 text-green-800 border-green-300",
        },
    };

    const sizeClasses = {
        xs: "text-xs px-2 py-0.5",
        sm: "text-sm px-2.5 py-1",
        md: "text-base px-3 py-1.5",
    };

    const config = roleConfig[role];
    const Icon = config.icon;

    return (
        <Badge
            className={`${config.className} ${sizeClasses[size]} flex items-center gap-1.5`}
        >
            {showIcon && <Icon className="h-3 w-3" />}
            <span className="font-medium">{config.label}</span>
        </Badge>
    );
}
