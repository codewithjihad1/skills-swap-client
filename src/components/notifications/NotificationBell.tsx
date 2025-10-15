// src/components/notifications/NotificationBell.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { Bell, Check, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotifications } from '@/hooks/useNotifications';

interface NotificationBellProps {
    userId: string;
}

export const NotificationBell = ({ userId }: NotificationBellProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    const {
        notifications,
        unreadCount,
        loading,
        markAsRead,
        markAllAsRead,
    } = useNotifications(userId);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNotificationClick = async (notificationId: string) => {
        await markAsRead(notificationId);
        setIsOpen(false);
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInDays < 7) return `${diffInDays}d ago`;
        return date.toLocaleDateString();
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'message': return '💬';
            case 'skill_request': return '🔧';
            case 'skill_accepted': return '✅';
            case 'skill_rejected': return '❌';
            case 'swap_completed': return '🔄';
            case 'review_received': return '⭐';
            case 'system': return '⚙️';
            default: return 'ℹ️';
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Notification Bell Button */}
            <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                    <Badge 
                        variant="destructive" 
                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs min-w-0"
                    >
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </Badge>
                )}
            </Button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            Notifications
                        </h3>
                        <div className="flex items-center gap-2">
                            {unreadCount > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={markAllAsRead}
                                    className="text-xs"
                                >
                                    <Check className="h-3 w-3 mr-1" />
                                    Mark all read
                                </Button>
                            )}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsOpen(false)}
                                className="h-8 w-8 p-0"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Notifications List */}
                    <ScrollArea className="h-96">
                        <div className="p-2">
                            {loading ? (
                                // Loading state
                                <div className="text-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                    <p className="text-sm text-gray-500 mt-2">Loading notifications...</p>
                                </div>
                            ) : notifications.length === 0 ? (
                                // Empty state
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                    <p>No notifications</p>
                                </div>
                            ) : (
                                // Notifications list
                                notifications.slice(0, 10).map((notification) => (
                                    <div
                                        key={notification._id}
                                        className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                                            !notification.isRead 
                                                ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }`}
                                        onClick={() => handleNotificationClick(notification._id)}
                                    >
                                        <div className="flex-shrink-0 text-lg">
                                            {getNotificationIcon(notification.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                                    !notification.isRead 
                                                        ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
                                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                                                }`}>
                                                    {notification.type.replace('_', ' ')}
                                                </span>
                                            </div>
                                            <p className={`text-sm font-medium ${
                                                !notification.isRead 
                                                    ? 'text-gray-900 dark:text-white'
                                                    : 'text-gray-700 dark:text-gray-300'
                                            }`}>
                                                {notification.title}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                                {formatTime(notification.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </ScrollArea>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full text-xs"
                                onClick={() => {
                                    // Navigate to notifications page
                                    window.location.href = '/notifications';
                                }}
                            >
                                View All Notifications
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};