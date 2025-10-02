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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

interface InboxMessagingProps {
    conversations: {
        id: string;
        partnerName: string;
        partnerPhoto: string;
        lastMessage: string;
        lastMessageTime: string;
        unreadCount: number;
        isOnline: boolean;
        skillContext?: string;
    }[];
    selectedConversation?: string;
    setSelectedConversation: (id: string) => void;
}

const conversations: InboxMessagingProps["conversations"] = [
    {
        id: "1",
        partnerName: "Sarah Chen",
        partnerPhoto: "/api/placeholder/48/48",
        lastMessage: "Thanks for the React session! Very helpful.",
        lastMessageTime: "2 min ago",
        unreadCount: 0,
        isOnline: true,
        skillContext: "React Development",
    },
];

const MessagesPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [selectedConversation, setSelectedConversation] =
        useState<string>("");

    const filteredConversations = conversations.filter(
        (conv) =>
            conv.partnerName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedConv = conversations.find(
        (c) => c.id === selectedConversation
    );

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            // Here you would handle sending the message
            console.log("Sending message:", newMessage);
            setNewMessage("");
        }
    };

    return (
        <div className="grid lg:grid-cols-3 gap-6">
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
                    {filteredConversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            onClick={() =>
                                setSelectedConversation(conversation.id)
                            }
                            className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                                selectedConversation === conversation.id
                                    ? "bg-primary/5 dark:bg-primary/10 border-r-2 border-primary"
                                    : ""
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className="relative flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-600">
                                        <Image
                                            src={conversation.partnerPhoto}
                                            alt={conversation.partnerName}
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {conversation.isOnline && (
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-medium text-gray-900 dark:text-white truncate">
                                            {conversation.partnerName}
                                        </h4>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {conversation.lastMessageTime}
                                        </span>
                                    </div>

                                    {conversation.skillContext && (
                                        <div className="text-xs text-primary mb-1">
                                            Re: {conversation.skillContext}
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                            {conversation.lastMessage}
                                        </p>
                                        {conversation.unreadCount > 0 && (
                                            <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                                                {conversation.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredConversations.length === 0 && (
                        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                            <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No conversations found</p>
                        </div>
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
                {selectedConv ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-600">
                                            <Image
                                                src={selectedConv.partnerPhoto}
                                                alt={selectedConv.partnerName}
                                                width={40}
                                                height={40}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {selectedConv.isOnline && (
                                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">
                                            {selectedConv.partnerName}
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {selectedConv.isOnline
                                                ? "Online"
                                                : "Last seen recently"}
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

                            {selectedConv.skillContext && (
                                <div className="mt-3 p-2 bg-primary/5 dark:bg-primary/10 rounded-lg">
                                    <p className="text-sm text-primary">
                                        💡 Discussing:{" "}
                                        {selectedConv.skillContext}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
                            <div className="space-y-4">
                                {/* Sample messages - you would load actual messages here */}
                                <div className="flex justify-end">
                                    <div className="bg-primary text-white rounded-lg px-4 py-2 max-w-xs">
                                        <p className="text-sm">
                                            Hi! I'm interested in learning React
                                            from you.
                                        </p>
                                        <p className="text-xs opacity-75 mt-1">
                                            2:30 PM
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-gray-700 rounded-lg px-4 py-2 max-w-xs border border-gray-200 dark:border-gray-600">
                                        <p className="text-sm text-gray-900 dark:text-white">
                                            Great! I'd love to help. What's your
                                            current experience level?
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            2:32 PM
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <div className="bg-primary text-white rounded-lg px-4 py-2 max-w-xs">
                                        <p className="text-sm">
                                            I have some HTML/CSS knowledge but
                                            new to React.
                                        </p>
                                        <p className="text-xs opacity-75 mt-1">
                                            2:35 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <Button variant="ghost" size="sm">
                                    <Paperclip className="w-4 h-4" />
                                </Button>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="Type your message..."
                                        value={newMessage}
                                        onChange={(e) =>
                                            setNewMessage(e.target.value)
                                        }
                                        onKeyPress={(e) =>
                                            e.key === "Enter" &&
                                            handleSendMessage()
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <Button
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim()}
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
