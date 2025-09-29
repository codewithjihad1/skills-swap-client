"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Icons as SVG components
const CodeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
);

const DesignIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <circle cx="12" cy="12" r="4"></circle>
    </svg>
);

const TeamIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);

const ChevronLeft = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);

const OurJourney = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    // Animation variants
    const slideIn = {
        hidden: { opacity: 0, x: 100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeInOut" as const },
        },
    };

    const scaleUp = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: [0.68, -0.55, 0.265, 1.55] as const,
            },
        },
    };

    // Journey data
    const journeyData = [
        {
            day: "Day 1",
            title: "Project Setup & Planning",
            description:
                "Initialized the Next.js project with TypeScript and Tailwind CSS. Set up the project structure, defined components, and established the development workflow.",
            icon: <CodeIcon />,
            hours: "8 hours",
            features: [
                "Next.js 15 Setup",
                "TypeScript Configuration",
                "Tailwind CSS Integration",
                "Project Structure",
            ],
            color: "from-blue-600 to-blue-800",
            team: "Both team members",
        },
        {
            day: "Day 2",
            title: "Hero Section & Navigation",
            description:
                "Designed and implemented a responsive navbar with dark mode toggle and created an engaging hero section with gradient backgrounds and animations.",
            icon: <DesignIcon />,
            hours: "9 hours",
            features: [
                "Responsive Navbar",
                "Dark Mode Toggle",
                "Hero Section",
                "Smooth Animations",
            ],
            color: "from-purple-600 to-purple-800",
            team: "Frontend Specialist",
        },
        {
            day: "Day 3",
            title: "About Page & Footer",
            description:
                "Built a comprehensive about page with team information and a professional footer with social links, newsletter signup, and site navigation.",
            icon: <DesignIcon />,
            hours: "8 hours",
            features: [
                "About Page Layout",
                "Team Section",
                "Footer Component",
                "Responsive Design",
            ],
            color: "from-emerald-600 to-emerald-800",
            team: "Both team members",
        },
        {
            day: "Day 4",
            title: "Team Collaboration Setup",
            description:
                "Established team collaboration protocols, set up regular scrums, and implemented project management tools for efficient workflow.",
            icon: <TeamIcon />,
            hours: "7 hours",
            features: [
                "Daily Scrums",
                "Task Management",
                "Code Reviews",
                "Collaboration Tools",
            ],
            color: "from-amber-600 to-amber-800",
            team: "Team Lead",
        },
        {
            day: "Day 5",
            title: "Login & Authentication",
            description:
                "Implemented secure login functionality with authentication flows and user profile management systems.",
            icon: <CodeIcon />,
            hours: "10 hours",
            features: [
                "Login System",
                "User Authentication",
                "Profile Management",
                "Secure Routes",
            ],
            color: "from-red-600 to-red-800",
            team: "Backend Specialist",
        },
        {
            day: "Day 6",
            title: "Profile Pages & Dashboard",
            description:
                "Created user profile pages with editing capabilities and a comprehensive dashboard for managing skills and connections.",
            icon: <DesignIcon />,
            hours: "9 hours",
            features: [
                "User Profiles",
                "Dashboard Layout",
                "Editing Features",
                "Skill Management",
            ],
            color: "from-indigo-600 to-indigo-800",
            team: "Both team members",
        },
        {
            day: "Day 7",
            title: "Project Refinement & Polish",
            description:
                "Focused on refining the user experience, optimizing performance, and adding finishing touches to all components.",
            icon: <CodeIcon />,
            hours: "8 hours",
            features: [
                "Performance Optimization",
                "UI Polish",
                "Bug Fixes",
                "Responsive Testing",
            ],
            color: "from-pink-600 to-pink-800",
            team: "Both team members",
        },
        {
            day: "Day 8",
            title: "Final Review & Deployment Prep",
            description:
                "Conducted final testing, prepared for deployment, and documented the codebase for future maintenance.",
            icon: <TeamIcon />,
            hours: "8 hours",
            features: [
                "Testing",
                "Deployment Setup",
                "Documentation",
                "Code Review",
            ],
            color: "from-cyan-600 to-cyan-800",
            team: "Both team members",
        },
    ];

    // Auto-play functionality
    useEffect(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % journeyData.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [autoPlay, journeyData.length]);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % journeyData.length);
        setAutoPlay(false);
    };

    const prevSlide = () => {
        setActiveIndex(
            (prev) => (prev - 1 + journeyData.length) % journeyData.length
        );
        setAutoPlay(false);
    };

    const goToSlide = (index: number) => {
        setActiveIndex(index);
        setAutoPlay(false);
    };

    const current = journeyData[activeIndex];

    return (
        <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-white">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16"
                >
                    <motion.div className="inline-flex items-center justify-center mb-6 px-6 py-3 bg-white/70 dark:bg-gray-800/50 backdrop-blur-md rounded-full border border-gray-200 dark:border-gray-700">
                        <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                            Our Development Journey
                        </span>
                    </motion.div>

                    <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Building{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                            SkillShareHub
                        </span>
                    </motion.h2>

                    <motion.p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        For the past 8 days, our team has dedicated 8-10 hours
                        daily to create a professional platform with dark mode
                        design.
                    </motion.p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                >
                    <div className="bg-white/70 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                            8
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                            Days of Work
                        </div>
                    </div>
                    <div className="bg-white/70 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                            70+
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                            Hours Invested
                        </div>
                    </div>
                    <div className="bg-white/70 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
                        <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                            12+
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                            Components Built
                        </div>
                    </div>
                    <div className="bg-white/70 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
                        <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                            2
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                            Dedicated Developers
                        </div>
                    </div>
                </motion.div>

                {/* Carousel container */}
                <div className="relative">
                    {/* Navigation arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-all duration-300"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-all duration-300"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-800 dark:text-white" />
                    </button>

                    {/* Carousel track */}
                    <div className="overflow-hidden">
                        <motion.div
                            key={activeIndex}
                            initial="hidden"
                            animate="visible"
                            variants={slideIn}
                            className="flex"
                        >
                            <div className="w-full flex-shrink-0">
                                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 shadow-2xl">
                                    <div className="grid md:grid-cols-2 gap-12 items-center">
                                        {/* Content */}
                                        <div>
                                            <motion.div
                                                variants={scaleUp}
                                                className="inline-flex items-center mb-6"
                                            >
                                                <div
                                                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${current.color} flex items-center justify-center mr-4`}
                                                >
                                                    <div className="w-8 h-8 text-white">
                                                        {current.icon}
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                                        {current.day}
                                                    </span>
                                                    <div className="flex items-center text-gray-600 dark:text-gray-400 mt-1">
                                                        <ClockIcon className="w-4 h-4 mr-1" />
                                                        <span className="text-sm">
                                                            {current.hours} work
                                                        </span>
                                                        <span className="mx-2">
                                                            •
                                                        </span>
                                                        <TeamIcon className="w-4 h-4 mr-1" />
                                                        <span className="text-sm">
                                                            {current.team}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            <motion.h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                                                {current.title}
                                            </motion.h3>

                                            <motion.p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                                                {current.description}
                                            </motion.p>

                                            {/* Features */}
                                            <motion.div className="space-y-3 mb-8">
                                                <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                                                    Key Features:
                                                </h4>
                                                <ul className="space-y-2">
                                                    {current.features.map(
                                                        (feature, index) => (
                                                            <li
                                                                key={index}
                                                                className="flex items-center"
                                                            >
                                                                <div
                                                                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${current.color} mr-3`}
                                                                ></div>
                                                                <span className="text-gray-600 dark:text-gray-400">
                                                                    {feature}
                                                                </span>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </motion.div>
                                        </div>

                                        {/* Visual */}
                                        <motion.div
                                            variants={scaleUp}
                                            className="relative"
                                        >
                                            <div
                                                className={`rounded-3xl overflow-hidden shadow-2xl aspect-video bg-gradient-to-br ${current.color}/10 flex items-center justify-center p-8 border border-gray-200 dark:border-gray-700`}
                                            >
                                                <div className="text-center">
                                                    <div className="w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                                        <div className="w-10 h-10 text-blue-600 dark:text-blue-400">
                                                            {current.icon}
                                                        </div>
                                                    </div>
                                                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                                        {current.day} Progress
                                                    </h4>
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        Focused development on{" "}
                                                        {current.title.toLowerCase()}
                                                    </p>

                                                    {/* Progress bar */}
                                                    <div className="mt-6 bg-gray-300 dark:bg-gray-700 rounded-full h-2">
                                                        <div
                                                            className={`h-2 rounded-full bg-gradient-to-r ${current.color}`}
                                                            style={{
                                                                width: `${
                                                                    (activeIndex +
                                                                        1) *
                                                                    12.5
                                                                }%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Decorative elements */}
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    duration: 20,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                }}
                                                className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${current.color} rounded-full opacity-20`}
                                            ></motion.div>

                                            <motion.div
                                                animate={{ rotate: -360 }}
                                                transition={{
                                                    duration: 15,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                }}
                                                className={`absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br ${current.color} rounded-full opacity-20`}
                                            ></motion.div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Progress indicators */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex justify-center mt-12 space-x-3"
                >
                    {journeyData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === activeIndex
                                    ? `bg-gradient-to-r ${current.color} w-8`
                                    : "bg-gray-400 dark:bg-gray-700 hover:bg-gray-500 dark:hover:bg-gray-600"
                            }`}
                            aria-label={`Go to ${journeyData[index].day}`}
                        />
                    ))}
                </motion.div>

                {/* Day navigation */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex justify-center mt-8 flex-wrap gap-4"
                >
                    {journeyData.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                                index === activeIndex
                                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700"
                            }`}
                        >
                            {item.day}
                        </button>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default OurJourney;
