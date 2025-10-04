"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProfileSummary from "@/components/dashboard/ProfileSummary";
import SkillWallet from "@/components/dashboard/SkillWallet";
import ActivityOverview from "@/components/dashboard/ActivityOverview";
import MatchSuggestions from "@/components/dashboard/MatchSuggestions";
import InboxMessaging from "@/components/dashboard/InboxMessaging";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";

export default function DashboardOverview() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedConversation, setSelectedConversation] =
        useState<string>("");
    const { data: session } = useSession();

    const mockWallet = {
        totalCredits: 450,
        earnedThisMonth: 120,
        spentThisMonth: 85,
        pendingCredits: 25,
    };

    const mockTransactions = [
        {
            id: "1",
            type: "earned" as const,
            amount: 50,
            description: "React Tutorial Session",
            date: "2 hours ago",
            skillName: "React",
        },
    ];

    const mockActivities = {
        recentSwaps: [
            {
                id: "1",
                partnerName: "Sarah Chen",
                skillName: "React Hooks",
                status: "completed" as const,
                date: "2 days ago",
                type: "teaching" as const,
            },
        ],
        upcomingSessions: [
            {
                id: "1",
                partnerName: "David Kim",
                skillName: "Advanced React Patterns",
                dateTime: "Tomorrow, 2:00 PM",
                duration: "1.5 hours",
                type: "teaching" as const,
            },
        ],
        notifications: [
            {
                id: "1",
                type: "request" as const,
                message:
                    "New swap request from John Doe for JavaScript tutoring",
                time: "5 minutes ago",
                read: false,
            },
        ],
    };

    const mockMatches = {
        recommended: [
            {
                id: "1",
                name: "Jennifer Lee",
                photo: "/api/placeholder/48/48",
                skillOffered: "UI/UX Design",
                skillNeeded: "React Development",
                matchScore: 95,
                rating: 4.9,
                totalSwaps: 18,
                availability: "online" as const,
                distance: "2.5 km away",
            },
        ],
        searchResults: [],
    };

    const mockConversations = [
        {
            id: "1",
            partnerName: "Sarah Chen",
            partnerPhoto: "/api/placeholder/48/48",
            lastMessage: "Thanks for the React session! Very helpful.",
            lastMessageTime: "2 min ago",
            unreadCount: 0,
            isOnline: true,
            skillContext: "React Development",
        },
    ];

    // user session data is fetching
    if (!session) {
        return null;
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                {/* Welcome Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome back, {session?.user?.name.split(" ")[0]}! 👋
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Here's what's happening with your skills and swaps
                        today.
                    </p>
                </div>

                {/* Profile Summary */}
                <ProfileSummary user={session?.user} />

                {/* Dashboard Tabs */}
                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="wallet">Wallet</TabsTrigger>
                        <TabsTrigger value="activity">Activity</TabsTrigger>
                        <TabsTrigger value="discover">Discover</TabsTrigger>
                        <TabsTrigger value="messages">Messages</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                        <ActivityOverview activities={mockActivities} />
                    </TabsContent>

                    <TabsContent value="wallet">
                        <SkillWallet
                            balance={mockWallet}
                            recentTransactions={mockTransactions}
                        />
                    </TabsContent>

                    <TabsContent value="activity">
                        <ActivityOverview activities={mockActivities} />
                    </TabsContent>

                    <TabsContent value="discover">
                        <MatchSuggestions
                            matches={mockMatches}
                            searchQuery={searchQuery}
                            onSearch={setSearchQuery}
                        />
                    </TabsContent>

                    <TabsContent value="messages">
                        <InboxMessaging
                            conversations={mockConversations}
                            selectedConversation={selectedConversation}
                            onSelectConversation={setSelectedConversation}
                        />
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    );
}
