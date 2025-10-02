"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, BookOpen, ChevronDown, Loader2 } from "lucide-react";
import SkillCard from "@/components/ui/components/custom-components/SkillCard";

// Types
interface User {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface Skill {
    _id: string;
    title: string;
    description: string;
    category: string;
    proficiency: "Beginner" | "Intermediate" | "Advanced";
    tags: string[];
    userId: User;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

interface ApiResponse {
    skills: Skill[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
    filters: {
        category: string | null;
        proficiency: string | null;
        search: string | null;
    };
}

export default function ExploreSkillsSection() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedProficiency, setSelectedProficiency] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    const categories = [
        "All",
        "Technology",
        "Creative",
        "Design",
        "Marketing",
        "Business",
        "Education",
    ];
    const proficiencyLevels = ["All", "Beginner", "Intermediate", "Advanced"];

    // Fetch skills from API
    const fetchSkills = async (
        page = 1,
        category = "",
        proficiency = "",
        search = ""
    ) => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (page > 1) params.append("page", page.toString());
            if (category && category !== "All")
                params.append("category", category);
            if (proficiency && proficiency !== "All")
                params.append("proficiency", proficiency);
            if (search) params.append("search", search);

            const response = await fetch(
                `https://skills-swap-server.vercel.app/api/skills?${params}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch skills");
            }

            const data: ApiResponse = await response.json();

            if (page === 1) {
                setSkills(data.skills);
            } else {
                setSkills((prev) => [...prev, ...data.skills]);
            }

            setTotalPages(data.pagination.pages);
            setCurrentPage(data.pagination.page);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchSkills();
    }, []);

    // Handle search and filters
    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            fetchSkills(1, selectedCategory, selectedProficiency, searchTerm);
        }, 500);

        return () => clearTimeout(delayedSearch);
    }, [searchTerm, selectedCategory, selectedProficiency]);

    // Load more skills
    const loadMoreSkills = () => {
        if (currentPage < totalPages) {
            fetchSkills(
                currentPage + 1,
                selectedCategory,
                selectedProficiency,
                searchTerm
            );
        }
    };

    // Get proficiency color
    const getProficiencyColor = (level: string) => {
        switch (level.toLowerCase()) {
            case "beginner":
                return "bg-green-100 text-green-800 border-green-200";
            case "intermediate":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "advanced":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    // Get category color
    const getCategoryColor = (category: string) => {
        const colors = {
            Technology: "bg-blue-600",
            Creative: "bg-purple-600",
            Design: "bg-pink-600",
            Marketing: "bg-orange-600",
            Business: "bg-green-600",
            Education: "bg-indigo-600",
        };
        return colors[category as keyof typeof colors] || "bg-gray-600";
    };

    // Generate avatar initials
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-xl mb-4">⚠️</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Error Loading Skills
                    </h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => fetchSkills()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Explore{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Skills
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Discover amazing skills from talented individuals around
                        the world. Connect, learn, and grow together.
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search skills, technologies, or keywords..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        {/* Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            <Filter className="w-4 h-4" />
                            Filters
                            <ChevronDown
                                className={`w-4 h-4 transition-transform ${
                                    showFilters ? "rotate-180" : ""
                                }`}
                            />
                        </button>
                    </div>

                    {/* Filters */}
                    <div
                        className={`mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 ${
                            showFilters ? "block" : "hidden lg:grid"
                        }`}
                    >
                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value)
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Proficiency Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Proficiency Level
                            </label>
                            <select
                                value={selectedProficiency}
                                onChange={(e) =>
                                    setSelectedProficiency(e.target.value)
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                {proficiencyLevels.map((level) => (
                                    <option key={level} value={level}>
                                        {level}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && skills.length === 0 && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                        <span className="ml-2 text-gray-600">
                            Loading amazing skills...
                        </span>
                    </div>
                )}

                {/* Skills Grid */}
                {skills.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {skills.map((skill) => (
                            <SkillCard
                                key={skill._id}
                                skill={skill}
                                getCategoryColor={getCategoryColor}
                                getProficiencyColor={getProficiencyColor}
                                getInitials={getInitials}
                            />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {skills.length === 0 && !loading && (
                    <div className="text-center py-20">
                        <div className="text-gray-400 text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">
                            No Skills Found
                        </h3>
                        <p className="text-gray-600">
                            Try adjusting your search or filters to find more
                            skills.
                        </p>
                    </div>
                )}

                {/* Load More Button */}
                {currentPage < totalPages && (
                    <div className="text-center">
                        <button
                            onClick={loadMoreSkills}
                            disabled={loading}
                            className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Load More Skills"
                            )}
                        </button>
                    </div>
                )}

                {/* Stats Section */}
                <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-blue-600 mb-2">
                                {skills.length}+
                            </div>
                            <p className="text-gray-600">Skills Available</p>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-purple-600 mb-2">
                                50+
                            </div>
                            <p className="text-gray-600">Expert Instructors</p>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-green-600 mb-2">
                                1000+
                            </div>
                            <p className="text-gray-600">Happy Learners</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
