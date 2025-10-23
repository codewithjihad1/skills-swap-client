// src/hooks/useNotifications.ts

import axiosInstance from "@/axios/axiosInstance";
import { useState, useEffect, useCallback } from "react";
import { useSocket } from "@/context/SocketContext";

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

interface UseNotificationsReturn {
    notifications: Notification[];
    unreadCount: number;
    loading: boolean;
    error: string | null;
    markAsRead: (notificationId: string) => Promise<boolean>;
    markAllAsRead: () => Promise<boolean>;
    deleteNotification: (notificationId: string) => Promise<boolean>;
    refetch: () => void;
}

const notificationAPI = {
    getNotifications: async (userId: string): Promise<any> => {
        try {
            console.log("🔍 Fetching notifications for user:", userId);
            const response = await axiosInstance.get(
                `/api/notifications/user/${userId}`
            );
            return response.data;
        } catch (error) {
            console.error("❌ Error fetching notifications:", error);
            throw error;
        }
    },

    getUnreadCount: async (userId: string): Promise<any> => {
        try {
            const response = await axiosInstance.get(
                `/api/notifications/user/${userId}/unread/count`
            );
            return response.data;
        } catch (error) {
            console.error("❌ Error fetching unread count:", error);
            throw error;
        }
    },

    markAsRead: async (notificationId: string): Promise<any> => {
        try {
            const response = await axiosInstance.patch(
                `/api/notifications/${notificationId}/read`
            );
            return response.data;
        } catch (error) {
            console.error("❌ Error marking as read:", error);
            throw error;
        }
    },

    markAllAsRead: async (userId: string): Promise<any> => {
        try {
            const response = await axiosInstance.patch(
                `/api/notifications/user/${userId}/read-all`
            );
            return response.data;
        } catch (error) {
            console.error("❌ Error marking all as read:", error);
            throw error;
        }
    },

    deleteNotification: async (notificationId: string): Promise<any> => {
        try {
            const response = await axiosInstance.delete(
                `/api/notifications/${notificationId}`
            );
            return response.data;
        } catch (error) {
            console.error("❌ Error deleting notification:", error);
            throw error;
        }
    },
};

export const useNotifications = (userId?: string): UseNotificationsReturn => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { socket, unreadCounts } = useSocket();

    const fetchNotifications = useCallback(async () => {
        if (!userId) {
            console.log("⏸️ No userId provided, skipping fetch");
            setLoading(false);
            return;
        }

        console.log("🔄 Fetching notifications for userId:", userId);
        setLoading(true);
        setError(null);

        try {
            const data = await notificationAPI.getNotifications(userId);
            console.log("✅ Notifications data received:", data);

            if (data.success) {
                setNotifications(data.notifications || []);
                setUnreadCount(data.unreadCount || 0);
                console.log(
                    `📨 Loaded ${
                        data.notifications?.length || 0
                    } notifications, ${data.unreadCount || 0} unread`
                );
            } else {
                setError("Failed to fetch notifications");
                console.error("❌ API returned success: false");
            }
        } catch (err: any) {
            console.error("💥 Error in fetchNotifications:", err);
            setError(err.message || "Failed to fetch notifications");
            setNotifications([]);
            setUnreadCount(0);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    const fetchUnreadCount = useCallback(async () => {
        if (!userId) return;

        try {
            const data = await notificationAPI.getUnreadCount(userId);
            if (data.success) {
                setUnreadCount(data.unreadCount || 0);
                console.log("🔢 Updated unread count:", data.unreadCount);
            }
        } catch (err: any) {
            console.error("💥 Error in fetchUnreadCount:", err);
        }
    }, [userId]);

    const markAsRead = async (notificationId: string): Promise<boolean> => {
        try {
            const data = await notificationAPI.markAsRead(notificationId);
            if (data.success) {
                setNotifications((prev) =>
                    prev.map((notif) =>
                        notif._id === notificationId
                            ? {
                                  ...notif,
                                  isRead: true,
                                  readAt: new Date().toISOString(),
                              }
                            : notif
                    )
                );
                setUnreadCount((prev) => Math.max(0, prev - 1));
                console.log("✅ Marked notification as read:", notificationId);
                return true;
            }
            return false;
        } catch (err: any) {
            console.error("❌ Error marking as read:", err);
            return false;
        }
    };

    const markAllAsRead = async (): Promise<boolean> => {
        if (!userId) return false;

        try {
            const data = await notificationAPI.markAllAsRead(userId);
            if (data.success) {
                setNotifications((prev) =>
                    prev.map((notif) => ({
                        ...notif,
                        isRead: true,
                        readAt: new Date().toISOString(),
                    }))
                );
                setUnreadCount(0);
                console.log("✅ Marked all notifications as read");
                return true;
            }
            return false;
        } catch (err: any) {
            console.error("❌ Error marking all as read:", err);
            return false;
        }
    };

    const deleteNotification = async (
        notificationId: string
    ): Promise<boolean> => {
        try {
            const data = await notificationAPI.deleteNotification(
                notificationId
            );
            if (data.success) {
                const notification = notifications.find(
                    (n) => n._id === notificationId
                );
                setNotifications((prev) =>
                    prev.filter((notif) => notif._id !== notificationId)
                );
                if (notification && !notification.isRead) {
                    setUnreadCount((prev) => Math.max(0, prev - 1));
                }
                console.log("🗑️ Deleted notification:", notificationId);
                return true;
            }
            return false;
        } catch (err: any) {
            console.error("❌ Error deleting notification:", err);
            return false;
        }
    };

    // Initial fetch
    useEffect(() => {
        console.log(
            "🎯 useNotifications hook initialized with userId:",
            userId
        );
        fetchNotifications();
    }, [fetchNotifications]);

    // Listen for real-time socket updates
    useEffect(() => {
        if (!socket || !userId) return;

        console.log("🔌 Setting up socket listeners for notifications");

        // Listen for new notifications
        const handleNewNotification = (notification: Notification) => {
            console.log("🔔 New notification received:", notification);
            setNotifications((prev) => [notification, ...prev]);
            setUnreadCount((prev) => prev + 1);
        };

        // Listen for unread count updates
        const handleUnreadCount = (data: { count: number }) => {
            console.log("🔢 Unread count updated:", data.count);
            setUnreadCount(data.count);
        };

        // Listen for read confirmation
        const handleReadConfirm = (data: {
            notificationId: string;
            success: boolean;
        }) => {
            if (data.success) {
                console.log(
                    "✅ Notification read confirmed:",
                    data.notificationId
                );
            }
        };

        // Listen for all read confirmation
        const handleAllReadConfirm = (data: {
            success: boolean;
            modifiedCount: number;
        }) => {
            if (data.success) {
                console.log(
                    "✅ All notifications marked as read:",
                    data.modifiedCount
                );
            }
        };

        // Listen for delete confirmation
        const handleDeleteConfirm = (data: {
            notificationId: string;
            success: boolean;
        }) => {
            if (data.success) {
                console.log("🗑️ Notification deleted:", data.notificationId);
            }
        };

        socket.on("notification:new", handleNewNotification);
        socket.on("notification:unread-count", handleUnreadCount);
        socket.on("notification:read-confirm", handleReadConfirm);
        socket.on("notification:all-read-confirm", handleAllReadConfirm);
        socket.on("notification:delete-confirm", handleDeleteConfirm);

        return () => {
            socket.off("notification:new", handleNewNotification);
            socket.off("notification:unread-count", handleUnreadCount);
            socket.off("notification:read-confirm", handleReadConfirm);
            socket.off("notification:all-read-confirm", handleAllReadConfirm);
            socket.off("notification:delete-confirm", handleDeleteConfirm);
        };
    }, [socket, userId]);

    // Sync with socket unread counts
    useEffect(() => {
        if (unreadCounts.notifications !== unreadCount) {
            console.log(
                "🔄 Syncing unread count from socket:",
                unreadCounts.notifications
            );
            setUnreadCount(unreadCounts.notifications);
        }
    }, [unreadCounts.notifications]);

    const refetch = () => {
        console.log("🔄 Manually refetching notifications");
        fetchNotifications();
    };

    return {
        notifications,
        unreadCount,
        loading,
        error,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        refetch,
    };
};
