"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, CheckCircle2, Clock } from "lucide-react";

interface StatsCardsProps {
    stats:
        | {
              total: number;
              incoming: number;
              outgoing: number;
              completed: number;
          }
        | undefined;
    isLoading: boolean;
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
        },
    }),
};

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    const statCards = [
        {
            title: "Incoming Requests",
            value: stats?.incoming ?? 0,
            icon: ArrowDownIcon,
            color: "bg-blue-500",
            description: "Requests received",
        },
        {
            title: "Pending Approval",
            value: stats?.outgoing ?? 0,
            icon: Clock,
            color: "bg-yellow-500",
            description: "Awaiting response",
        },
        {
            title: "Accepted",
            value: stats?.completed ?? 0,
            icon: CheckCircle2,
            color: "bg-green-500",
            description: "Successful matches",
        },
        {
            title: "Sent Requests",
            value: stats?.total ?? 0,
            icon: ArrowUpIcon,
            color: "bg-purple-500",
            description: "Total sent",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, index) => (
                <motion.div
                    key={stat.title}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                >
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {stat.title}
                                    </p>
                                    <h3 className="text-2xl font-bold mt-2">
                                        {stat.value}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {stat.description}
                                    </p>
                                </div>
                                <div
                                    className={`${stat.color} p-3 rounded-full`}
                                >
                                    <stat.icon className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
