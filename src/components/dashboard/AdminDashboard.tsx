"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
    Users,
    ShieldCheck,
    Activity,
    AlertTriangle,
    TrendingUp,
    Database,
    Settings,
    UserCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState("overview");

    // Mock admin statistics
    const stats = {
        totalUsers: 12453,
        activeUsers: 8234,
        totalInstructors: 342,
        pendingApprovals: 28,
        reportedIssues: 15,
        systemHealth: 98,
        dailyActiveUsers: 3421,
        monthlyGrowth: 12.5,
    };

    const recentUsers = [
        {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            role: "user",
            status: "active",
            joined: "2 hours ago",
        },
        {
            id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
            role: "instructor",
            status: "pending",
            joined: "5 hours ago",
        },
        {
            id: "3",
            name: "Mike Johnson",
            email: "mike@example.com",
            role: "user",
            status: "active",
            joined: "1 day ago",
        },
    ];

    const systemAlerts = [
        {
            id: "1",
            type: "warning",
            message: "High server load detected",
            time: "10 minutes ago",
        },
        {
            id: "2",
            type: "info",
            message: "Database backup completed successfully",
            time: "1 hour ago",
        },
        {
            id: "3",
            type: "error",
            message: "Failed login attempts from suspicious IP",
            time: "2 hours ago",
        },
    ];

    const pendingActions = [
        {
            id: "1",
            type: "Instructor Application",
            user: "Sarah Wilson",
            priority: "high",
            submitted: "2 days ago",
        },
        {
            id: "2",
            type: "Content Report",
            user: "Alex Brown",
            priority: "medium",
            submitted: "3 days ago",
        },
        {
            id: "3",
            type: "Account Verification",
            user: "Emily Davis",
            priority: "low",
            submitted: "5 days ago",
        },
    ];

    const StatCard = ({
        title,
        value,
        icon: Icon,
        change,
        color,
        trend,
    }: {
        title: string;
        value: string | number;
        icon: any;
        change?: string;
        color: string;
        trend?: "up" | "down";
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
                    <p
                        className={`text-xs mt-1 ${
                            trend === "up"
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                        }`}
                    >
                        {change}
                    </p>
                )}
            </CardContent>
        </Card>
    );

    const getRoleColor = (role: string) => {
        switch (role) {
            case "admin":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
            case "instructor":
                return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
            default:
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
            case "pending":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
            case "suspended":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high":
                return "destructive";
            case "medium":
                return "default";
            case "low":
                return "secondary";
            default:
                return "default";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
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
                                Admin Dashboard 👑
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Welcome back, {session?.user?.name}! System
                                control center.
                            </p>
                        </div>
                        <div className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full font-semibold flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4" />
                            Admin Account
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Users"
                        value={stats.totalUsers.toLocaleString()}
                        icon={Users}
                        change={`+${stats.monthlyGrowth}% this month`}
                        color="text-blue-600"
                        trend="up"
                    />
                    <StatCard
                        title="Active Users"
                        value={stats.activeUsers.toLocaleString()}
                        icon={UserCheck}
                        change={`${stats.dailyActiveUsers} today`}
                        color="text-green-600"
                        trend="up"
                    />
                    <StatCard
                        title="Instructors"
                        value={stats.totalInstructors}
                        icon={Activity}
                        change="+8 new this week"
                        color="text-purple-600"
                        trend="up"
                    />
                    <StatCard
                        title="System Health"
                        value={`${stats.systemHealth}%`}
                        icon={TrendingUp}
                        change="All systems operational"
                        color="text-green-600"
                        trend="up"
                    />
                </div>

                {/* Action Required Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <Card className="border-orange-200 dark:border-orange-800">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-orange-600" />
                                Pending Actions ({stats.pendingApprovals})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {pendingActions.map((action) => (
                                <div
                                    key={action.id}
                                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant={getPriorityColor(
                                                    action.priority
                                                )}
                                            >
                                                {action.priority}
                                            </Badge>
                                            <span className="font-semibold text-sm text-gray-900 dark:text-white">
                                                {action.type}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            {action.user} • {action.submitted}
                                        </p>
                                    </div>
                                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                                        Review
                                    </button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="border-yellow-200 dark:border-yellow-800">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Database className="h-5 w-5 text-yellow-600" />
                                System Alerts ({systemAlerts.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {systemAlerts.map((alert) => (
                                <div
                                    key={alert.id}
                                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                >
                                    <div className="flex items-start gap-2">
                                        <Badge
                                            variant={
                                                alert.type === "error"
                                                    ? "destructive"
                                                    : alert.type === "warning"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                        >
                                            {alert.type}
                                        </Badge>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-900 dark:text-white">
                                                {alert.message}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {alert.time}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Tabs */}
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="space-y-6"
                >
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="users">User Management</TabsTrigger>
                        <TabsTrigger value="reports">Reports</TabsTrigger>
                        <TabsTrigger value="settings">
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent User Registrations</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {recentUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-gray-900 dark:text-white">
                                                        {user.name}
                                                    </span>
                                                    <Badge
                                                        className={getRoleColor(
                                                            user.role
                                                        )}
                                                    >
                                                        {user.role}
                                                    </Badge>
                                                    <Badge
                                                        className={getStatusColor(
                                                            user.status
                                                        )}
                                                    >
                                                        {user.status}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                    {user.email} • Joined{" "}
                                                    {user.joined}
                                                </p>
                                            </div>
                                            <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                                                View Profile
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="users" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>User Management</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 dark:text-gray-400">
                                    User management features coming soon...
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="reports" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Reported Issues ({stats.reportedIssues})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Issue reports and moderation tools coming
                                    soon...
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>System Settings</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 dark:text-gray-400">
                                    System configuration and settings coming
                                    soon...
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
