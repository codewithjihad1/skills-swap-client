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

    // Values data
    const values = [
        {
            title: "Collaborative Learning",
            description:
                "We believe everyone has something to teach and something to learn. Knowledge grows when shared.",
            icon: Users,
            color: "from-secondary to-secondary-3",
            bgColor: "bg-secondary/10",
            delay: 0.1,
        },
        {
            title: "Community First",
            description:
                "Our platform thrives on genuine connections. We prioritize people over profits in every decision.",
            icon: HeartHandshake,
            color: "from-primary to-primary-3",
            bgColor: "bg-primary/10",
            delay: 0.2,
        },
        {
            title: "Excellence in Exchange",
            description:
                "We're committed to creating the highest quality skill-sharing experiences for our community.",
            icon: Award,
            color: "from-accent to-accent-3",
            bgColor: "bg-accent/10",
            delay: 0.3,
        },
        {
            title: "Global Impact",
            description:
                "We're building a borderless platform where skills transcend geographical limitations.",
            icon: Globe,
            color: "from-secondary-2 to-secondary-3",
            bgColor: "bg-secondary-2/10",
            delay: 0.4,
        },
        {
            title: "Continuous Growth",
            description:
                "We embrace evolution, constantly improving our platform based on community feedback.",
            icon: TrendingUp,
            color: "from-primary-3 to-accent-3",
            bgColor: "bg-primary-3/10",
            delay: 0.5,
        },
        {
            title: "Trust & Safety",
            description:
                "We maintain a secure environment where members feel comfortable sharing and learning.",
            icon: Shield,
            color: "from-accent-2 to-accent-3",
            bgColor: "bg-accent-2/10",
            delay: 0.6,
        },
    ];

    return (
        <section className="py-24 px-4 md:px-8 lg:px-16 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-primary-2/5 to-background z-0"></div>

            {/* Floating gradient elements */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full filter blur-3xl"
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
                className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-accent/20 to-secondary-2/20 rounded-full filter blur-3xl"
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
                        className="inline-flex items-center justify-center mb-6 px-6 py-3 bg-background/10 backdrop-blur-md rounded-full border border-foreground/10 shadow-sm"
                    >
                        <Sparkles className="w-5 h-5 text-secondary-2 mr-2" />
                        <span className="text-sm font-semibold text-secondary-2 uppercase tracking-wider">
                            Our Core Values
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={fadeIn}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                    >
                        The Principles That{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-3">
                            Guide Us
                        </span>
                    </motion.h2>

                    <motion.p
                        variants={fadeIn}
                        className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed"
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
                                <div className="relative h-full bg-background border border-foreground/10 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden">
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
                                    <h3 className="text-xl font-semibold mb-4 relative z-10">
                                        {value.title}
                                    </h3>
                                    <p className="text-foreground/70 relative z-10">
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
                                    <Sparkles className="w-5 h-5 text-secondary-2" />
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
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12 border border-foreground/10 relative overflow-hidden">
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
                            className="absolute -right-20 -bottom-20 w-40 h-40 bg-primary/5 rounded-full"
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
                            className="absolute -left-20 -top-20 w-32 h-32 bg-secondary/5 rounded-full"
                        ></motion.div>

                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-bold mb-6">
                                Share Your Skills With The World
                            </h3>
                            <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
                                Join a community that values knowledge sharing,
                                growth, and meaningful connections.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-gradient-to-r from-primary to-primary-3 text-white rounded-xl font-semibold flex items-center shadow-lg hover:shadow-primary/30 transition-all duration-300"
                                >
                                    Join Now{" "}
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-background/80 backdrop-blur-md text-foreground rounded-xl font-semibold border border-foreground/10 shadow-sm hover:shadow-md transition-all duration-300"
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
