"use client";

import React, { Suspense, useState } from "react";
import {
    Search,
    Loader2,
    TrendingUp,
    Users,
    Award,
    X,
} from "lucide-react";
import SkillCard from "@/components/ui/components/custom-components/SkillCard";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axios/axiosInstance";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSearchParams, useRouter } from "next/navigation";

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

interface SkillFilters {
    search?: string;
    category?: string;
    proficiency?: string;
}

function ExploreSkillsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initialize state from URL params
    const [searchInput, setSearchInput] = useState(
        searchParams.get("search") || ""
    );
    const [selectedCategory, setSelectedCategory] = useState(
        searchParams.get("category") || "All"
    );
    const [selectedProficiency, setSelectedProficiency] = useState(
        searchParams.get("proficiency") || "All"
    );

    // Filters used for API call (only update on submit/change)
    const [activeFilters, setActiveFilters] = useState({
        search: searchParams.get("search") || "",
        category: searchParams.get("category") || "All",
        proficiency: searchParams.get("proficiency") || "All",
    });

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

    // Build query params for API
    const buildQueryParams = () => {
        const params = new URLSearchParams();

        if (activeFilters.search && activeFilters.search !== "") {
            params.append("search", activeFilters.search);
        }

        if (activeFilters.category !== "All") {
            params.append("category", activeFilters.category);
        }

        if (activeFilters.proficiency !== "All") {
            params.append("proficiency", activeFilters.proficiency);
        }

        return params.toString();
    };

    // get skills with filters
    const {
        data: skills,
        isLoading: loading,
        isError: error,
        refetch: fetchSkills,
    } = useQuery({
        queryKey: [
            "skills",
            activeFilters.search,
            activeFilters.category,
            activeFilters.proficiency,
        ],
        queryFn: async () => {
            const queryParams = buildQueryParams();
            const url = queryParams
                ? `/api/skills?${queryParams}`
                : "/api/skills";
            return await axiosInstance.get(url);
        },
    });

    // Update URL params and active filters
    const updateFilters = (
        newSearch?: string,
        newCategory?: string,
        newProficiency?: string
    ) => {
        const search =
            newSearch !== undefined ? newSearch : activeFilters.search;
        const category =
            newCategory !== undefined ? newCategory : activeFilters.category;
        const proficiency =
            newProficiency !== undefined
                ? newProficiency
                : activeFilters.proficiency;

        // Update active filters
        setActiveFilters({
            search,
            category,
            proficiency,
        });

        // Update URL without causing full page reload
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (category !== "All") params.set("category", category);
        if (proficiency !== "All") params.set("proficiency", proficiency);

        const newUrl = params.toString()
            ? `/explore-skills?${params.toString()}`
            : "/explore-skills";
        window.history.replaceState({}, "", newUrl);
    };

    // Handle search submission
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateFilters(
            searchInput,
            activeFilters.category,
            activeFilters.proficiency
        );
    };

    // Handle category change
    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        updateFilters(activeFilters.search, value, activeFilters.proficiency);
    };

    // Handle proficiency change
    const handleProficiencyChange = (value: string) => {
        setSelectedProficiency(value);
        updateFilters(activeFilters.search, activeFilters.category, value);
    };

    // Clear all filters
    const clearFilters = () => {
        setSearchInput("");
        setSelectedCategory("All");
        setSelectedProficiency("All");
        setActiveFilters({
            search: "",
            category: "All",
            proficiency: "All",
        });
        window.history.replaceState({}, "", "/explore-skills");
    };

    // Check if any filters are active
    const hasActiveFilters =
        activeFilters.search ||
        activeFilters.category !== "All" ||
        activeFilters.proficiency !== "All";
    const resultsCount = skills?.data?.length || 0;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    // Get proficiency color
    const getProficiencyColor = (level: string) => {
        switch (level.toLowerCase()) {
            case "beginner":
                return "bg-[#B0EACD]/20 text-[#007a3f] border-[#B0EACD]";
            case "intermediate":
                return "bg-[#21BF73]/20 text-[#007a3f] border-[#21BF73]";
            case "advanced":
                return "bg-[#007a3f]/20 text-[#007a3f] border-[#007a3f]";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    // Get category color
    const getCategoryColor = (category: string) => {
        const colors = {
            Technology: "bg-[#21BF73]",
            Creative: "bg-[#007a3f]",
            Design: "bg-[#B0EACD] text-[#007a3f]",
            Marketing: "bg-gradient-to-r from-[#21BF73] to-[#007a3f]",
            Business: "bg-[#007a3f]",
            Education: "bg-[#21BF73]",
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

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-white via-[#B0EACD]/10 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-[#21BF73]/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#007a3f]/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#B0EACD]/30 rounded-full blur-3xl animate-pulse delay-500" />
            </div>

            <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4"
                >
                    <h1 className="text-3xl lg:text-4xl font-bold mb-1">
                        <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                            Explore Amazing{" "}
                        </span>
                        <span className="bg-gradient-to-r from-[#21BF73] to-[#007a3f] bg-clip-text text-transparent">
                            Skills
                        </span>
                    </h1>

                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        Discover new skills to boost your skills
                    </p>
                </motion.div>

                {/* Search and Filter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                >
                    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-[#21BF73]/20 shadow-lg">
                        <CardContent className="p-6">
                            {/* Search Bar */}
                            <form onSubmit={handleSearch} className="mb-6">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        type="text"
                                        placeholder="Search skills, technologies, or keywords..."
                                        value={searchInput}
                                        onChange={(e) =>
                                            setSearchInput(e.target.value)
                                        }
                                        className="pl-12 pr-12 h-12 border-2 focus:border-[#21BF73] focus:ring-[#21BF73] text-base"
                                    />
                                    {searchInput && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSearchInput("");
                                                updateFilters(
                                                    "",
                                                    activeFilters.category,
                                                    activeFilters.proficiency
                                                );
                                            }}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                            aria-label="Clear search"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </form>

                            {/* Filter Options */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Category Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Category
                                    </label>
                                    <Select
                                        value={selectedCategory}
                                        onValueChange={handleCategoryChange}
                                    >
                                        <SelectTrigger className="h-10 border-2 focus:border-[#21BF73] focus:ring-[#21BF73]">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category}
                                                    value={category}
                                                >
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Proficiency Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Proficiency Level
                                    </label>
                                    <Select
                                        value={selectedProficiency}
                                        onValueChange={handleProficiencyChange}
                                    >
                                        <SelectTrigger className="h-10 border-2 focus:border-[#21BF73] focus:ring-[#21BF73]">
                                            <SelectValue placeholder="Select level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {proficiencyLevels.map((level) => (
                                                <SelectItem
                                                    key={level}
                                                    value={level}
                                                >
                                                    {level}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Active Filters Display */}
                    {hasActiveFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 flex items-center justify-between py-3 px-4 bg-[#B0EACD]/10 border border-[#21BF73]/20 rounded-lg"
                        >
                            <div className="flex items-center gap-2 flex-wrap text-sm text-gray-600 dark:text-gray-400">
                                <span className="font-medium">
                                    {loading
                                        ? "Searching..."
                                        : `${resultsCount} ${
                                              resultsCount === 1
                                                  ? "result"
                                                  : "results"
                                          } found`}
                                </span>
                                {activeFilters.search && (
                                    <Badge
                                        variant="secondary"
                                        className="bg-[#21BF73]/10 text-[#007a3f] border-[#21BF73]/30"
                                    >
                                        Search: {activeFilters.search}
                                    </Badge>
                                )}
                                {activeFilters.category !== "All" && (
                                    <Badge
                                        variant="secondary"
                                        className="bg-[#21BF73]/10 text-[#007a3f] border-[#21BF73]/30"
                                    >
                                        Category: {activeFilters.category}
                                    </Badge>
                                )}
                                {activeFilters.proficiency !== "All" && (
                                    <Badge
                                        variant="secondary"
                                        className="bg-[#21BF73]/10 text-[#007a3f] border-[#21BF73]/30"
                                    >
                                        Level: {activeFilters.proficiency}
                                    </Badge>
                                )}
                            </div>
                            <Button
                                onClick={clearFilters}
                                variant="ghost"
                                size="sm"
                                className="text-[#007a3f] hover:bg-[#21BF73]/10 shrink-0"
                            >
                                <X className="w-4 h-4 mr-1" />
                                Clear All
                            </Button>
                        </motion.div>
                    )}
                </motion.div>

                {/* Skills Grid */}
                {skills && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
                    >
                        {skills?.data.map((skill: any) => (
                            <motion.div key={skill._id} variants={itemVariants}>
                                <SkillCard
                                    skill={skill}
                                    getCategoryColor={getCategoryColor}
                                    getProficiencyColor={getProficiencyColor}
                                    getInitials={getInitials}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {loading && !skills && (
                    <div className="min-h-screen bg-gradient-to-br from-white via-[#B0EACD]/10 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#21BF73] to-[#007a3f] animate-pulse" />
                                <Loader2 className="w-12 h-12 animate-spin text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                            </div>
                            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                Loading amazing skills...
                            </span>
                        </motion.div>
                    </div>
                )}

                {/* Empty State */}
                {!skills && !loading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-dashed border-gray-300 dark:border-gray-600">
                            <CardContent className="text-center py-20">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#21BF73]/20 to-[#007a3f]/20 flex items-center justify-center">
                                    <Search className="w-10 h-10 text-[#21BF73]" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    No Skills Found
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                                    Try adjusting your search or filters to find
                                    more skills.
                                </p>
                                <Button
                                    onClick={clearFilters}
                                    className="mt-6 bg-gradient-to-r from-[#21BF73] to-[#007a3f] hover:from-[#007a3f] hover:to-[#21BF73] text-white"
                                >
                                    Clear Filters
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16"
                >
                    <Card className="bg-gradient-to-br from-[#21BF73]/10 via-white to-[#B0EACD]/10 dark:from-[#21BF73]/5 dark:via-gray-800 dark:to-[#B0EACD]/5 border-2 border-[#21BF73]/30 shadow-xl">
                        <CardContent className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Skills Available */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.6, type: "spring" }}
                                    className="text-center"
                                >
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#21BF73] to-[#007a3f] flex items-center justify-center">
                                        <TrendingUp className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="text-4xl font-bold bg-gradient-to-r from-[#21BF73] to-[#007a3f] bg-clip-text text-transparent mb-2">
                                        {skills?.data?.length || 0}+
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                                        Skills Available
                                    </p>
                                </motion.div>

                                {/* Expert Instructors */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.7, type: "spring" }}
                                    className="text-center"
                                >
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#007a3f] to-[#21BF73] flex items-center justify-center">
                                        <Award className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="text-4xl font-bold bg-gradient-to-r from-[#007a3f] to-[#21BF73] bg-clip-text text-transparent mb-2">
                                        50+
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                                        Expert Instructors
                                    </p>
                                </motion.div>

                                {/* Happy Learners */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.8, type: "spring" }}
                                    className="text-center"
                                >
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#21BF73] to-[#B0EACD] flex items-center justify-center">
                                        <Users className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="text-4xl font-bold bg-gradient-to-r from-[#21BF73] to-[#007a3f] bg-clip-text text-transparent mb-2">
                                        1000+
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                                        Happy Learners
                                    </p>
                                </motion.div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}

export default function ExploreSkillsSection() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-[#21BF73] mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">
                            Loading skills...
                        </p>
                    </div>
                </div>
            }
        >
            <ExploreSkillsContent />
        </Suspense>
    );
}
