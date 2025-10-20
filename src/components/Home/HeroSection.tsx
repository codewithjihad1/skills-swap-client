"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    ArrowRight,
    BookOpen,
    Users,
    Star,
    Sparkles,
    PlayCircle,
} from "lucide-react";

const HeroSection = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1] as const,
            },
        },
    };

    const floatVariants = {
        initial: { y: 0 },
        animate: {
            y: [-10, 10, -10],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: [0.42, 0, 0.58, 1] as const,
            },
        },
    };

    const pulseVariants = {
        initial: { scale: 1 },
        animate: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: [0.42, 0, 0.58, 1] as const,
            },
        },
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent/10 via-white to-primary/5 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gradient Orbs */}
                <motion.div
                    className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: [0.42, 0, 0.58, 1] as const,
                    }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: [0.42, 0, 0.58, 1] as const,
                        delay: 1,
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                {/* Floating Icons */}
                <motion.div
                    className="absolute top-20 left-[10%] text-primary/20"
                    variants={floatVariants}
                    initial="initial"
                    animate="animate"
                >
                    <BookOpen className="w-16 h-16" />
                </motion.div>
                <motion.div
                    className="absolute top-40 right-[15%] text-secondary/20"
                    variants={floatVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 1 }}
                >
                    <Users className="w-20 h-20" />
                </motion.div>
                <motion.div
                    className="absolute bottom-32 left-[15%] text-accent/30"
                    variants={floatVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 2 }}
                >
                    <Star className="w-12 h-12" />
                </motion.div>
            </div>

            {/* Main Content */}
            <motion.div
                className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
                        >
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">
                                Bangladesh&apos;s #1 Skills Learning Platform
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.div
                            variants={itemVariants}
                            className="space-y-4"
                        >
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
                                Master New{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary animate-gradient">
                                    Skills
                                </span>
                                <br />
                                Shape Your {" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
                                    Future
                                </span>
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                                Join thousands of Bangladeshi learners and
                                instructors in the fastest-growing skill-sharing
                                community. Learn from industry experts and
                                unlock your potential today.
                            </p>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-4"
                        >
                            <Link href="/courses">
                                <Button
                                    size="lg"
                                    className="h-14 px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all group"
                                >
                                    Explore Courses
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/auth/signup?role=instructor">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-14 px-8 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold transition-all group"
                                >
                                    <PlayCircle className="mr-2 w-5 h-5" />
                                    Become Instructor
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Side - Hero Image/Illustration */}
                    <motion.div
                        variants={itemVariants}
                        className="relative hidden lg:block"
                    >
                        {/* Main Card with 3D effect */}
                        <motion.div
                            className="relative"
                            variants={pulseVariants}
                            initial="initial"
                            animate="animate"
                        >
                            {/* Decorative Cards Stack */}
                            <div className="relative w-full h-[600px]">
                                {/* Back Card */}
                                <motion.div
                                    className="absolute top-8 right-0 w-80 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl backdrop-blur-sm border border-primary/30 shadow-2xl"
                                    animate={{
                                        rotate: [0, 5, 0],
                                        x: [0, 20, 0],
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />

                                {/* Middle Card */}
                                <motion.div
                                    className="absolute top-16 left-8 w-80 h-96 bg-gradient-to-br from-accent/30 to-primary/30 rounded-3xl backdrop-blur-sm border border-accent/40 shadow-2xl"
                                    animate={{
                                        rotate: [0, -3, 0],
                                        y: [0, -15, 0],
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.5,
                                    }}
                                />

                                {/* Front Card - Main Content */}
                                <motion.div
                                    className="absolute top-24 left-16 w-80 h-96 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 p-8 overflow-hidden"
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    {/* Card Content */}
                                    <div className="space-y-6">
                                        {/* Profile Section */}
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
                                                A
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 dark:text-white">
                                                    Ahmed Rahman
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Web Development
                                                </p>
                                            </div>
                                        </div>

                                        {/* Progress */}
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600 dark:text-gray-400">
                                                    Course Progress
                                                </span>
                                                <span className="font-semibold text-primary">
                                                    75%
                                                </span>
                                            </div>
                                            <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-primary to-secondary"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "75%" }}
                                                    transition={{
                                                        duration: 2,
                                                        delay: 1,
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Skills Badges */}
                                        <div className="space-y-3">
                                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Skills Earned
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {[
                                                    "React",
                                                    "Node.js",
                                                    "MongoDB",
                                                    "Next.js",
                                                ].map((skill, index) => (
                                                    <motion.span
                                                        key={index}
                                                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{
                                                            delay:
                                                                1.5 +
                                                                index * 0.1,
                                                        }}
                                                    >
                                                        {skill}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Rating */}
                                        <div className="flex items-center gap-2 pt-4">
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                5.0 Rating
                                            </span>
                                        </div>
                                    </div>

                                    {/* Floating Achievement Badge */}
                                    <motion.div
                                        className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-xl"
                                        animate={{
                                            rotate: [0, 360],
                                            scale: [1, 1.1, 1],
                                        }}
                                        transition={{
                                            rotate: {
                                                duration: 10,
                                                repeat: Infinity,
                                                ease: "linear",
                                            },
                                            scale: {
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            },
                                        }}
                                    >
                                        <Star className="w-10 h-10 text-white fill-white" />
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default HeroSection;
