"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface User {
    id: number;
    name: string;
    avatar: string;
    skillOffered: string;
    skillWanted: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    rating: number;
    location: string;
    isOnline: boolean;
}

interface MatchStep {
    id: number;
    title: string;
    description: string;
    icon: string;
    color: string;
}

const sampleUsers: User[] = [
    {
        id: 1,
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        skillOffered: "React Development",
        skillWanted: "UI/UX Design",
        level: "Advanced",
        rating: 4.9,
        location: "San Francisco, CA",
        isOnline: true,
    },
    {
        id: 2,
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        skillOffered: "UI/UX Design",
        skillWanted: "React Development",
        level: "Intermediate",
        rating: 4.8,
        location: "New York, NY",
        isOnline: true,
    },
    {
        id: 3,
        name: "Mike Rodriguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        skillOffered: "Python",
        skillWanted: "DevOps",
        level: "Advanced",
        rating: 4.7,
        location: "Austin, TX",
        isOnline: false,
    },
    {
        id: 4,
        name: "Emily Davis",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        skillOffered: "DevOps",
        skillWanted: "Python",
        level: "Intermediate",
        rating: 4.9,
        location: "Seattle, WA",
        isOnline: true,
    },
];

const matchSteps: MatchStep[] = [
    {
        id: 1,
        title: "Share Your Skills",
        description: "Tell us what you can teach and what you want to learn",
        icon: "🎯",
        color: "from-blue-500 to-cyan-500",
    },
    {
        id: 2,
        title: "Smart Matching",
        description:
            "Our AI finds perfect skill-swap partners based on compatibility",
        icon: "🤖",
        color: "from-purple-500 to-pink-500",
    },
    {
        id: 3,
        title: "Connect & Chat",
        description:
            "Review profiles and start conversations with potential partners",
        icon: "💬",
        color: "from-green-500 to-emerald-500",
    },
    {
        id: 4,
        title: "Learn Together",
        description: "Schedule sessions and exchange knowledge in real-time",
        icon: "🚀",
        color: "from-orange-500 to-red-500",
    },
];

const Matchmaking = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [matches, setMatches] = useState<User[]>([]);
    const [isMatching, setIsMatching] = useState(false);
    const [showConnectionDemo, setShowConnectionDemo] = useState(false);

    // Auto-cycle through steps
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % matchSteps.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Simulate matching process
    const startMatching = () => {
        setIsMatching(true);
        setMatches([]);

        // Simulate API delay and progressive loading
        setTimeout(() => {
            setMatches([sampleUsers[1]]);
        }, 1000);

        setTimeout(() => {
            setMatches([sampleUsers[1], sampleUsers[3]]);
        }, 2000);

        setTimeout(() => {
            setMatches([sampleUsers[1], sampleUsers[3], sampleUsers[2]]);
            setIsMatching(false);
        }, 3000);
    };

    const handleConnect = (user: User) => {
        setSelectedUser(user);
        setShowConnectionDemo(true);
        setTimeout(() => setShowConnectionDemo(false), 3000);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
        visible: {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: { duration: 0.5 },
        },
        hover: {
            scale: 1.05,
            y: -10,
            transition: { duration: 0.3 },
        },
    };

    const matchCardVariants = {
        hidden: { opacity: 0, x: 50, scale: 0.8 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { duration: 0.6 },
        },
        exit: {
            opacity: 0,
            x: -50,
            scale: 0.8,
            transition: { duration: 0.3 },
        },
    };

    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <motion.div
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-purple-600 rounded-full mb-6"
                        variants={itemVariants}
                        whileHover={{
                            scale: 1.1,
                            rotate: 360,
                            transition: { duration: 0.8 },
                        }}
                    >
                        <svg
                            className="w-10 h-10 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </motion.div>

                    <motion.h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6"
                        variants={itemVariants}
                    >
                        Smart Skill Matchmaking
                    </motion.h2>

                    <motion.p
                        className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8"
                        variants={itemVariants}
                    >
                        Our AI-powered matching system connects you with the
                        perfect learning partners. Trade skills, share
                        knowledge, and grow together in our vibrant community.
                    </motion.p>
                </motion.div>

                {/* How It Works Steps */}
                <motion.div
                    className="mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <motion.h3
                        className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12"
                        variants={itemVariants}
                    >
                        How Skill Swapping Works
                    </motion.h3>

                    <div className="grid md:grid-cols-4 gap-8">
                        {matchSteps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                variants={cardVariants}
                                whileHover="hover"
                                className={`relative text-center p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 ${
                                    currentStep === index
                                        ? "ring-2 ring-primary ring-opacity-50"
                                        : ""
                                }`}
                            >
                                {/* Step Number */}
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div
                                        className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-sm`}
                                    >
                                        {step.id}
                                    </div>
                                </div>

                                {/* Icon */}
                                <motion.div
                                    className="text-4xl mb-4 mt-4"
                                    animate={
                                        currentStep === index
                                            ? {
                                                  scale: [1, 1.2, 1],
                                                  rotate: [0, 5, -5, 0],
                                              }
                                            : {}
                                    }
                                    transition={{
                                        duration: 0.6,
                                        repeat:
                                            currentStep === index
                                                ? Infinity
                                                : 0,
                                        repeatDelay: 2,
                                    }}
                                >
                                    {step.icon}
                                </motion.div>

                                {/* Content */}
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                    {step.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {step.description}
                                </p>

                                {/* Progress indicator */}
                                <motion.div
                                    className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                                    initial={{ width: 0 }}
                                    animate={{
                                        width:
                                            currentStep === index
                                                ? "100%"
                                                : "0%",
                                    }}
                                    transition={{ duration: 4 }}
                                >
                                    <div
                                        className={`h-full bg-gradient-to-r ${step.color} rounded-full`}
                                    />
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Interactive Demo */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* User Profile Demo */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.h3
                            className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"
                            variants={itemVariants}
                        >
                            Your Profile
                        </motion.h3>

                        <motion.div
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="flex items-center space-x-4 mb-6">
                                <motion.img
                                    src={sampleUsers[0].avatar}
                                    alt={sampleUsers[0].name}
                                    className="w-16 h-16 rounded-full border-4 border-primary/20"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                />
                                <div>
                                    <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                        {sampleUsers[0].name}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {sampleUsers[0].location}
                                    </p>
                                    <div className="flex items-center space-x-1">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <motion.svg
                                                    key={i}
                                                    className="w-4 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                    }}
                                                    transition={{
                                                        delay: i * 0.1,
                                                    }}
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </motion.svg>
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {sampleUsers[0].rating}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                                        🚀 I can teach:
                                    </span>
                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                                        {sampleUsers[0].skillOffered}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                        🎯 I want to learn:
                                    </span>
                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                                        {sampleUsers[0].skillWanted}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Matches Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.div
                            className="flex items-center justify-between mb-6"
                            variants={itemVariants}
                        >
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                Perfect Matches
                            </h3>
                            {isMatching && (
                                <motion.div
                                    className="flex items-center space-x-2 text-primary"
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                    }}
                                >
                                    <svg
                                        className="w-5 h-5 animate-spin"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                        />
                                    </svg>
                                    <span className="text-sm font-medium">
                                        Finding matches...
                                    </span>
                                </motion.div>
                            )}
                        </motion.div>

                        <div className="space-y-4">
                            <AnimatePresence>
                                {matches.map((user, index) => (
                                    <motion.div
                                        key={user.id}
                                        variants={matchCardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="relative">
                                                    <Image
                                                        src={user.avatar}
                                                        alt={user.name}
                                                        className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-600"
                                                        width={48}
                                                        height={48}
                                                    />
                                                    {user.isOnline && (
                                                        <motion.div
                                                            className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"
                                                            animate={{
                                                                scale: [
                                                                    1, 1.2, 1,
                                                                ],
                                                            }}
                                                            transition={{
                                                                duration: 2,
                                                                repeat: Infinity,
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                                        {user.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {user.location}
                                                    </p>
                                                </div>
                                            </div>

                                            <motion.button
                                                className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() =>
                                                    handleConnect(user)
                                                }
                                            >
                                                Connect
                                            </motion.button>
                                        </div>

                                        <div className="mt-3 flex items-center justify-between text-sm">
                                            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                                                Offers: {user.skillOffered}
                                            </span>
                                            <span className="text-gray-500 dark:text-gray-400">
                                                ↔️
                                            </span>
                                            <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full">
                                                Wants: {user.skillWanted}
                                            </span>
                                        </div>

                                        <div className="mt-3 flex items-center justify-between">
                                            <div className="flex items-center space-x-1">
                                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                                    Match:
                                                </span>
                                                <div className="flex">
                                                    {[...Array(5)].map(
                                                        (_, i) => (
                                                            <motion.div
                                                                key={i}
                                                                className={`w-2 h-2 rounded-full ${
                                                                    i < 4
                                                                        ? "bg-green-500"
                                                                        : "bg-gray-300 dark:bg-gray-600"
                                                                }`}
                                                                initial={{
                                                                    scale: 0,
                                                                }}
                                                                animate={{
                                                                    scale: 1,
                                                                }}
                                                                transition={{
                                                                    delay:
                                                                        index *
                                                                            0.3 +
                                                                        i * 0.1,
                                                                }}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                                                    95%
                                                </span>
                                            </div>

                                            <span
                                                className={`text-xs px-2 py-1 rounded-full ${
                                                    user.level === "Advanced"
                                                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                                        : user.level ===
                                                          "Intermediate"
                                                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                                                        : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                                }`}
                                            >
                                                {user.level}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {matches.length === 0 && !isMatching && (
                                <motion.div
                                    className="text-center py-8 text-gray-500 dark:text-gray-400"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="text-4xl mb-2">🔍</div>
                                    <p>
                                        Click "Start Matching Demo" to see
                                        potential matches!
                                    </p>

                                    <motion.button
                                        className="px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={startMatching}
                                    >
                                        Start Matching Demo
                                    </motion.button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Connection Success Modal */}
                <AnimatePresence>
                    {showConnectionDemo && selectedUser && (
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-4 text-center"
                                initial={{ scale: 0.8, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.8, y: 50 }}
                            >
                                <motion.div
                                    className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <svg
                                        className="w-8 h-8 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </motion.div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                    Connection Sent! 🎉
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Your skill swap request has been sent to{" "}
                                    {selectedUser.name}. You'll be notified when
                                    they respond!
                                </p>

                                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                    <span>🔄 Skill Exchange</span>
                                    <span>💬 Chat Available</span>
                                    <span>📅 Schedule Sessions</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Matchmaking;
