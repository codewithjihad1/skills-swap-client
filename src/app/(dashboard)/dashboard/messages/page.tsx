"use client";

import { motion } from "framer-motion";
import {
    MessageCircle,
    Send,
    Paperclip,
    Phone,
    Video,
    MoreHorizontal,
    Search,
    Wifi,
    WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useSocket } from "@/context/SocketContext";
import {
    useConversations,
    useMessages,
    useSendMessage,
    useMarkConversationAsRead,
} from "@/lib/api/messages";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

const MessagesPage = () => {
    const { data: session } = useSession();
    const {
        socket,
        isConnected,
        onlineUsers,
        sendMessage: sendSocketMessage,
        joinConversation,
        leaveConversation,
        sendTypingStatus,
        markConversationAsRead: socketMarkAsRead,
    } = useSocket();

    const [searchQuery, setSearchQuery] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [selectedConversationId, setSelectedConversationId] = useState<
        string | null
    >(null);
    const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Queries
    const { data: conversations, isLoading: conversationsLoading } =
        useConversations(session?.user?.id);
    const { data: messagesData, isLoading: messagesLoading } = useMessages(
        selectedConversationId || undefined
    );
    const sendMessageMutation = useSendMessage();
    const markAsReadMutation = useMarkConversationAsRead();

    // Get selected conversation details
    const selectedConversation = conversations?.find(
        (c) => c._id === selectedConversationId
    );
    const messages = messagesData?.messages || [];

    // Get the other user in the conversation
    const otherUser =
        messages.length > 0
            ? messages[0].sender._id === session?.user?.id
                ? messages[0].receiver
                : messages[0].sender
            : null;

    const isOtherUserOnline = otherUser
        ? onlineUsers.includes(otherUser._id)
        : false;

    // Filter conversations
    const filteredConversations =
        conversations?.filter((conv) => {
            const otherUser =
                conv.lastMessage.sender._id === session?.user?.id
                    ? conv.lastMessage.receiver
                    : conv.lastMessage.sender;
            const searchLower = searchQuery.toLowerCase();
            return (
                otherUser.name.toLowerCase().includes(searchLower) ||
                conv.lastMessage.content.toLowerCase().includes(searchLower)
            );
        }) || [];

    // Join/leave conversation rooms
    useEffect(() => {
        if (selectedConversationId && isConnected) {
            joinConversation(selectedConversationId);
            return () => leaveConversation(selectedConversationId);
        }
    }, [selectedConversationId, isConnected]);

    // Listen for new messages
    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (data: any) => {
            if (data.conversationId === selectedConversationId) {
                // Message is handled by query invalidation
            }
        };

        const handleMessageReceived = (message: any) => {
            // Refetch messages to get the new one
            // This is handled automatically by React Query
        };

        socket.on("message:new", handleNewMessage);
        socket.on("message:received", handleMessageReceived);

        return () => {
            socket.off("message:new", handleNewMessage);
            socket.off("message:received", handleMessageReceived);
        };
    }, [socket, selectedConversationId]);

    // Listen for typing status
    useEffect(() => {
        if (!socket) return;

        const handleTyping = ({
            userId,
            isTyping,
        }: {
            userId: string;
            isTyping: boolean;
        }) => {
            setTypingUsers((prev) => {
                const newSet = new Set(prev);
                if (isTyping) {
                    newSet.add(userId);
                } else {
                    newSet.delete(userId);
                }
                return newSet;
            });
        };

        socket.on("typing:user", handleTyping);

        return () => {
            socket.off("typing:user", handleTyping);
        };
    }, [socket]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Mark conversation as read when opened
    useEffect(() => {
        if (
            selectedConversationId &&
            session?.user?.id &&
            selectedConversation &&
            selectedConversation.unreadCount > 0
        ) {
            markAsReadMutation.mutate({
                conversationId: selectedConversationId,
                userId: session.user.id,
            });
            socketMarkAsRead(selectedConversationId, session.user.id);
        }
    }, [selectedConversationId, session?.user?.id]);

    // Handle typing indicator
    useEffect(() => {
        if (!selectedConversationId || !session?.user?.id) return;

        const timeout = setTimeout(() => {
            sendTypingStatus(
                selectedConversationId,
                session.user.id,
                !!newMessage
            );
        }, 300);

        return () => {
            clearTimeout(timeout);
            if (newMessage === "") {
                sendTypingStatus(
                    selectedConversationId,
                    session.user.id,
                    false
                );
            }
        };
    }, [newMessage, selectedConversationId, session?.user?.id]);

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedConversationId || !otherUser) return;

        const messageData = {
            conversationId: selectedConversationId,
            sender: session?.user?.id!,
            receiver: otherUser._id,
            content: newMessage.trim(),
            messageType: "text",
        };

        // Send via Socket.IO for real-time delivery
        sendSocketMessage(messageData);

        // Also save to database via API
        sendMessageMutation.mutate(messageData);

        setNewMessage("");
    };

    if (!session) {
        return (
            <div className="flex items-center justify-center h-96">
                <p className="text-gray-500">Please sign in to view messages</p>
            </div>
        );
    }

    return (
        <div className="grid lg:grid-cols-3 gap-6">
            {/* Connection Status */}
            <div className="lg:col-span-3">
                <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                        isConnected
                            ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                            : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                    }`}
                >
                    {isConnected ? (
                        <Wifi className="w-4 h-4" />
                    ) : (
                        <WifiOff className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                        {isConnected ? "Connected" : "Disconnected"}
                    </span>
                </div>
            </div>

            {/* Conversations List */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
            >
                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                        <MessageCircle className="w-5 h-5 text-primary" />
                        Messages
                    </h3>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Conversations */}
                <div className="overflow-y-auto max-h-96">
                    {conversationsLoading ? (
                        <div className="p-6 text-center text-gray-500">
                            Loading conversations...
                        </div>
                    ) : filteredConversations.length === 0 ? (
                        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                            <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No conversations found</p>
                        </div>
                    ) : (
                        filteredConversations.map((conversation) => {
                            const convOtherUser =
                                conversation.lastMessage.sender._id ===
                                session?.user?.id
                                    ? conversation.lastMessage.receiver
                                    : conversation.lastMessage.sender;
                            const isUserOnline = onlineUsers.includes(
                                convOtherUser._id
                            );

                            return (
                                <div
                                    key={conversation._id}
                                    onClick={() =>
                                        setSelectedConversationId(
                                            conversation._id
                                        )
                                    }
                                    className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                                        selectedConversationId ===
                                        conversation._id
                                            ? "bg-primary/5 dark:bg-primary/10 border-r-2 border-primary"
                                            : ""
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="relative flex-shrink-0">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-600">
                                                <Image
                                                    src={
                                                        convOtherUser.avatar ||
                                                        "/api/placeholder/48/48"
                                                    }
                                                    alt={convOtherUser.name}
                                                    width={48}
                                                    height={48}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            {isUserOnline && (
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-medium text-gray-900 dark:text-white truncate">
                                                    {convOtherUser.name}
                                                </h4>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {formatDistanceToNow(
                                                        new Date(
                                                            conversation.lastMessage.createdAt
                                                        ),
                                                        { addSuffix: true }
                                                    )}
                                                </span>
                                            </div>

                                            {conversation.lastMessage
                                                .skillContext && (
                                                <div className="text-xs text-primary mb-1">
                                                    Re:{" "}
                                                    {
                                                        conversation.lastMessage
                                                            .skillContext.title
                                                    }
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between">
                                                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                                    {conversation.lastMessage
                                                        .sender._id ===
                                                    session?.user?.id
                                                        ? "You: "
                                                        : ""}
                                                    {
                                                        conversation.lastMessage
                                                            .content
                                                    }
                                                </p>
                                                {conversation.unreadCount >
                                                    0 && (
                                                    <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                                                        {
                                                            conversation.unreadCount
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </motion.div>

            {/* Chat Area */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col"
            >
                {selectedConversationId && otherUser ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-600">
                                            <Image
                                                src={
                                                    otherUser.avatar ||
                                                    "/api/placeholder/40/40"
                                                }
                                                alt={otherUser.name}
                                                width={40}
                                                height={40}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {isOtherUserOnline && (
                                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">
                                            {otherUser.name}
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {isOtherUserOnline ? (
                                                "Online"
                                            ) : (
                                                <span>Offline</span>
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm">
                                        <Phone className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Video className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {messages[0]?.skillContext && (
                                <div className="mt-3 p-2 bg-primary/5 dark:bg-primary/10 rounded-lg">
                                    <p className="text-sm text-primary">
                                        💡 Discussing:{" "}
                                        {messages[0].skillContext.title}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900/50 min-h-[400px] max-h-[500px]">
                            {messagesLoading ? (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-gray-500">
                                        Loading messages...
                                    </p>
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-gray-500">
                                        No messages yet. Start the conversation!
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {messages.map((message) => {
                                        const isMyMessage =
                                            message.sender._id ===
                                            session?.user?.id;
                                        return (
                                            <div
                                                key={message._id}
                                                className={`flex ${
                                                    isMyMessage
                                                        ? "justify-end"
                                                        : "justify-start"
                                                }`}
                                            >
                                                <div
                                                    className={`rounded-lg px-4 py-2 max-w-xs ${
                                                        isMyMessage
                                                            ? "bg-primary text-white"
                                                            : "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                                                    }`}
                                                >
                                                    <p
                                                        className={`text-sm ${
                                                            isMyMessage
                                                                ? "text-white"
                                                                : "text-gray-900 dark:text-white"
                                                        }`}
                                                    >
                                                        {message.content}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <p
                                                            className={`text-xs ${
                                                                isMyMessage
                                                                    ? "opacity-75"
                                                                    : "text-gray-500 dark:text-gray-400"
                                                            }`}
                                                        >
                                                            {formatDistanceToNow(
                                                                new Date(
                                                                    message.createdAt
                                                                ),
                                                                {
                                                                    addSuffix:
                                                                        true,
                                                                }
                                                            )}
                                                        </p>
                                                        {isMyMessage &&
                                                            message.isRead && (
                                                                <span className="text-xs opacity-75">
                                                                    ✓✓
                                                                </span>
                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div ref={messagesEndRef} />

                                    {/* Typing Indicator */}
                                    {typingUsers.size > 0 && (
                                        <div className="flex justify-start">
                                            <div className="bg-white dark:bg-gray-700 rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-600">
                                                <div className="flex gap-1">
                                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Message Input */}
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    disabled={!isConnected}
                                >
                                    <Paperclip className="w-4 h-4" />
                                </Button>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder={
                                            isConnected
                                                ? "Type your message..."
                                                : "Connecting..."
                                        }
                                        value={newMessage}
                                        onChange={(e) =>
                                            setNewMessage(e.target.value)
                                        }
                                        onKeyPress={(e) =>
                                            e.key === "Enter" &&
                                            handleSendMessage()
                                        }
                                        disabled={!isConnected}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                                    />
                                </div>
                                <Button
                                    onClick={handleSendMessage}
                                    disabled={
                                        !newMessage.trim() || !isConnected
                                    }
                                    size="sm"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                        <div className="text-center">
                            <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <h3 className="text-lg font-medium mb-2">
                                Select a conversation
                            </h3>
                            <p className="text-sm">
                                Choose a conversation from the sidebar to start
                                messaging
                            </p>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default MessagesPage;
