import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axios/axiosInstance";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Payment {
    _id: string;
    userId: string;
    userEmail: string;
    courseId: {
        _id: string;
        title: string;
        thumbnail?: string;
    };
    courseName: string;
    orderId: string;
    amount: number;
    currency: string;
    paymentMethod: "bkash" | "nagad" | "card";
    paymentID?: string;
    trxID?: string;
    transactionStatus:
        | "Initiated"
        | "Pending"
        | "Completed"
        | "Failed"
        | "Cancelled"
        | "Refunded";
    status:
        | "pending"
        | "processing"
        | "completed"
        | "failed"
        | "cancelled"
        | "refunded";
    errorMessage?: string;
    initiatedAt: string;
    completedAt?: string;
    failedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface WalletStats {
    totalEarnings: number;
    thisMonthEarnings: number;
    pendingAmount: number;
    completedTransactions: number;
    totalTransactions: number;
}

export interface UserPaymentsResponse {
    success: boolean;
    data: {
        payments: Payment[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    };
}

// Get user's payment history
export const getUserPayments = async (
    userId: string,
    params?: {
        status?: string;
        limit?: number;
        page?: number;
    }
): Promise<UserPaymentsResponse> => {
    const response = await axiosInstance.get(`/api/payment/user/${userId}`, {
        params,
    });
    return response.data;
};

// Get instructor wallet statistics
export const getInstructorWalletStats = async (
    instructorId: string
): Promise<WalletStats> => {
    try {
        // Get all payments for instructor's courses
        // First, get instructor's courses
        const coursesResponse = await axiosInstance.get(`/api/courses`, {
            params: {
                instructor: instructorId,
                limit: 1000,
            },
        });

        const courses = coursesResponse.data.courses || [];
        const courseIds = courses.map((course: any) => course._id);

        if (courseIds.length === 0) {
            return {
                totalEarnings: 0,
                thisMonthEarnings: 0,
                pendingAmount: 0,
                completedTransactions: 0,
                totalTransactions: 0,
            };
        }

        // Get all payments for these courses
        const paymentsPromises = courseIds.map((courseId: string) =>
            axiosInstance.get(`/api/payment/course/${courseId}`).catch(() => ({
                data: { success: false, data: { payments: [] } },
            }))
        );

        const paymentsResponses = await Promise.all(paymentsPromises);

        // Flatten all payments
        const allPayments: Payment[] = paymentsResponses.flatMap(
            (response) => response.data.data?.payments || []
        );

        // Calculate statistics
        const completedPayments = allPayments.filter(
            (p) => p.status === "completed"
        );
        const pendingPayments = allPayments.filter(
            (p) => p.status === "pending" || p.status === "processing"
        );

        const totalEarnings = completedPayments.reduce(
            (sum, p) => sum + p.amount,
            0
        );

        // Calculate this month's earnings
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const thisMonthEarnings = completedPayments
            .filter(
                (p) => new Date(p.completedAt || p.createdAt) >= firstDayOfMonth
            )
            .reduce((sum, p) => sum + p.amount, 0);

        const pendingAmount = pendingPayments.reduce(
            (sum, p) => sum + p.amount,
            0
        );

        return {
            totalEarnings,
            thisMonthEarnings,
            pendingAmount,
            completedTransactions: completedPayments.length,
            totalTransactions: allPayments.length,
        };
    } catch (error) {
        console.error("Error fetching wallet stats:", error);
        return {
            totalEarnings: 0,
            thisMonthEarnings: 0,
            pendingAmount: 0,
            completedTransactions: 0,
            totalTransactions: 0,
        };
    }
};

// Get instructor payments (enrollments from their courses)
export const getInstructorPayments = async (
    instructorId: string,
    params?: {
        status?: string;
        limit?: number;
        page?: number;
    }
): Promise<Payment[]> => {
    try {
        // Get instructor's courses
        const coursesResponse = await axiosInstance.get(`/api/courses`, {
            params: {
                instructor: instructorId,
                limit: 1000,
            },
        });

        const courses = coursesResponse.data.courses || [];
        const courseIds = courses.map((course: any) => course._id);

        if (courseIds.length === 0) {
            return [];
        }

        // Get all payments for these courses
        const paymentsPromises = courseIds.map((courseId: string) =>
            axiosInstance
                .get(`/api/payment/course/${courseId}`, { params })
                .catch(() => ({
                    data: { success: false, data: { payments: [] } },
                }))
        );

        const paymentsResponses = await Promise.all(paymentsPromises);

        // Flatten and filter all payments
        let allPayments: Payment[] = paymentsResponses.flatMap(
            (response) => response.data.data?.payments || []
        );

        // Filter by status if provided
        if (params?.status) {
            allPayments = allPayments.filter((p) => p.status === params.status);
        }

        // Sort by date (newest first)
        allPayments.sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );

        // Apply pagination
        const page = params?.page || 1;
        const limit = params?.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        return allPayments.slice(startIndex, endIndex);
    } catch (error) {
        console.error("Error fetching instructor payments:", error);
        return [];
    }
};

// React Query hooks
export const useUserPayments = (
    userId: string,
    params?: {
        status?: string;
        limit?: number;
        page?: number;
    }
) => {
    return useQuery({
        queryKey: ["user-payments", userId, params],
        queryFn: () => getUserPayments(userId, params),
        enabled: !!userId,
    });
};

export const useInstructorWalletStats = (instructorId: string) => {
    return useQuery({
        queryKey: ["instructor-wallet-stats", instructorId],
        queryFn: () => getInstructorWalletStats(instructorId),
        enabled: !!instructorId,
    });
};

export const useInstructorPayments = (
    instructorId: string,
    params?: {
        status?: string;
        limit?: number;
        page?: number;
    }
) => {
    return useQuery({
        queryKey: ["instructor-payments", instructorId, params],
        queryFn: () => getInstructorPayments(instructorId, params),
        enabled: !!instructorId,
    });
};
