"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    Download,
    FileText,
    TrendingUp,
    Users,
    BookOpen,
    DollarSign,
    Calendar,
    BarChart3,
    PieChart,
    Activity,
    Filter,
    RefreshCw,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart as RePieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useAdminStats, useSystemStats } from "@/lib/api/admin";
import { useAllUsers } from "@/lib/api/admin";
import { toast } from "sonner";

export default function ReportsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState("30"); // days
    const [reportType, setReportType] = useState("overview");

    useEffect(() => {
        if (status === "loading") return;

        const userRole = (session?.user as any)?.role;
        if (!session || userRole !== "admin") {
            router.push("/dashboard");
            return;
        }
        setLoading(false);
    }, [session, status, router]);

    const {
        data: adminStats,
        isLoading: statsLoading,
        refetch: refetchAdminStats,
    } = useAdminStats();

    const {
        data: systemStats,
        isLoading: systemLoading,
        refetch: refetchSystemStats,
    } = useSystemStats();

    const { data: usersData, isLoading: usersLoading } = useAllUsers({
        limit: 1000,
    });

    const handleRefresh = () => {
        refetchAdminStats();
        refetchSystemStats();
        toast.success("Reports refreshed successfully");
    };

    const handleExport = (format: string) => {
        toast.success(`Exporting report as ${format.toUpperCase()}...`);
        // TODO: Implement actual export functionality
    };

    // Format enrollment trend data
    const enrollmentTrendData =
        systemStats?.monthlyEnrollments?.map((item) => ({
            name: `${item._id.month}/${item._id.year}`,
            enrollments: item.count,
        })) || [];

    // Format user growth data
    const userGrowthData =
        systemStats?.userGrowth?.map((item) => ({
            name: `${item._id.month}/${item._id.year}`,
            users: item.count,
        })) || [];

    // Format category distribution data
    const categoryData =
        systemStats?.categoryDistribution?.map((item) => ({
            name: item._id || "Uncategorized",
            value: item.count,
            enrollments: item.totalEnrollments,
        })) || [];

    // Colors for charts
    const COLORS = [
        "var(--color-primary)",
        "var(--color-secondary)",
        "var(--color-accent)",
        "#FF8042",
        "#FFBB28",
        "#00C49F",
        "#0088FE",
        "#8884D8",
    ];

    if (loading || status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--color-primary)]"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                        System Reports
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Comprehensive analytics and reporting dashboard
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={handleRefresh}
                        variant="outline"
                        className="border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-accent)]"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                    </Button>
                    <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7">Last 7 days</SelectItem>
                            <SelectItem value="30">Last 30 days</SelectItem>
                            <SelectItem value="90">Last 90 days</SelectItem>
                            <SelectItem value="365">Last year</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="pdf" onValueChange={handleExport}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Export" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pdf">
                                <div className="flex items-center gap-2">
                                    <Download className="w-4 h-4" />
                                    Export PDF
                                </div>
                            </SelectItem>
                            <SelectItem value="csv">
                                <div className="flex items-center gap-2">
                                    <Download className="w-4 h-4" />
                                    Export CSV
                                </div>
                            </SelectItem>
                            <SelectItem value="excel">
                                <div className="flex items-center gap-2">
                                    <Download className="w-4 h-4" />
                                    Export Excel
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-l-4 border-l-[var(--color-primary)] hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Total Users
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <>
                                <div className="text-3xl font-bold text-[var(--color-primary)]">
                                    {(
                                        (adminStats?.totalStudents || 0) +
                                        (adminStats?.totalInstructors || 0)
                                    ).toLocaleString()}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {adminStats?.totalStudents || 0} students,{" "}
                                    {adminStats?.totalInstructors || 0}{" "}
                                    instructors
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            Total Courses
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <>
                                <div className="text-3xl font-bold text-blue-500">
                                    {adminStats?.totalCourses?.toLocaleString() ||
                                        0}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {adminStats?.activeCourses || 0} active
                                    courses
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Total Enrollments
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <>
                                <div className="text-3xl font-bold text-green-500">
                                    {adminStats?.totalEnrollments?.toLocaleString() ||
                                        0}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {adminStats?.recentEnrollments || 0} in last
                                    7 days
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-[var(--color-secondary)] hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Total Revenue
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <>
                                <div className="text-3xl font-bold text-[var(--color-secondary)]">
                                    $
                                    {adminStats?.totalEarnings?.toLocaleString() ||
                                        0}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    $
                                    {adminStats?.thisMonthEarnings?.toLocaleString() ||
                                        0}{" "}
                                    this month
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Reports Tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Overview
                    </TabsTrigger>
                    <TabsTrigger value="trends">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Trends
                    </TabsTrigger>
                    <TabsTrigger value="performance">
                        <Activity className="w-4 h-4 mr-2" />
                        Performance
                    </TabsTrigger>
                    <TabsTrigger value="detailed">
                        <FileText className="w-4 h-4 mr-2" />
                        Detailed
                    </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Enrollment Trend */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Enrollment Trend</CardTitle>
                                <CardDescription>
                                    Monthly enrollment statistics
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {systemLoading ? (
                                    <Skeleton className="h-[300px] w-full" />
                                ) : (
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <AreaChart data={enrollmentTrendData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Area
                                                type="monotone"
                                                dataKey="enrollments"
                                                stroke="var(--color-primary)"
                                                fill="var(--color-accent)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                )}
                            </CardContent>
                        </Card>

                        {/* Category Distribution */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Category Distribution</CardTitle>
                                <CardDescription>
                                    Courses by category
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {systemLoading ? (
                                    <Skeleton className="h-[300px] w-full" />
                                ) : (
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <RePieChart>
                                            <Pie
                                                data={categoryData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={(entry) => entry.name}
                                                outerRadius={100}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {categoryData.map(
                                                    (entry, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={
                                                                COLORS[
                                                                    index %
                                                                        COLORS.length
                                                                ]
                                                            }
                                                        />
                                                    )
                                                )}
                                            </Pie>
                                            <Tooltip />
                                        </RePieChart>
                                    </ResponsiveContainer>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Performance Metrics */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Metrics</CardTitle>
                            <CardDescription>
                                Key performance indicators
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-gradient-to-br from-[var(--color-accent)] to-transparent rounded-lg">
                                    <div className="text-4xl font-bold text-[var(--color-primary)]">
                                        {statsLoading ? (
                                            <Skeleton className="h-10 w-20 mx-auto" />
                                        ) : (
                                            `${
                                                adminStats?.completionRate || 0
                                            }%`
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Completion Rate
                                    </p>
                                </div>
                                <div className="text-center p-4 bg-gradient-to-br from-blue-100 dark:from-blue-900/20 to-transparent rounded-lg">
                                    <div className="text-4xl font-bold text-blue-500">
                                        {statsLoading ? (
                                            <Skeleton className="h-10 w-20 mx-auto" />
                                        ) : (
                                            adminStats?.averageRating?.toFixed(
                                                1
                                            ) || "0.0"
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Average Rating
                                    </p>
                                </div>
                                <div className="text-center p-4 bg-gradient-to-br from-green-100 dark:from-green-900/20 to-transparent rounded-lg">
                                    <div className="text-4xl font-bold text-green-500">
                                        {statsLoading ? (
                                            <Skeleton className="h-10 w-20 mx-auto" />
                                        ) : (
                                            adminStats?.activeStudents?.toLocaleString() ||
                                            0
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Active Students
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Trends Tab */}
                <TabsContent value="trends" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Growth Trend</CardTitle>
                            <CardDescription>
                                New user registrations over time
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {systemLoading ? (
                                <Skeleton className="h-[400px] w-full" />
                            ) : (
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={userGrowthData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                            dataKey="users"
                                            fill="var(--color-primary)"
                                            name="New Users"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Enrollment vs Revenue Trend</CardTitle>
                            <CardDescription>
                                Combined analysis of enrollments and earnings
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {systemLoading ? (
                                <Skeleton className="h-[400px] w-full" />
                            ) : (
                                <ResponsiveContainer width="100%" height={400}>
                                    <AreaChart data={enrollmentTrendData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Area
                                            type="monotone"
                                            dataKey="enrollments"
                                            stroke="var(--color-primary)"
                                            fill="var(--color-accent)"
                                            name="Enrollments"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Performance Tab */}
                <TabsContent value="performance" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Performing Courses</CardTitle>
                            <CardDescription>
                                Courses with highest enrollments
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {systemLoading ? (
                                <div className="space-y-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Skeleton
                                            key={i}
                                            className="h-16 w-full"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Course Title</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Enrollments</TableHead>
                                            <TableHead>Rating</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {systemStats?.topCourses?.map(
                                            (course) => (
                                                <TableRow key={course._id}>
                                                    <TableCell className="font-medium">
                                                        {course.title}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">
                                                            {course.category}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        {course.enrollmentCount.toLocaleString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-1">
                                                            ⭐{" "}
                                                            {course.rating.average.toFixed(
                                                                1
                                                            )}
                                                            <span className="text-xs text-muted-foreground">
                                                                (
                                                                {
                                                                    course
                                                                        .rating
                                                                        .count
                                                                }
                                                                )
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Category Performance</CardTitle>
                                <CardDescription>
                                    Enrollments by category
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {systemLoading ? (
                                    <Skeleton className="h-[300px] w-full" />
                                ) : (
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <BarChart data={categoryData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar
                                                dataKey="enrollments"
                                                fill="var(--color-secondary)"
                                                name="Enrollments"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Platform Health</CardTitle>
                                <CardDescription>
                                    System status indicators
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">
                                        Active Users
                                    </span>
                                    <Badge className="bg-green-500">
                                        Healthy
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">
                                        Enrollment Rate
                                    </span>
                                    <Badge className="bg-[var(--color-primary)]">
                                        Growing
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">
                                        Course Quality
                                    </span>
                                    <Badge className="bg-blue-500">
                                        Excellent
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">
                                        Revenue Trend
                                    </span>
                                    <Badge className="bg-green-500">
                                        Increasing
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">
                                        User Satisfaction
                                    </span>
                                    <Badge className="bg-[var(--color-primary)]">
                                        {adminStats?.averageRating?.toFixed(1)}
                                        /5.0
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Detailed Tab */}
                <TabsContent value="detailed" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Detailed Statistics Report</CardTitle>
                            <CardDescription>
                                Comprehensive data breakdown
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {/* User Statistics */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                        <Users className="w-5 h-5 text-[var(--color-primary)]" />
                                        User Statistics
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-muted rounded-lg">
                                            <p className="text-sm text-muted-foreground">
                                                Total Students
                                            </p>
                                            <p className="text-2xl font-bold">
                                                {adminStats?.totalStudents?.toLocaleString() ||
                                                    0}
                                            </p>
                                        </div>
                                        <div className="p-4 bg-muted rounded-lg">
                                            <p className="text-sm text-muted-foreground">
                                                Total Instructors
                                            </p>
                                            <p className="text-2xl font-bold">
                                                {adminStats?.totalInstructors?.toLocaleString() ||
                                                    0}
                                            </p>
                                        </div>
                                        <div className="p-4 bg-muted rounded-lg">
                                            <p className="text-sm text-muted-foreground">
                                                Active Students
                                            </p>
                                            <p className="text-2xl font-bold">
                                                {adminStats?.activeStudents?.toLocaleString() ||
                                                    0}
                                            </p>
                                        </div>
                                        <div className="p-4 bg-muted rounded-lg">
                                            <p className="text-sm text-muted-foreground">
                                                Recent Sign-ups (7d)
                                            </p>
                                            <p className="text-2xl font-bold">
                                                {adminStats?.recentEnrollments ||
                                                    0}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Course Statistics */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-blue-500" />
                                        Course Statistics
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-muted rounded-lg">
                                            <p className="text-sm text-muted-foreground">
                                                Total Courses
                                            </p>
                                            <p className="text-2xl font-bold">
                                                {adminStats?.totalCourses?.toLocaleString() ||
                                                    0}
                                            </p>
                                        </div>
                                        <div className="p-4 bg-muted rounded-lg">
                                            <p className="text-sm text-muted-foreground">
                                                Active Courses
                                            </p>
                                            <p className="text-2xl font-bold">
                                                {adminStats?.activeCourses?.toLocaleString() ||
                                                    0}
                                            </p>
                                        </div>
                                        <div className="p-4 bg-muted rounded-lg">
                                            <p className="text-sm text-muted-foreground">
                                                Avg Rating
                                            </p>
                                            <p className="text-2xl font-bold">
                                                {adminStats?.averageRating?.toFixed(
                                                    1
                                                ) || "0.0"}{" "}
                                                ⭐
                                            </p>
                                        </div>
                                        <div className="p-4 bg-muted rounded-lg">
                                            <p className="text-sm text-muted-foreground">
                                                Completion Rate
                                            </p>
                                            <p className="text-2xl font-bold">
                                                {adminStats?.completionRate ||
                                                    0}
                                                %
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Revenue Statistics */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                        <DollarSign className="w-5 h-5 text-green-500" />
                                        Revenue Statistics
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-muted rounded-lg">
                                            <p className="text-sm text-muted-foreground">
                                                Total Revenue
                                            </p>
                                            <p className="text-2xl font-bold">
                                                $
                                                {adminStats?.totalEarnings?.toLocaleString() ||
                                                    0}
                                            </p>
                                        </div>
                                        <div className="p-4 bg-muted rounded-lg">
                                            <p className="text-sm text-muted-foreground">
                                                This Month
                                            </p>
                                            <p className="text-2xl font-bold">
                                                $
                                                {adminStats?.thisMonthEarnings?.toLocaleString() ||
                                                    0}
                                            </p>
                                        </div>
                                        <div className="p-4 bg-muted rounded-lg">
                                            <p className="text-sm text-muted-foreground">
                                                Total Enrollments
                                            </p>
                                            <p className="text-2xl font-bold">
                                                {adminStats?.totalEnrollments?.toLocaleString() ||
                                                    0}
                                            </p>
                                        </div>
                                        <div className="p-4 bg-muted rounded-lg">
                                            <p className="text-sm text-muted-foreground">
                                                Avg Revenue/Course
                                            </p>
                                            <p className="text-2xl font-bold">
                                                $
                                                {adminStats?.totalCourses
                                                    ? Math.round(
                                                          (adminStats.totalEarnings ||
                                                              0) /
                                                              adminStats.totalCourses
                                                      )
                                                    : 0}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
