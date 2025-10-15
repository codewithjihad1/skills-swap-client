//src/components/dashboard/ActivityOverview.tsx

"use client";

import { motion } from "framer-motion";
import {
    Activity,
    Clock,
    CheckCircle,
    XCircle,
    Calendar,
    Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActivityOverviewProps {
    activities: {
        recentSwaps: {
            id: string;
            partnerName: string;
            skillName: string;
            status: "pending" | "ongoing" | "completed" | "cancelled";
            date: string;
            type: "teaching" | "learning";
        }[];
        upcomingSessions: {
            id: string;
            partnerName: string;
            skillName: string;
            dateTime: string;
            duration: string;
            type: "teaching" | "learning";
        }[];
        notifications: {
            id: string;
            type: "request" | "confirmation" | "review" | "reminder";
            message: string;
            time: string;
            read: boolean;
        }[];
    };
}

const ActivityOverview = ({ activities }: ActivityOverviewProps) => {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "pending":
                return <Clock className="w-4 h-4 text-yellow-500" />;
            case "ongoing":
                return <Activity className="w-4 h-4 text-blue-500" />;
            case "completed":
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case "cancelled":
                return <XCircle className="w-4 h-4 text-red-500" />;
            default:
                return <Clock className="w-4 h-4 text-gray-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300";
            case "ongoing":
                return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300";
            case "completed":
                return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";
            case "cancelled":
                return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300";
            default:
                return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300";
        }
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "request":
                return <Activity className="w-4 h-4 text-blue-500" />;
            case "confirmation":
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case "review":
                return <Bell className="w-4 h-4 text-purple-500" />;
            case "reminder":
                return <Clock className="w-4 h-4 text-yellow-500" />;
            default:
                return <Bell className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Swaps */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6"
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" />
                        Recent Swaps
                    </h3>
                    <Button variant="ghost" size="sm">
                        View All
                    </Button>
                </div>
                <div className="space-y-3">
                    {activities.recentSwaps.map((swap) => (
                        <div
                            key={swap.id}
                            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                        >
                            <div className="flex-shrink-0">
                                {getStatusIcon(swap.status)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                                            swap.status
                                        )}`}
                                    >
                                        {swap.status}
                                    </span>
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full ${
                                            swap.type === "teaching"
                                                ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                                                : "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                                        }`}
                                    >
                                        {swap.type}
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {swap.skillName} with {swap.partnerName}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {swap.date}
                                </p>
                            </div>
                        </div>
                    ))}
                    {activities.recentSwaps.length === 0 && (
                        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                            <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No recent swaps</p>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Upcoming Sessions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6"
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        Upcoming Sessions
                    </h3>
                    <Button variant="ghost" size="sm">
                        Schedule
                    </Button>
                </div>
                <div className="space-y-3">
                    {activities.upcomingSessions.map((session) => (
                        <div
                            key={session.id}
                            className="border-l-4 border-primary pl-4 py-2"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span
                                    className={`px-2 py-1 text-xs rounded-full ${
                                        session.type === "teaching"
                                            ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                                    }`}
                                >
                                    {session.type}
                                </span>
                            </div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {session.skillName} with {session.partnerName}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                <Clock className="w-3 h-3" />
                                <span>{session.dateTime}</span>
                                <span>•</span>
                                <span>{session.duration}</span>
                            </div>
                        </div>
                    ))}
                    {activities.upcomingSessions.length === 0 && (
                        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                            <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No upcoming sessions</p>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Notifications */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6"
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Bell className="w-5 h-5 text-primary" />
                        Notifications
                        {activities.notifications.filter((n) => !n.read)
                            .length > 0 && (
                            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {
                                    activities.notifications.filter(
                                        (n) => !n.read
                                    ).length
                                }
                            </span>
                        )}
                    </h3>
                    <Button variant="ghost" size="sm">
                        Mark All Read
                    </Button>
                </div>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                    {activities.notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`flex items-start gap-3 p-3 rounded-lg ${
                                !notification.read
                                    ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500"
                                    : "bg-gray-50 dark:bg-gray-700/50"
                            }`}
                        >
                            <div className="flex-shrink-0 mt-0.5">
                                {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p
                                    className={`text-sm ${
                                        !notification.read
                                            ? "font-medium text-gray-900 dark:text-white"
                                            : "text-gray-700 dark:text-gray-300"
                                    }`}
                                >
                                    {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {notification.time}
                                </p>
                            </div>
                        </div>
                    ))}
                    {activities.notifications.length === 0 && (
                        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                            <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No notifications</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default ActivityOverview;
