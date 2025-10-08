"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    MessageSquare,
    ArrowRightLeft,
    Clock,
    XCircle,
    Send,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

interface OutgoingRequestCardProps {
    request: any;
    index: number;
    onCancel: (id: string) => void;
    isCancelling: boolean;
}

const cardVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.3,
        },
    }),
};

export function OutgoingRequestCard({
    request,
    index,
    onCancel,
    isCancelling,
}: OutgoingRequestCardProps) {
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);

    const handleCancel = () => {
        onCancel(request._id);
        setShowCancelDialog(false);
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

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "accepted":
                return "✓";
            case "rejected":
                return "✗";
            case "pending":
                return "⏳";
            default:
                return "";
        }
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
                                        src={
                                            request.skillProvider?.avatar
                                        }
                                        alt={request.skillProvider?.name}
                                    />
                                    <AvatarFallback>
                                        {request.skillProvider?.name?.charAt(
                                            0
                                        ) || "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="font-semibold">
                                        {request.skillProvider?.name}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        {request.skillProvider?.email}
                                    </p>
                                </div>
                            </div>
                            <Badge className={getStatusColor(request.status)}>
                                {getStatusIcon(request.status)} {request.status}
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
                                        You offer:
                                    </span>
                                    <p className="font-medium">
                                        {request.skillOffered?.title}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-sm text-muted-foreground">
                                        You want:
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
                                        Your message:
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

                        {request.responseMessage && (
                            <div
                                className={`mb-4 p-3 rounded-lg ${
                                    request.status === "accepted"
                                        ? "bg-green-50 dark:bg-green-900/20"
                                        : "bg-red-50 dark:bg-red-900/20"
                                }`}
                            >
                                <p
                                    className={`text-sm font-medium mb-1 ${
                                        request.status === "accepted"
                                            ? "text-green-700 dark:text-green-300"
                                            : "text-red-700 dark:text-red-300"
                                    }`}
                                >
                                    Their Response:
                                </p>
                                <p
                                    className={`text-sm ${
                                        request.status === "accepted"
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-red-600 dark:text-red-400"
                                    }`}
                                >
                                    {request.responseMessage}
                                </p>
                            </div>
                        )}

                        <div className="flex gap-2">
                            {request.status === "pending" && (
                                <Button
                                    onClick={() => setShowCancelDialog(true)}
                                    disabled={isCancelling}
                                    variant="destructive"
                                    className="flex-1"
                                >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Cancel Request
                                </Button>
                            )}
                            {request.status === "accepted" && (
                                <Button
                                    onClick={() => setShowDetailsDialog(true)}
                                    variant="default"
                                    className="flex-1"
                                >
                                    <Send className="h-4 w-4 mr-2" />
                                    Follow Up
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cancel Swap Request</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to cancel this swap request?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowCancelDialog(false)}
                        >
                            No, keep it
                        </Button>
                        <Button variant="destructive" onClick={handleCancel}>
                            Yes, cancel request
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog
                open={showDetailsDialog}
                onOpenChange={setShowDetailsDialog}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Request Details</DialogTitle>
                        <DialogDescription>
                            Your request has been accepted! You can now
                            coordinate with {request.skillProvider?.name}{" "}
                            through the messaging system.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="p-4 bg-muted rounded-lg">
                            <h4 className="font-medium mb-2">
                                Exchange Details:
                            </h4>
                            <div className="space-y-2 text-sm">
                                <p>
                                    <span className="text-muted-foreground">
                                        You're teaching:
                                    </span>{" "}
                                    {request.skillOffered?.title}
                                </p>
                                <p>
                                    <span className="text-muted-foreground">
                                        You're learning:
                                    </span>{" "}
                                    {request.skillRequested?.title}
                                </p>
                            </div>
                        </div>
                        {request.responseMessage && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <h4 className="font-medium mb-2 text-green-700 dark:text-green-300">
                                    Their Response:
                                </h4>
                                <p className="text-sm text-green-600 dark:text-green-400">
                                    {request.responseMessage}
                                </p>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setShowDetailsDialog(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
