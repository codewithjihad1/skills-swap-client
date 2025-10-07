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
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
        >
            {/* Header */}
            <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-3">
                    <div
                        className={`${getCategoryColor(
                            skill.category
                        )} text-white px-3 py-1 rounded-full text-xs font-medium`}
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

                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {skill.title}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
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
                                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium"
                                >
                                    {tag}
                                </span>
                            ))}
                        {skill.tags.length > 3 && (
                            <span className="text-gray-500 text-xs">
                                +{skill.tags.length - 3} more
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Instructor */}
            {/* <div className="px-6 pb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                    {skill.userId.avatar ? (
                        <img
                            src={skill.userId.avatar}
                            alt={skill.userId.name}
                            className="w-full h-full rounded-full object-cover"
                        />
                    ) : (
                        getInitials(skill.userId.name)
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                        {skill.userId.name}
                    </p>
                    <p className="text-xs text-gray-500">Skill Provider</p>
                </div>
            </div> */}

            {/* Action Buttons */}
            <div className="p-6 pt-0 flex gap-3">
                <button
                    onClick={handleConnect}
                    disabled={createSwapRequestMutation.isPending}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {createSwapRequestMutation.isPending
                        ? "Sending..."
                        : "Connect"}
                </button>
                <button className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-300 text-gray-600 hover:text-gray-900">
                    <BookOpen className="w-4 h-4" />
                </button>
            </div>

            {/* Simple Request Modal (You can enhance this with a proper modal component) */}
            {showRequestModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            Send Swap Request
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Send a request to learn{" "}
                            <strong>{skill.title}</strong>
                        </p>
                        <textarea
                            id="request-message"
                            placeholder="Add a message (optional)..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mb-4"
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
                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
                            >
                                Send Request
                            </button>
                            <button
                                onClick={() => setShowRequestModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
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
