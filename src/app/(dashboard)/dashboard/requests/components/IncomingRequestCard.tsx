"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    CheckCircle2,
    XCircle,
    MessageSquare,
    ArrowRightLeft,
    Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

interface IncomingRequestCardProps {
    request: any;
    index: number;
    onAccept: (id: string, message?: string) => void;
    onReject: (id: string, message?: string) => void;
    isAccepting: boolean;
    isRejecting: boolean;
}

const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.3,
        },
    }),
};

export function IncomingRequestCard({
    request,
    index,
    onAccept,
    onReject,
    isAccepting,
    isRejecting,
}: IncomingRequestCardProps) {
    const [showResponseDialog, setShowResponseDialog] = useState(false);
    const [responseType, setResponseType] = useState<"accept" | "reject">(
        "accept"
    );
    const [responseMessage, setResponseMessage] = useState("");

    const handleResponse = () => {
        if (responseType === "accept") {
            onAccept(request._id, responseMessage);
        } else {
            onReject(request._id, responseMessage);
        }
        setShowResponseDialog(false);
        setResponseMessage("");
    };

    const openResponseDialog = (type: "accept" | "reject") => {
        setResponseType(type);
        setShowResponseDialog(true);
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            pending: "bg-yellow-500",
            accepted: "bg-green-500",
            rejected: "bg-red-500",
            completed: "bg-blue-500",
            cancelled: "bg-gray-500",
        };
        return colors[status] || "bg-gray-500";
    };

    return (
        <>
            <motion.div
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
            >
                <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage
                                        src={request.requester?.avatar}
                                        alt={request.requester?.name}
                                    />
                                    <AvatarFallback>
                                        {request.requester?.name?.charAt(0) ||
                                            "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="font-semibold">
                                        {request.requester?.name}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        {request.requester?.email}
                                    </p>
                                </div>
                            </div>
                            <Badge className={getStatusColor(request.status)}>
                                {request.status}
                            </Badge>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                                <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">
                                    Skill Exchange:
                                </span>
                            </div>
                            <div className="pl-6 space-y-2">
                                <div>
                                    <span className="text-sm text-muted-foreground">
                                        They offer:
                                    </span>
                                    <p className="font-medium">
                                        {request.skillOffered?.title}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-sm text-muted-foreground">
                                        They want:
                                    </span>
                                    <p className="font-medium">
                                        {request.skillRequested?.title}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {request.message && (
                            <div className="mb-4 p-3 bg-muted rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">
                                        Message:
                                    </span>
                                </div>
                                <p className="text-sm pl-6">
                                    {request.message}
                                </p>
                            </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>
                                    {formatDistanceToNow(
                                        new Date(request.createdAt),
                                        {
                                            addSuffix: true,
                                        }
                                    )}
                                </span>
                            </div>
                        </div>

                        {request.status === "pending" && (
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => openResponseDialog("accept")}
                                    disabled={isAccepting || isRejecting}
                                    className="flex-1"
                                    variant="default"
                                >
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    Accept
                                </Button>
                                <Button
                                    onClick={() => openResponseDialog("reject")}
                                    disabled={isAccepting || isRejecting}
                                    className="flex-1"
                                    variant="destructive"
                                >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                </Button>
                            </div>
                        )}

                        {request.status === "accepted" &&
                            request.responseMessage && (
                                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                                        Your Response:
                                    </p>
                                    <p className="text-sm text-green-600 dark:text-green-400">
                                        {request.responseMessage}
                                    </p>
                                </div>
                            )}

                        {request.status === "rejected" &&
                            request.responseMessage && (
                                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                    <p className="text-sm font-medium text-red-700 dark:text-red-300 mb-1">
                                        Your Response:
                                    </p>
                                    <p className="text-sm text-red-600 dark:text-red-400">
                                        {request.responseMessage}
                                    </p>
                                </div>
                            )}
                    </CardContent>
                </Card>
            </motion.div>

            <Dialog
                open={showResponseDialog}
                onOpenChange={setShowResponseDialog}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {responseType === "accept" ? "Accept" : "Reject"}{" "}
                            Swap Request
                        </DialogTitle>
                        <DialogDescription>
                            {responseType === "accept"
                                ? "Add an optional message to accept this request"
                                : "Please provide a reason for rejecting this request"}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Textarea
                            placeholder={
                                responseType === "accept"
                                    ? "Great! I'd love to exchange skills with you..."
                                    : "I'm sorry, but..."
                            }
                            value={responseMessage}
                            onChange={(e) => setResponseMessage(e.target.value)}
                            rows={4}
                        />
                        <div className="flex gap-2 justify-end">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setShowResponseDialog(false);
                                    setResponseMessage("");
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleResponse}
                                variant={
                                    responseType === "accept"
                                        ? "default"
                                        : "destructive"
                                }
                            >
                                {responseType === "accept"
                                    ? "Accept Request"
                                    : "Reject Request"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
