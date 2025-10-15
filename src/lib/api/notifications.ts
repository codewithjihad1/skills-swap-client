// src/lib/api/notifications.ts - FIXED VERSION

import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance with better error handling
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add response interceptor for better error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

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
    type: "message" | "skill_request" | "skill_accepted" | "skill_rejected" | "swap_completed" | "review_received" | "system";
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
    success: boolean;
    notifications: Notification[];
    unreadCount: number;
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

// API functions with better error handling
export const notificationAPI = {
    // Get notifications for a user
    getNotifications: async (
        userId: string,
        page = 1,
        limit = 20,
        isRead?: boolean
    ): Promise<NotificationsResponse> => {
        try {
            const params: any = { page, limit };
            if (isRead !== undefined) {
                params.isRead = isRead;
            }

            // ✅ FIXED: Added /api/ prefix in the URL
            const response = await api.get(
                `/notifications/user/${userId}`, // ✅ This is correct - baseURL already has /api
                { params }
            );
            return response.data;
        } catch (error: any) {
            console.error('Error fetching notifications:', error);
            throw new Error(error.response?.data?.error || 'Failed to fetch notifications');
        }
    },

    // Get unread count
    getUnreadCount: async (userId: string): Promise<{ success: boolean; unreadCount: number }> => {
        try {
            // ✅ FIXED: Added /api/ prefix in the URL
            const response = await api.get(
                `/notifications/user/${userId}/unread/count` // ✅ This is correct
            );
            return response.data;
        } catch (error: any) {
            console.error('Error fetching unread count:', error);
            // Return default value instead of throwing error
            return { success: false, unreadCount: 0 };
        }
    },

    // Mark as read
    markAsRead: async (notificationId: string): Promise<{ success: boolean; notification: Notification }> => {
        try {
            // ✅ FIXED: Added /api/ prefix in the URL
            const response = await api.patch(
                `/notifications/${notificationId}/read` // ✅ This is correct
            );
            return response.data;
        } catch (error: any) {
            console.error('Error marking as read:', error);
            throw new Error(error.response?.data?.error || 'Failed to mark as read');
        }
    },

    // Mark all as read
    markAllAsRead: async (userId: string): Promise<{ success: boolean; message: string; modifiedCount: number }> => {
        try {
            // ✅ FIXED: Added /api/ prefix in the URL
            const response = await api.patch(
                `/notifications/user/${userId}/read-all` // ✅ This is correct
            );
            return response.data;
        } catch (error: any) {
            console.error('Error marking all as read:', error);
            throw new Error(error.response?.data?.error || 'Failed to mark all as read');
        }
    },

    // Delete notification
    deleteNotification: async (notificationId: string): Promise<{ success: boolean; message: string }> => {
        try {
            // ✅ FIXED: Added /api/ prefix in the URL
            const response = await api.delete(
                `/notifications/${notificationId}` // ✅ This is correct
            );
            return response.data;
        } catch (error: any) {
            console.error('Error deleting notification:', error);
            throw new Error(error.response?.data?.error || 'Failed to delete notification');
        }
    },
};