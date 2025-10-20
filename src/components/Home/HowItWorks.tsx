"use client";

import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    BookOpen,
    GraduationCap,
    Users,
    Award,
    PlayCircle,
    X,
    Check,
    ArrowRight,
    Sparkles,
} from "lucide-react";

const HowItWorks = () => {
    const [showVideo, setShowVideo] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1] as const,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1] as const,
            },
        },
    };

    const services = [
        {
            icon: BookOpen,
            title: "Learn New Skills",
            desc: "Access a variety of courses and tutorials to level up your skills efficiently.",
            color: "primary",
            gradient: "from-primary to-secondary",
            iconBg: "bg-primary",
            features: [
                "1000+ Courses",
                "Self-paced Learning",
                "Video Tutorials",
            ],
        },
        {
            icon: GraduationCap,
            title: "Expert Guidance",
            desc: "Learn from industry experts and experienced mentors through interactive sessions.",
            color: "secondary",
            gradient: "from-secondary to-primary",
            iconBg: "bg-secondary",
            features: ["Live Sessions", "1-on-1 Mentoring", "Industry Experts"],
        },
        {
            icon: Users,
            title: "Community Support",
            desc: "Engage with like-minded learners, join discussions, and grow together.",
            color: "accent",
            gradient: "from-accent to-primary",
            iconBg: "bg-accent",
            features: ["Active Forums", "Study Groups", "Networking Events"],
        },
        {
            icon: Award,
            title: "Certifications",
            desc: "Earn recognized certificates after completing courses and showcasing your skills.",
            color: "primary",
            gradient: "from-primary to-accent",
            iconBg: "bg-primary",
            features: [
                "Verified Certificates",
                "Industry Recognition",
                "Portfolio Building",
            ],
        },
    ];

    return (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-accent/5 to-primary/5 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
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
                    className="absolute bottom-20 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
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
            </div>

            <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
                <motion.div
                    className="grid lg:grid-cols-2 gap-12 items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Left Content */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">
                                Our Skill Services
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <div className="space-y-4">
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                                <span className="text-gray-900 dark:text-white">
                                    How{" "}
                                </span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
                                    Skills Swap
                                </span>
                                <br />
                                <span className="text-gray-900 dark:text-white">
                                    Works
                                </span>
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
                                Explore and learn new skills through curated
                                courses, expert mentorship, and a supportive
                                community. Enhance your knowledge and grow your
                                expertise with us.
                            </p>
                        </div>

                        {/* Features List */}
                        <div className="space-y-4">
                            {[
                                "Learn from 500+ expert instructors",
                                "Join 50,000+ active learners",
                                "Access courses anytime, anywhere",
                                "Get certified upon completion",
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center gap-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={
                                        isInView
                                            ? { opacity: 1, x: 0 }
                                            : { opacity: 0, x: -20 }
                                    }
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                >
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                                        {feature}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button
                                onClick={() => {
                                    setShowVideo(true);
                                    setIsLoading(true);
                                }}
                                size="lg"
                                className="h-12 px-6 bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all group"
                            >
                                <PlayCircle className="mr-2 w-5 h-5" />
                                Watch How It Works
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-12 px-6 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold transition-all group"
                            >
                                Get Started
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right Cards Grid */}
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            const isElevated = index === 1 || index === 3;

                            return (
                                <motion.div
                                    key={index}
                                    variants={cardVariants}
                                    className={
                                        isElevated ? "sm:translate-y-8" : ""
                                    }
                                    whileHover={{
                                        scale: 1.05,
                                        y: isElevated ? -10 : -5,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                    }}
                                >
                                    <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all bg-white dark:bg-slate-800 group">
                                        {/* Gradient Overlay */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                                        />

                                        <CardContent className="p-6 space-y-4 relative z-10">
                                            {/* Icon */}
                                            <motion.div
                                                className={`w-14 h-14 ${service.iconBg} rounded-xl flex items-center justify-center shadow-lg`}
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.6 }}
                                            >
                                                <Icon className="w-7 h-7 text-white" />
                                            </motion.div>

                                            {/* Title */}
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                {service.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                                {service.desc}
                                            </p>

                                            {/* Features */}
                                            <div className="pt-2 space-y-2">
                                                {service.features.map(
                                                    (feature, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="flex items-center gap-2 text-xs"
                                                        >
                                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                            <span className="text-gray-600 dark:text-gray-400">
                                                                {feature}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>

                                            {/* Hover Arrow */}
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ArrowRight className="w-5 h-5 text-primary" />
                                            </div>
                                        </CardContent>

                                        {/* Corner Decoration */}
                                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>
            </div>

            {/* Video Modal */}
            {showVideo && (
                <motion.div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowVideo(false)}
                >
                    <motion.div
                        className="bg-slate-900 rounded-2xl overflow-hidden w-full max-w-4xl relative shadow-2xl"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300,
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <Button
                            onClick={() => setShowVideo(false)}
                            className="absolute top-4 right-4 z-10 w-10 h-10 p-0 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20"
                            variant="ghost"
                        >
                            <X className="w-5 h-5 text-white" />
                        </Button>

                        {/* Loading Spinner */}
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-10">
                                <motion.div
                                    className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                />
                            </div>
                        )}

                        {/* Video Container */}
                        <div className="relative aspect-video bg-black">
                            <iframe
                                src="https://assets.pinterest.com/ext/embed.html?id=183943966025490563"
                                className="w-full h-full border-none"
                                title="Skill Swap - How It Works"
                                scrolling="no"
                                onLoad={() => setIsLoading(false)}
                            />
                        </div>

                        {/* Video Info */}
                        <div className="p-6 bg-slate-800/50 backdrop-blur-sm border-t border-white/10">
                            <h3 className="text-xl font-bold text-white mb-2">
                                How Skills Swap Works
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Learn how to get started with Skills Swap and
                                unlock your learning potential
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
};

export default HowItWorks;
