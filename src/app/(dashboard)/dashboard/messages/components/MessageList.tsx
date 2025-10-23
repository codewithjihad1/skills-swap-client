"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCheck, Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface MessageListProps {
    messages: any[];
    messagesLoading: boolean;
    sessionUserId?: string;
    sessionUserImage?: string | null;
    sessionUserName?: string | null;
    typingUsers: Set<string>;
    otherUser: any;
    messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const MessageList = ({
    messages,
    messagesLoading,
    sessionUserId,
    sessionUserImage,
    sessionUserName,
    typingUsers,
    otherUser,
    messagesEndRef,
}: MessageListProps) => {
    return (
        <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-accent/5 to-background">
            {messagesLoading ? (
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                        <p className="text-sm text-muted-foreground">
                            Loading messages...
                        </p>
                    </div>
                </div>
            ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Send className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="font-semibold mb-1">No messages yet</h4>
                        <p className="text-sm text-muted-foreground">
                            Start the conversation!
                        </p>
                    </div>
                </div>
            ) : (
                <div className="space-y-4 pb-4">
                    {messages.map((message, index) => {
                        const isMyMessage =
                            message.sender?._id === sessionUserId;
                        return (
                            <motion.div
                                key={message?._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={cn(
                                    "flex gap-2",
                                    isMyMessage
                                        ? "justify-end"
                                        : "justify-start"
                                )}
                            >
                                {!isMyMessage && (
                                    <Avatar className="h-8 w-8 mt-1">
                                        <AvatarImage
                                            src={message.sender?.avatar}
                                        />
                                        <AvatarFallback className="bg-accent text-primary text-xs">
                                            {message.sender?.name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                )}

                                <div
                                    className={cn(
                                        "rounded-2xl px-4 py-2 max-w-[75%] sm:max-w-md shadow-sm",
                                        isMyMessage
                                            ? "bg-gradient-to-br from-primary to-secondary text-white rounded-br-sm"
                                            : "bg-card border border-accent/20 rounded-bl-sm"
                                    )}
                                >
                                    <p
                                        className={cn(
                                            "text-sm break-words",
                                            isMyMessage ? "text-white" : ""
                                        )}
                                    >
                                        {message.content}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p
                                            className={cn(
                                                "text-xs",
                                                isMyMessage
                                                    ? "text-white/70"
                                                    : "text-muted-foreground"
                                            )}
                                        >
                                            {formatDistanceToNow(
                                                new Date(message.createdAt),
                                                { addSuffix: true }
                                            )}
                                        </p>
                                        {isMyMessage && (
                                            <span className="text-white/70">
                                                {message.isRead ? (
                                                    <CheckCheck className="w-3 h-3" />
                                                ) : (
                                                    <Check className="w-3 h-3" />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {isMyMessage && (
                                    <Avatar className="h-8 w-8 mt-1">
                                        <AvatarImage
                                            src={sessionUserImage || undefined}
                                        />
                                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xs">
                                            {sessionUserName?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                            </motion.div>
                        );
                    })}
                    <div ref={messagesEndRef} />

                    {/* Typing Indicator */}
                    <AnimatePresence>
                        {typingUsers.size > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="flex justify-start gap-2"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={otherUser?.avatar} />
                                    <AvatarFallback className="bg-accent text-primary text-xs">
                                        {otherUser?.name?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="bg-card border border-accent/20 rounded-2xl rounded-bl-sm px-4 py-3">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </ScrollArea>
    );
};
