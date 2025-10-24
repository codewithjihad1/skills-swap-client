import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axios/axiosInstance";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Review {
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
        avatar?: string;
    };
    course: {
        _id: string;
        title: string;
        thumbnail?: string;
        category?: string;
    };
    rating: {
        score: number;
        review: string;
        ratedAt: string;
    };
    status: "active" | "completed" | "dropped";
    progress: {
        progressPercentage: number;
    };
    enrolledAt: string;
    completedAt?: string;
}

export interface ReviewStats {
    totalReviews: number;
    averageRating: number;
    ratingDistribution: {
        5: number;
        4: number;
        3: number;
        2: number;
        1: number;
    };
    recentReviews: number; // Last 30 days
}

// Get instructor's course reviews
export const getInstructorReviews = async (
    instructorId: string
): Promise<Review[]> => {
    try {
        // Get instructor's courses
        const coursesResponse = await axiosInstance.get(
            `${API_BASE_URL}/api/courses`,
            {
                params: {
                    instructor: instructorId,
                    limit: 1000,
                },
            }
        );

        const courses = coursesResponse.data.courses || [];
        const courseIds = courses.map((course: any) => course._id);

        if (courseIds.length === 0) {
            return [];
        }

        // Get all enrollments with ratings for these courses
        const enrollmentsPromises = courseIds.map((courseId: string) =>
            axiosInstance
                .get(`${API_BASE_URL}/api/enrollments/course/${courseId}`)
                .catch(() => ({ data: { success: false, enrollments: [] } }))
        );

        const enrollmentsResponses = await Promise.all(enrollmentsPromises);

        // Flatten all enrollments and filter those with ratings
        const allEnrollments: any[] = enrollmentsResponses.flatMap(
            (response) => response.data.enrollments || []
        );

        // Filter enrollments that have ratings
        const reviewedEnrollments = allEnrollments.filter(
            (enrollment) => enrollment.rating && enrollment.rating.score
        );

        // Sort by rating date (newest first)
        reviewedEnrollments.sort(
            (a, b) =>
                new Date(b.rating.ratedAt).getTime() -
                new Date(a.rating.ratedAt).getTime()
        );

        return reviewedEnrollments as Review[];
    } catch (error) {
        console.error("Error fetching instructor reviews:", error);
        return [];
    }
};

// Calculate review statistics
export const getInstructorReviewStats = async (
    instructorId: string
): Promise<ReviewStats> => {
    try {
        const reviews = await getInstructorReviews(instructorId);

        if (reviews.length === 0) {
            return {
                totalReviews: 0,
                averageRating: 0,
                ratingDistribution: {
                    5: 0,
                    4: 0,
                    3: 0,
                    2: 0,
                    1: 0,
                },
                recentReviews: 0,
            };
        }

        // Calculate average rating
        const totalRating = reviews.reduce(
            (sum, review) => sum + review.rating.score,
            0
        );
        const averageRating = totalRating / reviews.length;

        // Calculate rating distribution
        const ratingDistribution = {
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0,
        };

        reviews.forEach((review) => {
            const score = Math.floor(review.rating.score) as 1 | 2 | 3 | 4 | 5;
            ratingDistribution[score]++;
        });

        // Calculate recent reviews (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recentReviews = reviews.filter(
            (review) => new Date(review.rating.ratedAt) >= thirtyDaysAgo
        ).length;

        return {
            totalReviews: reviews.length,
            averageRating: Math.round(averageRating * 10) / 10,
            ratingDistribution,
            recentReviews,
        };
    } catch (error) {
        console.error("Error calculating review stats:", error);
        return {
            totalReviews: 0,
            averageRating: 0,
            ratingDistribution: {
                5: 0,
                4: 0,
                3: 0,
                2: 0,
                1: 0,
            },
            recentReviews: 0,
        };
    }
};

// React Query hooks
export const useInstructorReviews = (instructorId: string) => {
    return useQuery({
        queryKey: ["instructor-reviews", instructorId],
        queryFn: () => getInstructorReviews(instructorId),
        enabled: !!instructorId,
    });
};

export const useInstructorReviewStats = (instructorId: string) => {
    return useQuery({
        queryKey: ["instructor-review-stats", instructorId],
        queryFn: () => getInstructorReviewStats(instructorId),
        enabled: !!instructorId,
    });
};
