"use client";

import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { ArrowRight, Plus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    useSwapRequests,
    useSwapRequestStats,
    useRespondToSwapRequest,
    useCancelSwapRequest,
} from "@/lib/api/swapRequests";

// Import components
import { StatsCards } from "./components/StatsCards";
import { SearchFilter } from "./components/SearchFilter";
import { SendRequestModal } from "./components/SendRequestModal";
import { IncomingRequestCard } from "./components/IncomingRequestCard";
import { OutgoingRequestCard } from "./components/OutgoingRequestCard";

export default function RequestsPage() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState("incoming");
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All Categories");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showSendModal, setShowSendModal] = useState(false);

    // Fetch data
    const userId = session?.user?.id || "";
    const { data: stats, isLoading: statsLoading } =
        useSwapRequestStats(userId);
    const { data: incomingRequests, isLoading: incomingLoading } =
        useSwapRequests(
            userId,
            "received",
            statusFilter === "all" ? undefined : statusFilter
        );
    const { data: outgoingRequests, isLoading: outgoingLoading } =
        useSwapRequests(
            userId,
            "sent",
            statusFilter === "all" ? undefined : statusFilter
        );

    // Mutations
    const respondMutation = useRespondToSwapRequest();
    const cancelMutation = useCancelSwapRequest();

    // Filter requests based on search and category
    const filterRequests = (requests: any[]) => {
        if (!requests) return [];

        return requests.filter((request) => {
            const matchesSearch =
                searchQuery === "" ||
                request.requester?.name
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                request.skillProvider?.name
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                request.skillOffered?.title
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                request.skillRequested?.title
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase());

            const matchesCategory =
                categoryFilter === "All Categories" ||
                request.skillOffered?.category === categoryFilter ||
                request.skillRequested?.category === categoryFilter;

            return matchesSearch && matchesCategory;
        });
    };

    const filteredIncoming = useMemo(
        () => filterRequests(incomingRequests || []),
        [incomingRequests, searchQuery, categoryFilter]
    );

    const filteredOutgoing = useMemo(
        () => filterRequests(outgoingRequests || []),
        [outgoingRequests, searchQuery, categoryFilter]
    );

    // Handlers
    const handleAccept = async (
        requestId: string,
        responseMessage?: string
    ) => {
        await respondMutation.mutateAsync({
            id: requestId,
            data: { status: "accepted", responseMessage },
        });
    };

    const handleReject = async (
        requestId: string,
        responseMessage?: string
    ) => {
        await respondMutation.mutateAsync({
            id: requestId,
            data: { status: "rejected", responseMessage },
        });
    };

    const handleCancel = async (requestId: string) => {
        await cancelMutation.mutateAsync(requestId);
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">
                            Swap Requests
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your skill exchange requests
                        </p>
                    </div>
                    <Button onClick={() => setShowSendModal(true)} size="lg">
                        <Plus className="h-5 w-5 mr-2" />
                        Send Request
                    </Button>
                </div>

                {/* Stats Cards */}
                <StatsCards stats={stats} isLoading={statsLoading} />

                {/* Search and Filters */}
                <SearchFilter
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    categoryFilter={categoryFilter}
                    onCategoryChange={setCategoryFilter}
                    statusFilter={statusFilter}
                    onStatusChange={setStatusFilter}
                />

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="incoming">
                            <ArrowRight className="h-4 w-4 rotate-180" />
                            Incoming ({filteredIncoming.length})
                        </TabsTrigger>
                        <TabsTrigger value="outgoing">
                            <Send className="h-4 w-4" />
                            Outgoing ({filteredOutgoing.length})
                        </TabsTrigger>
                    </TabsList>

                    {/* Incoming Requests Tab */}
                    <TabsContent value="incoming">
                        {incomingLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                                    />
                                ))}
                            </div>
                        ) : filteredIncoming.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16"
                            >
                                <p className="text-muted-foreground text-lg">
                                    {searchQuery ||
                                    categoryFilter !== "All Categories"
                                        ? "No matching requests found"
                                        : "No incoming requests yet"}
                                </p>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredIncoming.map((request, index) => (
                                    <IncomingRequestCard
                                        key={request._id}
                                        request={request}
                                        index={index}
                                        onAccept={handleAccept}
                                        onReject={handleReject}
                                        isAccepting={respondMutation.isPending}
                                        isRejecting={respondMutation.isPending}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    {/* Outgoing Requests Tab */}
                    <TabsContent value="outgoing">
                        {outgoingLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                                    />
                                ))}
                            </div>
                        ) : filteredOutgoing.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16"
                            >
                                <p className="text-muted-foreground text-lg">
                                    {searchQuery ||
                                    categoryFilter !== "All Categories"
                                        ? "No matching requests found"
                                        : "No outgoing requests yet"}
                                </p>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredOutgoing.map((request, index) => (
                                    <OutgoingRequestCard
                                        key={request._id}
                                        request={request}
                                        index={index}
                                        onCancel={handleCancel}
                                        isCancelling={cancelMutation.isPending}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>

                {/* Send Request Modal */}
                <SendRequestModal
                    isOpen={showSendModal}
                    onClose={() => setShowSendModal(false)}
                />
            </motion.div>
        </div>
    );
}
