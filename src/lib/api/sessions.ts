import axiosInstance from "@/axios/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Types
export interface Session {
    _id: string;
    swapRequest: string;
    participants: Array<{
        userId: string;
        email: string;
        name: string;
        role: "requester" | "provider";
    }>;
    scheduledDate: string;
    duration: number;
    status: "scheduled" | "completed" | "cancelled" | "rescheduled";
    meetingLink: string;
    googleCalendar: {
        eventId: string;
        htmlLink: string;
        createdBy: string;
    };
    skill: {
        skillId: string;
        title: string;
        category: string;
    };
    notes?: string;
    cancellationReason?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ScheduleSessionData {
    swapRequestId: string;
    scheduledDate: string;
    duration?: number;
    notes?: string;
    timeZone?: string;
}

export interface RescheduleSessionData {
    sessionId: string;
    scheduledDate: string;
    duration?: number;
    notes?: string;
}

export interface CancelSessionData {
    sessionId: string;
    reason?: string;
}

// API Functions
const scheduleSession = async (data: ScheduleSessionData) => {
    try {
        const response = await axiosInstance.post(
            "/api/sessions/schedule",
            data,
            { timeout: 30000 }
        );
        return response.data;
    } catch (error) {
        console.error("Error scheduling session:", error);
        throw error;
    }
};

const getUserSessions = async (userId: string, status?: string) => {
    const params = status ? { status } : {};
    const response = await axiosInstance.get(`/api/sessions/user/${userId}`, {
        params,
    });
    return response.data;
};

const getSessionDetails = async (sessionId: string) => {
    const response = await axiosInstance.get(`/api/sessions/${sessionId}`);
    return response.data;
};

const rescheduleSession = async (data: RescheduleSessionData) => {
    const { sessionId, ...updateData } = data;
    const response = await axiosInstance.patch(
        `/api/sessions/${sessionId}/reschedule`,
        updateData
    );
    return response.data;
};

const cancelSession = async (data: CancelSessionData) => {
    const { sessionId, reason } = data;
    const response = await axiosInstance.patch(
        `/api/sessions/${sessionId}/cancel`,
        { reason }
    );
    return response.data;
};

const completeSession = async (sessionId: string) => {
    const response = await axiosInstance.patch(
        `/api/sessions/${sessionId}/complete`
    );
    return response.data;
};

const getGoogleAuthUrl = async () => {
    const response = await axiosInstance.get("/api/sessions/google/auth");
    return response.data;
};

// React Query Hooks

/**
 * Hook to schedule a new session
 */
export const useScheduleSession = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: scheduleSession,
        onSuccess: (data) => {
            toast.success("Session scheduled successfully!", {
                description: "Calendar invite sent to all participants",
            });
            // Invalidate relevant queries
            queryClient.invalidateQueries({ queryKey: ["sessions"] });
            queryClient.invalidateQueries({ queryKey: ["swapRequests"] });
        },
        onError: (error: any) => {
            console.error("Error scheduling session:", error);
            toast.error("Failed to schedule session", {
                description:
                    error?.response?.data?.error ||
                    error?.response?.data?.details ||
                    "Please try again later.",
            });
        },
    });
};

/**
 * Hook to get user sessions
 */
export const useUserSessions = (
    userId: string | undefined,
    status?: string
) => {
    return useQuery({
        queryKey: ["sessions", userId, status],
        queryFn: () => getUserSessions(userId!, status),
        enabled: !!userId,
        staleTime: 30000, // 30 seconds
    });
};

/**
 * Hook to get session details
 */
export const useSessionDetails = (sessionId: string | undefined) => {
    return useQuery({
        queryKey: ["session", sessionId],
        queryFn: () => getSessionDetails(sessionId!),
        enabled: !!sessionId,
    });
};

/**
 * Hook to reschedule a session
 */
export const useRescheduleSession = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: rescheduleSession,
        onSuccess: () => {
            toast.success("Session rescheduled successfully!");
            queryClient.invalidateQueries({ queryKey: ["sessions"] });
        },
        onError: (error: any) => {
            console.error("Error rescheduling session:", error);
            toast.error("Failed to reschedule session", {
                description:
                    error?.response?.data?.error || "Please try again later.",
            });
        },
    });
};

/**
 * Hook to cancel a session
 */
export const useCancelSession = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cancelSession,
        onSuccess: () => {
            toast.success("Session cancelled successfully");
            queryClient.invalidateQueries({ queryKey: ["sessions"] });
        },
        onError: (error: any) => {
            console.error("Error cancelling session:", error);
            toast.error("Failed to cancel session", {
                description:
                    error?.response?.data?.error || "Please try again later.",
            });
        },
    });
};

/**
 * Hook to mark session as completed
 */
export const useCompleteSession = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: completeSession,
        onSuccess: () => {
            toast.success("Session marked as completed!");
            queryClient.invalidateQueries({ queryKey: ["sessions"] });
            queryClient.invalidateQueries({ queryKey: ["swapRequests"] });
        },
        onError: (error: any) => {
            console.error("Error completing session:", error);
            toast.error("Failed to complete session", {
                description:
                    error?.response?.data?.error || "Please try again later.",
            });
        },
    });
};

/**
 * Hook to get Google auth URL
 */
export const useGoogleAuthUrl = () => {
    return useQuery({
        queryKey: ["googleAuthUrl"],
        queryFn: getGoogleAuthUrl,
        enabled: false, // Only fetch when manually triggered
    });
};
