"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useSocket } from "@/context/SocketContext";
import {
    useConversations,
    useMessages,
    useSendMessage,
    useMarkConversationAsRead,
} from "@/lib/api/messages";
import { toast } from "sonner";
import {
    ChatArea,
    ConnectionStatusBanner,
    ConversationList,
} from "./components";

const MessagesPageContent = () => {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
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
    const [showMobileConversations, setShowMobileConversations] =
        useState(true);
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
        (c) => c?._id === selectedConversationId
    );
    const messages = messagesData?.messages || [];

    // Get the other user in the conversation
    const otherUser =
        messages.length > 0
            ? messages[0].sender?._id === session?.user?.id
                ? messages[0].receiver
                : messages[0].sender
            : null;

    const isOtherUserOnline = otherUser
        ? onlineUsers.includes(otherUser?._id)
        : false;

    // Filter conversations
    const filteredConversations =
        conversations?.filter((conv) => {
            if (!session?.user?.id) return false;

            const otherUser =
                conv.lastMessage.sender?._id === session.user.id
                    ? conv.lastMessage.receiver
                    : conv.lastMessage.sender;
            const searchLower = searchQuery.toLowerCase();
            return (
                otherUser?.name.toLowerCase().includes(searchLower) ||
                conv.lastMessage.content.toLowerCase().includes(searchLower)
            );
        }) || [];

    // Handle conversationId from URL query parameter (when coming from requests page)
    useEffect(() => {
        const conversationIdFromUrl = searchParams?.get("conversationId");
        if (conversationIdFromUrl && conversations) {
            // Check if conversation exists
            const conversationExists = conversations.some(
                (conv) => conv?._id === conversationIdFromUrl
            );
            if (conversationExists) {
                setSelectedConversationId(conversationIdFromUrl);
                toast.success("Conversation loaded!");
            }
        }
    }, [searchParams, conversations]);

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
        if (
            !newMessage.trim() ||
            !selectedConversationId ||
            !otherUser ||
            !session?.user?.id
        )
            return;

        const messageData = {
            conversationId: selectedConversationId,
            sender: session.user.id,
            receiver: otherUser?._id,
            content: newMessage.trim(),
            messageType: "text" as const,
        };

        // Only save to database via API
        // The backend will handle Socket.IO broadcasting
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
            <ConnectionStatusBanner isConnected={isConnected} />

            {/* Conversations List */}
            <ConversationList
                conversations={filteredConversations}
                conversationsLoading={conversationsLoading}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedConversationId={selectedConversationId}
                setSelectedConversationId={setSelectedConversationId}
                setShowMobileConversations={setShowMobileConversations}
                showMobileConversations={showMobileConversations}
                isConnected={isConnected}
                onlineUsers={onlineUsers}
                sessionUserId={session?.user?.id}
            />

            {/* Chat Area */}
            <ChatArea
                selectedConversationId={selectedConversationId}
                otherUser={otherUser}
                isOtherUserOnline={isOtherUserOnline}
                messages={messages}
                messagesLoading={messagesLoading}
                sessionUserId={session?.user?.id}
                sessionUserImage={session?.user?.image}
                sessionUserName={session?.user?.name}
                typingUsers={typingUsers}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
                isConnected={isConnected}
                messagesEndRef={
                    messagesEndRef as React.RefObject<HTMLDivElement>
                }
                setShowMobileConversations={setShowMobileConversations}
                showMobileConversations={showMobileConversations}
            />
        </div>
    );
};

// Loading fallback component
const MessagesPageLoading = () => {
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-500 dark:text-gray-400">
                        Loading messages...
                    </p>
                </div>
            </div>
        </div>
    );
};

const MessagesPage = () => {
    return (
        <Suspense fallback={<MessagesPageLoading />}>
            <MessagesPageContent />
        </Suspense>
    );
};
export default MessagesPage;
