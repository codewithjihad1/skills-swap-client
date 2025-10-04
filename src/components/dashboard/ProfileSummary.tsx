"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Edit, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileSummaryProps {
    user: {
        name: string;
        image: string;
        bio: string;
        skillsOffered: string[];
        skillsWanted: string[];
        swapScore: number;
        totalSwaps: number;
        rating: number;
    };
}

const ProfileSummary = ({ user }: ProfileSummaryProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6"
        >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Profile Image */}
                <div className="relative">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <Image
                            src={user.image}
                            alt={user.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Swap Score Badge */}
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary to-purple-600 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
                        {user?.swapScore}
                    </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                {user.name}
                            </h2>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span>{user?.rating?.toFixed(1)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Award className="w-4 h-4" />
                                    <span>
                                        {user?.totalSwaps} swaps completed
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 md:mt-0"
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Profile
                        </Button>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm md:text-base">
                        {user?.bio}
                    </p>

                    {/* Skills */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Skills Offered */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                Skills Offered ({user?.skillsOffered?.length})
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {user?.skillsOffered?.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full"
                                    >
                                        {skill}
                                        </span>
                                    ))}
                                {user?.skillsOffered?.length > 3 && (
                                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                                        +{user.skillsOffered?.length - 3} more
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Skills Wanted */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                Skills Wanted ({user?.skillsWanted?.length})
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {user?.skillsWanted
                                    ?.slice(0, 3)
                                    .map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                {user?.skillsWanted?.length > 3 && (
                                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                                        +{user?.skillsWanted?.length - 3} more
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProfileSummary;
