"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
    Shield,
    Users,
    GraduationCap,
    Target,
    Star,
    Globe,
    Rocket,
    Award,
    Lock,
    CheckCircle2,
    Zap,
    TrendingUp,
    Building2,
    Briefcase,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
        name: "bKash",
        logo: "https://i.ibb.co.com/5X7y207v/6e5d2b88dad9432355d0271425cbac.webp",
        type: "partner",
        description: "Digital Payment Partner",
    },
    {
        id: 2,
        name: "Grameenphone",
        logo: "https://i.ibb.co.com/mFztJjbd/png-clipart-logo-grameenphone-bangladesh-telenor-airtel-logo-text-logo.png",
        type: "partner",
        description: "Telecom Partner",
    },
    {
        id: 3,
        name: "Robi Axiata",
        logo: "https://i.ibb.co.com/dwy5gLC6/png-transparent-mobile-logo-robi-axiata-limited-axiata-group-mobile-phones-bangladesh-airtel-banglad.png",
        type: "partner",
        description: "Technology Partner",
    },
    {
        id: 4,
        name: "BRAC",
        logo: "https://i.ibb.co.com/WpPCMMc0/png-clipart-logo-bangladesh-brac-bank-limited-aarong-environmental-protection-day-purple-violet.png",
        type: "partner",
        description: "Education Partner",
    },
    {
        id: 5,
        name: "Bangladesh Bank",
        logo: "https://i.ibb.co.com/KprkHVSN/png-transparent-bangladesh-bank-central-bank-bangladesh-development-bank-bank-leaf-investment-logo.png",
        type: "certification",
        description: "Financial Compliance",
    },
    {
        id: 6,
        name: "BASIS",
        logo: "https://i.ibb.co.com/23L4f4SX/668b673940a1f-Basis-logo.jpg",
        type: "certification",
        description: "IT Industry Association",
    },
];

const metrics: Metric[] = [
    {
        id: 1,
        value: "50K+",
        label: "Active Learners",
        icon: "users",
        description: "Students across Bangladesh",
    },
    {
        id: 2,
        value: "5K+",
        label: "Expert Mentors",
        icon: "graduation",
        description: "Industry professionals teaching",
    },
    {
        id: 3,
        value: "95%",
        label: "Success Rate",
        icon: "target",
        description: "Students achieving their goals",
    },
    {
        id: 4,
        value: "4.8/5",
        label: "Average Rating",
        icon: "star",
        description: "Based on 10K+ reviews",
    },
    {
        id: 5,
        value: "64",
        label: "Districts",
        icon: "globe",
        description: "Coverage across Bangladesh",
    },
    {
        id: 6,
        value: "24/7",
        label: "Support",
        icon: "rocket",
        description: "Always here to help you",
    },
];

const TrustCommunity = () => {
    // Get icon component based on string
    const getIcon = (iconName: string) => {
        const iconProps = { className: "w-8 h-8" };
        switch (iconName) {
            case "users":
                return <Users {...iconProps} />;
            case "graduation":
                return <GraduationCap {...iconProps} />;
            case "target":
                return <Target {...iconProps} />;
            case "star":
                return <Star {...iconProps} />;
            case "globe":
                return <Globe {...iconProps} />;
            case "rocket":
                return <Rocket {...iconProps} />;
            default:
                return <Award {...iconProps} />;
        }
    };

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
            className="py-16 bg-gradient-to-br from-white via-[#B0EACD]/10 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-[#21BF73]/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#007a3f]/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#B0EACD]/30 rounded-full blur-3xl animate-pulse delay-500" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <motion.div
                    className="text-center mb-16"
                    variants={itemVariants}
                >
                    <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#21BF73] to-[#007a3f] rounded-full mb-6 shadow-lg shadow-[#21BF73]/30"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Shield className="w-8 h-8 text-white" />
                    </motion.div>

                    <motion.h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                            Trusted by{" "}
                        </span>
                        <span className="bg-gradient-to-r from-[#21BF73] to-[#007a3f] bg-clip-text text-transparent">
                            Bangladesh's Leaders
                        </span>
                    </motion.h2>

                    <motion.p
                        className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Join a thriving community of learners backed by top
                        Bangladeshi companies, featured in leading publications,
                        and trusted by professionals nationwide.
                    </motion.p>
                </motion.div>

                {/* Community Metrics */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16"
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
                            <Card className="bg-gradient-to-br from-white to-[#B0EACD]/10 dark:from-gray-800 dark:to-gray-700 border-2 border-[#B0EACD]/30 hover:border-[#21BF73]/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                                <CardContent className="p-6 flex flex-col justify-between h-full">
                                    <motion.div
                                        className="flex items-center justify-center w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#21BF73] to-[#007a3f] rounded-full shadow-lg shadow-[#21BF73]/30"
                                        animate={{
                                            rotate: [0, 5, -5, 0],
                                            scale: [1, 1.05, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            delay: index * 0.2,
                                            repeat: Infinity,
                                            repeatDelay: 3,
                                        }}
                                    >
                                        <span className="text-white">
                                            {getIcon(metric.icon)}
                                        </span>
                                    </motion.div>

                                    <motion.div
                                        className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#21BF73] to-[#007a3f] bg-clip-text text-transparent mb-1"
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
                                </CardContent>
                            </Card>
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
                        <Badge className="px-4 py-2 bg-gradient-to-r from-[#21BF73] to-[#007a3f] text-white border-none text-sm mb-4">
                            <Building2 className="w-4 h-4 mr-2" />
                            Our Partners
                        </Badge>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            Partnered with Leading Bangladeshi Companies
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Trusted by top organizations across Bangladesh
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
                        variants={containerVariants}
                    >
                        {partners.map((partner, index) => (
                            <motion.div
                                key={partner.id}
                                variants={logoVariants}
                                whileHover="hover"
                                className="group"
                            >
                                <Card className="bg-white dark:bg-gray-800 border-2 border-[#B0EACD]/30 hover:border-[#21BF73]/50 shadow-md hover:shadow-xl transition-all duration-300 h-full">
                                    <CardContent className="p-6 flex flex-col justify-between h-full">
                                        <div className="h-12 flex items-center justify-center mb-4">
                                            <motion.img
                                                src={partner.logo}
                                                alt={partner.name}
                                                className="max-h-8 max-w-full object-contain filter dark:brightness-0 dark:invert opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.3 }}
                                                onError={(e) => {
                                                    const target =
                                                        e.target as HTMLImageElement;
                                                    target.style.display =
                                                        "none";
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
                                            className="text-xs text-center text-gray-500 dark:text-gray-400 group-hover:text-[#21BF73] transition-colors duration-300 font-medium"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{
                                                delay: index * 0.1 + 0.5,
                                            }}
                                            viewport={{ once: true }}
                                        >
                                            {partner.description}
                                        </motion.p>
                                    </CardContent>
                                </Card>
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
                        className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2"
                        variants={itemVariants}
                    >
                        Your Data is Safe & Secure
                    </motion.h3>
                    <motion.p
                        className="text-gray-600 dark:text-gray-400 mb-8"
                        variants={itemVariants}
                    >
                        Industry-standard security and compliance
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap justify-center items-center gap-4"
                        variants={containerVariants}
                    >
                        {[
                            {
                                icon: Shield,
                                label: "SSL Encrypted",
                            },
                            {
                                icon: Lock,
                                label: "GDPR Compliant",
                            },
                            {
                                icon: CheckCircle2,
                                label: "Verified Secure",
                            },
                            {
                                icon: Zap,
                                label: "99.9% Uptime",
                            },
                        ].map((badge, index) => (
                            <motion.div
                                key={badge.label}
                                variants={badgeVariants}
                                whileHover="hover"
                            >
                                <Badge
                                    variant="outline"
                                    className="flex items-center space-x-2 bg-[#B0EACD]/10 hover:bg-[#B0EACD]/20 px-4 py-2 border-2 border-[#B0EACD]/50 hover:border-[#21BF73] cursor-pointer transition-all duration-300"
                                >
                                    <badge.icon className="w-5 h-5 text-[#21BF73]" />
                                    <span className="text-sm font-medium text-[#007a3f] dark:text-[#B0EACD]">
                                        {badge.label}
                                    </span>
                                </Badge>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default TrustCommunity;
