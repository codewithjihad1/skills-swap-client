"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Star, Quote, Sparkles } from "lucide-react";
import Image from "next/image";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    course: string;
    content: string;
    avatar: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Raj Kumar",
        role: "MERN Stack Web Development",
        course: "Full Stack Development",
        content:
            "This course is very good, I especially like the daily routines and the videos of these routines. And I love the presentation of this video",
        avatar: "/Raj.jpg",
        rating: 5,
    },
    {
        id: 2,
        name: "Sourav",
        role: "UI/UX Design",
        course: "Product Design Masterclass",
        content:
            "অসাধারণ কোর্স! প্রতিটি ভিডিও খুবই সহজভাবে উপস্থাপন করা হয়েছে। আমি এখন Figma দিয়ে প্রফেশনাল ডিজাইন করতে পারি।",
        avatar: "/shourav.jpg",
        rating: 5,
    },
    {
        id: 3,
        name: "Jihad",
        role: "Mobile App Development",
        course: "React Native & Flutter",
        content:
            "Learning experience was amazing! The instructor's teaching style is very clear. I built 3 apps during this course and got my first client.",
        avatar: "/jihad.jpg",
        rating: 5,
    },
    {
        id: 4,
        name: "Ihsan",
        role: "Digital Marketing",
        course: "SEO & Content Marketing",
        content:
            "বাংলাদেশের সেরা অনলাইন কোর্স প্ল্যাটফর্ম! ডিজিটাল মার্কেটিং শিখে এখন আমি ফ্রিল্যান্সিং করছি এবং ভালো আয় করছি।",
        avatar: "/ishan.jpeg",
        rating: 5,
    },
    {
        id: 5,
        name: "Raj Kumar",
        role: "Python & Data Science",
        course: "Data Analytics Bootcamp",
        content:
            "The practical approach of teaching made complex topics easy to understand. The community support is excellent. Highly recommended!",
        avatar: "/Raj.jpg",
        rating: 5,
    },
    {
        id: 6,
        name: "Sourav",
        role: "Graphic Design",
        course: "Adobe Creative Suite",
        content:
            "আমি একজন বিগিনার ছিলাম, এখন প্রফেশনাল ডিজাইনার! কোর্সের কন্টেন্ট কোয়ালিটি এবং সাপোর্ট সিস্টেম দুটোই অসাধারণ।",
        avatar: "/shourav.jpg",
        rating: 5,
    },
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    const visibleTestimonials = 3;
    const maxIndex = Math.max(0, testimonials.length - visibleTestimonials);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
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
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1] as const,
            },
        },
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 ${
                    index < rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"
                }`}
            />
        ));
    };

    return (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-primary to-secondary overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-white" />
                        <span className="text-sm font-medium text-white">
                            শিক্ষার্থীদের মতামত
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
                    >
                        কি ভাবছেন লার্নিং
                        <br />
                        কমিউনিটি
                    </motion.h2>
                </motion.div>

                {/* Testimonials Slider */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                        <Button
                            onClick={prevSlide}
                            size="icon"
                            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-primary shadow-lg"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button
                            onClick={nextSlide}
                            size="icon"
                            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-primary shadow-lg"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Avatar Row */}
                    <motion.div
                        className="flex items-center gap-4 mb-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <div className="flex -space-x-4">
                            {testimonials
                                .slice(0, 6)
                                .map((testimonial, index) => (
                                    <motion.div
                                        key={testimonial.id}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.1, zIndex: 10 }}
                                        className="relative"
                                    >
                                        <Avatar className="w-12 h-12 border-4 border-white shadow-lg">
                                            <AvatarImage
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                            />
                                            <AvatarFallback className="bg-accent text-primary font-bold">
                                                {testimonial.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </motion.div>
                                ))}
                            <motion.div
                                variants={itemVariants}
                                className="w-12 h-12 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center"
                            >
                                <span className="text-sm font-bold text-primary">
                                    6+
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Testimonial Cards */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {testimonials
                            .slice(
                                currentIndex,
                                currentIndex + visibleTestimonials
                            )
                            .map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.id}
                                    variants={itemVariants}
                                    whileHover={{
                                        scale: 1.03,
                                        y: -8,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                    }}
                                >
                                    <Card className="relative overflow-hidden border-0 shadow-2xl bg-white dark:bg-slate-800 h-full">
                                        {/* Quote Icon Background */}
                                        <div className="absolute top-4 right-4 opacity-5">
                                            <Quote className="w-24 h-24 text-primary" />
                                        </div>

                                        <CardContent className="p-6 relative z-10">
                                            {/* Top Section with Avatar and Info */}
                                            <div className="flex items-start gap-4 mb-4">
                                                {/* Avatar */}
                                                <div className="relative flex-shrink-0">
                                                    <Avatar className="w-16 h-16 border-4 border-primary/20">
                                                        <AvatarImage
                                                            src={
                                                                testimonial.avatar
                                                            }
                                                            alt={
                                                                testimonial.name
                                                            }
                                                        />
                                                        <AvatarFallback className="bg-primary text-white font-bold text-xl">
                                                            {testimonial.name.charAt(
                                                                0
                                                            )}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    {/* Verified Badge */}
                                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-white">
                                                        <svg
                                                            className="w-3 h-3 text-white"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>

                                                {/* Name and Role */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                                                        {testimonial.name}
                                                    </h3>
                                                    <p className="text-sm text-primary font-medium">
                                                        {testimonial.role}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Testimonial Content */}
                                            <blockquote className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4 min-h-[80px]">
                                                {testimonial.content}
                                            </blockquote>

                                            {/* Rating */}
                                            <div className="flex items-center gap-1">
                                                {renderStars(
                                                    testimonial.rating
                                                )}
                                            </div>
                                        </CardContent>

                                        {/* Gradient Border Effect */}
                                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
                                    </Card>
                                </motion.div>
                            ))}
                    </motion.div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: maxIndex + 1 }).map(
                            (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-2 rounded-full transition-all ${
                                        currentIndex === index
                                            ? "w-8 bg-white"
                                            : "w-2 bg-white/40 hover:bg-white/60"
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            )
                        )}
                    </div>
                </div>

                {/* Stats Section */}
                <motion.div
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {[
                        { value: "50,000+", label: "সক্রিয় শিক্ষার্থী" },
                        { value: "2,500+", label: "কোর্স সংখ্যা" },
                        { value: "500+", label: "দক্ষ প্রশিক্ষক" },
                        { value: "95%", label: "সফলতার হার" },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-white/80">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
