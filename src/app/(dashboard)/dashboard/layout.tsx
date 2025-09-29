"use client";

import "@/app/globals.css";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
    Home,
    User,
    Briefcase,
    MessageCircle,
    Coins,
    Star,
    PlusCircle,
    Calendar,
    TrendingUp,
    Users,
} from "lucide-react";
import DesktopHeader from "@/components/layouts/dashboard/DesktopHeader";
import MobileHeader from "@/components/layouts/dashboard/MobileHeader";
import DesktopSidebar from "@/components/layouts/dashboard/DesktopSidebar";
import MobileSidebar from "@/components/layouts/dashboard/MobileSidebar";
import AuthProvider from "@/provider/AuthProvider";
import { ThemeProvider } from "next-themes";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    // Navigation items
    const navigationItems = [
        {
            name: "Overview",
            href: "/dashboard",
            icon: Home,
            description: "Dashboard home",
        },
        {
            name: "Profile",
            href: "/dashboard/profile",
            icon: User,
            description: "Manage your profile",
        },
        {
            name: "Skills",
            href: "/dashboard/skills",
            icon: Briefcase,
            description: "Your skills & offerings",
        },
        {
            name: "Requests",
            href: "/dashboard/requests",
            icon: Calendar,
            description: "Swap requests",
        },
        {
            name: "Messages",
            href: "/dashboard/messages",
            icon: MessageCircle,
            description: "Chat & communications",
        },
        {
            name: "Wallet",
            href: "/dashboard/wallet",
            icon: Coins,
            description: "Credits & transactions",
        },
        {
            name: "Reviews",
            href: "/dashboard/reviews",
            icon: Star,
            description: "Feedback & ratings",
        },
    ];

    const quickActions = [
        {
            name: "Add Skill",
            href: "/dashboard/skills/add",
            icon: PlusCircle,
            color: "text-green-600 dark:text-green-400",
        },
        {
            name: "Find Partners",
            href: "/dashboard/discover",
            icon: Users,
            color: "text-blue-600 dark:text-blue-400",
        },
        {
            name: "View Analytics",
            href: "/dashboard/analytics",
            icon: TrendingUp,
            color: "text-purple-600 dark:text-purple-400",
        },
    ];

    const isActive = (href: string) => {
        if (href === "/dashboard") {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    const closeSidebar = () => setSidebarOpen(false);

    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                            {/* Mobile Header */}
                            <MobileHeader setSidebarOpen={setSidebarOpen} />

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
                                    {children}
                                </main>
                            </div>
                        </div>
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
};

export default DashboardLayout;
