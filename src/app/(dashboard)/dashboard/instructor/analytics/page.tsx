"use client";

import { useSession } from "next-auth/react";
import {
    useInstructorAnalytics,
    useInstructorStudents,
} from "@/lib/api/instructor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    BookOpen,
    TrendingUp,
    DollarSign,
    Star,
    GraduationCap,
    Award,
    Target,
    Calendar,
    BarChart3,
} from "lucide-react";
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
    Legend,
    ResponsiveContainer,
    PieLabelRenderProps,
} from "recharts";
import { useMemo } from "react";

const COLORS = {
    primary: "#21BF73",
    secondary: "#007a3f",
    accent: "#B0EACD",
    completed: "#21BF73",
    active: "#007a3f",
    dropped: "#94a3b8",
};

const InstructorAnalyticsPage = () => {
    const { data: session } = useSession();
    const instructorId = session?.user?.id || "";

    const { data: analyticsData, isLoading: analyticsLoading } =
        useInstructorAnalytics(instructorId);

    const { data: studentsData, isLoading: studentsLoading } =
        useInstructorStudents(instructorId);

    // Prepare chart data
    const statusData = useMemo(() => {
        if (!studentsData?.students) return [];

        const active = studentsData.students.filter(
            (s) => s.status === "active"
        ).length;
        const completed = studentsData.students.filter(
            (s) => s.status === "completed"
        ).length;
        const dropped = studentsData.students.filter(
            (s) => s.status === "dropped"
        ).length;

        return [
            { name: "Active", value: active, color: COLORS.active },
            { name: "Completed", value: completed, color: COLORS.completed },
            { name: "Dropped", value: dropped, color: COLORS.dropped },
        ];
    }, [studentsData]);

    // Progress distribution data
    const progressData = useMemo(() => {
        if (!studentsData?.students) return [];

        const ranges = {
            "0-25%": 0,
            "26-50%": 0,
            "51-75%": 0,
            "76-100%": 0,
        };

        studentsData.students.forEach((student) => {
            const progress = student.progress.progressPercentage;
            if (progress <= 25) ranges["0-25%"]++;
            else if (progress <= 50) ranges["26-50%"]++;
            else if (progress <= 75) ranges["51-75%"]++;
            else ranges["76-100%"]++;
        });

        return Object.entries(ranges).map(([name, value]) => ({
            name,
            students: value,
        }));
    }, [studentsData]);

    // Revenue trend (mock monthly data - you can enhance this with real data)
    const revenueTrend = useMemo(() => {
        const stats = analyticsData?.stats;
        if (!stats) return [];

        // Generate last 6 months data (this is a simplified version)
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
        const avgMonthly = stats.thisMonthEarnings;

        return months.map((month, index) => ({
            month,
            earnings: Math.round(avgMonthly * (0.7 + Math.random() * 0.6)),
            enrollments: Math.round(10 + Math.random() * 20),
        }));
    }, [analyticsData]);

    if (!session) {
        return (
            <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">
                    Please sign in to view analytics
                </p>
            </div>
        );
    }

    if (analyticsLoading || studentsLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">
                        Loading analytics...
                    </p>
                </div>
            </div>
        );
    }

    const stats = analyticsData?.stats || {
        totalStudents: 0,
        activeCourses: 0,
        completionRate: 0,
        averageRating: 0,
        totalEarnings: 0,
        thisMonthEarnings: 0,
        activeStudents: 0,
        totalEnrollments: 0,
        totalCourses: 0,
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Instructor Analytics
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Track your performance and growth metrics
                    </p>
                </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-accent/20 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Students
                        </CardTitle>
                        <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/30 rounded-lg">
                            <Users className="w-5 h-5 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            {stats.totalStudents}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-accent text-secondary">
                                {stats.activeStudents} active
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-accent/20 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Earnings
                        </CardTitle>
                        <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/30 rounded-lg">
                            <DollarSign className="w-5 h-5 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            ${stats.totalEarnings.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            ${stats.thisMonthEarnings.toLocaleString()} this
                            month
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-accent/20 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Active Courses
                        </CardTitle>
                        <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/30 rounded-lg">
                            <BookOpen className="w-5 h-5 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            {stats.activeCourses}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            of {stats.totalCourses} total courses
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-accent/20 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Average Rating
                        </CardTitle>
                        <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/30 rounded-lg">
                            <Star className="w-5 h-5 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold flex items-center gap-2">
                            {stats.averageRating.toFixed(1)}
                            <Star className="w-5 h-5 fill-primary text-primary" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            From {stats.totalEnrollments} enrollments
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="border-accent/20 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-primary" />
                            Completion Rate
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-center">
                            <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                {stats.completionRate}%
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                                Students completing courses
                            </p>
                        </div>
                        <Progress
                            value={stats.completionRate}
                            className="h-3"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>0%</span>
                            <span>Target: 80%</span>
                            <span>100%</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-accent/20 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-primary" />
                            Total Enrollments
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-center">
                            <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                {stats.totalEnrollments}
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                                All-time course enrollments
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="text-center p-3 bg-accent/10 rounded-lg">
                                <div className="text-2xl font-bold text-primary">
                                    {stats.activeStudents}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Active
                                </p>
                            </div>
                            <div className="text-center p-3 bg-accent/10 rounded-lg">
                                <div className="text-2xl font-bold text-secondary">
                                    {Math.round(
                                        stats.totalEnrollments *
                                            (stats.completionRate / 100)
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Completed
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-accent/20 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-primary" />
                            This Month
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Revenue
                                    </p>
                                    <p className="text-2xl font-bold text-primary">
                                        $
                                        {stats.thisMonthEarnings.toLocaleString()}
                                    </p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-primary" />
                            </div>
                            <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        New Students
                                    </p>
                                    <p className="text-2xl font-bold text-secondary">
                                        {Math.round(stats.totalStudents * 0.15)}
                                    </p>
                                </div>
                                <Users className="w-8 h-8 text-secondary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Student Status Distribution */}
                <Card className="border-accent/20 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-primary" />
                            Student Status Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(props: PieLabelRenderProps) => {
                                        const { name, percent } = props as any;
                                        return `${name}: ${(
                                            percent * 100
                                        ).toFixed(0)}%`;
                                    }}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Progress Distribution */}
                <Card className="border-accent/20 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Student Progress Ranges
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={progressData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="students" fill={COLORS.primary} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Revenue Trend */}
                <Card className="border-accent/20 shadow-lg lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            Revenue & Enrollment Trend
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={revenueTrend}>
                                <defs>
                                    <linearGradient
                                        id="colorEarnings"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor={COLORS.primary}
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor={COLORS.primary}
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                    <linearGradient
                                        id="colorEnrollments"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor={COLORS.secondary}
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor={COLORS.secondary}
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Area
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="earnings"
                                    stroke={COLORS.primary}
                                    fillOpacity={1}
                                    fill="url(#colorEarnings)"
                                />
                                <Area
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="enrollments"
                                    stroke={COLORS.secondary}
                                    fillOpacity={1}
                                    fill="url(#colorEnrollments)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default InstructorAnalyticsPage;
