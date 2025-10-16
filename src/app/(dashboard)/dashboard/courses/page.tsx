"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    BookOpen,
    Users,
    Calendar,
    Plus,
    AlertCircle,
    Trash2,
    Edit,
    Eye,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { courseService, Course } from "@/lib/api/courseService";
import { toast } from "sonner";

export default function InstructorCoursesPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<Course[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (status === "loading") return;

        const userRole = (session?.user as any)?.role;
        if (!session || (userRole !== "instructor" && userRole !== "admin")) {
            router.push("/dashboard");
            return;
        }

        fetchCourses();
    }, [session, status, router]);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            setError(null);

            // Get instructor ID from session
            const instructorId = (session?.user as any)?.id;

            if (!instructorId) {
                setError("Instructor ID not found");
                return;
            }

            // Fetch courses including unpublished ones for instructor dashboard
            const response = await courseService.getInstructorCourses(
                instructorId,
                true // includeUnpublished
            );

            setCourses(response.courses);
        } catch (err: any) {
            console.error("Error fetching courses:", err);
            setError(err.response?.data?.error || "Failed to load courses");
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePublish = async (
        courseId: string,
        currentStatus: boolean
    ) => {
        try {
            await courseService.togglePublish(courseId, !currentStatus);
            toast.success(
                `Course ${
                    !currentStatus ? "published" : "unpublished"
                } successfully`
            );
            fetchCourses(); // Refresh courses
        } catch (err: any) {
            console.error("Error toggling publish status:", err);
            toast.error(
                err.response?.data?.error || "Failed to update course status"
            );
        }
    };

    const handleDeleteCourse = async (
        courseId: string,
        enrollmentCount: number
    ) => {
        if (enrollmentCount > 0) {
            toast.error(
                `Cannot delete course with ${enrollmentCount} active enrollments`
            );
            return;
        }

        if (!confirm("Are you sure you want to delete this course?")) {
            return;
        }

        try {
            await courseService.deleteCourse(courseId);
            toast.success("Course deleted successfully");
            fetchCourses(); // Refresh courses
        } catch (err: any) {
            console.error("Error deleting course:", err);
            toast.error(err.response?.data?.error || "Failed to delete course");
        }
    };

    if (loading || status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Error Loading Courses
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {error}
                        </p>
                        <button
                            onClick={fetchCourses}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const getStatusColor = (published: boolean) => {
        return published
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case "beginner":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
            case "intermediate":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
            case "advanced":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        My Courses
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage your courses and track student progress
                    </p>
                </div>
                <button
                    onClick={() => router.push("/dashboard/courses/create")}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Create Course
                </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Total Courses
                            </p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                {courses.length}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Published
                            </p>
                            <p className="text-3xl font-bold text-green-600">
                                {courses.filter((c) => c.published).length}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Total Students
                            </p>
                            <p className="text-3xl font-bold text-purple-600">
                                {courses.reduce(
                                    (sum, c) => sum + c.enrollmentCount,
                                    0
                                )}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Avg Rating
                            </p>
                            <p className="text-3xl font-bold text-yellow-600">
                                {courses.length > 0
                                    ? (
                                          courses.reduce(
                                              (sum, c) =>
                                                  sum + c.rating.average,
                                              0
                                          ) / courses.length
                                      ).toFixed(1)
                                    : "0.0"}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Courses Grid */}
            {courses.length === 0 ? (
                <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No courses yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Create your first course to get started
                    </p>
                    <button
                        onClick={() => router.push("/dashboard/courses/create")}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Create Course
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <Card
                            key={course._id}
                            className="hover:shadow-lg transition-shadow"
                        >
                            <CardHeader>
                                <div className="flex items-start justify-between mb-2">
                                    <BookOpen className="h-6 w-6 text-purple-600" />
                                    <div className="flex gap-2">
                                        <Badge
                                            className={getStatusColor(
                                                course.published
                                            )}
                                        >
                                            {course.published
                                                ? "Published"
                                                : "Draft"}
                                        </Badge>
                                        <Badge
                                            className={getLevelColor(
                                                course.level
                                            )}
                                        >
                                            {course.level}
                                        </Badge>
                                    </div>
                                </div>
                                <CardTitle className="line-clamp-2">
                                    {course.title}
                                </CardTitle>
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                    {course.description}
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <Users className="h-4 w-4" />
                                        <span>
                                            {course.enrollmentCount} students
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-500">
                                            ★
                                        </span>
                                        <span className="text-gray-900 dark:text-white font-medium">
                                            {course.rating.average.toFixed(1)}
                                        </span>
                                        <span className="text-gray-500">
                                            ({course.rating.count})
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>{course.duration}h</span>
                                    </div>
                                    <span className="font-semibold text-purple-600">
                                        {course.currency} {course.price}
                                    </span>
                                </div>

                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Created:{" "}
                                    {new Date(
                                        course.createdAt
                                    ).toLocaleDateString()}
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <button
                                        onClick={() =>
                                            router.push(
                                                `/dashboard/courses/${course._id}/edit`
                                            )
                                        }
                                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                                        title="Edit course"
                                    >
                                        <Edit className="h-3 w-3" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            router.push(
                                                `/courses/${course._id}`
                                            )
                                        }
                                        className="flex items-center justify-center gap-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                        title="View course"
                                    >
                                        <Eye className="h-3 w-3" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleTogglePublish(
                                                course._id,
                                                course.published
                                            )
                                        }
                                        className="flex items-center justify-center gap-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                        title={
                                            course.published
                                                ? "Unpublish"
                                                : "Publish"
                                        }
                                    >
                                        {course.published ? "📤" : "📥"}
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteCourse(
                                                course._id,
                                                course.enrollmentCount
                                            )
                                        }
                                        className="flex items-center justify-center px-3 py-2 text-sm border border-red-300 dark:border-red-600 text-red-600 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                        title="Delete course"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
