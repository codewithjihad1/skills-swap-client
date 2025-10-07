import axiosInstance from "@/axios/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Types
export interface Message {
    _id: string;
    conversationId: string;
    sender: {
        _id: string;
        name: string;
        email: string;
        avatar?: string;
    };
    receiver: {
        _id: string;
        name: string;
        email: string;
        avatar?: string;
    };
    content: string;
    messageType: "text" | "image" | "file" | "system";
    isRead: boolean;
    isDelivered: boolean;
    readAt?: string;
    deliveredAt?: string;
    createdAt: string;
    updatedAt: string;
    skillContext?: {
        _id: string;
        title: string;
        category: string;
    };
}

export interface Conversation {
    _id: string;
    lastMessage: Message;
    unreadCount: number;
}

export interface SendMessageData {
    conversationId: string;
    sender: string;
    receiver: string;
    content: string;
    messageType?: string;
    skillContext?: string;
}

// Get conversations for a user
const getConversations = async (userId: string): Promise<Conversation[]> => {
    const { data } = await axiosInstance.get(
        `/api/messages/conversations/${userId}`
    );
    return data;
};

// Get messages for a conversation
const getMessages = async (
    conversationId: string,
    page = 1,
    limit = 50
): Promise<{ messages: Message[]; pagination: any }> => {
    const { data } = await axiosInstance.get(
        `/api/messages/${conversationId}`,
        {
            params: { page, limit },
        }
    );
    return data;
};

// Send a message
const sendMessage = async (messageData: SendMessageData): Promise<Message> => {
    const { data } = await axiosInstance.post("/api/messages", messageData);
    return data;
};

// Mark conversation as read
const markConversationAsRead = async (
    conversationId: string,
    userId: string
): Promise<void> => {
    await axiosInstance.patch(
        `/api/messages/conversation/${conversationId}/user/${userId}/read`
    );
};

// Hook to get conversations
export const useConversations = (userId: string | undefined) => {
    return useQuery({
        queryKey: ["conversations", userId],
        queryFn: () => getConversations(userId!),
        enabled: !!userId,
        refetchInterval: 30000, // Refetch every 30 seconds
    });
};

// Hook to get messages
export const useMessages = (
    conversationId: string | undefined,
    page = 1,
    limit = 50
) => {
    return useQuery({
        queryKey: ["messages", conversationId, page, limit],
        queryFn: () => getMessages(conversationId!, page, limit),
        enabled: !!conversationId,
        staleTime: 10000, // 10 seconds
    });
};

// Hook to send message
export const useSendMessage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: sendMessage,
        onSuccess: (data, variables) => {
            // Invalidate conversations and messages
            queryClient.invalidateQueries({ queryKey: ["conversations"] });
            queryClient.invalidateQueries({
                queryKey: ["messages", variables.conversationId],
            });
        },
        onError: (error: any) => {
            console.error("Error sending message:", error);
            toast.error("Failed to send message", {
                description:
                    error?.response?.data?.error || "Please try again later.",
            });
        },
    });
};

// Hook to mark conversation as read
export const useMarkConversationAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            conversationId,
            userId,
        }: {
            conversationId: string;
            userId: string;
        }) => markConversationAsRead(conversationId, userId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["conversations"] });
            queryClient.invalidateQueries({
                queryKey: ["messages", variables.conversationId],
            });
        },
    });
};
