"use client";

import AddSkillComponent from "@/components/skills/AddSkill";
import { ModeToggle } from "@/components/theme/toggle-theme";
import { Button } from "@/components/ui";
import { BookOpen, Settings, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DesktopSidebar = ({ navigationItems, quickActions, isActive }: any) => {
    const { data: session } = useSession();

    if (!session) {
        return null;
    }

    return (
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
            <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 pt-5 pb-4 overflow-y-auto">
                {/* Logo */}
                <div className="flex items-center justify-center px-4 mb-8">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-xl flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-xl text-gray-900 dark:text-white">
                                SkillSwap
                            </h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Marketplace
                            </p>
                        </div>
                    </Link>
                </div>

                {/* User Profile Summary */}
                <div className="px-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-purple-600/5 dark:from-primary/10 dark:to-purple-600/10 rounded-lg border border-primary/20">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-600">
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
                <nav className="px-3 space-y-1 flex-1">
                    {navigationItems.map((item: any) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                    active
                                        ? "bg-primary text-white shadow-lg"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                                }`}
                            >
                                <Icon
                                    className={`mr-3 h-5 w-5 ${
                                        active
                                            ? "text-white"
                                            : "text-gray-400 group-hover:text-gray-500"
                                    }`}
                                />
                                <span>{item.name}</span>
                                {/* {item.name === "Messages" && (
                                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        3
                                    </span>
                                )}
                                {item.name === "Requests" && (
                                    <span className="ml-auto bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        2
                                    </span>
                                )} */}
                            </Link>
                        );
                    })}
                </nav>

                {/* Quick Actions */}
                <div className="px-4 mt-6">
                    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                        Quick Actions
                    </p>
                    <div className="space-y-2">
                        {quickActions.map((action: any) => {
                            const Icon = action.icon;
                            if (action.name === "Add Skill") {
                                return (
                                    <AddSkillComponent
                                        key={action.href}
                                        addSkillBtnContent={
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                                <Icon
                                                    className={`w-4 h-4 ${action.color}`}
                                                />
                                                <span>{action.name}</span>
                                            </div>
                                        }
                                    />
                                );
                            }
                            return (
                                <Link
                                    key={action.href}
                                    href={action.href}
                                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    <Icon
                                        className={`w-4 h-4 ${action.color}`}
                                    />
                                    <span>{action.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="px-4 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 justify-start"
                            asChild
                        >
                            <Link href="/dashboard/settings">
                                <Settings className="w-4 h-4 mr-2" />
                                Settings
                            </Link>
                        </Button>
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopSidebar;
