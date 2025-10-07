"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserDropDown = () => {
    const { data: session, status } = useSession();
    const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen((prev) => !prev);
    };

    // Show loading state while session is being fetched
    if (status === "loading" && !session) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative">
            <button
                onClick={toggleUserDropdown}
                className="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 p-1 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
            >
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center border-2 border-transparent hover:border-blue-500/50 transition-all duration-200">
                    {session?.user?.image ? (
                        <Image
                            src={session.user.image}
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover"
                            width={32}
                            height={32}
                        />
                    ) : (
                        <span className="text-gray-600 dark:text-gray-300 font-medium">
                            {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                        </span>
                    )}
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {session?.user?.name}
                </span>
                <svg
                    className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                        isUserDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {/* User Dropdown */}
            {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:shadow-slate-700/50 py-1 z-50 border border-gray-200 dark:border-slate-700">
                    <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                        onClick={() => setIsUserDropdownOpen(false)}
                    >
                        <span className="mr-3">👤</span>
                        My Profile
                    </Link>
                    <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                        onClick={() => setIsUserDropdownOpen(false)}
                    >
                        <span className="mr-3">📊</span>
                        Dashboard
                    </Link>
                    <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                        onClick={() => setIsUserDropdownOpen(false)}
                    >
                        <span className="mr-3">⚙️</span>
                        Settings
                    </Link>
                    <hr className="my-1 border-gray-200 dark:border-slate-600" />
                    <button
                        onClick={() => signOut()}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                    >
                        <span className="mr-3">🚪</span>
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserDropDown;
