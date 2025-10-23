"use client";

import "@/app/globals.css";
import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
    Home,
    User,
    Briefcase,
    MessageCircle,
    Coins,
    Star,
    Calendar,
    TrendingUp,
    Users,
    Plus,
    BookOpen,
    GraduationCap,
    ShieldCheck,
    Settings as SettingsIcon,
    BarChart3,
    FileText,
} from "lucide-react";
import DesktopHeader from "@/app/(dashboard)/components/DesktopHeader";
import MobileHeader from "@/app/(dashboard)/components/MobileHeader";
import DesktopSidebar from "@/app/(dashboard)/components/DesktopSidebar";
import MobileSidebar from "@/app/(dashboard)/components/MobileSidebar";
import AuthProvider from "@/provider/AuthProvider";
import { ThemeProvider } from "next-themes";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import { ToastContainer } from "react-toastify";
import { Toaster } from "sonner";
import { SocketProvider } from "@/context/SocketContext";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();

    const userRole = session?.user?.role || "user";

    // Base navigation items for all users
    const baseNavigationItems = [
        {
            name: "Overview",
            href: "/dashboard",
            icon: Home,
            description: "Dashboard home",
            roles: ["user", "instructor", "admin"],
        },
        {
            name: "Profile",
            href: "/dashboard/profile",
            icon: User,
            description: "Manage your profile",
            roles: ["user", "instructor", "admin"],
        },
        {
            name: "Skills",
            href: "/dashboard/skills",
            icon: Briefcase,
            description: "Your skills & offerings",
            roles: ["user", "instructor", "admin"],
        },
        {
            name: "Requests",
            href: "/dashboard/requests",
            icon: Calendar,
            description: "Swap requests",
            roles: ["user", "instructor", "admin"],
        },
        {
            name: "Messages",
            href: "/dashboard/messages",
            icon: MessageCircle,
            description: "Chat & communications",
            roles: ["user", "instructor", "admin"],
        },
    ];

    // Instructor-specific navigation items
    const instructorNavigationItems = [
        {
            name: "My Courses",
            href: "/dashboard/courses",
            icon: BookOpen,
            description: "Manage your courses",
            roles: ["instructor", "admin"],
        },
        {
            name: "Students",
            href: "/dashboard/students",
            icon: GraduationCap,
            description: "Student management",
            roles: ["instructor", "admin"],
        },
        {
            name: "Analytics",
            href: "/dashboard/analytics",
            icon: BarChart3,
            description: "Performance metrics",
            roles: ["instructor", "admin"],
        },
    ];

    // Admin-specific navigation items
    const adminNavigationItems = [
        {
            name: "User Management",
            href: "/dashboard/manageUsers",
            icon: Users,
            description: "Manage all users",
            roles: ["admin"],
        },
        {
            name: "Reports",
            href: "/dashboard/reports",
            icon: FileText,
            description: "System reports",
            roles: ["admin"],
        },
        {
            name: "System Settings",
            href: "/dashboard/system-settings",
            icon: SettingsIcon,
            description: "Platform configuration",
            roles: ["admin"],
        },
    ];

    // Additional common navigation items
    const commonNavigationItems = [
        {
            name: "Wallet",
            href: "/dashboard/wallet",
            icon: Coins,
            description: "Credits & transactions",
            roles: ["user", "instructor", "admin"],
        },
        {
            name: "Reviews",
            href: "/dashboard/reviews",
            icon: Star,
            description: "Feedback & ratings",
            roles: ["user", "instructor", "admin"],
        },
    ];

    // Filter navigation items based on user role
    const navigationItems = useMemo(() => {
        let items = [...baseNavigationItems];

        // Add instructor items if user is instructor or admin
        if (userRole === "instructor" || userRole === "admin") {
            items = [...items, ...instructorNavigationItems];
        }

        // Add admin items if user is admin
        if (userRole === "admin") {
            items = [...items, ...adminNavigationItems];
        }

        // Add common items
        items = [...items, ...commonNavigationItems];

        // Filter based on role
        return items.filter((item) => item.roles.includes(userRole));
    }, [userRole]);

    // Role-based quick actions
    const quickActions = useMemo(() => {
        const actions = [];

        // Common actions for all users
        if (
            userRole === "user" ||
            userRole === "instructor" ||
            userRole === "admin"
        ) {
            actions.push({
                name: "Add Skill",
                href: "/dashboard/skills/add",
                icon: Plus,
                color: "text-green-600 dark:text-green-400",
                roles: ["user", "instructor", "admin"],
            });
            actions.push({
                name: "Find Partners",
                href: "/dashboard/discover",
                icon: Users,
                color: "text-blue-600 dark:text-blue-400",
                roles: ["user", "instructor", "admin"],
            });
        }

        // Instructor-specific actions
        if (userRole === "instructor" || userRole === "admin") {
            actions.push({
                name: "Create Course",
                href: "/dashboard/courses/create",
                icon: BookOpen,
                color: "text-purple-600 dark:text-purple-400",
                roles: ["instructor", "admin"],
            });
        }

        // Admin-specific actions
        if (userRole === "admin") {
            actions.push({
                name: "View Analytics",
                href: "/dashboard/analytics",
                icon: TrendingUp,
                color: "text-orange-600 dark:text-orange-400",
                roles: ["admin"],
            });
        }

        return actions.filter((action) => action.roles.includes(userRole));
    }, [userRole]);

    const isActive = (href: string) => {
        if (href === "/dashboard") {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    const closeSidebar = () => setSidebarOpen(false);

    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className="max-w-screen overflow-x-hidden"
                suppressHydrationWarning
            >
                <AuthProvider>
                    <ReactQueryProvider>
                        <SocketProvider>
                            <ThemeProvider
                                attribute="class"
                                defaultTheme="system"
                                enableSystem
                                disableTransitionOnChange
                            >
                                <div className="min-h-screen w-full bg-gradient-to-br from-accent/20 via-background to-accent/10">
                                    {/* Mobile Header */}
                                    <MobileHeader
                                        setSidebarOpen={setSidebarOpen}
                                    />

                                    {/* Desktop Sidebar */}
                                    <DesktopSidebar
                                        navigationItems={navigationItems}
                                        quickActions={quickActions}
                                        isActive={isActive}
                                    />

                                    {/* Mobile Sidebar Overlay */}
                                    <MobileSidebar
                                        sidebarOpen={sidebarOpen}
                                        closeSidebar={closeSidebar}
                                        navigationItems={navigationItems}
                                        isActive={isActive}
                                    />

                                    {/* Main Content Area */}
                                    <div
                                        className={`lg:pl-64 flex flex-col min-h-screen`}
                                    >
                                        {/* Desktop Header */}
                                        <DesktopHeader />

                                        {/* Page Content */}
                                        <main className="flex-1 p-4 lg:p-6">
                                            <div className="max-w-7xl mx-auto">
                                                {children}
                                            </div>
                                        </main>
                                    </div>
                                </div>

                                <ToastContainer />
                                <Toaster position="top-right" richColors />
                            </ThemeProvider>
                        </SocketProvider>
                    </ReactQueryProvider>
                </AuthProvider>
            </body>
        </html>
    );
};

const WrapDashboardLayout = (props: DashboardLayoutProps) => {
    return (
        <AuthProvider>
            <DashboardLayout {...props} />
        </AuthProvider>
    );
};

export default WrapDashboardLayout;
