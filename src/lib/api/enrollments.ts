import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/axios/axiosInstance";

// Types
export interface EnrollmentProgress {
    completedLessons: Array<{
        week: number;
        lessonIndex: number;
        completedAt: string;
    }>;
    totalLessonsCompleted: number;
    progressPercentage: number;
    lastAccessedAt: string;
}

export interface Course {
    _id: string;
    title: string;
    description: string;
    thumbnail: string;
    instructor: {
        _id: string;
        name: string;
        email: string;
        avatar?: string;
    };
    category: string;
    level: string;
    duration: number;
    price: number;
    rating: {
        average: number;
        count: number;
    };
    enrollmentCount: number;
}

export interface Enrollment {
    _id: string;
    user: string;
    course: Course;
    enrolledAt: string;
    status: "active" | "completed" | "dropped";
    progress: EnrollmentProgress;
    completedAt?: string;
    certificateIssued: boolean;
    certificateIssuedAt?: string;
    rating?: {
        score: number;
        review?: string;
        ratedAt: string;
    };
    paymentStatus: "pending" | "completed" | "refunded" | "free";
    paymentAmount: number;
}

export interface EnrollmentStats {
    total: number;
    active: number;
    completed: number;
    dropped: number;
    totalHoursEnrolled: number;
    averageProgress: number;
}

export interface MyEnrollmentsResponse {
    success: boolean;
    count: number;
    stats: EnrollmentStats;
    enrollments: Enrollment[];
}

// API Functions
export const getMyEnrollments = async (
    userId: string,
    filters?: {
        status?: string;
        sortBy?: string;
        order?: string;
    }
): Promise<MyEnrollmentsResponse> => {
    const params = new URLSearchParams({
        userId,
        ...(filters?.status &&
            filters.status !== "all" && { status: filters.status }),
        ...(filters?.sortBy && { sortBy: filters.sortBy }),
        ...(filters?.order && { order: filters.order }),
    });

    const { data } = await axiosInstance.get(
        `/api/enrollments/my-courses?${params.toString()}`
    );
    return data;
};

export const unenrollFromCourse = async (courseId: string, userId: string) => {
    const { data } = await axiosInstance.delete(
        `/api/enrollments/unenroll/${courseId}`,
        { data: { userId } }
    );
    return data;
};

export const rateCourse = async (
    courseId: string,
    userId: string,
    score: number,
    review?: string
) => {
    const { data } = await axiosInstance.post(
        `/api/enrollments/rate/${courseId}`,
        { userId, score, review }
    );
    return data;
};

// React Query Hooks
export const useMyEnrollments = (
    userId: string | undefined,
    filters?: {
        status?: string;
        sortBy?: string;
        order?: string;
    }
) => {
    return useQuery({
        queryKey: ["my-enrollments", userId, filters],
        queryFn: () => getMyEnrollments(userId!, filters),
        enabled: !!userId,
        staleTime: 30000, // 30 seconds
    });
};

export const useUnenrollFromCourse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            courseId,
            userId,
        }: {
            courseId: string;
            userId: string;
        }) => unenrollFromCourse(courseId, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-enrollments"] });
        },
    });
};

export const useRateCourse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            courseId,
            userId,
            score,
            review,
        }: {
            courseId: string;
            userId: string;
            score: number;
            review?: string;
        }) => rateCourse(courseId, userId, score, review),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-enrollments"] });
        },
    });
};
