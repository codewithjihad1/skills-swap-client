"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Send,
    Paperclip,
    MoreVertical,
    Phone,
    Video,
    Info,
    Archive,
    Trash2,
    Star,
    Clock,
    Check,
    CheckCheck,
    Smile,
    Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for conversations
const mockConversations = [
    {
        id: 1,
        partnerName: "Sarah Chen",
        partnerImage: "/api/placeholder/48/48",
        lastMessage:
            "Thanks for the React session! The hooks explanation was really helpful. Looking forward to our next meeting.",
        lastMessageTime: "2 min ago",
        unreadCount: 2,
        isOnline: true,
        skillContext: "React Development",
        isPinned: true,
        messageType: "text",
    },
    {
        id: 2,
        partnerName: "David Kim",
        partnerImage: "/api/placeholder/48/48",
        lastMessage:
            "Could we reschedule tomorrow's UI/UX session to Thursday? Something urgent came up.",
        lastMessageTime: "15 min ago",
        unreadCount: 0,
        isOnline: false,
        skillContext: "UI/UX Design",
        isPinned: false,
        messageType: "text",
    },
    {
        id: 3,
        partnerName: "Emily Rodriguez",
        partnerImage: "/api/placeholder/48/48",
        lastMessage: "📎 Python_algorithms_cheatsheet.pdf",
        lastMessageTime: "1 hour ago",
        unreadCount: 1,
        isOnline: true,
        skillContext: "Python Programming",
        isPinned: false,
        messageType: "file",
    },
    {
        id: 4,
        partnerName: "Michael Johnson",
        partnerImage: "/api/placeholder/48/48",
        lastMessage:
            "Great session today! I finally understand data structures better.",
        lastMessageTime: "3 hours ago",
        unreadCount: 0,
        isOnline: false,
        skillContext: "Data Structures",
        isPinned: false,
        messageType: "text",
    },
    {
        id: 5,
        partnerName: "Lisa Wong",
        partnerImage: "/api/placeholder/48/48",
        lastMessage:
            "The photography tips you shared were amazing! Can't wait to try them out.",
        lastMessageTime: "1 day ago",
        unreadCount: 0,
        isOnline: true,
        skillContext: "Photography",
        isPinned: false,
        messageType: "text",
    },
];

// Mock data for messages in a conversation
const mockMessages = [
    {
        id: 1,
        senderId: 1,
        senderName: "Sarah Chen",
        message: "Hey! Ready for our React session today?",
        timestamp: "10:00 AM",
        status: "read",
        type: "text",
    },
    {
        id: 2,
        senderId: "me",
        senderName: "You",
        message:
            "Absolutely! I've prepared some advanced hooks examples we can go through.",
        timestamp: "10:02 AM",
        status: "read",
        type: "text",
    },
    {
        id: 3,
        senderId: 1,
        senderName: "Sarah Chen",
        message:
            "Perfect! I'm particularly interested in useCallback and useMemo. I've been struggling with performance optimization.",
        timestamp: "10:03 AM",
        status: "read",
        type: "text",
    },
    {
        id: 4,
        senderId: "me",
        senderName: "You",
        message:
            "Great topic! Those are essential for React performance. Let me share a code example.",
        timestamp: "10:05 AM",
        status: "read",
        type: "text",
    },
    {
        id: 5,
        senderId: "me",
        senderName: "You",
        message: "📎 react-hooks-optimization.js",
        timestamp: "10:06 AM",
        status: "read",
        type: "file",
    },
    {
        id: 6,
        senderId: 1,
        senderName: "Sarah Chen",
        message:
            "Thanks for the React session! The hooks explanation was really helpful. Looking forward to our next meeting.",
        timestamp: "2 min ago",
        status: "delivered",
        type: "text",
    },
];

const MessagesPage = () => {
    const [selectedConversation, setSelectedConversation] = useState(
        mockConversations[0]
    );
    const [searchTerm, setSearchTerm] = useState("");
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            // Here you would normally send the message to your backend
            console.log("Sending message:", newMessage);
            setNewMessage("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const getMessageStatusIcon = (status: string) => {
        switch (status) {
            case "sent":
                return <Check className="h-3 w-3 text-gray-400" />;
            case "delivered":
                return <CheckCheck className="h-3 w-3 text-gray-400" />;
            case "read":
                return <CheckCheck className="h-3 w-3 text-blue-500" />;
            default:
                return <Clock className="h-3 w-3 text-gray-400" />;
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-6">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-7xl mx-auto"
            >
                {/* Main Messages Interface */}
                <motion.div variants={itemVariants}>
                    <Card className="h-[600px] bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                        <div className="flex h-full">
                            {/* Conversations Sidebar */}
                            <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                                {/* Search Header */}
                                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <Input
                                            placeholder="Search conversations..."
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Conversations List */}
                                <ScrollArea className="flex-1">
                                    <div className="p-2">
                                        {mockConversations.map(
                                            (conversation, index) => (
                                                <motion.div
                                                    key={conversation.id}
                                                    initial={{
                                                        opacity: 0,
                                                        x: -20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        delay: index * 0.05,
                                                    }}
                                                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 mb-2 ${
                                                        selectedConversation.id ===
                                                        conversation.id
                                                            ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500"
                                                            : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                                    }`}
                                                    onClick={() =>
                                                        setSelectedConversation(
                                                            conversation
                                                        )
                                                    }
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="relative">
                                                            <Avatar className="h-12 w-12">
                                                                <AvatarImage
                                                                    src={
                                                                        conversation.partnerImage
                                                                    }
                                                                    alt={
                                                                        conversation.partnerName
                                                                    }
                                                                />
                                                                <AvatarFallback>
                                                                    {conversation.partnerName
                                                                        .split(
                                                                            " "
                                                                        )
                                                                        .map(
                                                                            (
                                                                                n
                                                                            ) =>
                                                                                n[0]
                                                                        )
                                                                        .join(
                                                                            ""
                                                                        )}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            {conversation.isOnline && (
                                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                                            )}
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <div className="flex items-center gap-2">
                                                                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                                                                        {
                                                                            conversation.partnerName
                                                                        }
                                                                    </h3>
                                                                    {conversation.isPinned && (
                                                                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                                                    )}
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <span className="text-xs text-gray-500">
                                                                        {
                                                                            conversation.lastMessageTime
                                                                        }
                                                                    </span>
                                                                    {conversation.unreadCount >
                                                                        0 && (
                                                                        <Badge className="bg-blue-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center p-0">
                                                                            {
                                                                                conversation.unreadCount
                                                                            }
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <Badge
                                                                variant="outline"
                                                                className="text-xs mb-2"
                                                            >
                                                                {
                                                                    conversation.skillContext
                                                                }
                                                            </Badge>

                                                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                                                {conversation.messageType ===
                                                                "file" ? (
                                                                    <span className="flex items-center gap-1">
                                                                        <Paperclip className="h-3 w-3" />
                                                                        {
                                                                            conversation.lastMessage
                                                                        }
                                                                    </span>
                                                                ) : (
                                                                    conversation.lastMessage
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )
                                        )}
                                    </div>
                                </ScrollArea>
                            </div>

                            {/* Chat Area */}
                            <div className="flex-1 flex flex-col">
                                {/* Chat Header */}
                                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage
                                                        src={
                                                            selectedConversation.partnerImage
                                                        }
                                                        alt={
                                                            selectedConversation.partnerName
                                                        }
                                                    />
                                                    <AvatarFallback>
                                                        {selectedConversation.partnerName
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                {selectedConversation.isOnline && (
                                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                                )}
                                            </div>
                                            <div>
                                                <h2 className="font-semibold text-gray-900 dark:text-white">
                                                    {
                                                        selectedConversation.partnerName
                                                    }
                                                </h2>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-gray-500">
                                                        {selectedConversation.isOnline
                                                            ? "Online"
                                                            : "Last seen 2h ago"}
                                                    </span>
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        {
                                                            selectedConversation.skillContext
                                                        }
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="gap-2"
                                            >
                                                <Phone className="h-4 w-4" />
                                                Call
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="gap-2"
                                            >
                                                <Video className="h-4 w-4" />
                                                Video
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <Info className="h-4 w-4 mr-2" />
                                                        View Profile
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Archive className="h-4 w-4 mr-2" />
                                                        Archive Chat
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600">
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Delete Chat
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </div>

                                {/* Messages Area */}
                                <ScrollArea className="flex-1 p-4">
                                    <div className="space-y-4">
                                        {mockMessages.map((message, index) => (
                                            <motion.div
                                                key={message.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: index * 0.05,
                                                }}
                                                className={`flex ${
                                                    message.senderId === "me"
                                                        ? "justify-end"
                                                        : "justify-start"
                                                }`}
                                            >
                                                <div
                                                    className={`max-w-[70%] ${
                                                        message.senderId ===
                                                        "me"
                                                            ? "order-2"
                                                            : "order-1"
                                                    }`}
                                                >
                                                    <div
                                                        className={`p-3 rounded-2xl ${
                                                            message.senderId ===
                                                            "me"
                                                                ? "bg-blue-500 text-white rounded-br-md"
                                                                : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md"
                                                        }`}
                                                    >
                                                        {message.type ===
                                                        "file" ? (
                                                            <div className="flex items-center gap-2">
                                                                <Paperclip className="h-4 w-4" />
                                                                <span className="text-sm font-medium">
                                                                    {
                                                                        message.message
                                                                    }
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <p className="text-sm">
                                                                {
                                                                    message.message
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div
                                                        className={`flex items-center gap-1 mt-1 text-xs text-gray-500 ${
                                                            message.senderId ===
                                                            "me"
                                                                ? "justify-end"
                                                                : "justify-start"
                                                        }`}
                                                    >
                                                        <span>
                                                            {message.timestamp}
                                                        </span>
                                                        {message.senderId ===
                                                            "me" &&
                                                            getMessageStatusIcon(
                                                                message.status
                                                            )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </ScrollArea>

                                {/* Message Input */}
                                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
                                    <div className="flex items-end gap-3">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="shrink-0"
                                        >
                                            <Paperclip className="h-4 w-4" />
                                        </Button>

                                        <div className="flex-1">
                                            <Textarea
                                                placeholder="Type your message..."
                                                value={newMessage}
                                                onChange={(e) =>
                                                    setNewMessage(
                                                        e.target.value
                                                    )
                                                }
                                                onKeyPress={handleKeyPress}
                                                className="min-h-[44px] max-h-32 resize-none"
                                                rows={1}
                                            />
                                        </div>

                                        <div className="flex gap-2 shrink-0">
                                            <Button variant="outline" size="sm">
                                                <Smile className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                onClick={handleSendMessage}
                                                disabled={!newMessage.trim()}
                                                className="bg-blue-500 hover:bg-blue-600 text-white"
                                                size="sm"
                                            >
                                                <Send className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default MessagesPage;
