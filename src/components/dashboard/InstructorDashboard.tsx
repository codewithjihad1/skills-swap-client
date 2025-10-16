"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
    BookOpen,
    Users,
    TrendingUp,
    Calendar,
    Award,
    MessageSquare,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function InstructorDashboard() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState("overview");

    // Mock data for instructor
    const stats = {
        totalStudents: 156,
        activeCourses: 8,
        completionRate: 87,
        averageRating: 4.8,
        totalEarnings: 12450,
        thisMonthEarnings: 2340,
    };

    const upcomingClasses = [
        {
            id: "1",
            title: "Advanced React Patterns",
            students: 24,
            date: "Today, 3:00 PM",
            duration: "2 hours",
        },
        {
            id: "2",
            title: "Node.js Fundamentals",
            students: 18,
            date: "Tomorrow, 10:00 AM",
            duration: "1.5 hours",
        },
        {
            id: "3",
            title: "TypeScript Deep Dive",
            students: 32,
            date: "Dec 18, 2:00 PM",
            duration: "2 hours",
        },
    ];

    const recentActivity = [
        {
            id: "1",
            student: "Sarah Chen",
            action: "completed",
            course: "React Hooks Masterclass",
            time: "2 hours ago",
        },
        {
            id: "2",
            student: "Mike Johnson",
            action: "enrolled",
            course: "Advanced TypeScript",
            time: "5 hours ago",
        },
        {
            id: "3",
            student: "Emma Wilson",
            action: "rated 5 stars",
            course: "Node.js Fundamentals",
            time: "1 day ago",
        },
    ];

    const StatCard = ({
        title,
        value,
        icon: Icon,
        change,
        color,
    }: {
        title: string;
        value: string | number;
        icon: any;
        change?: string;
        color: string;
    }) => (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${color}`} />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {value}
                </div>
                {change && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                        {change}
                    </p>
                )}
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                Instructor Dashboard 👨‍🏫
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Welcome back, {session?.user?.name}! Manage your
                                courses and students.
                            </p>
                        </div>
                        <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full font-semibold">
                            Instructor Account
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        title="Total Students"
                        value={stats.totalStudents}
                        icon={Users}
                        change="+12 this month"
                        color="text-blue-600"
                    />
                    <StatCard
                        title="Active Courses"
                        value={stats.activeCourses}
                        icon={BookOpen}
                        change="+2 new courses"
                        color="text-green-600"
                    />
                    <StatCard
                        title="Completion Rate"
                        value={`${stats.completionRate}%`}
                        icon={TrendingUp}
                        change="+5% from last month"
                        color="text-purple-600"
                    />
                    <StatCard
                        title="Average Rating"
                        value={stats.averageRating}
                        icon={Award}
                        color="text-yellow-600"
                    />
                    <StatCard
                        title="This Month Earnings"
                        value={`$${stats.thisMonthEarnings}`}
                        icon={TrendingUp}
                        change="+18% from last month"
                        color="text-green-600"
                    />
                    <StatCard
                        title="Total Earnings"
                        value={`$${stats.totalEarnings}`}
                        icon={Award}
                        color="text-blue-600"
                    />
                </div>

                {/* Main Content Tabs */}
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="space-y-6"
                >
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="classes">
                            Upcoming Classes
                        </TabsTrigger>
                        <TabsTrigger value="activity">
                            Recent Activity
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Upcoming Classes Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-purple-600" />
                                        Next 3 Classes
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {upcomingClasses.slice(0, 3).map((cls) => (
                                        <div
                                            key={cls.id}
                                            className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                        >
                                            <h4 className="font-semibold text-gray-900 dark:text-white">
                                                {cls.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                {cls.students} students •{" "}
                                                {cls.duration}
                                            </p>
                                            <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                                                {cls.date}
                                            </p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Recent Activity Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MessageSquare className="h-5 w-5 text-blue-600" />
                                        Recent Activity
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {recentActivity.map((activity) => (
                                        <div
                                            key={activity.id}
                                            className="flex items-start gap-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                                        >
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-900 dark:text-white">
                                                    <span className="font-semibold">
                                                        {activity.student}
                                                    </span>{" "}
                                                    {activity.action}{" "}
                                                    <span className="text-purple-600 dark:text-purple-400">
                                                        {activity.course}
                                                    </span>
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    {activity.time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="classes" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>All Upcoming Classes</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {upcomingClasses.map((cls) => (
                                    <div
                                        key={cls.id}
                                        className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                                    {cls.title}
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                    {cls.students} students •{" "}
                                                    {cls.duration}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                                                    {cls.date}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="activity" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>All Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {recentActivity.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                    >
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-900 dark:text-white">
                                                <span className="font-semibold">
                                                    {activity.student}
                                                </span>{" "}
                                                {activity.action}{" "}
                                                <span className="text-purple-600 dark:text-purple-400">
                                                    {activity.course}
                                                </span>
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {activity.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
