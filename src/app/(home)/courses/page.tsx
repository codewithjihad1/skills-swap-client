"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CourseCard from "@/components/CourseCard";
import { getCourses } from "@/services/courseService";
import { Course, CourseFilters } from "@/types/course";
import { Search, Filter, Loader2 } from "lucide-react";

function CoursesContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCourses, setTotalCourses] = useState(0);

    // Filter states
    const [filters, setFilters] = useState<CourseFilters>({
        page: Number(searchParams.get("page")) || 1,
        limit: Number(searchParams.get("limit")) || 12,
        category: searchParams.get("category") || "",
        level:
            (searchParams.get("level") as
                | "beginner"
                | "intermediate"
                | "advanced") || "",
        search: searchParams.get("search") || "",
        sortBy: (searchParams.get("sortBy") as any) || "createdAt",
        order: (searchParams.get("order") as "asc" | "desc") || "desc",
    });

    const [searchInput, setSearchInput] = useState(filters.search || "");

    // Fetch courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getCourses(filters);
                setCourses(data.courses);
                setTotalPages(data.totalPages);
                setTotalCourses(data.totalCourses);
            } catch (err) {
                setError("Failed to load courses. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [filters]);

    // Update URL params
    const updateFilters = (newFilters: Partial<CourseFilters>) => {
        const updated = { ...filters, ...newFilters, page: 1 };
        setFilters(updated);

        const params = new URLSearchParams();
        Object.entries(updated).forEach(([key, value]) => {
            if (value) params.set(key, value.toString());
        });
        router.push(`/courses?${params.toString()}`);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateFilters({ search: searchInput });
    };

    const handlePageChange = (page: number) => {
        setFilters((prev) => ({ ...prev, page }));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Explore Courses
                    </h1>
                    <p className="text-gray-600">
                        Discover {totalCourses} courses to boost your skills
                    </p>
                </div>

                {/* Filters Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search courses..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </form>

                    {/* Filter Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={filters.category}
                                onChange={(e) =>
                                    updateFilters({ category: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Categories</option>
                                <option value="Web Development">
                                    Web Development
                                </option>
                                <option value="Mobile Development">
                                    Mobile Development
                                </option>
                                <option value="Data Science">
                                    Data Science
                                </option>
                                <option value="Design">Design</option>
                                <option value="Business">Business</option>
                            </select>
                        </div>

                        {/* Level Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Level
                            </label>
                            <select
                                value={filters.level}
                                onChange={(e) =>
                                    updateFilters({
                                        level: e.target.value as any,
                                    })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Levels</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">
                                    Intermediate
                                </option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>

                        {/* Sort By */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sort By
                            </label>
                            <select
                                value={filters.sortBy}
                                onChange={(e) =>
                                    updateFilters({
                                        sortBy: e.target.value as any,
                                    })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="createdAt">Latest</option>
                                <option value="title">Title</option>
                                <option value="price">Price</option>
                                <option value="rating.average">Rating</option>
                            </select>
                        </div>

                        {/* Order */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Order
                            </label>
                            <select
                                value={filters.order}
                                onChange={(e) =>
                                    updateFilters({
                                        order: e.target.value as "asc" | "desc",
                                    })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="desc">Descending</option>
                                <option value="asc">Ascending</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
                        {error}
                    </div>
                )}

                {/* Courses Grid */}
                {!loading && !error && courses.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                            {courses?.map((course) => (
                                <CourseCard key={course._id} course={course} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center items-center space-x-2">
                            <button
                                onClick={() =>
                                    handlePageChange(filters.page! - 1)
                                }
                                disabled={filters.page === 1}
                                className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Previous
                            </button>

                            <div className="flex space-x-1">
                                {Array.from(
                                    { length: totalPages },
                                    (_, i) => i + 1
                                ).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-4 py-2 rounded-md ${
                                            filters.page === page
                                                ? "bg-blue-600 text-white"
                                                : "border border-gray-300 hover:bg-gray-50"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() =>
                                    handlePageChange(filters.page! + 1)
                                }
                                disabled={filters.page === totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}

                {/* Empty State */}
                {!loading && !error && courses.length === 0 && (
                    <div className="text-center py-20">
                        <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No courses found
                        </h3>
                        <p className="text-gray-600">
                            Try adjusting your filters or search query
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function CoursesPage() {
    return (
        <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
            <CoursesContent />
        </Suspense>
    );
}
