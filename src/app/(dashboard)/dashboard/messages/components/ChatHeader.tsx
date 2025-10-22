"use client";

import { motion } from "framer-motion";
import { X, Phone, Video, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChatHeaderProps {
    otherUser: any;
    isOtherUserOnline: boolean;
    skillContext?: any;
    setShowMobileConversations: (show: boolean) => void;
}

export const ChatHeader = ({
    otherUser,
    isOtherUserOnline,
    skillContext,
    setShowMobileConversations,
}: ChatHeaderProps) => {
    return (
        <div className="p-4 border-b border-accent/20 bg-gradient-to-r from-primary/5 to-accent/10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Back button for mobile */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="lg:hidden"
                        onClick={() => setShowMobileConversations(true)}
                    >
                        <X className="w-4 h-4" />
                    </Button>

                    <div className="relative flex-shrink-0">
                        <Avatar className="h-10 w-10 border-2 border-accent/30">
                            <AvatarImage
                                src={otherUser?.avatar}
                                alt={otherUser?.name}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                                {otherUser?.name?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>
                        {isOtherUserOnline && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <h4 className="font-semibold truncate">
                            {otherUser?.name}
                        </h4>
                        <div className="flex items-center gap-2">
                            {isOtherUserOnline ? (
                                <Badge
                                    variant="outline"
                                    className="text-xs border-green-500/20 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                                >
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                                    Online
                                </Badge>
                            ) : (
                                <span className="text-xs text-muted-foreground">
                                    Offline
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <TooltipProvider>
                    <div className="flex items-center gap-1">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hidden sm:flex"
                                >
                                    <Phone className="w-4 h-4 text-primary" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Voice Call</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hidden sm:flex"
                                >
                                    <Video className="w-4 h-4 text-primary" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Video Call</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>More Options</TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>
            </div>

            {/* Skill Context Badge */}
            {skillContext && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3"
                >
                    <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
                        💡 Discussing: {skillContext.title}
                    </Badge>
                </motion.div>
            )}
        </div>
    );
};
