"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
    Navigation,
    Pagination,
    Autoplay,
    EffectCoverflow,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Image from "next/image";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    content: string;
    avatar: string;
    rating: number;
    skills: string[];
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Frontend Developer",
        company: "TechCorp",
        content:
            "Skill Swap completely transformed my career! I learned React and landed my dream job within 3 months. The community is incredibly supportive and the mentors are top-notch.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        skills: ["React", "JavaScript", "CSS"],
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "UX Designer",
        company: "DesignStudio",
        content:
            "The design courses here are exceptional. I went from a complete beginner to designing for major clients. The hands-on projects and feedback really accelerated my learning.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        skills: ["UI/UX Design", "Figma", "Prototyping"],
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Data Scientist",
        company: "DataTech Inc",
        content:
            "I love how practical and industry-focused the courses are. The Python and machine learning tracks helped me transition from marketing to data science seamlessly.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        skills: ["Python", "Machine Learning", "Data Analysis"],
    },
    {
        id: 4,
        name: "David Kim",
        role: "DevOps Engineer",
        company: "CloudTech",
        content:
            "The mentorship program is outstanding. My mentor guided me through complex DevOps concepts and helped me land a senior position. Highly recommend!",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        skills: ["Docker", "Kubernetes", "AWS"],
    },
    {
        id: 5,
        name: "Lisa Thompson",
        role: "Mobile Developer",
        company: "AppVentures",
        content:
            "From zero to publishing my first app in the store! The mobile development track is comprehensive and the community challenges kept me motivated throughout.",
        avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        skills: ["React Native", "Flutter", "iOS Development"],
    },
    {
        id: 6,
        name: "James Wilson",
        role: "Backend Developer",
        company: "ServerTech",
        content:
            "The backend development courses are incredibly thorough. I learned Node.js, databases, and API design. Now I'm building scalable applications for enterprise clients.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        skills: ["Node.js", "MongoDB", "API Development"],
    },
];

const Testimonials = () => {
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <svg
                key={index}
                className={`w-5 h-5 ${
                    index < rating
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        What Our Students Say
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Join thousands of learners who have transformed their
                        careers through our skill-sharing platform. Here's what
                        they have to say about their journey.
                    </p>
                </div>

                {/* Swiper Testimonials */}
                <div className="relative">
                    <Swiper
                        modules={[
                            Navigation,
                            Pagination,
                            Autoplay,
                            EffectCoverflow,
                        ]}
                        spaceBetween={24}
                        slidesPerView={1}
                        navigation={{
                            nextEl: ".swiper-button-next-custom",
                            prevEl: ".swiper-button-prev-custom",
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                            el: ".swiper-pagination-custom",
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 24,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                            1280: {
                                slidesPerView: 4,
                                spaceBetween: 24,
                            },
                        }}
                        loop={true}
                        centeredSlides={false}
                        className="testimonials-swiper"
                    >
                        {testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 h-full flex flex-col">
                                    {/* Avatar */}
                                    <div className="flex justify-center mb-4">
                                        <Image
                                            src={testimonial?.avatar}
                                            alt={testimonial.name}
                                            className="w-16 h-16 rounded-full object-cover border-4 border-primary/20"
                                            width={64}
                                            height={64}
                                        />
                                    </div>

                                    {/* Rating */}
                                    <div className="flex justify-center mb-4">
                                        {renderStars(testimonial.rating)}
                                    </div>

                                    {/* Testimonial Text */}
                                    <blockquote className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-center flex-grow line-clamp-4">
                                        "{testimonial.content}"
                                    </blockquote>

                                    {/* Author Info */}
                                    <div className="text-center mb-4">
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-primary font-medium text-sm">
                                            {testimonial.role}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            {testimonial.company}
                                        </p>
                                    </div>

                                    {/* Skills */}
                                    <div className="flex flex-wrap justify-center gap-1 mt-auto">
                                        {testimonial.skills
                                            .slice(0, 3)
                                            .map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        {testimonial.skills.length > 3 && (
                                            <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                                                +{testimonial.skills.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-primary/5 transition-all duration-200 z-10">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>

                    <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-primary/5 transition-all duration-200 z-10">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>

                    {/* Custom Pagination */}
                    <div className="swiper-pagination-custom flex justify-center mt-8"></div>
                </div>

                {/* Stats Section */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                            10K+
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Happy Students
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                            500+
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Expert Mentors
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                            95%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Success Rate
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                            4.9/5
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Average Rating
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
