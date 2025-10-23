import { ModeToggle } from "@/components/theme/toggle-theme";
import { Button } from "@/components/ui";
import { Bell, BookOpen, Menu } from "lucide-react";
import Link from "next/link";
import React from "react";

const MobileHeader = ({ setSidebarOpen }: any) => {
    return (
        <div className="lg:hidden bg-card border-b border-border px-4 py-3 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSidebarOpen(true)}
                        className="hover:bg-accent"
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary via-secondary to-primary rounded-lg flex items-center justify-center shadow-md">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-accent"
                    >
                        <Bell className="w-5 h-5" />
                    </Button>
                    <ModeToggle />
                </div>
            </div>
        </div>
    );
};

export default MobileHeader;
