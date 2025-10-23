"use client";

import { motion } from "framer-motion";
import { MessageCircle, Search, Wifi } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface ConversationListProps {
    conversations: any[];
    conversationsLoading: boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedConversationId: string | null;
    setSelectedConversationId: (id: string) => void;
    setShowMobileConversations: (show: boolean) => void;
    showMobileConversations: boolean;
    isConnected: boolean;
    onlineUsers: string[];
    sessionUserId?: string;
}

export const ConversationList = ({
    conversations,
    conversationsLoading,
    searchQuery,
    setSearchQuery,
    selectedConversationId,
    setSelectedConversationId,
    setShowMobileConversations,
    showMobileConversations,
    isConnected,
    onlineUsers,
    sessionUserId,
}: ConversationListProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
                "lg:col-span-1 flex flex-col",
                showMobileConversations ? "block" : "hidden lg:block"
            )}
        >
            <Card className="flex-1 flex flex-col border-accent/20 shadow-lg overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-accent/20 bg-gradient-to-r from-primary/5 to-accent/10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
                            <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Messages
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                {conversations.length} conversation
                                {conversations.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                        {isConnected && (
                            <Badge
                                variant="outline"
                                className="border-green-500/20 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                            >
                                <Wifi className="w-3 h-3 mr-1" />
                                Online
                            </Badge>
                        )}
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-background border-accent/20 focus-visible:ring-primary"
                        />
                    </div>
                </div>

                {/* Conversations */}
                <ScrollArea className="flex-1">
                    {conversationsLoading ? (
                        <div className="p-8 text-center">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                            <p className="text-sm text-muted-foreground">
                                Loading conversations...
                            </p>
                        </div>
                    ) : conversations.length === 0 ? (
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <MessageCircle className="w-8 h-8 text-primary" />
                            </div>
                            <h4 className="font-semibold mb-1">
                                No conversations yet
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                {searchQuery
                                    ? "No matches found"
                                    : "Start a new conversation"}
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-accent/10">
                            {conversations.map((conversation) => {
                                const convOtherUser =
                                    conversation.lastMessage.sender?._id ===
                                    sessionUserId
                                        ? conversation.lastMessage.receiver
                                        : conversation.lastMessage.sender;
                                const isUserOnline = onlineUsers.includes(
                                    convOtherUser?._id
                                );
                                const isSelected =
                                    selectedConversationId ===
                                    conversation?._id;

                                return (
                                    <motion.div
                                        key={conversation?._id}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={() => {
                                            setSelectedConversationId(
                                                conversation?._id
                                            );
                                            setShowMobileConversations(false);
                                        }}
                                        className={cn(
                                            "p-4 cursor-pointer transition-all duration-200",
                                            isSelected
                                                ? "bg-gradient-to-r from-primary/10 via-accent/20 to-primary/10 border-l-4 border-primary"
                                                : "hover:bg-accent/10"
                                        )}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="relative flex-shrink-0">
                                                <Avatar className="h-12 w-12 border-2 border-accent/30">
                                                    <AvatarImage
                                                        src={
                                                            convOtherUser?.avatar
                                                        }
                                                        alt={
                                                            convOtherUser?.name
                                                        }
                                                    />
                                                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                                                        {convOtherUser?.name?.charAt(
                                                            0
                                                        ) || "U"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                {isUserOnline && (
                                                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h4
                                                        className={cn(
                                                            "font-semibold truncate",
                                                            isSelected &&
                                                                "text-primary"
                                                        )}
                                                    >
                                                        {convOtherUser?.name}
                                                    </h4>
                                                    <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                                                        {formatDistanceToNow(
                                                            new Date(
                                                                conversation.lastMessage.createdAt
                                                            ),
                                                            {
                                                                addSuffix:
                                                                    false,
                                                            }
                                                        )
                                                            .replace(
                                                                "about ",
                                                                ""
                                                            )
                                                            .replace(
                                                                " ago",
                                                                ""
                                                            )}
                                                    </span>
                                                </div>

                                                {conversation.lastMessage
                                                    .skillContext && (
                                                    <Badge
                                                        variant="outline"
                                                        className="mb-1 text-xs border-primary/20 bg-primary/5 text-primary"
                                                    >
                                                        💡{" "}
                                                        {
                                                            conversation
                                                                .lastMessage
                                                                .skillContext
                                                                .title
                                                        }
                                                    </Badge>
                                                )}

                                                <div className="flex items-center justify-between gap-2">
                                                    <p className="text-sm text-muted-foreground truncate">
                                                        {conversation
                                                            .lastMessage.sender
                                                            ?._id ===
                                                        sessionUserId
                                                            ? "You: "
                                                            : ""}
                                                        {
                                                            conversation
                                                                .lastMessage
                                                                .content
                                                        }
                                                    </p>
                                                    {conversation.unreadCount >
                                                        0 && (
                                                        <Badge className="bg-gradient-to-r from-primary to-secondary text-white shrink-0">
                                                            {
                                                                conversation.unreadCount
                                                            }
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </ScrollArea>
            </Card>
        </motion.div>
    );
};
