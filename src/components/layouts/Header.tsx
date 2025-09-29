"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { ModeToggle } from "../theme/toggle-theme";
import { Button } from "@/components/ui/button";

interface User {
    id: string;
    name: string;
    avatar?: string;
    isLoggedIn: boolean;
}

interface HeaderProps {
    user?: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
    const { data: session } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    const navigation = [
        { name: "Home", href: "/" },
        { name: "Explore Skills", href: "/explore-skills" },
        { name: "Post A Skill", href: "/post-skill" },
        { name: "Matchmaking", href: "/matchmaking" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const isActiveLink = (href: string) => pathname === href;

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

    if (!mounted) {
        return (
            <header className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-slate-700">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-l from-primary to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                    S
                                </span>
                            </div>
                            <span className="hidden lg:block text-xl font-bold text-gray-900 dark:text-gray-100">
                                SkillShare Hub
                            </span>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }

    return (
        <header className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-slate-700">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 group"
                        >
                            <div className="w-8 h-8 bg-gradient-to-l from-primary to-purple-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors duration-200">
                                <span className="text-white font-bold text-lg">
                                    S
                                </span>
                            </div>
                            <span className="hidden md:block text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                SkillShare Hub
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                    isActiveLink(item.href)
                                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-800"
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Theme Toggle and User Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <ModeToggle />

                        {/* User Section */}
                        {session?.user ? (
                            <div className="relative">
                                <button
                                    onClick={toggleUserDropdown}
                                    className="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 p-1 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
                                >
                                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center border-2 border-transparent hover:border-blue-500/50 transition-all duration-200">
                                        {session.user?.image ? (
                                            <Image
                                                src={session.user.image}
                                                alt="Profile"
                                                className="w-8 h-8 rounded-full object-cover"
                                                width={32}
                                                height={32}
                                            />
                                        ) : (
                                            <span className="text-gray-600 dark:text-gray-300 font-medium">
                                                {session.user?.name
                                                    ?.charAt(0)
                                                    .toUpperCase() || "U"}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                                        {session.user?.name}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                                            isUserDropdownOpen
                                                ? "rotate-180"
                                                : ""
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
                                            onClick={() =>
                                                setIsUserDropdownOpen(false)
                                            }
                                        >
                                            <span className="mr-3">👤</span>
                                            My Profile
                                        </Link>
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                                            onClick={() =>
                                                setIsUserDropdownOpen(false)
                                            }
                                        >
                                            <span className="mr-3">📊</span>
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/settings"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                                            onClick={() =>
                                                setIsUserDropdownOpen(false)
                                            }
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
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Button variant="ghost" asChild>
                                    <Link href="/auth/signin">Sign In</Link>
                                </Button>
                                <Button variant="gradient" asChild>
                                    <Link href="/auth/signup">Get Started</Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 dark:bg-slate-800/50 backdrop-blur-sm border-t border-gray-200 dark:border-slate-700">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                                        isActiveLink(item.href)
                                            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                                            : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            {/* Mobile User Actions */}
                            <div className="pt-4 border-t border-gray-200 dark:border-slate-600">
                                {session?.user ? (
                                    <>
                                        <div className="flex items-center px-3 py-2 mb-2">
                                            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center mr-3 border-2 border-blue-500/20">
                                                {session.user?.image ? (
                                                    <Image
                                                        src={session.user.image}
                                                        alt="Profile"
                                                        className="w-8 h-8 rounded-full object-cover"
                                                        width={32}
                                                        height={32}
                                                    />
                                                ) : (
                                                    <span className="text-gray-600 dark:text-gray-300 font-medium">
                                                        {session.user?.name
                                                            ?.charAt(0)
                                                            .toUpperCase() ||
                                                            "U"}
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                                                {session.user?.name}
                                            </span>
                                        </div>
                                        <Link
                                            href="/profile"
                                            className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 rounded-md mx-2"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            <span className="mr-3">👤</span>
                                            My Profile
                                        </Link>
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 rounded-md mx-2"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            <span className="mr-3">📊</span>
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={() => {
                                                signOut();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="flex items-center w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 rounded-md mx-2"
                                        >
                                            <span className="mr-3">🚪</span>
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            variant="ghost"
                                            className="w-full mx-2"
                                            asChild
                                        >
                                            <Link
                                                href="/auth/signin"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                Sign In
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="gradient"
                                            className="w-full mx-2 mt-2"
                                            asChild
                                        >
                                            <Link
                                                href="/auth/signup"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                Get Started
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
