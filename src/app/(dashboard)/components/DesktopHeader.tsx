// src/app/(dashboard)/components/DesktopHeader.tsx - FIXED VERSION
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Bell,
    Search,
    Check,
    X,
    Clock,
    AlertCircle,
    CheckCircle,
    MessageSquare,
    Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddSkillComponent from "@/components/skills/AddSkill";
import UserDropDown from "@/components/user/UserDropDown";
import { useSession } from "next-auth/react";
import { useNotifications } from "@/hooks/useNotifications";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const DesktopHeader = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);

    // ✅ FIXED: useNotifications hook now properly uses session user ID
    const {
        notifications,
        unreadCount,
        loading,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        refetch: refetchNotifications,
    } = useNotifications(session?.user?.id);

    // Close notification dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target as Node)
            ) {
                setIsNotificationOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNotificationClick = async (
        notificationId: string,
        link?: string
    ) => {
        await markAsRead(notificationId);
        setIsNotificationOpen(false);

        // Navigate if link exists
        if (link) {
            router.push(link);
        }
    };

    // ✅ FIXED: markAllAsRead doesn't need userId parameter anymore
    const handleMarkAllAsRead = async () => {
        await markAllAsRead(); // ✅ No parameter needed
    };

    const handleDeleteNotification = async (
        notificationId: string,
        e: React.MouseEvent
    ) => {
        e.stopPropagation();
        await deleteNotification(notificationId);
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInMinutes < 1) return "Just now";
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInDays < 7) return `${diffInDays}d ago`;
        return date.toLocaleDateString();
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "message":
                return <MessageSquare className="w-4 h-4 text-primary" />;
            case "skill_request":
                return <Zap className="w-4 h-4 text-secondary" />;
            case "skill_accepted":
                return <CheckCircle className="w-4 h-4 text-primary" />;
            case "skill_rejected":
                return <AlertCircle className="w-4 h-4 text-destructive" />;
            case "swap_completed":
                return <Check className="w-4 h-4 text-accent-foreground" />;
            case "review_received":
                return <Bell className="w-4 h-4 text-secondary" />;
            case "system":
                return <Zap className="w-4 h-4 text-muted-foreground" />;
            default:
                return <Bell className="w-4 h-4 text-muted-foreground" />;
        }
    };

    const getNotificationColor = (type: string) => {
        switch (type) {
            case "message":
                return "border-l-primary bg-primary/5";
            case "skill_request":
                return "border-l-secondary bg-secondary/5";
            case "skill_accepted":
                return "border-l-primary bg-primary/5";
            case "skill_rejected":
                return "border-l-destructive bg-destructive/5";
            case "swap_completed":
                return "border-l-accent bg-accent/10";
            case "review_received":
                return "border-l-secondary bg-secondary/5";
            case "system":
                return "border-l-muted bg-muted";
            default:
                return "border-l-muted bg-muted";
        }
    };

    // Show loading state while session is being fetched
    if (status === "loading" && !session) {
        return (
            <header className="hidden lg:block bg-card border-b border-border px-6 py-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex-1 max-w-lg">
                        {/* Skeleton replacement for search input */}
                        <div className="h-10 w-full bg-muted rounded-lg animate-pulse" />
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Skeleton replacement for buttons */}
                        <div className="h-9 w-24 bg-muted rounded-md animate-pulse" />
                        <div className="h-9 w-9 bg-muted rounded-full animate-pulse" />
                        <div className="h-8 w-8 bg-muted rounded-full animate-pulse" />
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="hidden lg:block bg-card border-b border-border px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex-1 max-w-lg">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search skills, users, or conversations..."
                            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <AddSkillComponent />

                    {/* Notification Bell */}
                    <div className="relative" ref={notificationRef}>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "relative transition-all duration-200 hover:bg-accent",
                                unreadCount > 0 && "text-primary animate-pulse"
                            )}
                            onClick={() =>
                                setIsNotificationOpen(!isNotificationOpen)
                            }
                        >
                            <Bell className="w-5 h-5" />
                            {unreadCount > 0 && (
                                <Badge
                                    variant="destructive"
                                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs min-w-0 bg-primary hover:bg-primary"
                                >
                                    {unreadCount > 9 ? "9+" : unreadCount}
                                </Badge>
                            )}
                        </Button>

                        {/* Notification Dropdown */}
                        <AnimatePresence>
                            {isNotificationOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 top-12 w-96 bg-card border border-border rounded-lg shadow-xl z-50"
                                >
                                    {/* Header */}
                                    <div className="flex items-center justify-between p-4 border-b border-border">
                                        <div>
                                            <h3 className="font-semibold text-foreground">
                                                Notifications
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {unreadCount} unread
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {unreadCount > 0 && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={
                                                        handleMarkAllAsRead
                                                    } // ✅ FIXED: No parameter needed
                                                    className="text-xs h-8 hover:bg-accent hover:text-primary"
                                                    disabled={loading}
                                                >
                                                    <Check className="w-3 h-3 mr-1" />
                                                    Mark all read
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    setIsNotificationOpen(false)
                                                }
                                                className="h-8 w-8 p-0 hover:bg-accent"
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Notifications List */}
                                    <ScrollArea className="max-h-[480px]">
                                        <div className="p-2">
                                            {loading ? (
                                                // Loading state without Skeleton
                                                <div className="space-y-3">
                                                    {Array.from({
                                                        length: 5,
                                                    }).map((_, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-start gap-3 p-3"
                                                        >
                                                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                                                            <div className="space-y-2 flex-1">
                                                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
                                                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full" />
                                                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : notifications.length === 0 ? (
                                                // Empty state
                                                <div className="text-center py-8 text-muted-foreground">
                                                    <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                                    <p className="text-sm">
                                                        No notifications yet
                                                    </p>
                                                    <p className="text-xs mt-1">
                                                        We'll notify you when
                                                        something arrives
                                                    </p>
                                                </div>
                                            ) : (
                                                // Notifications list
                                                <div className="space-y-2">
                                                    {notifications
                                                        .slice(0, 8)
                                                        .map((notification) => (
                                                            <motion.div
                                                                key={
                                                                    notification._id
                                                                }
                                                                initial={{
                                                                    opacity: 0,
                                                                    x: -20,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    x: 0,
                                                                }}
                                                                className={cn(
                                                                    "flex items-start gap-3 p-3 rounded-lg border-l-4 cursor-pointer transition-all hover:shadow-md group",
                                                                    getNotificationColor(
                                                                        notification.type
                                                                    ),
                                                                    !notification.isRead &&
                                                                        "ring-1 ring-blue-200 dark:ring-blue-800"
                                                                )}
                                                                onClick={() =>
                                                                    handleNotificationClick(
                                                                        notification._id,
                                                                        notification.link
                                                                    )
                                                                }
                                                            >
                                                                <div className="flex-shrink-0 mt-1">
                                                                    {getNotificationIcon(
                                                                        notification.type
                                                                    )}
                                                                </div>

                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-start justify-between gap-2 mb-1">
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                                                                                {notification.type.replace(
                                                                                    "_",
                                                                                    " "
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                handleDeleteNotification(
                                                                                    notification._id,
                                                                                    e
                                                                                )
                                                                            }
                                                                        >
                                                                            <X className="w-3 h-3" />
                                                                        </Button>
                                                                    </div>

                                                                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                                                        {
                                                                            notification.title
                                                                        }
                                                                    </p>

                                                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                                                        {
                                                                            notification.message
                                                                        }
                                                                    </p>

                                                                    <div className="flex items-center justify-between">
                                                                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                                                            <div className="flex items-center gap-1">
                                                                                <Clock className="w-3 h-3" />
                                                                                {formatTime(
                                                                                    notification.createdAt
                                                                                )}
                                                                            </div>
                                                                            {!notification.isRead && (
                                                                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                                                            )}
                                                                        </div>

                                                                        {!notification.isRead && (
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="sm"
                                                                                className="h-6 text-xs"
                                                                                onClick={(
                                                                                    e
                                                                                ) => {
                                                                                    e.stopPropagation();
                                                                                    handleNotificationClick(
                                                                                        notification._id,
                                                                                        notification.link
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <Check className="w-3 h-3 mr-1" />
                                                                                Mark
                                                                                read
                                                                            </Button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                </div>
                                            )}
                                        </div>
                                    </ScrollArea>

                                    {/* Footer */}
                                    {notifications.length > 0 && (
                                        <div className="p-3 border-t border-border">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full text-sm hover:bg-primary hover:text-white transition-colors"
                                                onClick={() => {
                                                    setIsNotificationOpen(
                                                        false
                                                    );
                                                    router.push(
                                                        "/notifications"
                                                    );
                                                }}
                                            >
                                                View All Notifications
                                            </Button>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <UserDropDown />
                </div>
            </div>
        </header>
    );
};

export default DesktopHeader;
