"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface Message {
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
    createdAt: string;
    skillContext?: {
        _id: string;
        title: string;
        category: string;
    };
}

interface Notification {
    _id: string;
    recipient: string;
    sender?: {
        _id: string;
        name: string;
        email: string;
        avatar?: string;
    };
    type: string;
    title: string;
    message: string;
    link?: string;
    data?: any;
    isRead: boolean;
    priority: "low" | "medium" | "high" | "urgent";
    createdAt: string;
}

interface UnreadCounts {
    messages: number;
    notifications: number;
}

interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
    onlineUsers: string[];
    unreadCounts: UnreadCounts;
    sendMessage: (data: any) => void;
    markMessageAsRead: (messageId: string, conversationId: string) => void;
    markConversationAsRead: (conversationId: string, userId: string) => void;
    markNotificationAsRead: (notificationId: string, userId: string) => void;
    joinConversation: (conversationId: string) => void;
    leaveConversation: (conversationId: string) => void;
    sendTypingStatus: (
        conversationId: string,
        userId: string,
        isTyping: boolean
    ) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within SocketProvider");
    }
    return context;
};

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
    const { data: session } = useSession();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [unreadCounts, setUnreadCounts] = useState<UnreadCounts>({
        messages: 0,
        notifications: 0,
    });

    useEffect(() => {
        if (!session?.user?.id) return;

        const socketUrl =
            process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";
        const newSocket = io(socketUrl, {
            transports: ["websocket", "polling"],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5,
        });

        newSocket.on("connect", () => {
            // console.log("✅ Socket connected:", newSocket.id);
            setIsConnected(true);
            newSocket.emit("user:join", session.user.id);
        });

        newSocket.on("disconnect", () => {
            console.log("❌ Socket disconnected");
            setIsConnected(false);
        });

        newSocket.on("connect_error", (error) => {
            console.error("❌ Socket connection error:", error);
            setIsConnected(false);
        });

        // Listen for unread counts
        newSocket.on("unread:counts", (counts: UnreadCounts) => {
            setUnreadCounts(counts);
        });

        newSocket.on("unread:update", (counts: Partial<UnreadCounts>) => {
            setUnreadCounts((prev) => ({ ...prev, ...counts }));
        });

        // Listen for new messages
        newSocket.on(
            "message:new",
            (data: { conversationId: string; message: Message }) => {
                toast.info(`New message from ${data.message.sender.name}`, {
                    description: data.message.content.substring(0, 50),
                });
            }
        );

        // Listen for new notifications
        newSocket.on("notification:new", (notification: Notification) => {
            const priorityIcons = {
                low: "ℹ️",
                medium: "📬",
                high: "⚠️",
                urgent: "🚨",
            };

            toast(notification.title, {
                description: notification.message,
                icon: priorityIcons[notification.priority],
                duration: notification.priority === "urgent" ? 10000 : 5000,
            });
        });

        // Listen for online users
        newSocket.on("user:online", (data: { userId: string }) => {
            setOnlineUsers((prev) => [...new Set([...prev, data.userId])]);
        });

        newSocket.on("user:offline", (data: { userId: string }) => {
            setOnlineUsers((prev) => prev.filter((id) => id !== data.userId));
        });

        newSocket.on("users:online-list", (users: string[]) => {
            setOnlineUsers(users);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [session?.user?.id]);

    const sendMessage = (data: any) => {
        if (socket && isConnected) {
            socket.emit("message:send", data);
        }
    };

    const markMessageAsRead = (messageId: string, conversationId: string) => {
        if (socket && isConnected) {
            socket.emit("message:read", { messageId, conversationId });
        }
    };

    const markConversationAsRead = (conversationId: string, userId: string) => {
        if (socket && isConnected) {
            socket.emit("conversation:read", { conversationId, userId });
        }
    };

    const markNotificationAsRead = (notificationId: string, userId: string) => {
        if (socket && isConnected) {
            socket.emit("notification:read", { notificationId, userId });
        }
    };

    const joinConversation = (conversationId: string) => {
        if (socket && isConnected) {
            socket.emit("conversation:join", conversationId);
        }
    };

    const leaveConversation = (conversationId: string) => {
        if (socket && isConnected) {
            socket.emit("conversation:leave", conversationId);
        }
    };

    const sendTypingStatus = (
        conversationId: string,
        userId: string,
        isTyping: boolean
    ) => {
        if (socket && isConnected) {
            socket.emit(isTyping ? "typing:start" : "typing:stop", {
                conversationId,
                userId,
            });
        }
    };

    return (
        <SocketContext.Provider
            value={{
                socket,
                isConnected,
                onlineUsers,
                unreadCounts,
                sendMessage,
                markMessageAsRead,
                markConversationAsRead,
                markNotificationAsRead,
                joinConversation,
                leaveConversation,
                sendTypingStatus,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};
