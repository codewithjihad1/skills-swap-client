"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "../theme/toggle-theme";
import { GlowEffect, FloatingElement } from "../ui/animations";

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
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    const navigation = [
        { name: "Home", href: "/", icon: "🏠" },
        { name: "Explore", href: "/explore-skills", icon: "🔍" },
        { name: "Post Skill", href: "/post-skill", icon: "✨" },
        { name: "Match", href: "/matchmaking", icon: "💝" },
        { name: "About", href: "/about", icon: "ℹ️" },
        { name: "Contact", href: "/contact", icon: "📞" },
    ];

    // Handle scroll effect for header background
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActiveLink = (href: string) => pathname === href;

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`sticky top-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-xl"
                    : "bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-b border-gray-200/30 dark:border-gray-700/30 shadow-lg"
            }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <motion.div
                        className="flex items-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                        }}
                    >
                        <Link
                            href="/"
                            className="flex items-center space-x-3 group"
                        >
                            <motion.div
                                className="relative w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <motion.span
                                    className="text-white font-bold text-xl"
                                    initial={{ scale: 1 }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    S
                                </motion.span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-xl opacity-0 group-hover:opacity-20"
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                            <div className="hidden md:block">
                                <motion.span
                                    className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-blue-500 transition-all duration-300"
                                    whileHover={{ y: -2 }}
                                >
                                    SkillSwap Hub
                                </motion.span>
                                <motion.p
                                    className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-300"
                                    initial={{ opacity: 0.7 }}
                                    whileHover={{ opacity: 1 }}
                                >
                                    Connect • Learn • Grow
                                </motion.p>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navigation.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -2 }}
                            >
                                <Link
                                    href={item.href}
                                    className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                                        isActiveLink(item.href)
                                            ? "text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25"
                                            : "text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500"
                                    }`}
                                >
                                    <span className="text-base">
                                        {item.icon}
                                    </span>
                                    <span>{item.name}</span>
                                    {!isActiveLink(item.href) && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100"
                                            initial={{ scale: 0.8 }}
                                            whileHover={{ scale: 1 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <FloatingElement delay={0.5}>
                            <GlowEffect intensity="medium">
                                <ModeToggle />
                            </GlowEffect>
                        </FloatingElement>

                        {/* User Section */}
                        <div className="hidden md:flex items-center space-x-3">
                            {session?.user ? (
                                <div className="relative">
                                    <motion.button
                                        onClick={toggleUserDropdown}
                                        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 group backdrop-blur-sm border border-white/20 dark:border-gray-700/50"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <motion.div
                                            className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all duration-300"
                                            whileHover={{ rotate: 5 }}
                                        >
                                            {session.user?.image ? (
                                                <Image
                                                    src={session.user.image}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                    width={40}
                                                    height={40}
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                                                    {session.user?.name
                                                        ?.charAt(0)
                                                        .toUpperCase() || "U"}
                                                </div>
                                            )}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100"
                                                initial={{ scale: 0 }}
                                                whileHover={{ scale: 1 }}
                                            />
                                        </motion.div>
                                        <div className="hidden lg:block text-left">
                                            <motion.p
                                                className="text-sm font-semibold text-gray-900 dark:text-white"
                                                whileHover={{ x: 2 }}
                                            >
                                                {session.user?.name}
                                            </motion.p>
                                            <motion.p
                                                className="text-xs text-gray-500 dark:text-gray-400"
                                                whileHover={{ x: 2 }}
                                            >
                                                Online
                                            </motion.p>
                                        </div>
                                        <motion.svg
                                            className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                                                isUserDropdownOpen
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            animate={{
                                                rotate: isUserDropdownOpen
                                                    ? 180
                                                    : 0,
                                            }}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </motion.svg>
                                    </motion.button>

                                    {/* Enhanced User Dropdown */}
                                    <AnimatePresence>
                                        {isUserDropdownOpen && (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    y: -20,
                                                    scale: 0.95,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                    scale: 1,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    y: -20,
                                                    scale: 0.95,
                                                }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 mt-3 w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 py-2 z-50 overflow-hidden"
                                            >
                                                {/* Profile Header */}
                                                <div className="px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-purple-500/30">
                                                            {session.user
                                                                ?.image ? (
                                                                <Image
                                                                    src={
                                                                        session
                                                                            .user
                                                                            .image
                                                                    }
                                                                    alt="Profile"
                                                                    className="w-full h-full object-cover"
                                                                    width={48}
                                                                    height={48}
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                                                                    {session.user?.name
                                                                        ?.charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase() ||
                                                                        "U"}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                                {
                                                                    session.user
                                                                        ?.name
                                                                }
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                {
                                                                    session.user
                                                                        ?.email
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Menu Items */}
                                                <div className="py-2">
                                                    {[
                                                        {
                                                            href: "/profile",
                                                            icon: "👤",
                                                            label: "My Profile",
                                                        },
                                                        {
                                                            href: "/dashboard",
                                                            icon: "📊",
                                                            label: "Dashboard",
                                                        },
                                                        {
                                                            href: "/settings",
                                                            icon: "⚙️",
                                                            label: "Settings",
                                                        },
                                                    ].map((item) => (
                                                        <motion.div
                                                            key={item.href}
                                                            whileHover={{
                                                                x: 4,
                                                            }}
                                                            transition={{
                                                                type: "spring",
                                                                stiffness: 300,
                                                                damping: 25,
                                                            }}
                                                        >
                                                            <Link
                                                                href={item.href}
                                                                className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200"
                                                                onClick={() =>
                                                                    setIsUserDropdownOpen(
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                <span className="mr-3 text-lg">
                                                                    {item.icon}
                                                                </span>
                                                                {item.label}
                                                            </Link>
                                                        </motion.div>
                                                    ))}

                                                    <hr className="my-2 border-gray-200/50 dark:border-gray-600/50" />

                                                    <motion.div
                                                        whileHover={{ x: 4 }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 300,
                                                            damping: 25,
                                                        }}
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                signOut()
                                                            }
                                                            className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                                                        >
                                                            <span className="mr-3 text-lg">
                                                                🚪
                                                            </span>
                                                            Sign Out
                                                        </button>
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link
                                            href="/auth/signin"
                                            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 backdrop-blur-sm"
                                        >
                                            Sign In
                                        </Link>
                                    </motion.div>
                                    <GlowEffect intensity="high">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Link
                                                href="/auth/signup"
                                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
                                            >
                                                ✨ Get Started
                                            </Link>
                                        </motion.div>
                                    </GlowEffect>
                                </div>
                            )}
                        </div>

                        {/* Enhanced Mobile menu button */}
                        <div className="md:hidden">
                            <motion.button
                                onClick={toggleMobileMenu}
                                className="relative p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 backdrop-blur-sm border border-white/20 dark:border-gray-700/50"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    animate={
                                        isMobileMenuOpen ? "open" : "closed"
                                    }
                                    variants={{
                                        open: { rotate: 180 },
                                        closed: { rotate: 0 },
                                    }}
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
                                </motion.svg>
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Enhanced Mobile Navigation Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden overflow-hidden"
                        >
                            <motion.div
                                className="px-4 pt-4 pb-6 space-y-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 shadow-xl"
                                initial={{ y: -20 }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                {/* Mobile Navigation Links */}
                                {navigation.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ x: 4 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                                                isActiveLink(item.href)
                                                    ? "text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25"
                                                    : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20"
                                            }`}
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            <span className="text-xl">
                                                {item.icon}
                                            </span>
                                            <span>{item.name}</span>
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* Mobile User Section */}
                                <div className="pt-4 border-t border-gray-200/50 dark:border-gray-600/50">
                                    {session?.user ? (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {/* Mobile User Profile */}
                                            <div className="flex items-center px-4 py-3 mb-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                                                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-purple-500/30 mr-3">
                                                    {session.user?.image ? (
                                                        <Image
                                                            src={
                                                                session.user
                                                                    .image
                                                            }
                                                            alt="Profile"
                                                            className="w-full h-full object-cover"
                                                            width={48}
                                                            height={48}
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                                                            {session.user?.name
                                                                ?.charAt(0)
                                                                .toUpperCase() ||
                                                                "U"}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-white">
                                                        {session.user?.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Online
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Mobile User Menu */}
                                            {[
                                                {
                                                    href: "/profile",
                                                    icon: "👤",
                                                    label: "My Profile",
                                                },
                                                {
                                                    href: "/dashboard",
                                                    icon: "📊",
                                                    label: "Dashboard",
                                                },
                                                {
                                                    href: "/settings",
                                                    icon: "⚙️",
                                                    label: "Settings",
                                                },
                                            ].map((item, index) => (
                                                <motion.div
                                                    key={item.href}
                                                    initial={{
                                                        opacity: 0,
                                                        x: -20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        delay:
                                                            0.3 + index * 0.1,
                                                    }}
                                                    whileHover={{ x: 4 }}
                                                >
                                                    <Link
                                                        href={item.href}
                                                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 rounded-xl mx-2"
                                                        onClick={() =>
                                                            setIsMobileMenuOpen(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        <span className="text-lg">
                                                            {item.icon}
                                                        </span>
                                                        <span>
                                                            {item.label}
                                                        </span>
                                                    </Link>
                                                </motion.div>
                                            ))}

                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.6 }}
                                                whileHover={{ x: 4 }}
                                            >
                                                <button
                                                    onClick={() => signOut()}
                                                    className="flex items-center space-x-3 w-full text-left px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 rounded-xl mx-2"
                                                >
                                                    <span className="text-lg">
                                                        🚪
                                                    </span>
                                                    <span>Sign Out</span>
                                                </button>
                                            </motion.div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            className="space-y-3"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <Link
                                                href="/auth/signin"
                                                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 rounded-xl text-center"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                Sign In
                                            </Link>
                                            <Link
                                                href="/auth/signup"
                                                className="block px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 rounded-xl text-center font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-200"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                ✨ Get Started
                                            </Link>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
};

export default Header;
