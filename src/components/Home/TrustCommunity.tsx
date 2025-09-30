"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Partner {
    id: number;
    name: string;
    logo: string;
    type: "partner" | "press" | "certification";
    description?: string;
}

interface Metric {
    id: number;
    value: string;
    label: string;
    icon: string;
    description: string;
}

interface PressItem {
    id: number;
    publication: string;
    quote: string;
    author: string;
    logo: string;
}

const partners: Partner[] = [
    {
        id: 1,
        name: "Google",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        type: "partner",
        description: "Official Google Cloud Partner",
    },
    {
        id: 2,
        name: "Microsoft",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        type: "partner",
        description: "Microsoft Learn Partner",
    },
    {
        id: 3,
        name: "AWS",
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
        type: "partner",
        description: "AWS Training Partner",
    },
    {
        id: 4,
        name: "Meta",
        logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
        type: "partner",
        description: "Meta Blueprint Partner",
    },
    {
        id: 5,
        name: "IBM",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
        type: "partner",
        description: "IBM SkillsBuild Partner",
    },
    {
        id: 6,
        name: "Adobe",
        logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg",
        type: "certification",
        description: "Adobe Certified Expert Partner",
    },
];

const metrics: Metric[] = [
    {
        id: 1,
        value: "500K+",
        label: "Active Learners",
        icon: "👥",
        description: "Students worldwide learning with us",
    },
    {
        id: 2,
        value: "15K+",
        label: "Expert Mentors",
        icon: "🎓",
        description: "Industry professionals teaching",
    },
    {
        id: 3,
        value: "98%",
        label: "Success Rate",
        icon: "🎯",
        description: "Students achieving their goals",
    },
    {
        id: 4,
        value: "4.9/5",
        label: "Average Rating",
        icon: "⭐",
        description: "Based on 100K+ reviews",
    },
    {
        id: 5,
        value: "190+",
        label: "Countries",
        icon: "🌍",
        description: "Global community reach",
    },
    {
        id: 6,
        value: "24/7",
        label: "Support",
        icon: "🚀",
        description: "Always here to help you",
    },
];

const pressItems: PressItem[] = [
    {
        id: 1,
        publication: "TechCrunch",
        quote: "Skill Swap is revolutionizing online education with its innovative mentor-driven approach.",
        author: "Sarah Wilson, Education Editor",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/TechCrunch_logo.svg",
    },
    {
        id: 2,
        publication: "Forbes",
        quote: "One of the most effective platforms for professional skill development in 2025.",
        author: "Michael Chen, Technology Reporter",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Forbes_logo.svg",
    },
    {
        id: 3,
        publication: "Wired",
        quote: "Setting new standards for personalized learning experiences in the digital age.",
        author: "Emma Davis, Senior Writer",
        logo: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Wired_logo.svg",
    },
];

const TrustCommunity = () => {
    // Animation variants
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
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
            },
        },
    };

    const metricVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            rotateY: -15,
        },
        visible: {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: {
                duration: 0.7,
            },
        },
    };

    const logoVariants = {
        hidden: {
            opacity: 0,
            x: -20,
            filter: "blur(4px)",
        },
        visible: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.8,
            },
        },
        hover: {
            scale: 1.05,
            y: -5,
            transition: {
                duration: 0.3,
            },
        },
    };

    const pressCardVariants = {
        hidden: {
            opacity: 0,
            rotateX: -15,
            y: 50,
        },
        visible: {
            opacity: 1,
            rotateX: 0,
            y: 0,
            transition: {
                duration: 0.8,
            },
        },
        hover: {
            y: -10,
            scale: 1.02,
            rotateX: 5,
            transition: {
                duration: 0.3,
            },
        },
    };

    const badgeVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            rotate: -5,
        },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.5,
            },
        },
        hover: {
            scale: 1.1,
            rotate: 2,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <motion.section
            className="py-16 bg-white dark:bg-gray-900 overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    className="text-center mb-16"
                    variants={itemVariants}
                >
                    <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full mb-6"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.8 }}
                    >
                        <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                        </svg>
                    </motion.div>

                    <motion.h2
                        className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Trusted by Industry Leaders
                    </motion.h2>

                    <motion.p
                        className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Join a global community of learners backed by top tech
                        companies, featured in leading publications, and trusted
                        by professionals worldwide.
                    </motion.p>
                </motion.div>

                {/* Community Metrics */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={metric.id}
                            variants={metricVariants}
                            whileHover={{
                                scale: 1.08,
                                rotateY: 5,
                                transition: { duration: 0.3 },
                            }}
                            className="text-center"
                        >
                            <motion.div
                                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-600 h-full flex flex-col justify-between"
                                whileHover={{
                                    boxShadow:
                                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                    transition: { duration: 0.3 },
                                }}
                            >
                                <motion.div
                                    className="text-4xl mb-3"
                                    animate={{
                                        rotate: [0, 5, -5, 0],
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: index * 0.2,
                                        repeat: Infinity,
                                        repeatDelay: 3,
                                    }}
                                >
                                    {metric.icon}
                                </motion.div>

                                <motion.div
                                    className="text-2xl md:text-3xl font-bold text-primary mb-1"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                        type: "spring",
                                        stiffness: 200,
                                    }}
                                    viewport={{ once: true }}
                                >
                                    {metric.value}
                                </motion.div>

                                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                    {metric.label}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    {metric.description}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Partner Logos */}
                <motion.div
                    className="mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                >
                    <motion.div
                        className="text-center mb-8"
                        variants={itemVariants}
                    >
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            Partnered with Industry Giants
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Official training partners and certification
                            providers
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
                        variants={containerVariants}
                    >
                        {partners.map((partner, index) => (
                            <motion.div
                                key={partner.id}
                                variants={logoVariants}
                                whileHover="hover"
                                className="group"
                            >
                                <motion.div
                                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 h-full flex flex-col justify-between"
                                    whileHover={{
                                        borderColor: "rgba(37, 99, 235, 0.3)",
                                        boxShadow:
                                            "0 10px 25px -5px rgba(37, 99, 235, 0.1)",
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="h-12 flex items-center justify-center mb-4">
                                        <motion.img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="max-h-8 max-w-full object-contain filter dark:invert opacity-70 group-hover:opacity-100"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.3 }}
                                            onError={(e) => {
                                                const target =
                                                    e.target as HTMLImageElement;
                                                target.style.display = "none";
                                                target.nextElementSibling?.classList.remove(
                                                    "hidden"
                                                );
                                            }}
                                        />
                                        <div className="hidden text-lg font-bold text-gray-700 dark:text-gray-300">
                                            {partner.name}
                                        </div>
                                    </div>
                                    <motion.p
                                        className="text-xs text-center text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors duration-300"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{
                                            delay: index * 0.1 + 0.5,
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        {partner.description}
                                    </motion.p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Press Mentions */}
                <motion.div
                    className="mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    <motion.div
                        className="text-center mb-8"
                        variants={itemVariants}
                    >
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            Featured in Leading Publications
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Recognition from top media outlets
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-3 gap-8"
                        variants={containerVariants}
                    >
                        {pressItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                variants={pressCardVariants}
                                whileHover="hover"
                            >
                                <motion.div
                                    className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-600 h-full flex flex-col"
                                    whileHover={{
                                        boxShadow:
                                            "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                                    }}
                                >
                                    <motion.div
                                        className="flex items-center mb-4"
                                        initial={{ x: -20, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{
                                            delay: index * 0.2 + 0.3,
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        <Image
                                            src={item.logo}
                                            alt={item.publication}
                                            width={120}
                                            height={60}
                                            className="h-6 max-w-24 object-contain filter dark:invert opacity-70"
                                        />
                                        <div className="hidden text-lg font-bold text-gray-700 dark:text-gray-300">
                                            {item.publication}
                                        </div>
                                    </motion.div>

                                    <motion.blockquote
                                        className="text-gray-700 dark:text-gray-300 italic mb-4 flex-grow"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{
                                            delay: index * 0.2 + 0.5,
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        "{item.quote}"
                                    </motion.blockquote>

                                    <motion.div
                                        className="text-sm text-gray-500 dark:text-gray-400"
                                        initial={{ y: 10, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay: index * 0.2 + 0.7,
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        — {item.author}
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Security & Trust Badges */}
                <motion.div
                    className="text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                >
                    <motion.h3
                        className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8"
                        variants={itemVariants}
                    >
                        Your Data is Safe & Secure
                    </motion.h3>

                    <motion.div
                        className="flex flex-wrap justify-center items-center gap-8"
                        variants={containerVariants}
                    >
                        {[
                            {
                                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                                label: "SSL Encrypted",
                                color: "green",
                            },
                            {
                                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                                label: "GDPR Compliant",
                                color: "blue",
                            },
                            {
                                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                                label: "SOC 2 Certified",
                                color: "purple",
                            },
                            {
                                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                                label: "99.9% Uptime",
                                color: "orange",
                            },
                        ].map((badge, index) => (
                            <motion.div
                                key={badge.label}
                                variants={badgeVariants}
                                whileHover="hover"
                                className={`flex items-center space-x-2 bg-${badge.color}-50 dark:bg-${badge.color}-900/20 px-4 py-2 rounded-full border border-${badge.color}-200 dark:border-${badge.color}-800 cursor-pointer`}
                            >
                                <svg
                                    className={`w-5 h-5 text-${badge.color}-600`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={badge.icon}
                                    />
                                </svg>
                                <span
                                    className={`text-sm font-medium text-${badge.color}-700 dark:text-${badge.color}-300`}
                                >
                                    {badge.label}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default TrustCommunity;
