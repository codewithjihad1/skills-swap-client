import AddSkillComponent from "@/components/skills/AddSkill";
import { Button } from "@/components/ui";
import UserDropDown from "@/components/user/UserDropDown";
import { Bell, PlusCircle, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const DesktopHeader = () => {
    const { data: session, status } = useSession();

    // Show loading state while session is being fetched
    if (status === "loading" && !session) {
        return <div>Loading...</div>;
    }

    return (
        <header className="hidden lg:block bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex-1 max-w-lg">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search skills, users, or conversations..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <AddSkillComponent />
                    <Button variant="ghost" size="sm" className="relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                            5
                        </span>
                    </Button>
                    <UserDropDown />
                </div>
            </div>
        </header>
    );
};

export default DesktopHeader;
