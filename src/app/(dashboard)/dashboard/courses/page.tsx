"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BookOpen, Users, Calendar, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function InstructorCoursesPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "loading") return;

        const userRole = (session?.user as any)?.role;
        if (!session || (userRole !== "instructor" && userRole !== "admin")) {
            router.push("/dashboard");
            return;
        }
        setLoading(false);
    }, [session, status, router]);

    if (loading || status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }

    const courses = [
        {
            id: "1",
            title: "Advanced React Patterns",
            students: 24,
            status: "active",
            progress: 65,
            nextSession: "Today, 3:00 PM",
        },
        {
            id: "2",
            title: "Node.js Fundamentals",
            students: 18,
            status: "active",
            progress: 40,
            nextSession: "Tomorrow, 10:00 AM",
        },
        {
            id: "3",
            title: "TypeScript Deep Dive",
            students: 32,
            status: "active",
            progress: 80,
            nextSession: "Dec 18, 2:00 PM",
        },
        {
            id: "4",
            title: "MongoDB Essentials",
            students: 15,
            status: "draft",
            progress: 0,
            nextSession: "Not scheduled",
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
            case "draft":
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
            case "completed":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
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
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <Plus className="h-4 w-4" />
                    Create Course
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <Card
                        key={course.id}
                        className="hover:shadow-lg transition-shadow"
                    >
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <BookOpen className="h-6 w-6 text-purple-600" />
                                <Badge
                                    className={getStatusColor(course.status)}
                                >
                                    {course.status}
                                </Badge>
                            </div>
                            <CardTitle className="mt-4">
                                {course.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <Users className="h-4 w-4" />
                                    <span>{course.students} students</span>
                                </div>
                                <span className="text-purple-600 font-medium">
                                    {course.progress}%
                                </span>
                            </div>

                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-purple-600 h-2 rounded-full transition-all"
                                    style={{ width: `${course.progress}%` }}
                                />
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Calendar className="h-4 w-4" />
                                <span>Next: {course.nextSession}</span>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button className="flex-1 px-3 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                    Manage
                                </button>
                                <button className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    View
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
