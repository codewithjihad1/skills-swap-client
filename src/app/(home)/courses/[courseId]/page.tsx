"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import {
    Star,
    Clock,
    Users,
    BookOpen,
    CheckCircle,
    Play,
    Heart,
} from "lucide-react";
import axiosInstance from "@/axios/axiosInstance";

const fetchCourse = async (courseId: string) => {
    const res = await axiosInstance.get(
        `http://localhost:5000/api/courses/${courseId}`
    );
    if (res.status !== 200) throw new Error("Failed to fetch course data");
    return res.data.course as any;
};

export default function CoursePage() {
    const { courseId } = useParams() as { courseId: string };
    const [activeTab, setActiveTab] = useState("overview");
    const [isWishlisted, setIsWishlisted] = useState(false);

    const {
        data: course,
        isLoading,
        error,
    } = useQuery<any, Error>({
        queryKey: ["course", courseId],
        queryFn: () => fetchCourse(courseId),
        enabled: !!courseId,
    });

    if (isLoading)
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    if (error || !course)
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                Error loading course!
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative bg-secondary text-white">
                <div className="max-w-6xl mx-auto px-4 py-12 lg:py-16 grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <div className="inline-block bg-blue-400 bg-opacity-30 px-3 py-1 rounded-full mb-4">
                            <span className="text-sm font-semibold">
                                {course.category || "Category"}
                            </span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                            {course.title}
                        </h1>
                        <p className="text-lg text-blue-100 mb-6">
                            {course.description}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        className={
                                            i <
                                            Math.round(
                                                course.rating?.average || 0
                                            )
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-400"
                                        }
                                    />
                                ))}
                            </div>
                            <span className="text-sm">
                                {course.rating?.average || 0} (
                                {course.rating?.count || 0} reviews)
                            </span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {course.tags && course.tags.length > 0 ? (
                                course.tags.map((tag: string, i: number) => (
                                    <span
                                        key={i}
                                        className="border border-white bg-opacity-20 px-3 py-1 rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))
                            ) : (
                                <span className="text-white text-sm">
                                    No tags
                                </span>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <Link
                                href={`/courses/${courseId}/checkout`}
                                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                            >
                                Enroll Now
                            </Link>
                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className="bg-opacity-20 text-white px-4 py-3 rounded-lg font-semibold hover:bg-opacity-30 transition flex items-center gap-2"
                            >
                                <Heart
                                    size={20}
                                    className={
                                        isWishlisted ? "fill-current" : ""
                                    }
                                />{" "}
                                Wishlist
                            </button>
                        </div>
                    </div>

                    {/* Thumbnail */}
                    <div className="relative">
                        <div className="rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={course.thumbnail}
                                alt={course.title}
                                width={600}
                                height={400}
                                className="w-full h-96 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center hover:bg-opacity-40 transition cursor-pointer">
                                <Play
                                    size={64}
                                    className="text-white fill-white"
                                />
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 w-48">
                            <p className="text-sm text-gray-600 mb-2">
                                Best for beginners
                            </p>
                            <p className="text-3xl font-bold text-blue-600">
                                ${course.price}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-6">
                {[
                    {
                        icon: Clock,
                        label: "Duration",
                        value: `${course.duration || 0} hours`,
                    },
                    {
                        icon: Users,
                        label: "Enrolled",
                        value: `${course.enrollmentCount || 0}+ students`,
                    },
                    {
                        icon: BookOpen,
                        label: "Level",
                        value: course.level || "N/A",
                    },
                    {
                        icon: Star,
                        label: "Rating",
                        value: `${course.rating?.average || 0}/5`,
                    },
                ].map((stat, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition flex flex-col items-center text-center"
                    >
                        <stat.icon size={28} className="text-blue-600 mb-2" />
                        <p className="text-gray-600 text-sm">{stat.label}</p>
                        <p className="font-bold text-gray-900 text-lg">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="max-w-6xl mx-auto px-4 py-8 bg-white rounded-xl shadow-lg">
                <div className="flex border-b border-gray-200">
                    {["overview", "syllabus", "requirements"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 text-center font-semibold transition ${
                                activeTab === tab
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="mt-6">
                    {activeTab === "overview" && (
                        <div>
                            <h3 className="text-2xl font-bold mb-4">
                                What you'll learn
                            </h3>
                            {course.learningOutcomes &&
                            course.learningOutcomes.length > 0 ? (
                                <div className="grid md:grid-cols-2 gap-4">
                                    {course.learningOutcomes.map(
                                        (item: string, i: number) => (
                                            <div
                                                key={i}
                                                className="flex gap-3 items-start"
                                            >
                                                <CheckCircle
                                                    className="text-green-500 mt-1"
                                                    size={20}
                                                />
                                                <p className="text-gray-700">
                                                    {item}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-500">
                                    No learning outcomes available.
                                </p>
                            )}
                        </div>
                    )}

                    {activeTab === "syllabus" && (
                        <div>
                            <h3 className="text-2xl font-bold mb-4">
                                Course Syllabus
                            </h3>
                            {course.syllabus && course.syllabus.length > 0 ? (
                                <div className="space-y-4">
                                    {course.syllabus.map(
                                        (week: any, i: number) => (
                                            <div
                                                key={i}
                                                className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition"
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <h4 className="text-lg font-bold text-gray-900">
                                                        Week {week.week}:{" "}
                                                        {week.title}
                                                    </h4>
                                                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                                                        {week.duration} hrs
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {week.topics &&
                                                    week.topics.length > 0 ? (
                                                        week.topics.map(
                                                            (
                                                                topic: string,
                                                                j: number
                                                            ) => (
                                                                <span
                                                                    key={j}
                                                                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                                                                >
                                                                    {topic}
                                                                </span>
                                                            )
                                                        )
                                                    ) : (
                                                        <span className="text-gray-500 text-sm">
                                                            No topics available
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-500">
                                    No syllabus available for this course.
                                </p>
                            )}
                        </div>
                    )}

                    {activeTab === "requirements" && (
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                Prerequisites
                            </h3>
                            {course.prerequisites &&
                            course.prerequisites.length > 0 ? (
                                <ul className="list-disc list-inside text-gray-700">
                                    {course.prerequisites.map(
                                        (req: string, i: number) => (
                                            <li key={i}>{req}</li>
                                        )
                                    )}
                                </ul>
                            ) : (
                                <p className="text-gray-500">
                                    No prerequisites listed.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Instructor */}
            {course.instructor && (
                <div className="max-w-6xl mx-auto px-4 py-12 bg-white rounded-xl shadow-lg mt-8">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">
                        Your Instructor
                    </h3>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <Image
                            src={course.instructor.avatar}
                            alt={course.instructor.name}
                            width={128}
                            height={128}
                            className="w-32 h-32 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900">
                                {course.instructor.name}
                            </h4>
                            <p className="text-gray-600 mb-3">
                                {course.instructor.bio}
                            </p>
                            <div className="flex gap-4 mt-2">
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                                    View Profile
                                </button>
                                <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition">
                                    Follow
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
