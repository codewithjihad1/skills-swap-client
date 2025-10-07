import axiosInstance from "@/axios/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Types
export interface Notification {
    _id: string;
    recipient: string;
    sender?: {
        _id: string;
        name: string;
        email: string;
        avatar?: string;
    };
    type:
        | "message"
        | "skill_request"
        | "skill_accepted"
        | "skill_rejected"
        | "swap_completed"
        | "review_received"
        | "system";
    title: string;
    message: string;
    link?: string;
    data?: any;
    isRead: boolean;
    readAt?: string;
    priority: "low" | "medium" | "high" | "urgent";
    createdAt: string;
    updatedAt: string;
}

export interface NotificationsResponse {
    notifications: Notification[];
    unreadCount: number;
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

// Get notifications for a user
const getNotifications = async (
    userId: string,
    page = 1,
    limit = 20,
    isRead?: boolean
): Promise<NotificationsResponse> => {
    const params: any = { page, limit };
    if (isRead !== undefined) {
        params.isRead = isRead;
    }

    const { data } = await axiosInstance.get(`/api/notifications/${userId}`, {
        params,
    });
    return data;
};

// Get unread count
const getUnreadCount = async (
    userId: string
): Promise<{ unreadCount: number }> => {
    const { data } = await axiosInstance.get(
        `/api/notifications/${userId}/unread/count`
    );
    return data;
};

// Mark notification as read
const markAsRead = async (notificationId: string): Promise<Notification> => {
    const { data } = await axiosInstance.patch(
        `/api/notifications/${notificationId}/read`
    );
    return data;
};

// Mark all as read
const markAllAsRead = async (userId: string): Promise<void> => {
    await axiosInstance.patch(`/api/notifications/${userId}/read-all`);
};

// Delete notification
const deleteNotification = async (notificationId: string): Promise<void> => {
    await axiosInstance.delete(`/api/notifications/${notificationId}`);
};

// Hook to get notifications
export const useNotifications = (
    userId: string | undefined,
    page = 1,
    limit = 20,
    isRead?: boolean
) => {
    return useQuery({
        queryKey: ["notifications", userId, page, limit, isRead],
        queryFn: () => getNotifications(userId!, page, limit, isRead),
        enabled: !!userId,
        refetchInterval: 30000, // Refetch every 30 seconds
    });
};

// Hook to get unread count
export const useUnreadCount = (userId: string | undefined) => {
    return useQuery({
        queryKey: ["unreadCount", userId],
        queryFn: () => getUnreadCount(userId!),
        enabled: !!userId,
        refetchInterval: 10000, // Refetch every 10 seconds
    });
};

// Hook to mark notification as read
export const useMarkNotificationAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: markAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
        },
        onError: (error: any) => {
            console.error("Error marking notification as read:", error);
        },
    });
};

// Hook to mark all as read
export const useMarkAllNotificationsAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: markAllAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
            toast.success("All notifications marked as read");
        },
        onError: (error: any) => {
            console.error("Error marking all notifications as read:", error);
            toast.error("Failed to mark all notifications as read");
        },
    });
};

// Hook to delete notification
export const useDeleteNotification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteNotification,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
            toast.success("Notification deleted");
        },
        onError: (error: any) => {
            console.error("Error deleting notification:", error);
            toast.error("Failed to delete notification");
        },
    });
};
