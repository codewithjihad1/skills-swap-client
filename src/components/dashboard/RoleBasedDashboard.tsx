"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import UserDashboard from "@/components/dashboard/UserDashboard";
import InstructorDashboard from "@/components/dashboard/InstructorDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

export default function RoleBasedDashboard() {
    const { data: session, status } = useSession();
    console.log("🚀 ~ RoleBasedDashboard ~ session:", session)
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!session?.user) {
        return null;
    }

    const userRole = (session.user as any).role || "user";

    switch (userRole) {
        case "admin":
            return <AdminDashboard />;
        case "instructor":
            return <InstructorDashboard />;
        case "user":
        default:
            return <UserDashboard />;
    }
}
