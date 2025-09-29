import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const AboutHero = () => {
    const staggerChildren = {
        visible: { transition: { staggerChildren: 0.2 } },
    };

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section className="relative py-24 px-4 md:px-8 lg:px-16 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/20 to-pink-100/30 dark:from-gray-800/50 dark:via-gray-700/30 dark:to-gray-800/50 z-0"></div>

            {/* Animated gradient circles */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-200/30 dark:bg-blue-500/20 rounded-full filter blur-xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-purple-200/30 dark:bg-purple-500/20 rounded-full filter blur-xl animate-pulse-slow delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-200/30 dark:bg-pink-500/20 rounded-full filter blur-xl animate-pulse-slow delay-2000"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerChildren}
                    className="text-center"
                >
                    <motion.div
                        variants={fadeIn}
                        className="inline-flex items-center justify-center mb-6 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-600/50"
                    >
                        <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                        <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                            About SkillShareHub
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={fadeIn}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-white"
                    >
                        Where{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                            Skills Meet
                        </span>{" "}
                        & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                            Communities Grow
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={fadeIn}
                        className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
                    >
                        A revolutionary platform where knowledge exchange
                        transforms into valuable skills and meaningful
                        connections.
                    </motion.p>

                    <motion.div
                        variants={fadeIn}
                        className="flex flex-wrap justify-center gap-6 mt-12"
                    >
                        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl font-semibold flex items-center shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-blue-400/30 transition-all duration-300 hover:-translate-y-1">
                            Join Our Community{" "}
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                        <button className="px-8 py-4 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-700 backdrop-blur-md text-gray-900 dark:text-white rounded-xl font-semibold border border-gray-200/50 dark:border-gray-600/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            How It Works
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Stats preview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-1 left-0 right-0"
            >
                <div className="max-w-5xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 dark:border-gray-600/50 shadow-sm">
                    <div className="flex flex-wrap justify-center gap-10">
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                10,000+
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">
                                Active Members
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                500+
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">
                                Skills Shared
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                98%
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">
                                Satisfaction Rate
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default AboutHero;
