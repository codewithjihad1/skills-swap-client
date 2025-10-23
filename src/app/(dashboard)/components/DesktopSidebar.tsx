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

    const userRole = session?.user?.role || "user";

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
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
            <div className="flex flex-col flex-grow bg-card border-r border-border pt-5 pb-4 overflow-y-auto shadow-lg">
                {/* Logo */}
                <div className="flex items-center justify-center px-4 mb-8">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-l from-primary to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-xl text-foreground">
                                SkillSwap
                            </h1>
                            <p className="text-xs text-muted-foreground">
                                Marketplace
                            </p>
                        </div>
                    </Link>
                </div>

                {/* User Profile Summary */}
                <div className="px-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-primary/10 via-accent/20 to-secondary/10 rounded-lg border border-primary/20 shadow-sm hover:shadow-md transition-all duration-200">
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
                <nav className="px-3 space-y-1 flex-1">
                    {navigationItems.map((item: any) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                                    active
                                        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30 scale-105"
                                        : "text-foreground/70 hover:bg-accent hover:text-foreground hover:shadow-sm"
                                }`}
                            >
                                <Icon
                                    className={`mr-3 h-5 w-5 transition-all duration-200 ${
                                        active
                                            ? "text-white"
                                            : "text-muted-foreground group-hover:text-primary"
                                    }`}
                                />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Quick Actions */}
                <div className="px-4 mt-6">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
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
                                            <div className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors">
                                                <Icon
                                                    className={`w-4 h-4 text-primary`}
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
                                    className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors"
                                >
                                    <Icon className={`w-4 h-4 text-primary`} />
                                    <span>{action.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="px-4 mt-auto pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 justify-start hover:bg-accent hover:text-foreground"
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
