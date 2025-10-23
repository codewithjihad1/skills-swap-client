"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { cn } from "@/lib/utils";

interface ChatAreaProps {
    selectedConversationId: string | null;
    otherUser: any;
    isOtherUserOnline: boolean;
    messages: any[];
    messagesLoading: boolean;
    sessionUserId?: string;
    sessionUserImage?: string | null;
    sessionUserName?: string | null;
    typingUsers: Set<string>;
    newMessage: string;
    setNewMessage: (message: string) => void;
    handleSendMessage: () => void;
    isConnected: boolean;
    messagesEndRef: React.RefObject<HTMLDivElement>;
    setShowMobileConversations: (show: boolean) => void;
    showMobileConversations: boolean;
}

export const ChatArea = ({
    selectedConversationId,
    otherUser,
    isOtherUserOnline,
    messages,
    messagesLoading,
    sessionUserId,
    sessionUserImage,
    sessionUserName,
    typingUsers,
    newMessage,
    setNewMessage,
    handleSendMessage,
    isConnected,
    messagesEndRef,
    setShowMobileConversations,
    showMobileConversations,
}: ChatAreaProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={cn(
                "lg:col-span-2 flex flex-col",
                !showMobileConversations ? "block" : "hidden lg:block"
            )}
        >
            <Card className="flex-1 flex flex-col border-accent/20 shadow-lg overflow-hidden">
                {selectedConversationId && otherUser ? (
                    <>
                        <ChatHeader
                            otherUser={otherUser}
                            isOtherUserOnline={isOtherUserOnline}
                            skillContext={messages[0]?.skillContext}
                            setShowMobileConversations={
                                setShowMobileConversations
                            }
                        />

                        <MessageList
                            messages={messages}
                            messagesLoading={messagesLoading}
                            sessionUserId={sessionUserId}
                            sessionUserImage={sessionUserImage}
                            sessionUserName={sessionUserName}
                            typingUsers={typingUsers}
                            otherUser={otherUser}
                            messagesEndRef={messagesEndRef}
                        />

                        <MessageInput
                            newMessage={newMessage}
                            setNewMessage={setNewMessage}
                            handleSendMessage={handleSendMessage}
                            isConnected={isConnected}
                        />
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center p-8">
                        <div className="text-center max-w-sm">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="w-10 h-10 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Select a conversation
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Choose a conversation from the sidebar to start
                                messaging
                            </p>
                            <Button
                                variant="outline"
                                className="lg:hidden border-primary/20 hover:bg-primary/5"
                                onClick={() => setShowMobileConversations(true)}
                            >
                                <MessageCircle className="w-4 h-4 mr-2" />
                                View Conversations
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </motion.div>
    );
};
