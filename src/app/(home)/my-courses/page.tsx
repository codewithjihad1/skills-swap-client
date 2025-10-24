"use client";

import React, { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
    BookOpen,
    Clock,
    Star,
    MoreVertical,
    Search,
    TrendingUp,
    Award,
    GraduationCap,
    PlayCircle,
    XCircle,
    CheckCircle2,
    Filter,
    BarChart3,
} from "lucide-react";
import {
    useMyEnrollments,
    useUnenrollFromCourse,
    Enrollment,
} from "@/lib/api/enrollments";
import { toast } from "sonner";

export default function MyCoursesPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const userId = session?.user?.id;

    // State
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("enrolledAt");
    const [sortOrder, setSortOrder] = useState("desc");
    const [unenrollDialog, setUnenrollDialog] = useState<{
        open: boolean;
        enrollment: Enrollment | null;
    }>({ open: false, enrollment: null });

    // API Hooks
    const {
        data: enrollmentData,
        isLoading,
        error,
    } = useMyEnrollments(userId, {
        status: statusFilter,
        sortBy,
        order: sortOrder,
    });

    const unenrollMutation = useUnenrollFromCourse();

    // Filtered enrollments based on search
    const filteredEnrollments = useMemo(() => {
        if (!enrollmentData?.enrollments) return [];

        return enrollmentData.enrollments.filter((enrollment) => {
            const matchesSearch =
                searchQuery === "" ||
                enrollment.course.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                enrollment.course.category
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                enrollment.course.instructor.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

            return matchesSearch;
        });
    }, [enrollmentData?.enrollments, searchQuery]);

    // Handle unenroll
    const handleUnenroll = async () => {
        if (!unenrollDialog.enrollment || !userId) return;

        try {
            await unenrollMutation.mutateAsync({
                courseId: unenrollDialog.enrollment.course._id,
                userId,
            });
            toast.success("Successfully unenrolled from course");
            setUnenrollDialog({ open: false, enrollment: null });
        } catch (error: any) {
            toast.error(
                error.response?.data?.error || "Failed to unenroll from course"
            );
        }
    };

    // Handle continue learning
    const handleContinueLearning = (courseId: string) => {
        router.push(`/course/${courseId}/learn`);
    };

    // Handle rate course
    const handleRateCourse = (courseId: string) => {
        router.push(`/course/${courseId}/rate`);
    };

    // Get status badge color
    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white";
            case "completed":
                return "bg-blue-500 hover:bg-blue-600 text-white";
            case "dropped":
                return "bg-gray-500 hover:bg-gray-600 text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-6">
                    {/* Header Skeleton */}
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-64" />
                        <Skeleton className="h-6 w-96" />
                    </div>

                    {/* Stats Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {[...Array(5)].map((_, i) => (
                            <Card key={i}>
                                <CardHeader className="space-y-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-8 w-16" />
                                </CardHeader>
                            </Card>
                        ))}
                    </div>

                    {/* Filters Skeleton */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <Skeleton className="h-10 flex-1" />
                        <Skeleton className="h-10 w-40" />
                        <Skeleton className="h-10 w-40" />
                    </div>

                    {/* Courses Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <Card key={i}>
                                <Skeleton className="h-48 w-full" />
                                <CardHeader>
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-4 w-32" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-4 w-full mb-4" />
                                    <Skeleton className="h-10 w-full" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card className="border-red-200 bg-red-50">
                    <CardHeader>
                        <CardTitle className="text-red-700">
                            Error Loading Courses
                        </CardTitle>
                        <CardDescription className="text-red-600">
                            {(error as any).response?.data?.error ||
                                "Failed to load your courses"}
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    const stats = enrollmentData?.stats;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">My Courses</h1>
                <p className="text-gray-600">
                    Track your learning progress and manage your enrolled
                    courses
                </p>
            </div>

            {/* Statistics Cards */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                    {/* Total Courses */}
                    <Card className="border-[var(--color-primary)] hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardDescription className="text-xs font-medium">
                                    Total Courses
                                </CardDescription>
                                <BookOpen className="h-4 w-4 text-[var(--color-primary)]" />
                            </div>
                            <CardTitle className="text-3xl font-bold text-[var(--color-primary)]">
                                {stats.total}
                            </CardTitle>
                        </CardHeader>
                    </Card>

                    {/* Active Courses */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardDescription className="text-xs font-medium">
                                    Active
                                </CardDescription>
                                <PlayCircle className="h-4 w-4 text-[var(--color-primary)]" />
                            </div>
                            <CardTitle className="text-3xl font-bold">
                                {stats.active}
                            </CardTitle>
                        </CardHeader>
                    </Card>

                    {/* Completed Courses */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardDescription className="text-xs font-medium">
                                    Completed
                                </CardDescription>
                                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                            </div>
                            <CardTitle className="text-3xl font-bold text-blue-500">
                                {stats.completed}
                            </CardTitle>
                        </CardHeader>
                    </Card>

                    {/* Total Hours */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardDescription className="text-xs font-medium">
                                    Total Hours
                                </CardDescription>
                                <Clock className="h-4 w-4 text-[var(--color-secondary)]" />
                            </div>
                            <CardTitle className="text-3xl font-bold">
                                {stats.totalHoursEnrolled}
                                <span className="text-sm text-gray-500 ml-1">
                                    hrs
                                </span>
                            </CardTitle>
                        </CardHeader>
                    </Card>

                    {/* Average Progress */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardDescription className="text-xs font-medium">
                                    Avg Progress
                                </CardDescription>
                                <TrendingUp className="h-4 w-4 text-[var(--color-accent)]" />
                            </div>
                            <CardTitle className="text-3xl font-bold">
                                {stats.averageProgress}
                                <span className="text-sm text-gray-500 ml-1">
                                    %
                                </span>
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            )}

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                        placeholder="Search courses, instructors, or categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-40">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Courses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="dropped">Dropped</SelectItem>
                    </SelectContent>
                </Select>

                {/* Sort By */}
                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-40">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="enrolledAt">
                            Enrolled Date
                        </SelectItem>
                        <SelectItem value="progress.progressPercentage">
                            Progress
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Courses Grid */}
            {filteredEnrollments.length === 0 ? (
                <Card className="text-center py-16">
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <BookOpen className="h-16 w-16 text-gray-300" />
                        </div>
                        <CardTitle className="text-2xl mb-2">
                            No Courses Found
                        </CardTitle>
                        <CardDescription className="text-base">
                            {searchQuery
                                ? "Try adjusting your search or filters"
                                : "Start learning by browsing available courses"}
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="justify-center">
                        <Button
                            onClick={() => router.push("/courses")}
                            className="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)]"
                        >
                            Browse Courses
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEnrollments.map((enrollment) => (
                        <Card
                            key={enrollment._id}
                            className="hover:shadow-xl transition-all duration-300 flex flex-col"
                        >
                            {/* Course Thumbnail */}
                            <div className="relative h-48 overflow-hidden rounded-t-lg">
                                <img
                                    src={
                                        enrollment.course.thumbnail ||
                                        "/placeholder-course.jpg"
                                    }
                                    alt={enrollment.course.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-3 right-3">
                                    <Badge
                                        className={getStatusColor(
                                            enrollment.status
                                        )}
                                    >
                                        {enrollment.status}
                                    </Badge>
                                </div>
                            </div>

                            {/* Course Info */}
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg line-clamp-2 hover:text-[var(--color-primary)] transition-colors">
                                    {enrollment.course.title}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage
                                            src={
                                                enrollment.course.instructor
                                                    .avatar
                                            }
                                            alt={
                                                enrollment.course.instructor
                                                    .name
                                            }
                                        />
                                        <AvatarFallback className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-xs">
                                            {enrollment.course.instructor.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">
                                        {enrollment.course.instructor.name}
                                    </span>
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="flex-1 space-y-4">
                                {/* Progress Bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 font-medium">
                                            Progress
                                        </span>
                                        <span className="font-bold text-[var(--color-primary)]">
                                            {
                                                enrollment.progress
                                                    .progressPercentage
                                            }
                                            %
                                        </span>
                                    </div>
                                    <Progress
                                        value={
                                            enrollment.progress
                                                .progressPercentage
                                        }
                                        className="h-2"
                                    />
                                    <p className="text-xs text-gray-500">
                                        {
                                            enrollment.progress
                                                .totalLessonsCompleted
                                        }{" "}
                                        lessons completed
                                    </p>
                                </div>

                                {/* Course Meta */}
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>
                                            {enrollment.course.duration}h
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span>
                                            {enrollment.course.rating.average.toFixed(
                                                1
                                            )}
                                        </span>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className="text-xs"
                                    >
                                        {enrollment.course.category}
                                    </Badge>
                                </div>

                                {/* Enrolled Date */}
                                <p className="text-xs text-gray-500">
                                    Enrolled on{" "}
                                    {new Date(
                                        enrollment.enrolledAt
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </p>

                                {/* Certificate Badge */}
                                {enrollment.certificateIssued && (
                                    <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
                                        <Award className="h-3 w-3 mr-1" />
                                        Certificate Earned
                                    </Badge>
                                )}
                            </CardContent>

                            <CardFooter className="flex justify-between gap-2 pt-4 border-t">
                                <Button
                                    onClick={() =>
                                        handleContinueLearning(
                                            enrollment.course._id
                                        )
                                    }
                                    className="flex-1 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)]"
                                >
                                    <PlayCircle className="h-4 w-4 mr-2" />
                                    Continue
                                </Button>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>
                                            Actions
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() =>
                                                router.push(
                                                    `/course/${enrollment.course._id}`
                                                )
                                            }
                                        >
                                            <BookOpen className="h-4 w-4 mr-2" />
                                            View Details
                                        </DropdownMenuItem>

                                        {enrollment.status === "completed" &&
                                            !enrollment.rating?.score && (
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleRateCourse(
                                                            enrollment.course
                                                                ._id
                                                        )
                                                    }
                                                >
                                                    <Star className="h-4 w-4 mr-2" />
                                                    Rate Course
                                                </DropdownMenuItem>
                                            )}

                                        {enrollment.certificateIssued && (
                                            <DropdownMenuItem>
                                                <Award className="h-4 w-4 mr-2" />
                                                Download Certificate
                                            </DropdownMenuItem>
                                        )}

                                        {enrollment.status === "active" && (
                                            <>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        setUnenrollDialog({
                                                            open: true,
                                                            enrollment,
                                                        })
                                                    }
                                                    className="text-red-600 focus:text-red-600"
                                                >
                                                    <XCircle className="h-4 w-4 mr-2" />
                                                    Unenroll
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            {/* Unenroll Confirmation Dialog */}
            <Dialog
                open={unenrollDialog.open}
                onOpenChange={(open) =>
                    setUnenrollDialog({
                        open,
                        enrollment: unenrollDialog.enrollment,
                    })
                }
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Unenrollment</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to unenroll from{" "}
                            <span className="font-semibold">
                                {unenrollDialog.enrollment?.course.title}
                            </span>
                            ? Your progress will be saved, but you'll need to
                            re-enroll to continue learning.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setUnenrollDialog({
                                    open: false,
                                    enrollment: null,
                                })
                            }
                            disabled={unenrollMutation.isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleUnenroll}
                            disabled={unenrollMutation.isPending}
                        >
                            {unenrollMutation.isPending
                                ? "Unenrolling..."
                                : "Unenroll"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
