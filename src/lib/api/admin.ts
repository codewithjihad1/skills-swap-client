import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axios/axiosInstance";

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
    role: "user" | "instructor" | "admin";
    avatar?: string;
    createdAt: string;
    updatedAt?: string;
    status?: "active" | "pending" | "suspended" | "banned";
    lastLogin?: string;
    emailVerified?: boolean;
}

export interface UserStats {
    totalUsers: number;
    activeUsers: number;
    instructors: number;
    students: number;
    suspendedUsers: number;
    pendingApprovals: number;
}

// Get admin dashboard statistics
export const getAdminStats = async (): Promise<AdminStats> => {
    try {
        const response = await axiosInstance.get(`/api/stats/admin`);
        return response.data.stats;
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        throw error;
    }
};

// Get system-wide statistics for charts
export const getSystemStats = async (): Promise<SystemStats> => {
    try {
        const response = await axiosInstance.get(`/api/stats/system`);
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
    status?: string;
}): Promise<{ users: User[]; total: number; pages: number }> => {
    try {
        const response = await axiosInstance.get(`/api/users`, {
            params,
        });
        return {
            users: response.data.users || [],
            total: response.data.total || 0,
            pages: response.data.pages || 1,
        };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { users: [], total: 0, pages: 1 };
    }
};

// Get user statistics for admin
export const getUserStats = async (): Promise<UserStats> => {
    try {
        const response = await axiosInstance.get(`/api/users/stats`);

        if (response.data.stats) {
            return response.data.stats;
        }

        // Fallback: calculate from admin stats
        const adminStats = await getAdminStats();
        return {
            totalUsers: adminStats.totalStudents + adminStats.totalInstructors,
            activeUsers: adminStats.activeStudents,
            instructors: adminStats.totalInstructors,
            students: adminStats.totalStudents,
            suspendedUsers: 0,
            pendingApprovals: 0,
        };
    } catch (error) {
        console.error("Error fetching user stats:", error);
        // Return default values
        return {
            totalUsers: 0,
            activeUsers: 0,
            instructors: 0,
            students: 0,
            suspendedUsers: 0,
            pendingApprovals: 0,
        };
    }
};

// Update user role
export const updateUserRole = async (
    userId: string,
    role: "user" | "instructor" | "admin"
): Promise<{ success: boolean; user?: User; error?: string }> => {
    try {
        const response = await axiosInstance.patch(
            `/api/users/${userId}/role`,
            { role }
        );
        return { success: true, user: response.data.user };
    } catch (error: any) {
        console.error("Error updating user role:", error);
        return {
            success: false,
            error: error.response?.data?.error || "Failed to update user role",
        };
    }
};

// Update user status
export const updateUserStatus = async (
    userId: string,
    status: "active" | "suspended" | "banned"
): Promise<{ success: boolean; user?: User; error?: string }> => {
    try {
        const response = await axiosInstance.patch(
            `/api/users/${userId}/status`,
            { status }
        );
        return { success: true, user: response.data.user };
    } catch (error: any) {
        console.error("Error updating user status:", error);
        return {
            success: false,
            error:
                error.response?.data?.error || "Failed to update user status",
        };
    }
};

// Delete user
export const deleteUser = async (
    userId: string
): Promise<{ success: boolean; error?: string }> => {
    try {
        await axiosInstance.delete(`/api/users/${userId}?permanent=true`);
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting user:", error);
        return {
            success: false,
            error: error.response?.data?.error || "Failed to delete user",
        };
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
    status?: string;
}) => {
    return useQuery({
        queryKey: ["all-users", params],
        queryFn: () => getAllUsers(params),
    });
};

export const useUserStats = () => {
    return useQuery({
        queryKey: ["user-stats"],
        queryFn: getUserStats,
        refetchInterval: 60000, // Refetch every minute
    });
};
