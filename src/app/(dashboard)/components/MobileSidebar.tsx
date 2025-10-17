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


    return (
        <AnimatePresence>
            {sidebarOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lg:hidden fixed inset-0 z-40 bg-black/50"
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
                        className="lg:hidden fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 shadow-xl"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-3"
                                    onClick={closeSidebar}
                                >
                                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                                        <BookOpen className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="font-bold text-lg text-gray-900 dark:text-white">
                                            SkillSwap
                                        </h1>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Marketplace
                                        </p>
                                    </div>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={closeSidebar}
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* User Profile Summary */}
                            <div className="px-4 mb-6">
                                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-purple-600/5 dark:from-primary/10 dark:to-purple-600/10 rounded-lg border border-primary/20">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-600">
                                            <Image
                                                src={session?.user?.image || "/default-avatar.png"}
                                                alt="Profile"
                                                width={40}
                                                height={40}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                            {session?.user?.name}
                                        </p>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                            <span>4.8</span>
                                            <span>•</span>
                                            <span>450 credits</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="flex-1 px-4 py-4 space-y-2">
                                {navigationItems.map((item: any) => {
                                    const Icon = item.icon;
                                    const active = isActive(item.href);

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={closeSidebar}
                                            className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                                active
                                                    ? "bg-primary text-white"
                                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            }`}
                                        >
                                            <Icon
                                                className={`mr-3 h-5 w-5 ${
                                                    active
                                                        ? "text-white"
                                                        : "text-gray-400"
                                                }`}
                                            />
                                            <div className="flex-1">
                                                <div>{item.name}</div>
                                                <div className="text-xs opacity-75">
                                                    {item.description}
                                                </div>
                                            </div>
                                            {item.name === "Messages" && (
                                                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                    3
                                                </span>
                                            )}
                                            {item.name === "Requests" && (
                                                <span className="bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                    2
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Bottom Actions */}
                            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="space-y-2">
                                    <Link
                                        href="/dashboard/settings"
                                        onClick={closeSidebar}
                                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        <Settings className="w-5 h-5" />
                                        Settings
                                    </Link>
                                    <button className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors w-full">
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
