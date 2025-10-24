import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axios/axiosInstance";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface AdminStats {
    totalStudents: number;
    totalInstructors: number;
    activeCourses: number;
    totalCourses: number;
    completionRate: number;
    averageRating: number;
    totalEarnings: number;
    thisMonthEarnings: number;
    totalEnrollments: number;
    activeStudents: number;
    recentEnrollments: number;
}

export interface SystemStats {
    monthlyEnrollments: {
        _id: { year: number; month: number };
        count: number;
    }[];
    topCourses: {
        _id: string;
        title: string;
        enrollmentCount: number;
        rating: {
            average: number;
            count: number;
        };
        category: string;
    }[];
    categoryDistribution: {
        _id: string;
        count: number;
        totalEnrollments: number;
    }[];
    userGrowth: {
        _id: { year: number; month: number };
        count: number;
    }[];
}

export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    createdAt: string;
    status?: string;
}

// Get admin dashboard statistics
export const getAdminStats = async (): Promise<AdminStats> => {
    try {
        const response = await axiosInstance.get(
            `${API_BASE_URL}/api/stats/admin`
        );
        return response.data.stats;
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        throw error;
    }
};

// Get system-wide statistics for charts
export const getSystemStats = async (): Promise<SystemStats> => {
    try {
        const response = await axiosInstance.get(
            `${API_BASE_URL}/api/stats/system`
        );
        return response.data.stats;
    } catch (error) {
        console.error("Error fetching system stats:", error);
        throw error;
    }
};

// Get all users (with pagination and filters)
export const getAllUsers = async (params?: {
    role?: string;
    limit?: number;
    page?: number;
    search?: string;
}): Promise<{ users: User[]; total: number }> => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/api/users`, {
            params,
        });
        return {
            users: response.data.users || [],
            total: response.data.total || 0,
        };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { users: [], total: 0 };
    }
};

// React Query hooks
export const useAdminStats = () => {
    return useQuery({
        queryKey: ["admin-stats"],
        queryFn: getAdminStats,
        refetchInterval: 60000, // Refetch every minute
    });
};

export const useSystemStats = () => {
    return useQuery({
        queryKey: ["system-stats"],
        queryFn: getSystemStats,
        refetchInterval: 300000, // Refetch every 5 minutes
    });
};

export const useAllUsers = (params?: {
    role?: string;
    limit?: number;
    page?: number;
    search?: string;
}) => {
    return useQuery({
        queryKey: ["all-users", params],
        queryFn: () => getAllUsers(params),
    });
};
