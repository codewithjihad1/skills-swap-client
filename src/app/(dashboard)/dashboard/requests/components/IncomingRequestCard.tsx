"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Clock,
    Star,
    MoreVertical,
    MessageCircle,
    Eye,
    Calendar,
    User,
    Check,
    X,
} from "lucide-react";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSendMessage } from "@/lib/api/messages";
import { toast } from "sonner";

interface IncomingRequestCardProps {
    request: any;
    index: number;
    onAccept: (id: string, message?: string) => void;
    onReject: (id: string, message?: string) => void;
    isAccepting: boolean;
    isRejecting: boolean;
}

export function IncomingRequestCard({
    request,
    index,
    onAccept,
    onReject,
}: IncomingRequestCardProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const sendMessageMutation = useSendMessage();

    const [responseType, setResponseType] = useState<"accept" | "reject">(
        "accept"
    );
    const [responseMessage, setResponseMessage] = useState("");
    const [isCreatingConversation, setIsCreatingConversation] = useState(false);

    const handleResponse = () => {
        if (responseType === "accept") {
            onAccept(request._id, responseMessage);
        } else {
            onReject(request._id, responseMessage);
        }
        setResponseMessage("");
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            pending: "bg-yellow-500 text-yellow-900",
            accepted: "bg-green-500 text-white",
            rejected: "bg-red-500 text-white",
            completed: "bg-blue-500 text-white",
            cancelled: "bg-gray-500 text-white",
        };
        return colors[status] || "bg-gray-500 text-white";
    };

    const getPriorityColor = (priority: string) => {
        const colors: Record<string, string> = {
            high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
            medium: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
            low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        };
        return colors[priority?.toLowerCase()] || "bg-gray-100 text-gray-800";
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "accepted":
                return <Check className="h-3 w-3" />;
            case "rejected":
                return <X className="h-3 w-3" />;
            case "pending":
                return <Clock className="h-3 w-3" />;
            default:
                return null;
        }
    };

    // Handle Conversation initiation
    // Create conversation and navigate to messages
    const handleStartConversation = async () => {
        if (!session?.user?.id || !request.requester?._id) {
            toast.error("Unable to start conversation");
            return;
        }

        try {
            setIsCreatingConversation(true);

            // Generate conversationId by combining user IDs (alphabetically sorted)
            const ids = [session.user.id, request.requester._id].sort();
            const conversationId = ids.join("-");

            // Send initial greeting message to create the conversation
            const initialMessage = {
                conversationId,
                sender: session.user.id,
                receiver: request.requester._id,
                content: `Hi! I received your request for ${request.skillRequested?.title}. Let's discuss the details!`,
                messageType: "text" as const,
                skillContext: request.skillRequested?._id,
            };

            // Send the message via API to create the conversation
            await sendMessageMutation.mutateAsync(initialMessage);

            toast.success("Conversation started!");

            // Navigate to messages page with the conversation
            router.push(`/dashboard/messages?conversationId=${conversationId}`);
        } catch (error) {
            console.error("Error starting conversation:", error);
            toast.error("Failed to start conversation. Please try again.");
        } finally {
            setIsCreatingConversation(false);
        }
    };

    return (
        <>
            <motion.div
                key={request._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
            >
                <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage
                                        src={request.requester?.avatar || ""}
                                        alt={request.requester?.name || "User"}
                                    />
                                    <AvatarFallback>
                                        {request.requester?.name?.charAt(0) ||
                                            "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-lg">
                                            {request.requester?.name ||
                                                "Unknown User"}
                                        </h3>
                                        {/* <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 text-yellow-500" />
                                            <span className="text-sm font-medium">
                                                {request.requester?.rating || "N/A"}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                ({request.requester?.skillsCount || 0}{" "}
                                                skills)
                                            </span>
                                        </div> */}
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            {request.skillRequested?.title ||
                                                "N/A"}
                                        </Badge>
                                        {request.priority && (
                                            <Badge
                                                className={getPriorityColor(
                                                    request.priority
                                                )}
                                            >
                                                {request.priority} priority
                                            </Badge>
                                        )}
                                        <Badge
                                            className={getStatusColor(
                                                request.status
                                            )}
                                        >
                                            {getStatusIcon(request.status)}
                                            <span className="ml-1">
                                                {request.status}
                                            </span>
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={handleStartConversation}
                                        disabled={isCreatingConversation}
                                    >
                                        <MessageCircle className="h-4 w-4 mr-2" />
                                        {isCreatingConversation
                                            ? "Starting..."
                                            : "Send Message"}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-3">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <h4 className="text-sm font-semibold mb-1 text-blue-900 dark:text-blue-100">
                                    Skill Requested
                                </h4>
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                    {request.skillRequested?.title}
                                </p>
                                {/* <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                    {request.skillRequested?.description}
                                </p> */}
                                <Badge
                                    variant="outline"
                                    className="mt-2 text-xs"
                                >
                                    {request.skillRequested?.category}
                                </Badge>
                            </div>

                            {request.skillOffered && (
                                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <h4 className="text-sm font-semibold mb-1 text-green-900 dark:text-green-100">
                                        Skill Offered
                                    </h4>
                                    <p className="text-sm text-green-700 dark:text-green-300">
                                        {request.skillOffered?.title}
                                    </p>
                                    {/* <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                                        {request.skillOffered?.description}
                                    </p> */}
                                    <Badge
                                        variant="outline"
                                        className="mt-2 text-xs"
                                    >
                                        {request.skillOffered?.category}
                                    </Badge>
                                </div>
                            )}
                        </div>

                        {request.message && (
                            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <h4 className="text-sm font-semibold mb-1">
                                    Message
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {request.message}
                                </p>
                            </div>
                        )}

                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>
                                Requested:{" "}
                                {new Date(request.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }
                                )}
                            </span>
                        </div>

                        {request.status === "pending" && (
                            <div className="flex flex-wrap gap-2 pt-2">
                                <Button
                                    size="sm"
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                    onClick={() => onAccept(request._id)}
                                >
                                    <Check className="h-4 w-4 mr-2" />
                                    Accept
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={handleStartConversation}
                                    disabled={isCreatingConversation}
                                >
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    {isCreatingConversation
                                        ? "Starting..."
                                        : "Negotiate"}
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={() => onReject(request._id)}
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Decline
                                </Button>
                            </div>
                        )}

                        {request.status === "accepted" && (
                            <div className="flex gap-2 pt-2">
                                <Button
                                    size="sm"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                >
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Schedule Session
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={handleStartConversation}
                                    disabled={isCreatingConversation}
                                >
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    {isCreatingConversation
                                        ? "Starting..."
                                        : "Message"}
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </>
    );
}
