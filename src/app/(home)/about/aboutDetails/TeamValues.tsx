"use client";

import { motion } from "framer-motion";
import {
    Users,
    HeartHandshake,
    Globe,
    TrendingUp,
    Shield,
    Sparkles,
    ArrowRight,
    Award,
} from "lucide-react";

const TeamValues = () => {
    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" as const },
        },
    };

    const staggerChildren = {
        visible: { transition: { staggerChildren: 0.15 } },
    };

    const pulse = {
        hidden: { scale: 0.95, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const,
            },
        },
    };

    // Values data - All converted to green theme
    const values = [
        {
            title: "Collaborative Learning",
            description:
                "We believe everyone has something to teach and something to learn. Knowledge grows when shared.",
            icon: Users,
            color: "from-emerald-600 to-teal-600",
            bgColor: "bg-emerald-500/10",
            delay: 0.1,
        },
        {
            title: "Community First",
            description:
                "Our platform thrives on genuine connections. We prioritize people over profits in every decision.",
            icon: HeartHandshake,
            color: "from-green-600 to-emerald-600",
            bgColor: "bg-green-500/10",
            delay: 0.2,
        },
        {
            title: "Excellence in Exchange",
            description:
                "We're committed to creating the highest quality skill-sharing experiences for our community.",
            icon: Award,
            color: "from-teal-600 to-cyan-600",
            bgColor: "bg-teal-500/10",
            delay: 0.3,
        },
        {
            title: "Global Impact",
            description:
                "We're building a borderless platform where skills transcend geographical limitations.",
            icon: Globe,
            color: "from-lime-600 to-green-600",
            bgColor: "bg-lime-500/10",
            delay: 0.4,
        },
        {
            title: "Continuous Growth",
            description:
                "We embrace evolution, constantly improving our platform based on community feedback.",
            icon: TrendingUp,
            color: "from-emerald-600 to-teal-700",
            bgColor: "bg-emerald-500/10",
            delay: 0.5,
        },
        {
            title: "Trust & Safety",
            description:
                "We maintain a secure environment where members feel comfortable sharing and learning.",
            icon: Shield,
            color: "from-cyan-600 to-blue-600",
            bgColor: "bg-cyan-500/10",
            delay: 0.6,
        },
    ];

    return (
        <section className="py-24 px-4 md:px-8 lg:px-16 relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-950">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 via-emerald-100/20 to-teal-100/30 dark:from-gray-800/50 dark:via-gray-700/30 dark:to-gray-800/50 z-0"></div>

            {/* Floating gradient elements */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full filter blur-3xl"
            ></motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 2,
                }}
                className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-teal-500/20 to-lime-500/20 rounded-full filter blur-3xl"
            ></motion.div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerChildren}
                    className="text-center mb-20"
                >
                    <motion.div
                        variants={fadeIn}
                        className="inline-flex items-center justify-center mb-6 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full border border-gray-200 dark:border-gray-700 shadow-sm"
                    >
                        <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
                            Our Core Values
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={fadeIn}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
                    >
                        The Principles That{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                            Guide Us
                        </span>
                    </motion.h2>

                    <motion.p
                        variants={fadeIn}
                        className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        At SkillShareHub, our values are the foundation of
                        everything we do. They shape our platform, our
                        community, and our vision for the future of skill
                        sharing.
                    </motion.p>
                </motion.div>

                {/* Values grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerChildren}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {values.map((value, index) => {
                        const IconComponent = value.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={pulse}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: value.delay }}
                                className="group relative"
                            >
                                {/* Card */}
                                <div className="relative h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden">
                                    {/* Background gradient overlay */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${value.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                    ></div>

                                    {/* Animated border effect */}
                                    <div
                                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                                    ></div>

                                    {/* Icon */}
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className={`w-16 h-16 rounded-2xl ${value.bgColor} flex items-center justify-center mb-6 relative z-10`}
                                    >
                                        <div
                                            className={`w-12 h-12 bg-gradient-to-br ${value.color} rounded-lg flex items-center justify-center`}
                                        >
                                            <IconComponent className="w-6 h-6 text-white" />
                                        </div>
                                    </motion.div>

                                    {/* Content */}
                                    <h3 className="text-xl font-semibold mb-4 relative z-10 text-gray-900 dark:text-white">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 relative z-10">
                                        {value.description}
                                    </p>

                                    {/* Hover effect element */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileHover={{ opacity: 1, scale: 1 }}
                                        className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br ${value.color} rounded-full opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                                    ></motion.div>
                                </div>

                                {/* Floating sparkle effect */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: value.delay + 0.3 }}
                                    viewport={{ once: true }}
                                    className="absolute -top-2 -right-2"
                                >
                                    <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Call to action */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="mt-20 text-center"
                >
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-500/10 dark:to-emerald-500/10 rounded-2xl p-12 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                        {/* Animated background elements */}
                        <motion.div
                            animate={{
                                rotate: 360,
                                transition: {
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear",
                                },
                            }}
                            className="absolute -right-20 -bottom-20 w-40 h-40 bg-green-500/5 rounded-full"
                        ></motion.div>

                        <motion.div
                            animate={{
                                rotate: -360,
                                transition: {
                                    duration: 25,
                                    repeat: Infinity,
                                    ease: "linear",
                                },
                            }}
                            className="absolute -left-20 -top-20 w-32 h-32 bg-emerald-500/5 rounded-full"
                        ></motion.div>

                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                                Share Your Skills With The World
                            </h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                                Join a community that values knowledge sharing,
                                growth, and meaningful connections.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold flex items-center shadow-lg hover:shadow-green-500/30 transition-all duration-300"
                                >
                                    Join Now{" "}
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-white rounded-xl font-semibold border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                                >
                                    Learn More
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TeamValues;