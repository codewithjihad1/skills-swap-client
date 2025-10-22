import { Button } from "@/components/ui";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, LogOut, Settings, Star, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MobileSidebar = ({
    sidebarOpen,
    closeSidebar,
    navigationItems,
    isActive,
}: any) => {
    const { data: session } = useSession();

    if (!session) {
        return null;
    }

    const userRole = (session?.user as any)?.role || "user";

    const getRoleBadge = () => {
        switch (userRole) {
            case "admin":
                return (
                    <span className="text-xs px-2 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/20 font-semibold">
                        Admin
                    </span>
                );
            case "instructor":
                return (
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20 font-semibold">
                        Instructor
                    </span>
                );
            default:
                return (
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">
                        User
                    </span>
                );
        }
    };
    return (
        <AnimatePresence>
            {sidebarOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                        onClick={closeSidebar}
                    />

                    {/* Mobile Sidebar */}
                    <motion.div
                        initial={{ x: -320 }}
                        animate={{ x: 0 }}
                        exit={{ x: -320 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300,
                        }}
                        className="lg:hidden fixed inset-y-0 left-0 z-50 w-80 bg-card shadow-2xl"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-border">
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-3"
                                    onClick={closeSidebar}
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-primary via-secondary to-primary rounded-lg flex items-center justify-center shadow-md">
                                        <BookOpen className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="font-bold text-lg text-foreground">
                                            SkillSwap
                                        </h1>
                                        <p className="text-xs text-muted-foreground">
                                            Marketplace
                                        </p>
                                    </div>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={closeSidebar}
                                    className="hover:bg-accent"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* User Profile Summary */}
                            <div className="px-4 mb-6 mt-4">
                                <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-primary/10 via-accent/20 to-secondary/10 rounded-lg border border-primary/20 shadow-sm">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-muted ring-2 ring-primary/20">
                                            <Image
                                                src={
                                                    session?.user?.image ||
                                                    "/default-avatar.png"
                                                }
                                                alt="Profile"
                                                width={40}
                                                height={40}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-card"></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate">
                                            {session?.user?.name}
                                        </p>
                                        <div className="flex items-center gap-1 mt-1">
                                            {getRoleBadge()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                                {navigationItems.map((item: any) => {
                                    const Icon = item.icon;
                                    const active = isActive(item.href);

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={closeSidebar}
                                            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                                                active
                                                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                                                    : "text-foreground/70 hover:bg-accent hover:text-foreground"
                                            }`}
                                        >
                                            <Icon
                                                className={`mr-3 h-5 w-5 ${
                                                    active
                                                        ? "text-white"
                                                        : "text-muted-foreground"
                                                }`}
                                            />
                                            <div className="flex-1">
                                                <div>{item.name}</div>
                                                <div className="text-xs opacity-75">
                                                    {item.description}
                                                </div>
                                            </div>
                                            {item.name === "Messages" && (
                                                <span className="bg-destructive text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                    3
                                                </span>
                                            )}
                                            {item.name === "Requests" && (
                                                <span className="bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                    2
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Bottom Actions */}
                            <div className="p-4 border-t border-border">
                                <div className="space-y-2">
                                    <Link
                                        href="/dashboard/settings"
                                        onClick={closeSidebar}
                                        className="flex items-center gap-3 px-3 py-2 text-sm text-foreground/70 hover:bg-accent hover:text-foreground rounded-lg transition-colors"
                                    >
                                        <Settings className="w-5 h-5" />
                                        Settings
                                    </Link>
                                    <button className="flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors w-full">
                                        <LogOut className="w-5 h-5" />
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileSidebar;
