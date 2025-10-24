"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
    Users,
    ShieldCheck,
    Activity,
    TrendingUp,
    BookOpen,
    UserCheck,
    DollarSign,
    Award,
    GraduationCap,
    BarChart3,
    PieChart as PieChartIcon,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAdminStats, useSystemStats, useAllUsers } from "@/lib/api/admin";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

export default function AdminDashboard() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState("overview");

    const {
        data: adminStats,
        isLoading: statsLoading,
        error: statsError,
    } = useAdminStats();

    const {
        data: systemStats,
        isLoading: systemLoading,
        error: systemError,
    } = useSystemStats();

    const {
        data: usersData,
        isLoading: usersLoading,
        error: usersError,
    } = useAllUsers({ limit: 10, page: 1 });

    // Prepare chart data
    const enrollmentChartData = useMemo(() => {
        if (!systemStats?.monthlyEnrollments) return [];

        return systemStats.monthlyEnrollments.map((item) => ({
            month: `${item._id.month}/${item._id.year}`,
            enrollments: item.count,
        }));
    }, [systemStats]);

    const userGrowthData = useMemo(() => {
        if (!systemStats?.userGrowth) return [];

        return systemStats.userGrowth.map((item) => ({
            month: `${item._id.month}/${item._id.year}`,
            users: item.count,
        }));
    }, [systemStats]);

    const categoryData = useMemo(() => {
        if (!systemStats?.categoryDistribution) return [];

        const COLORS = [
            "var(--color-primary)",
            "var(--color-secondary)",
            "var(--color-accent)",
            "#6366f1",
            "#8b5cf6",
        ];

        return systemStats.categoryDistribution.map((item, index) => ({
            name: item._id || "Uncategorized",
            value: item.totalEnrollments,
            count: item.count,
            fill: COLORS[index % COLORS.length],
        }));
    }, [systemStats]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-BD", {
            style: "currency",
            currency: "BDT",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const StatCard = ({
        title,
        value,
        icon: Icon,
        change,
        color,
        trend,
        loading,
    }: {
        title: string;
        value: string | number;
        icon: any;
        change?: string;
        color: string;
        trend?: "up" | "down";
        loading?: boolean;
    }) => (
        <Card
            className="hover:shadow-lg transition-shadow border-l-4"
            style={{ borderLeftColor: color }}
        >
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Icon className="h-4 w-4" style={{ color }} />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <Skeleton className="h-8 w-32" />
                ) : (
                    <>
                        <div className="text-3xl font-bold" style={{ color }}>
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
                    </>
                )}
            </CardContent>
        </Card>
    );

    const getRoleColor = (role: string) => {
        switch (role) {
            case "admin":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
            case "instructor":
                return "bg-[var(--color-primary)]/20 text-[var(--color-primary)]";
            default:
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                        Admin Dashboard
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Welcome back, {session?.user?.name}! System control
                        center.
                    </p>
                </div>
                <Badge className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white px-4 py-2">
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    Admin Account
                </Badge>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Users"
                    value={
                        adminStats?.totalStudents
                            ? (
                                  adminStats.totalStudents +
                                  adminStats.totalInstructors
                              ).toLocaleString()
                            : "0"
                    }
                    icon={Users}
                    change={`${
                        adminStats?.recentEnrollments || 0
                    } new this week`}
                    color="var(--color-primary)"
                    trend="up"
                    loading={statsLoading}
                />
                <StatCard
                    title="Active Students"
                    value={adminStats?.activeStudents.toLocaleString() || "0"}
                    icon={UserCheck}
                    change={`${adminStats?.totalEnrollments || 0} enrollments`}
                    color="var(--color-secondary)"
                    trend="up"
                    loading={statsLoading}
                />
                <StatCard
                    title="Instructors"
                    value={adminStats?.totalInstructors || 0}
                    icon={GraduationCap}
                    change={`${adminStats?.activeCourses || 0} active courses`}
                    color="var(--color-accent)"
                    trend="up"
                    loading={statsLoading}
                />
                <StatCard
                    title="Total Revenue"
                    value={formatCurrency(adminStats?.totalEarnings || 0)}
                    icon={DollarSign}
                    change={`${formatCurrency(
                        adminStats?.thisMonthEarnings || 0
                    )} this month`}
                    color="#f59e0b"
                    trend="up"
                    loading={statsLoading}
                />
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-l-4 border-l-[var(--color-primary)]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            Total Courses
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <div className="text-2xl font-bold text-[var(--color-primary)]">
                                {adminStats?.totalCourses || 0}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-[var(--color-secondary)]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Activity className="w-4 h-4" />
                            Completion Rate
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <div className="text-2xl font-bold text-[var(--color-secondary)]">
                                {adminStats?.completionRate || 0}%
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-[var(--color-accent)]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            Average Rating
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <div className="text-2xl font-bold text-[var(--color-accent)]">
                                {adminStats?.averageRating.toFixed(1) || "0.0"}{" "}
                                ⭐
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Active Courses
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <div className="text-2xl font-bold text-purple-500">
                                {adminStats?.activeCourses || 0}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-6"
            >
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Overview
                    </TabsTrigger>
                    <TabsTrigger value="analytics">
                        <PieChartIcon className="h-4 w-4 mr-2" />
                        Analytics
                    </TabsTrigger>
                    <TabsTrigger value="users">
                        <Users className="h-4 w-4 mr-2" />
                        Users
                    </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                    {/* Enrollment Trends */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-[var(--color-primary)]" />
                                Enrollment Trends
                            </CardTitle>
                            <CardDescription>
                                Monthly enrollment statistics
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {systemLoading ? (
                                <Skeleton className="h-64 w-full" />
                            ) : (
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={enrollmentChartData}>
                                        <defs>
                                            <linearGradient
                                                id="enrollmentGradient"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="var(--color-primary)"
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="var(--color-primary)"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            className="stroke-muted"
                                        />
                                        <XAxis
                                            dataKey="month"
                                            className="text-sm"
                                            tick={{ fill: "currentColor" }}
                                        />
                                        <YAxis
                                            className="text-sm"
                                            tick={{ fill: "currentColor" }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor:
                                                    "hsl(var(--card))",
                                                border: "1px solid hsl(var(--border))",
                                                borderRadius: "8px",
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="enrollments"
                                            stroke="var(--color-primary)"
                                            fillOpacity={1}
                                            fill="url(#enrollmentGradient)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}
                        </CardContent>
                    </Card>

                    {/* User Growth */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-[var(--color-secondary)]" />
                                User Growth
                            </CardTitle>
                            <CardDescription>
                                Monthly user registration statistics
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {systemLoading ? (
                                <Skeleton className="h-64 w-full" />
                            ) : (
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={userGrowthData}>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            className="stroke-muted"
                                        />
                                        <XAxis
                                            dataKey="month"
                                            className="text-sm"
                                            tick={{ fill: "currentColor" }}
                                        />
                                        <YAxis
                                            className="text-sm"
                                            tick={{ fill: "currentColor" }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor:
                                                    "hsl(var(--card))",
                                                border: "1px solid hsl(var(--border))",
                                                borderRadius: "8px",
                                            }}
                                        />
                                        <Bar
                                            dataKey="users"
                                            fill="var(--color-secondary)"
                                            radius={[8, 8, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="space-y-6">
                    {/* Category Distribution */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <PieChartIcon className="w-5 h-5 text-[var(--color-primary)]" />
                                    Course Category Distribution
                                </CardTitle>
                                <CardDescription>
                                    Enrollments by category
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {systemLoading ? (
                                    <Skeleton className="h-64 w-full" />
                                ) : (
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <PieChart>
                                            <Pie
                                                data={categoryData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={(props: any) => {
                                                    const {
                                                        cx,
                                                        cy,
                                                        midAngle,
                                                        innerRadius,
                                                        outerRadius,
                                                        percent,
                                                    } = props;
                                                    const radius =
                                                        Number(innerRadius) +
                                                        (Number(outerRadius) -
                                                            Number(
                                                                innerRadius
                                                            )) *
                                                            0.5;
                                                    const x =
                                                        Number(cx) +
                                                        radius *
                                                            Math.cos(
                                                                (-Number(
                                                                    midAngle
                                                                ) *
                                                                    Math.PI) /
                                                                    180
                                                            );
                                                    const y =
                                                        Number(cy) +
                                                        radius *
                                                            Math.sin(
                                                                (-Number(
                                                                    midAngle
                                                                ) *
                                                                    Math.PI) /
                                                                    180
                                                            );

                                                    return (
                                                        <text
                                                            x={x}
                                                            y={y}
                                                            fill="white"
                                                            textAnchor={
                                                                x > Number(cx)
                                                                    ? "start"
                                                                    : "end"
                                                            }
                                                            dominantBaseline="central"
                                                            className="text-sm font-bold"
                                                        >
                                                            {`${(
                                                                Number(
                                                                    percent
                                                                ) * 100
                                                            ).toFixed(0)}%`}
                                                        </text>
                                                    );
                                                }}
                                                outerRadius={100}
                                                dataKey="value"
                                            >
                                                {categoryData.map(
                                                    (entry, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={entry.fill}
                                                        />
                                                    )
                                                )}
                                            </Pie>
                                            <Tooltip
                                                formatter={(value: number) =>
                                                    `${value} enrollments`
                                                }
                                            />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                )}
                            </CardContent>
                        </Card>

                        {/* Top Courses */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="w-5 h-5 text-[var(--color-secondary)]" />
                                    Top Performing Courses
                                </CardTitle>
                                <CardDescription>
                                    Most popular courses by enrollment
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {systemLoading ? (
                                    <div className="space-y-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Skeleton
                                                key={i}
                                                className="h-16 w-full"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <ScrollArea className="h-[300px]">
                                        <div className="space-y-3">
                                            {systemStats?.topCourses.map(
                                                (course, index) => (
                                                    <Card key={course._id}>
                                                        <CardContent className="p-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white font-bold">
                                                                    {index + 1}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <h4 className="font-semibold truncate">
                                                                        {
                                                                            course.title
                                                                        }
                                                                    </h4>
                                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                        <Badge variant="outline">
                                                                            {
                                                                                course.category
                                                                            }
                                                                        </Badge>
                                                                        <span>
                                                                            •
                                                                        </span>
                                                                        <span>
                                                                            {
                                                                                course.enrollmentCount
                                                                            }{" "}
                                                                            students
                                                                        </span>
                                                                        <span>
                                                                            •
                                                                        </span>
                                                                        <span>
                                                                            {course.rating.average.toFixed(
                                                                                1
                                                                            )}{" "}
                                                                            ⭐
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                )
                                            )}
                                        </div>
                                    </ScrollArea>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Users Tab */}
                <TabsContent value="users" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent User Registrations</CardTitle>
                            <CardDescription>
                                Latest users who joined the platform
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {usersLoading ? (
                                <div className="space-y-3">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-4 p-4"
                                        >
                                            <Skeleton className="w-12 h-12 rounded-full" />
                                            <div className="flex-1 space-y-2">
                                                <Skeleton className="h-4 w-48" />
                                                <Skeleton className="h-3 w-32" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : usersData?.users &&
                              usersData.users.length > 0 ? (
                                <div className="space-y-3">
                                    {usersData.users.map((user) => (
                                        <Card
                                            key={user._id}
                                            className="hover:shadow-md transition-shadow"
                                        >
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <Avatar className="w-12 h-12">
                                                        <AvatarImage
                                                            src={user.avatar}
                                                            alt={user.name}
                                                        />
                                                        <AvatarFallback className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
                                                            {getInitials(
                                                                user.name
                                                            )}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-semibold">
                                                                {user.name}
                                                            </span>
                                                            <Badge
                                                                className={getRoleColor(
                                                                    user.role
                                                                )}
                                                            >
                                                                {user.role}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">
                                                            {user.email} •
                                                            Joined{" "}
                                                            {formatDate(
                                                                user.createdAt
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Users className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">
                                        No users found
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Users will appear here once they
                                        register
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
