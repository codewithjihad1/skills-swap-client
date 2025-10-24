"use client";

import React, { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
    Star,
    StarHalf,
    Search,
    TrendingUp,
    MessageSquare,
    Award,
    Filter,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
    useInstructorReviews,
    useInstructorReviewStats,
    Review,
} from "@/lib/api/reviews";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

export default function InstructorReviewsPage() {
    const { data: session } = useSession();
    const userId = session?.user?.id;

    const [ratingFilter, setRatingFilter] = useState<string>("all");
    const [courseFilter, setCourseFilter] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");

    const {
        data: reviews,
        isLoading: reviewsLoading,
        error: reviewsError,
    } = useInstructorReviews(userId || "");

    const {
        data: reviewStats,
        isLoading: statsLoading,
        error: statsError,
    } = useInstructorReviewStats(userId || "");

    // Get unique courses from reviews
    const uniqueCourses = useMemo(() => {
        if (!reviews) return [];
        const coursesMap = new Map();
        reviews.forEach((review) => {
            if (review.course && !coursesMap.has(review.course._id)) {
                coursesMap.set(review.course._id, review.course);
            }
        });
        return Array.from(coursesMap.values());
    }, [reviews]);

    // Filter reviews
    const filteredReviews = useMemo(() => {
        if (!reviews) return [];

        return reviews.filter((review) => {
            const matchesRating =
                ratingFilter === "all" ||
                Math.floor(review.rating.score) === parseInt(ratingFilter);

            const matchesCourse =
                courseFilter === "all" || review.course._id === courseFilter;

            const matchesSearch =
                searchQuery === "" ||
                review.user.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                review.user.email
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                review.rating.review
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                review.course.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

            return matchesRating && matchesCourse && matchesSearch;
        });
    }, [reviews, ratingFilter, courseFilter, searchQuery]);

    // Prepare data for rating distribution chart
    const ratingDistributionData = useMemo(() => {
        if (!reviewStats) return [];

        return [
            {
                rating: "5★",
                count: reviewStats.ratingDistribution[5],
                fill: "var(--color-primary)",
            },
            {
                rating: "4★",
                count: reviewStats.ratingDistribution[4],
                fill: "var(--color-secondary)",
            },
            {
                rating: "3★",
                count: reviewStats.ratingDistribution[3],
                fill: "var(--color-accent)",
            },
            {
                rating: "2★",
                count: reviewStats.ratingDistribution[2],
                fill: "#fbbf24",
            },
            {
                rating: "1★",
                count: reviewStats.ratingDistribution[1],
                fill: "#ef4444",
            },
        ];
    }, [reviewStats]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="flex items-center gap-0.5">
                {[...Array(fullStars)].map((_, i) => (
                    <Star
                        key={`full-${i}`}
                        className="w-4 h-4 fill-[var(--color-primary)] text-[var(--color-primary)]"
                    />
                ))}
                {hasHalfStar && (
                    <StarHalf className="w-4 h-4 fill-[var(--color-primary)] text-[var(--color-primary)]" />
                )}
                {[...Array(emptyStars)].map((_, i) => (
                    <Star
                        key={`empty-${i}`}
                        className="w-4 h-4 text-gray-300 dark:text-gray-600"
                    />
                ))}
            </div>
        );
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const getRatingColor = (rating: number) => {
        if (rating >= 4.5) return "text-[var(--color-primary)]";
        if (rating >= 3.5) return "text-[var(--color-secondary)]";
        if (rating >= 2.5) return "text-yellow-500";
        return "text-red-500";
    };

    if (!userId) {
        return (
            <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">
                    Please log in to view your reviews
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                        Reviews & Ratings
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        See what your students are saying about your courses
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Average Rating */}
                <Card className="border-l-4 border-l-[var(--color-primary)] hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Average Rating
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Skeleton className="h-8 w-32" />
                        ) : (
                            <div className="flex items-baseline gap-2">
                                <p
                                    className={`text-3xl font-bold ${getRatingColor(
                                        reviewStats?.averageRating || 0
                                    )}`}
                                >
                                    {reviewStats?.averageRating.toFixed(1) ||
                                        "0.0"}
                                </p>
                                <span className="text-sm text-muted-foreground">
                                    / 5.0
                                </span>
                            </div>
                        )}
                        {!statsLoading && (
                            <div className="mt-2">
                                {renderStars(reviewStats?.averageRating || 0)}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Total Reviews */}
                <Card className="border-l-4 border-l-[var(--color-secondary)] hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Total Reviews
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Skeleton className="h-8 w-32" />
                        ) : (
                            <p className="text-3xl font-bold text-[var(--color-secondary)]">
                                {reviewStats?.totalReviews || 0}
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Recent Reviews */}
                <Card className="border-l-4 border-l-[var(--color-accent)] hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Recent (30 days)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Skeleton className="h-8 w-32" />
                        ) : (
                            <p className="text-3xl font-bold text-[var(--color-accent)]">
                                {reviewStats?.recentReviews || 0}
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* 5-Star Reviews */}
                <Card className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            5-Star Reviews
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Skeleton className="h-8 w-32" />
                        ) : (
                            <div className="flex items-baseline gap-2">
                                <p className="text-3xl font-bold text-yellow-500">
                                    {reviewStats?.ratingDistribution[5] || 0}
                                </p>
                                <span className="text-sm text-muted-foreground">
                                    reviews
                                </span>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Rating Distribution Chart */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart className="w-5 h-5 text-[var(--color-primary)]" />
                        Rating Distribution
                    </CardTitle>
                    <CardDescription>
                        Breakdown of ratings across all your courses
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {statsLoading ? (
                        <Skeleton className="h-64 w-full" />
                    ) : (
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={ratingDistributionData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    className="stroke-muted"
                                />
                                <XAxis
                                    dataKey="rating"
                                    className="text-sm"
                                    tick={{ fill: "currentColor" }}
                                />
                                <YAxis
                                    className="text-sm"
                                    tick={{ fill: "currentColor" }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--card))",
                                        border: "1px solid hsl(var(--border))",
                                        borderRadius: "8px",
                                    }}
                                    cursor={{ fill: "hsl(var(--accent))" }}
                                />
                                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                                    {ratingDistributionData.map(
                                        (entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.fill}
                                            />
                                        )
                                    )}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    )}

                    {/* Progress bars for each rating */}
                    {!statsLoading && reviewStats && (
                        <div className="mt-6 space-y-3">
                            {[5, 4, 3, 2, 1].map((rating) => {
                                const count =
                                    reviewStats.ratingDistribution[
                                        rating as keyof typeof reviewStats.ratingDistribution
                                    ];
                                const percentage =
                                    reviewStats.totalReviews > 0
                                        ? (count / reviewStats.totalReviews) *
                                          100
                                        : 0;

                                return (
                                    <div
                                        key={rating}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="flex items-center gap-1 w-16">
                                            <span className="text-sm font-medium">
                                                {rating}
                                            </span>
                                            <Star className="w-3 h-3 fill-[var(--color-primary)] text-[var(--color-primary)]" />
                                        </div>
                                        <Progress
                                            value={percentage}
                                            className="flex-1"
                                        />
                                        <span className="text-sm text-muted-foreground w-12 text-right">
                                            {count}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Reviews List */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-[var(--color-primary)]" />
                        Student Reviews
                    </CardTitle>
                    <CardDescription>
                        All feedback from your students
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search reviews by student or course..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Rating Filter */}
                        <Select
                            value={ratingFilter}
                            onValueChange={setRatingFilter}
                        >
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Filter by rating" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Ratings</SelectItem>
                                <SelectItem value="5">5 Stars</SelectItem>
                                <SelectItem value="4">4 Stars</SelectItem>
                                <SelectItem value="3">3 Stars</SelectItem>
                                <SelectItem value="2">2 Stars</SelectItem>
                                <SelectItem value="1">1 Star</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Course Filter */}
                        <Select
                            value={courseFilter}
                            onValueChange={setCourseFilter}
                        >
                            <SelectTrigger className="w-full md:w-[200px]">
                                <SelectValue placeholder="Filter by course" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Courses</SelectItem>
                                {uniqueCourses.map((course: any) => (
                                    <SelectItem
                                        key={course._id}
                                        value={course._id}
                                    >
                                        {course.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Reviews */}
                    {reviewsLoading ? (
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <Card key={i}>
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <Skeleton className="w-12 h-12 rounded-full" />
                                            <div className="flex-1 space-y-2">
                                                <Skeleton className="h-4 w-48" />
                                                <Skeleton className="h-4 w-32" />
                                                <Skeleton className="h-16 w-full" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : filteredReviews.length === 0 ? (
                        <div className="text-center py-12">
                            <MessageSquare className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">
                                No reviews found
                            </h3>
                            <p className="text-muted-foreground">
                                {searchQuery ||
                                ratingFilter !== "all" ||
                                courseFilter !== "all"
                                    ? "Try adjusting your filters"
                                    : "Your reviews will appear here once students rate your courses"}
                            </p>
                        </div>
                    ) : (
                        <ScrollArea className="h-[600px] pr-4">
                            <div className="space-y-4">
                                {filteredReviews.map((review) => (
                                    <Card
                                        key={review._id}
                                        className="hover:shadow-md transition-shadow"
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                {/* Student Avatar */}
                                                <Avatar className="w-12 h-12">
                                                    <AvatarImage
                                                        src={review.user.avatar}
                                                        alt={review.user.name}
                                                    />
                                                    <AvatarFallback className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
                                                        {getInitials(
                                                            review.user.name
                                                        )}
                                                    </AvatarFallback>
                                                </Avatar>

                                                {/* Review Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2 mb-2">
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-semibold truncate">
                                                                {
                                                                    review.user
                                                                        .name
                                                                }
                                                            </h4>
                                                            <p className="text-sm text-muted-foreground truncate">
                                                                {
                                                                    review
                                                                        .course
                                                                        .title
                                                                }
                                                            </p>
                                                        </div>
                                                        <Badge
                                                            variant="outline"
                                                            className="border-[var(--color-primary)] text-[var(--color-primary)]"
                                                        >
                                                            {review.course
                                                                .category ||
                                                                "Course"}
                                                        </Badge>
                                                    </div>

                                                    {/* Rating and Date */}
                                                    <div className="flex items-center gap-3 mb-3">
                                                        {renderStars(
                                                            review.rating.score
                                                        )}
                                                        <span
                                                            className={`text-lg font-bold ${getRatingColor(
                                                                review.rating
                                                                    .score
                                                            )}`}
                                                        >
                                                            {review.rating.score.toFixed(
                                                                1
                                                            )}
                                                        </span>
                                                        <span className="text-sm text-muted-foreground">
                                                            •
                                                        </span>
                                                        <span className="text-sm text-muted-foreground">
                                                            {formatDate(
                                                                review.rating
                                                                    .ratedAt
                                                            )}
                                                        </span>
                                                    </div>

                                                    {/* Review Text */}
                                                    {review.rating.review && (
                                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                                            {
                                                                review.rating
                                                                    .review
                                                            }
                                                        </p>
                                                    )}

                                                    {/* Progress Badge */}
                                                    <div className="flex items-center gap-2 mt-3">
                                                        <Badge
                                                            variant={
                                                                review.status ===
                                                                "completed"
                                                                    ? "default"
                                                                    : "secondary"
                                                            }
                                                            className="capitalize"
                                                        >
                                                            {review.status}
                                                        </Badge>
                                                        {review.progress
                                                            .progressPercentage >
                                                            0 && (
                                                            <span className="text-xs text-muted-foreground">
                                                                {
                                                                    review
                                                                        .progress
                                                                        .progressPercentage
                                                                }
                                                                % progress
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </ScrollArea>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
