"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SkillWallet from "@/components/dashboard/SkillWallet";
import ActivityOverview from "@/components/dashboard/ActivityOverview";
import MatchSuggestions from "@/components/dashboard/MatchSuggestions";
import InboxMessaging from "@/components/dashboard/InboxMessaging";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import ProfileHeader from "@/components/profile-page/components/profile-header";

export default function UserDashboard() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedConversation, setSelectedConversation] =
        useState<string>("");
    const { data: session, status } = useSession();

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
                skillName: "Node.js Basics",
                dateTime: "Tomorrow at 3:00 PM",
                duration: "1.5 hours",
                type: "learning" as const,
            },
        ],
        notifications: [
            {
                id: "1",
                type: "request" as const,
                message: "New swap request from Alex",
                time: "5 minutes ago",
                read: false,
            },
        ],
    };

    const mockMatches = {
        recommended: [
            {
                id: "1",
                name: "Alex Rodriguez",
                photo: "/api/placeholder/100/100",
                skillOffered: "Python",
                skillNeeded: "JavaScript",
                matchScore: 95,
                rating: 4.8,
                totalSwaps: 12,
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
            partnerPhoto: "/api/placeholder/50/50",
            lastMessage: "Thanks for the session!",
            lastMessageTime: "2m ago",
            unreadCount: 2,
            isOnline: true,
            skillContext: "React Development",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-8">
                {/* Header with Role Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                Welcome back, {session?.user?.name || "User"}!
                                👋
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Your skills exchange dashboard
                            </p>
                        </div>
                        <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-semibold">
                            User Account
                        </div>
                    </div>
                </motion.div>

                {/* Profile Header */}
                {session?.user && <ProfileHeader />}

                {/* Main Dashboard Content */}
                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4 gap-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="wallet">Skill Wallet</TabsTrigger>
                        <TabsTrigger value="matches">Matches</TabsTrigger>
                        <TabsTrigger value="messages">Messages</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <ActivityOverview activities={mockActivities} />
                    </TabsContent>

                    <TabsContent value="wallet" className="space-y-6">
                        <SkillWallet
                            balance={mockWallet}
                            recentTransactions={mockTransactions}
                        />
                    </TabsContent>

                    <TabsContent value="matches" className="space-y-6">
                        <MatchSuggestions
                            matches={mockMatches}
                            searchQuery={searchQuery}
                            onSearch={setSearchQuery}
                        />
                    </TabsContent>

                    <TabsContent value="messages" className="space-y-6">
                        <InboxMessaging
                            conversations={mockConversations}
                            selectedConversation={selectedConversation}
                            onSelectConversation={setSelectedConversation}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
