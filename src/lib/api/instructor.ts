/**
 * Instructor API Service
 *
 * This module provides API functions for instructor-related operations,
 * specifically for managing and viewing students enrolled in instructor courses.
 *
 * Note: Currently, the backend doesn't have a dedicated endpoint for getting
 * all students by instructor. This implementation fetches all courses by the
 * instructor and then aggregates enrollments across those courses.
 *
 * For better performance, consider adding a backend endpoint:
 * GET /api/enrollments/instructor/:instructorId
 */

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axios/axiosInstance";

export interface Student {
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
    };
    status: "active" | "completed" | "dropped";
    enrolledAt: string;
    completedAt?: string;
    progress: {
        progressPercentage: number;
        totalLessonsCompleted: number;
        lastAccessedAt?: string;
    };
    paymentStatus: string;
    paymentAmount: number;
    rating?: {
        score: number;
        review?: string;
        ratedAt?: string;
    };
}

export interface InstructorStudentsResponse {
    success: boolean;
    students: Student[];
    stats: {
        totalStudents: number;
        activeStudents: number;
        completedStudents: number;
        averageProgress: number;
        totalRevenue: number;
    };
}

// Get all students enrolled in instructor's courses
export const getInstructorStudents = async (
    instructorId: string
): Promise<InstructorStudentsResponse> => {
    try {
        // Use the dedicated instructor enrollments endpoint
        const response = await axiosInstance.get(
            `/api/enrollments/instructor/${instructorId}`
        );

        if (response.data.success) {
            return {
                success: true,
                students:
                    response.data.students || response.data.enrollments || [],
                stats: response.data.stats || {
                    totalStudents: 0,
                    activeStudents: 0,
                    completedStudents: 0,
                    averageProgress: 0,
                    totalRevenue: 0,
                },
            };
        }

        // Fallback to empty data
        return {
            success: true,
            students: [],
            stats: {
                totalStudents: 0,
                activeStudents: 0,
                completedStudents: 0,
                averageProgress: 0,
                totalRevenue: 0,
            },
        };
    } catch (error) {
        console.error("Error fetching instructor students:", error);
        throw error;
    }
};

// React Query hook
export const useInstructorStudents = (instructorId: string) => {
    return useQuery({
        queryKey: ["instructor-students", instructorId],
        queryFn: () => getInstructorStudents(instructorId),
        enabled: !!instructorId,
    });
};

// ============ Instructor Analytics ============

export interface InstructorStats {
    totalStudents: number;
    activeCourses: number;
    completionRate: number;
    averageRating: number;
    totalEarnings: number;
    thisMonthEarnings: number;
    activeStudents: number;
    totalEnrollments: number;
    totalCourses: number;
}

export interface InstructorAnalyticsResponse {
    success: boolean;
    stats: InstructorStats;
}

// Get instructor analytics/statistics
export const getInstructorAnalytics = async (
    instructorId: string
): Promise<InstructorAnalyticsResponse> => {
    const response = await axiosInstance.get(
        `/api/stats/instructor/${instructorId}`
    );
    return response.data;
};

// React Query hook for analytics
export const useInstructorAnalytics = (instructorId: string) => {
    return useQuery({
        queryKey: ["instructor-analytics", instructorId],
        queryFn: () => getInstructorAnalytics(instructorId),
        enabled: !!instructorId,
    });
};
