import { ModeToggle } from "@/components/theme/toggle-theme";
import { Button } from "@/components/ui";
import { Bell, BookOpen, Menu } from "lucide-react";
import Link from "next/link";
import React from "react";

const MobileHeader = ({ setSidebarOpen }: any) => {
    return (
        <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                        <Bell className="w-5 h-5" />
                    </Button>
                    <ModeToggle />
                </div>
            </div>
        </div>
    );
};

export default MobileHeader;
