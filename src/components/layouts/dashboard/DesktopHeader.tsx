import { Button } from "@/components/ui";
import { Bell, PlusCircle, Search } from "lucide-react";
import Image from "next/image";
import React from "react";

const DesktopHeader = () => {
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
                    <Button variant="gradient" size="sm">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        New Swap
                    </Button>
                    <Button variant="ghost" size="sm" className="relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                            5
                        </span>
                    </Button>
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-600">
                        <Image
                            src="/api/placeholder/32/32"
                            alt="Profile"
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DesktopHeader;
