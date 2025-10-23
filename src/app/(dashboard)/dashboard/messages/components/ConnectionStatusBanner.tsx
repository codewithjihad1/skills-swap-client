"use client";

import { motion, AnimatePresence } from "framer-motion";
import { WifiOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ConnectionStatusBannerProps {
    isConnected: boolean;
}

export const ConnectionStatusBanner = ({
    isConnected,
}: ConnectionStatusBannerProps) => {
    return (
        <AnimatePresence>
            {!isConnected && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                >
                    <Card className="border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/20">
                        <CardContent className="p-3">
                            <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                                <WifiOff className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                    Connection lost. Trying to reconnect...
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
