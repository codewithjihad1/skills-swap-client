"use client";

import { Send, Paperclip, Smile, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface MessageInputProps {
    newMessage: string;
    setNewMessage: (message: string) => void;
    handleSendMessage: () => void;
    isConnected: boolean;
}

export const MessageInput = ({
    newMessage,
    setNewMessage,
    handleSendMessage,
    isConnected,
}: MessageInputProps) => {
    return (
        <div className="p-4 border-t border-accent/20 bg-background">
            <div className="flex items-end gap-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                disabled={!isConnected}
                                className="hidden sm:flex"
                            >
                                <Paperclip className="w-4 h-4 text-primary" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Attach File</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <div className="flex-1 relative">
                    <Input
                        type="text"
                        placeholder={
                            isConnected
                                ? "Type your message..."
                                : "Connecting..."
                        }
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) =>
                            e.key === "Enter" &&
                            !e.shiftKey &&
                            handleSendMessage()
                        }
                        disabled={!isConnected}
                        className="pr-20 border-accent/20 focus-visible:ring-primary resize-none"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hidden sm:flex"
                            disabled={!isConnected}
                        >
                            <Smile className="w-4 h-4 text-muted-foreground" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hidden sm:flex"
                            disabled={!isConnected}
                        >
                            <ImageIcon className="w-4 h-4 text-muted-foreground" />
                        </Button>
                    </div>
                </div>

                <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || !isConnected}
                    size="icon"
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shrink-0"
                >
                    <Send className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};
