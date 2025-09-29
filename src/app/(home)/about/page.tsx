"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import OurJourney from "./aboutDetails/OurJourney";
import AboutUsSection from "./aboutDetails/AboutUsSection";
import TeamValues from "./aboutDetails/TeamValues";
import TeamSection from "./aboutDetails/TeamSection";
import AboutHero from "./aboutDetails/AboutHero";

const AboutUs = () => {
    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const staggerChildren = {
        visible: { transition: { staggerChildren: 0.2 } },
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <AboutHero />

            {/* About section */}
            <AboutUsSection></AboutUsSection>
            {/*  */}

            {/* ourjourney */}
            <OurJourney></OurJourney>
            {/*  */}

            {/* team values */}
            <TeamValues></TeamValues>

            {/* team section */}
            <TeamSection></TeamSection>

            {/* CTA Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16 bg-primary-2">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerChildren}
                    >
                        <motion.h2
                            variants={fadeIn}
                            className="text-3xl md:text-4xl font-bold mb-6 text-white"
                        >
                            Ready to Share Your Skills?
                        </motion.h2>
                        <motion.p
                            variants={fadeIn}
                            className="text-lg text-white/80 mb-10 max-w-2xl mx-auto"
                        >
                            Join our community of learners and teachers today.
                            Exchange skills, grow together, and be part of
                            something meaningful.
                        </motion.p>
                        <motion.div
                            variants={fadeIn}
                            className="flex flex-wrap justify-center gap-4"
                        >
                            <button className="px-8 py-4 bg-white text-primary-2 rounded-lg font-semibold flex items-center">
                                Get Started{" "}
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </button>
                            <button className="px-8 py-4 border border-white/20 text-white rounded-lg font-semibold">
                                Learn More
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
