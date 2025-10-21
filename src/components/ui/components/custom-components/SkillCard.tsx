"use client";

import { BookOpen } from "lucide-react";
import React, { useState } from "react";
import { useCreateSwapRequest } from "@/lib/api/swapRequests";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface SkillCardProps {
    skill: any;
    getCategoryColor: (category: string) => string;
    getProficiencyColor: (level: string) => string;
    getInitials?: (name: string) => string;
}

const SkillCard = ({
    skill,
    getCategoryColor,
    getProficiencyColor,
}: SkillCardProps) => {
    const { data: session } = useSession();
    const createSwapRequestMutation = useCreateSwapRequest();
    const [showRequestModal, setShowRequestModal] = useState(false);

    const handleConnect = () => {
        if (!session?.user?.id) {
            toast.error("Please sign in to send swap requests");
            return;
        }

        if (session.user.id === skill.offeredBy) {
            toast.error("You cannot send a swap request to yourself");
            return;
        }

        // For now, we'll create a simple request modal
        // You can enhance this with a modal component later
        setShowRequestModal(true);
    };

    const handleSendRequest = (message?: string) => {
        if (!session?.user?.id) return;

        // Note: You'll need to implement skill selection logic
        // For now, we'll use placeholder values
        createSwapRequestMutation.mutate({
            requester: session.user.id,
            skillOffered: skill._id, // This should be a skill the user offers
            skillProvider: skill.offeredBy,
            skillRequested: skill._id,
            message:
                message ||
                "Hi! I'm interested in learning this skill from you.",
        });

        setShowRequestModal(false);
    };

    return (
        <div
            key={skill._id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border-2 border-[#B0EACD]/30 hover:border-[#21BF73]/50"
        >
            {/* Header */}
            <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-3">
                    <div
                        className={`${getCategoryColor(
                            skill.category
                        )} text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm`}
                    >
                        {skill.category}
                    </div>
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getProficiencyColor(
                            skill.proficiency
                        )}`}
                    >
                        {skill.proficiency}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-[#21BF73] transition-colors">
                    {skill.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed">
                    {skill.description}
                </p>
            </div>

            {/* Tags */}
            {skill.tags.length > 0 && (
                <div className="px-6 pb-4">
                    <div className="flex flex-wrap gap-2">
                        {skill.tags
                            .slice(0, 3)
                            .map((tag: string, index: number) => (
                                <span
                                    key={index}
                                    className="bg-[#B0EACD]/20 text-[#007a3f] px-2 py-1 rounded-md text-xs font-medium border border-[#B0EACD]/50"
                                >
                                    {tag}
                                </span>
                            ))}
                        {skill.tags.length > 3 && (
                            <span className="text-gray-500 dark:text-gray-400 text-xs">
                                +{skill.tags.length - 3} more
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="p-6 pt-0 flex gap-3">
                <button
                    onClick={handleConnect}
                    disabled={createSwapRequestMutation.isPending}
                    className="flex-1 bg-gradient-to-r from-[#21BF73] to-[#007a3f] text-white py-3 px-4 rounded-xl font-medium hover:from-[#007a3f] hover:to-[#21BF73] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#21BF73]/30"
                >
                    {createSwapRequestMutation.isPending
                        ? "Sending..."
                        : "Connect"}
                </button>
                <button className="px-4 py-3 border-2 border-[#B0EACD] rounded-xl hover:bg-[#B0EACD]/10 transition-colors duration-300 text-[#007a3f] hover:text-[#21BF73] hover:border-[#21BF73]">
                    <BookOpen className="w-4 h-4" />
                </button>
            </div>

            {/* Simple Request Modal (You can enhance this with a proper modal component) */}
            {showRequestModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full border-2 border-[#21BF73]/30 shadow-2xl">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Send Swap Request
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Send a request to learn{" "}
                            <strong className="text-[#21BF73]">
                                {skill.title}
                            </strong>
                        </p>
                        <textarea
                            id="request-message"
                            placeholder="Add a message (optional)..."
                            className="w-full px-4 py-3 border-2 border-[#B0EACD]/50 rounded-lg focus:ring-2 focus:ring-[#21BF73] focus:border-[#21BF73] outline-none mb-4 dark:bg-gray-700 dark:text-white"
                            rows={3}
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    const message = (
                                        document.getElementById(
                                            "request-message"
                                        ) as HTMLTextAreaElement
                                    )?.value;
                                    handleSendRequest(message);
                                }}
                                className="flex-1 bg-gradient-to-r from-[#21BF73] to-[#007a3f] text-white py-2 px-4 rounded-lg font-medium hover:from-[#007a3f] hover:to-[#21BF73] transition-all shadow-lg shadow-[#21BF73]/30"
                            >
                                Send Request
                            </button>
                            <button
                                onClick={() => setShowRequestModal(false)}
                                className="px-4 py-2 border-2 border-[#B0EACD] rounded-lg hover:bg-[#B0EACD]/10 transition-colors text-[#007a3f] hover:border-[#21BF73]"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillCard;
