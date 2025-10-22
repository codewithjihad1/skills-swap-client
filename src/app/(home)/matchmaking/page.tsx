"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Sparkles,
    Users,
    MessageCircle,
    Calendar,
    Star,
    MapPin,
    TrendingUp,
    Zap,
    Target,
    CheckCircle2,
    ArrowRight,
    Loader2,
} from "lucide-react";

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
    bio: string;
    completedSwaps: number;
}

interface MatchStep {
    id: number;
    title: string;
    titleBengali: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

const sampleUsers: User[] = [
    {
        id: 1,
        name: "Md Jihad Hossain",
        avatar: "./jihad.jpg",
        skillOffered: "MERN Stack Development",
        skillWanted: "UI/UX Design",
        level: "Advanced",
        rating: 4.9,
        location: "Dhaka, Bangladesh",
        isOnline: true,
        bio: "Full-stack developer with 5+ years experience in MERN stack",
        completedSwaps: 23,
    },
    {
        id: 2,
        name: "Raj Kumar",
        avatar: "./Raj.jpg",
        skillOffered: "UI/UX Design",
        skillWanted: "React Development",
        level: "Advanced",
        rating: 4.8,
        location: "Chittagong, Bangladesh",
        isOnline: true,
        bio: "Product designer specializing in user-centered design",
        completedSwaps: 19,
    },
    {
        id: 3,
        name: "Sourav",
        avatar: "./shourav.jpg",
        skillOffered: "Digital Marketing",
        skillWanted: "Video Editing",
        level: "Intermediate",
        rating: 4.7,
        location: "Khulna, Bangladesh",
        isOnline: true,
        bio: "Marketing expert helping businesses grow online",
        completedSwaps: 15,
    },
    {
        id: 4,
        name: "Ihsan",
        avatar: "./ishan.jpeg",
        skillOffered: "Python & Data Science",
        skillWanted: "Machine Learning",
        level: "Intermediate",
        rating: 4.9,
        location: "Sylhet, Bangladesh",
        isOnline: true,
        bio: "Data analyst passionate about AI and machine learning",
        completedSwaps: 12,
    },
];

const matchSteps: MatchStep[] = [
    {
        id: 1,
        title: "Share Your Skills",
        titleBengali: "আপনার দক্ষতা শেয়ার করুন",
        description: "Tell us what you can teach and what you want to learn",
        icon: <Target className="w-6 h-6" />,
        color: "from-[#21BF73] to-[#007a3f]",
    },
    {
        id: 2,
        title: "Smart Matching",
        titleBengali: "স্মার্ট ম্যাচিং",
        description:
            "Our AI finds perfect skill-swap partners based on compatibility",
        icon: <Sparkles className="w-6 h-6" />,
        color: "from-[#007a3f] to-[#21BF73]",
    },
    {
        id: 3,
        title: "Connect & Chat",
        titleBengali: "সংযোগ ও চ্যাট করুন",
        description:
            "Review profiles and start conversations with potential partners",
        icon: <MessageCircle className="w-6 h-6" />,
        color: "from-[#B0EACD] to-[#21BF73]",
    },
    {
        id: 4,
        title: "Learn Together",
        titleBengali: "একসাথে শিখুন",
        description: "Schedule sessions and exchange knowledge in real-time",
        icon: <TrendingUp className="w-6 h-6" />,
        color: "from-[#21BF73] to-[#B0EACD]",
    },
];

const Matchmaking = () => {
    const { data: session, status } = useSession();
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

    // User session is available
    if (status === "loading" && !session) {
        return <div>Loading...</div>;
    }

    return (
        <section className="relative min-h-screen bg-gradient-to-br from-white via-[#B0EACD]/10 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-20 w-72 h-72 bg-[#21BF73]/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#007a3f]/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#B0EACD]/30 rounded-full blur-3xl animate-pulse delay-500" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header Section */}
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants} className="mb-6">
                        <Badge
                            variant="outline"
                            className="px-4 py-2 bg-gradient-to-r from-[#21BF73] to-[#007a3f] text-white border-none"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            AI-Powered Skill Matching
                        </Badge>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                        variants={itemVariants}
                    >
                        <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                            Find Your Perfect{" "}
                        </span>
                        <span className="bg-gradient-to-r from-[#21BF73] to-[#007a3f] bg-clip-text text-transparent">
                            Skill Partner
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8"
                        variants={itemVariants}
                    >
                        Connect with learners across Bangladesh who want to
                        exchange skills. Our smart matching algorithm pairs you
                        with the perfect partners based on your goals and
                        expertise.
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap justify-center gap-6 mb-8"
                    >
                        <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md">
                            <Users className="w-5 h-5 text-[#21BF73]" />
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                10,000+ Active Learners
                            </span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md">
                            <Zap className="w-5 h-5 text-[#21BF73]" />
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                5,000+ Successful Matches
                            </span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md">
                            <Star className="w-5 h-5 text-[#21BF73]" />
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                4.9/5 Average Rating
                            </span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* How It Works Steps */}
                <motion.div
                    className="mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <motion.div
                        className="text-center mb-12"
                        variants={itemVariants}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            How It Works
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {matchSteps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                variants={cardVariants}
                                whileHover="hover"
                            >
                                <Card
                                    className={`relative overflow-hidden h-full transition-all duration-300 ${
                                        currentStep === index
                                            ? "ring-2 ring-[#21BF73] shadow-xl shadow-[#21BF73]/20"
                                            : "hover:shadow-lg"
                                    }`}
                                >
                                    {/* Step Number Badge */}
                                    <div className="absolute -top-2 -right-2">
                                        <div
                                            className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold shadow-lg`}
                                        >
                                            {step.id}
                                        </div>
                                    </div>

                                    <CardContent className="p-6">
                                        {/* Icon */}
                                        <motion.div
                                            className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${step.color} mb-4 text-white`}
                                            animate={
                                                currentStep === index
                                                    ? {
                                                          scale: [1, 1.1, 1],
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

                                        {/* English Title */}
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                                            {step.title}
                                        </h4>

                                        {/* Description */}
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {step.description}
                                        </p>

                                        {/* Progress Bar */}
                                        <div className="mt-4 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <motion.div
                                                className={`h-full bg-gradient-to-r ${step.color} rounded-full`}
                                                initial={{ width: "0%" }}
                                                animate={{
                                                    width:
                                                        currentStep === index
                                                            ? "100%"
                                                            : "0%",
                                                }}
                                                transition={{ duration: 4 }}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Interactive Demo */}
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* User Profile Demo */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.div
                            className="flex items-center gap-3 mb-6"
                            variants={itemVariants}
                        >
                            <div className="w-1 h-8 bg-gradient-to-b from-[#21BF73] to-[#007a3f] rounded-full" />
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    Your Profile
                                </h3>
                            </div>
                        </motion.div>

                        <motion.div variants={cardVariants} whileHover="hover">
                            <Card className="overflow-hidden border-2 hover:border-[#21BF73]/50 transition-all duration-300">
                                <CardContent className="p-6">
                                    {/* Profile Header */}
                                    <div className="flex items-start gap-4 mb-6">
                                        <Avatar className="w-20 h-20 border-4 border-[#21BF73]/20">
                                            <AvatarImage
                                                src={session?.user?.image || ""}
                                                alt={
                                                    session?.user?.name ||
                                                    "User"
                                                }
                                            />
                                            <AvatarFallback className="bg-gradient-to-br from-[#21BF73] to-[#007a3f] text-white text-2xl">
                                                {session?.user?.name?.charAt(
                                                    0
                                                ) || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                                                {session?.user?.name ||
                                                    "Unknown User"}
                                            </h4>
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                                                <MapPin className="w-4 h-4" />
                                                <span className="text-sm">
                                                    {session?.user?.location ||
                                                        "Dhaka, Bangladesh"}
                                                </span>
                                            </div>
                                            {/* Rating */}
                                            <div className="flex items-center gap-2">
                                                <div className="flex">
                                                    {[...Array(5)].map(
                                                        (_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-4 h-4 ${
                                                                    i < 4
                                                                        ? "fill-yellow-400 text-yellow-400"
                                                                        : "fill-gray-300 text-gray-300"
                                                                }`}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                    {session?.user?.rating ||
                                                        "4.8"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Skills Section */}
                                    <div className="space-y-3 mb-6">
                                        <div className="p-4 bg-gradient-to-r from-[#21BF73]/10 to-[#B0EACD]/10 rounded-xl border-2 border-[#21BF73]/30">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-8 h-8 rounded-lg bg-[#21BF73] flex items-center justify-center">
                                                    <TrendingUp className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="text-sm font-semibold text-[#007a3f] dark:text-[#B0EACD]">
                                                    I can teach
                                                </span>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className="bg-[#21BF73] text-white border-[#007a3f] font-medium"
                                            >
                                                {session?.user?.skillOffered ||
                                                    "MERN Stack Development"}
                                            </Badge>
                                        </div>

                                        <div className="p-4 bg-gradient-to-r from-[#007a3f]/10 to-[#21BF73]/10 rounded-xl border-2 border-[#007a3f]/30">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-8 h-8 rounded-lg bg-[#007a3f] flex items-center justify-center">
                                                    <Target className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="text-sm font-semibold text-[#007a3f] dark:text-[#B0EACD]">
                                                    I want to learn
                                                </span>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className="bg-[#007a3f] text-white border-[#21BF73] font-medium"
                                            >
                                                {session?.user?.skillWanted ||
                                                    "UI/UX Design"}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <Button
                                        className="w-full bg-gradient-to-r from-[#21BF73] to-[#007a3f] hover:from-[#007a3f] hover:to-[#21BF73] text-white"
                                        onClick={startMatching}
                                        disabled={isMatching}
                                    >
                                        {isMatching ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Finding Matches...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-4 h-4 mr-2" />
                                                Start Matching
                                            </>
                                        )}
                                    </Button>
                                </CardContent>
                            </Card>
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
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-8 bg-gradient-to-b from-[#21BF73] to-[#007a3f] rounded-full" />
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                        Perfect Matches
                                    </h3>
                                </div>
                            </div>
                            {isMatching && (
                                <Badge
                                    variant="outline"
                                    className="border-[#21BF73] text-[#007a3f] animate-pulse"
                                >
                                    <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                                    Matching...
                                </Badge>
                            )}
                        </motion.div>

                        <div className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {matches.map((user, index) => (
                                    <motion.div
                                        key={user.id}
                                        variants={matchCardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        layout
                                    >
                                        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-[#21BF73]/50">
                                            <CardContent className="p-5">
                                                {/* Header with Avatar and Action */}
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-start gap-3 flex-1">
                                                        <div className="relative">
                                                            <Avatar className="w-14 h-14 border-2 border-[#21BF73]/30">
                                                                <AvatarImage
                                                                    src={
                                                                        user.avatar
                                                                    }
                                                                    alt={
                                                                        user.name
                                                                    }
                                                                />
                                                                <AvatarFallback className="bg-gradient-to-br from-[#21BF73] to-[#007a3f] text-white">
                                                                    {user.name
                                                                        .split(
                                                                            " "
                                                                        )
                                                                        .map(
                                                                            (
                                                                                n
                                                                            ) =>
                                                                                n[0]
                                                                        )
                                                                        .join(
                                                                            ""
                                                                        )}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            {user.isOnline && (
                                                                <motion.div
                                                                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#21BF73] rounded-full border-2 border-white dark:border-gray-800"
                                                                    animate={{
                                                                        scale: [
                                                                            1,
                                                                            1.2,
                                                                            1,
                                                                        ],
                                                                    }}
                                                                    transition={{
                                                                        duration: 2,
                                                                        repeat: Infinity,
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                                                                {user.name}
                                                            </h4>
                                                            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
                                                                <MapPin className="w-3 h-3" />
                                                                <span className="text-xs">
                                                                    {
                                                                        user.location
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className="flex">
                                                                    {[
                                                                        ...Array(
                                                                            5
                                                                        ),
                                                                    ].map(
                                                                        (
                                                                            _,
                                                                            i
                                                                        ) => (
                                                                            <Star
                                                                                key={
                                                                                    i
                                                                                }
                                                                                className={`w-3 h-3 ${
                                                                                    i <
                                                                                    Math.floor(
                                                                                        user.rating
                                                                                    )
                                                                                        ? "fill-yellow-400 text-yellow-400"
                                                                                        : "fill-gray-300 text-gray-300"
                                                                                }`}
                                                                            />
                                                                        )
                                                                    )}
                                                                </div>
                                                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                                                    {
                                                                        user.rating
                                                                    }
                                                                </span>
                                                                <span className="text-xs text-gray-500">
                                                                    •
                                                                </span>
                                                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                                                    {
                                                                        user.completedSwaps
                                                                    }{" "}
                                                                    swaps
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        className="bg-gradient-to-r from-[#21BF73] to-[#007a3f] hover:from-[#007a3f] hover:to-[#21BF73] text-white"
                                                        onClick={() =>
                                                            handleConnect(user)
                                                        }
                                                    >
                                                        <Users className="w-3 h-3 mr-1" />
                                                        Connect
                                                    </Button>
                                                </div>

                                                {/* Bio */}
                                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                                    {user.bio}
                                                </p>

                                                {/* Skills Exchange */}
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Badge
                                                        variant="outline"
                                                        className="flex-1 justify-center bg-[#21BF73]/10 border-[#21BF73] text-[#007a3f] dark:text-[#B0EACD]"
                                                    >
                                                        <TrendingUp className="w-3 h-3 mr-1" />
                                                        {user.skillOffered}
                                                    </Badge>
                                                    <ArrowRight className="w-4 h-4 text-gray-400" />
                                                    <Badge
                                                        variant="outline"
                                                        className="flex-1 justify-center bg-[#007a3f]/10 border-[#007a3f] text-[#007a3f] dark:text-[#B0EACD]"
                                                    >
                                                        <Target className="w-3 h-3 mr-1" />
                                                        {user.skillWanted}
                                                    </Badge>
                                                </div>

                                                {/* Match Info */}
                                                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-gray-600 dark:text-gray-400">
                                                            Match Score:
                                                        </span>
                                                        <div className="flex gap-1">
                                                            {[...Array(5)].map(
                                                                (_, i) => (
                                                                    <motion.div
                                                                        key={i}
                                                                        className={`w-2 h-2 rounded-full ${
                                                                            i <
                                                                            4
                                                                                ? "bg-[#21BF73]"
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
                                                                                i *
                                                                                    0.1,
                                                                        }}
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                        <span className="text-xs font-bold text-[#21BF73]">
                                                            95%
                                                        </span>
                                                    </div>
                                                    <Badge
                                                        variant="outline"
                                                        className={`text-xs ${
                                                            user.level ===
                                                            "Advanced"
                                                                ? "bg-[#007a3f]/10 border-[#007a3f] text-[#007a3f]"
                                                                : user.level ===
                                                                  "Intermediate"
                                                                ? "bg-[#21BF73]/10 border-[#21BF73] text-[#21BF73]"
                                                                : "bg-[#B0EACD]/10 border-[#B0EACD] text-[#007a3f]"
                                                        }`}
                                                    >
                                                        {user.level}
                                                    </Badge>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {matches.length === 0 && !isMatching && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700">
                                        <CardContent className="p-12 text-center">
                                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#21BF73]/20 to-[#007a3f]/20 flex items-center justify-center">
                                                <Sparkles className="w-10 h-10 text-[#21BF73]" />
                                            </div>
                                            <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                                Ready to Find Your Match?
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                                Click the button to discover
                                                perfect learning partners
                                            </p>
                                            <Button
                                                size="lg"
                                                className="bg-gradient-to-r from-[#21BF73] to-[#007a3f] hover:from-[#007a3f] hover:to-[#21BF73] text-white"
                                                onClick={startMatching}
                                            >
                                                <Zap className="w-4 h-4 mr-2" />
                                                Start Matching
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Connection Success Modal */}
                <AnimatePresence>
                    {showConnectionDemo && selectedUser && (
                        <motion.div
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowConnectionDemo(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.8, y: 50, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                exit={{ scale: 0.8, y: 50, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Card className="max-w-md w-full overflow-hidden border-2 border-[#21BF73]">
                                    <CardContent className="p-8 text-center">
                                        {/* Success Icon */}
                                        <motion.div
                                            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#21BF73] to-[#007a3f] flex items-center justify-center"
                                            animate={{
                                                scale: [1, 1.1, 1],
                                                rotate: [0, 5, -5, 0],
                                            }}
                                            transition={{
                                                duration: 0.6,
                                                repeat: 1,
                                            }}
                                        >
                                            <CheckCircle2 className="w-10 h-10 text-white" />
                                        </motion.div>

                                        {/* Title */}
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                            Connection Sent! 🎉
                                        </h3>

                                        {/* User Info */}
                                        <div className="bg-gradient-to-r from-[#21BF73]/10 to-[#B0EACD]/10 rounded-xl p-4 mb-6">
                                            <div className="flex items-center gap-3 mb-3">
                                                <Avatar className="w-12 h-12 border-2 border-[#21BF73]">
                                                    <AvatarImage
                                                        src={
                                                            selectedUser.avatar
                                                        }
                                                        alt={selectedUser.name}
                                                    />
                                                    <AvatarFallback className="bg-gradient-to-br from-[#21BF73] to-[#007a3f] text-white">
                                                        {selectedUser.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="text-left flex-1">
                                                    <h4 className="font-bold text-gray-900 dark:text-gray-100">
                                                        {selectedUser.name}
                                                    </h4>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                                        {selectedUser.location}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                                Your skill swap request has been
                                                sent. You'll be notified when
                                                they respond!
                                            </p>
                                        </div>

                                        {/* Features */}
                                        <div className="grid grid-cols-3 gap-3 mb-6">
                                            <div className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg">
                                                <div className="w-10 h-10 rounded-full bg-[#21BF73]/20 flex items-center justify-center">
                                                    <Users className="w-5 h-5 text-[#21BF73]" />
                                                </div>
                                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                    Connect
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg">
                                                <div className="w-10 h-10 rounded-full bg-[#21BF73]/20 flex items-center justify-center">
                                                    <MessageCircle className="w-5 h-5 text-[#21BF73]" />
                                                </div>
                                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                    Chat
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg">
                                                <div className="w-10 h-10 rounded-full bg-[#21BF73]/20 flex items-center justify-center">
                                                    <Calendar className="w-5 h-5 text-[#21BF73]" />
                                                </div>
                                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                    Schedule
                                                </span>
                                            </div>
                                        </div>

                                        {/* Close Button */}
                                        <Button
                                            className="w-full bg-gradient-to-r from-[#21BF73] to-[#007a3f] hover:from-[#007a3f] hover:to-[#21BF73] text-white"
                                            onClick={() =>
                                                setShowConnectionDemo(false)
                                            }
                                        >
                                            <CheckCircle2 className="w-4 h-4 mr-2" />
                                            Got It!
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Matchmaking;
