"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import {
    FaBook,
    FaChalkboardTeacher,
    FaUsers,
    FaAward,
    FaPlayCircle,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
const HowItWorks = () => {
    const [showVideo, setShowVideo] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });
    }, []);
    const services = [
        {
            icon: <FaBook size={30} className="text-white mx-auto" />,
            title: "Learn New Skills",
            desc: "Access a variety of courses and tutorials to level up your skills efficiently.",
        },
        {
            icon: (
                <FaChalkboardTeacher
                    size={30}
                    className="text-green-500 mx-auto"
                />
            ),
            title: "Expert Guidance",
            desc: "Learn from industry experts and experienced mentors through interactive sessions.",
        },
        {
            icon: <FaUsers size={30} className="text-blue-500 mx-auto" />,
            title: "Community Support",
            desc: "Engage with like-minded learners, join discussions, and grow together.",
        },
        {
            icon: <FaAward size={30} className="text-red-500 mx-auto" />,
            title: "Certifications",
            desc: "Earn recognized certificates after completing courses and showcasing your skills.",
        },
    ];

    return (
        <section className="bg-[#F3F6FD] dark:bg-gray-900 py-16 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start md:items-center p-6 md:p-10 ">
                {/* Left Content */}
                <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    className="flex flex-col justify-center"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-600 dark:text-gray-100 mb-6">
                        - Our Skill Services
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 text-md lg:text-lg font-semibold leading-relaxed mb-8">
                        Explore and learn new skills through curated courses,
                        expert mentorship, and a supportive community. Enhance
                        your knowledge and grow your expertise with us.
                    </p>

                    {/* Video Button */}
                    <button
                        onClick={() => {
                            setShowVideo(true);
                            setIsLoading(true);
                        }}
                        className="flex items-center gap-3 text-indigo-600 hover:text-indigo-500 font-semibold text-lg transition-colors hover:cursor-pointer"
                    >
                        <FaPlayCircle size={32} />
                        WATCH HOW IT WORKS
                    </button>
                </div>

                {/* Right Cards */}
                <div
                    data-aos="fade-down"
                    data-aos-duration="1000"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6 hover:cursor-pointer"
                >
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-md shadow-lg hover:shadow-2xl transition-all transform 
                ${
                    index === 0 || index === services.length - 1
                        ? "bg-[#0862C8] text-white"
                        : "bg-white text-black"
                }
                ${
                    index === 1 || index === services.length - 1
                        ? "-translate-y-4 md:-translate-y-6"
                        : ""
                }
              `}
                        >
                            <div className="mb-4 text-4xl md:text-5xl">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">
                                {service.title}
                            </h3>
                            <p
                                className={`text-sm md:text-base ${
                                    index === 0 || index === services.length - 1
                                        ? "text-gray-100"
                                        : "text-gray-600"
                                }`}
                            >
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Video Modal */}
            {showVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 md:p-0">
                    <div className="bg-black rounded-lg overflow-hidden w-full md:w-3/4 lg:w-1/2 relative">
                        <button
                            onClick={() => setShowVideo(false)}
                            className="absolute top-3 right-3 text-white text-2xl md:text-3xl font-bold"
                        >
                            ✕
                        </button>

                        {/* Loading */}
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
                                <div className="loader border-t-4 border-indigo-600 rounded-full w-12 h-12 animate-spin"></div>
                            </div>
                        )}

                        <iframe
                            src="https://assets.pinterest.com/ext/embed.html?id=183943966025490563"
                            className="w-full h-[330px] border-none"
                            title="Skill Swap Embed"
                            scrolling="no"
                            onLoad={() => setIsLoading(false)}
                        ></iframe>
                    </div>
                </div>
            )}
        </section>
    );
};

export default HowItWorks;
