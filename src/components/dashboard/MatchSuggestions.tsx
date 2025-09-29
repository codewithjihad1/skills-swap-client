"use client";

import { motion } from "framer-motion";
import { Search, Users, Star, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface MatchSuggestionsProps {
    matches: {
        recommended: {
            id: string;
            name: string;
            photo: string;
            skillOffered: string;
            skillNeeded: string;
            matchScore: number;
            rating: number;
            totalSwaps: number;
            availability: "online" | "offline" | "busy";
            distance?: string;
        }[];
        searchResults: {
            id: string;
            name: string;
            photo: string;
            skill: string;
            rating: number;
            price: number;
            availability: string;
        }[];
    };
    searchQuery: string;
    onSearch: (query: string) => void;
}

const MatchSuggestions = ({
    matches,
    searchQuery,
    onSearch,
}: MatchSuggestionsProps) => {
    const getAvailabilityColor = (status: string) => {
        switch (status) {
            case "online":
                return "bg-green-500";
            case "busy":
                return "bg-yellow-500";
            default:
                return "bg-gray-400";
        }
    };

    const getMatchScoreColor = (score: number) => {
        if (score >= 90) return "text-green-600 dark:text-green-400";
        if (score >= 80) return "text-blue-600 dark:text-blue-400";
        if (score >= 70) return "text-yellow-600 dark:text-yellow-400";
        return "text-gray-600 dark:text-gray-400";
    };

    return (
        <div className="space-y-6">
            {/* Search Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6"
            >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Search className="w-5 h-5 text-primary" />
                    Find Skills & Partners
                </h3>

                <div className="flex gap-3 mb-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search skills (e.g., React, Photography, Spanish...)"
                            value={searchQuery}
                            onChange={(e) => onSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                    </Button>
                </div>

                <div className="flex gap-2 flex-wrap">
                    {[
                        "Web Development",
                        "Design",
                        "Languages",
                        "Music",
                        "Business",
                    ].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => onSearch(tag)}
                            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-primary hover:text-white transition-colors"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Recommended Partners */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6"
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        Recommended Partners
                    </h3>
                    <Button variant="ghost" size="sm">
                        View All
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {matches.recommended.map((match) => (
                        <div
                            key={match.id}
                            className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-lg transition-shadow"
                        >
                            {/* Header */}
                            <div className="flex items-start gap-3 mb-3">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                                        <Image
                                            src={match.photo}
                                            alt={match.name}
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div
                                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${getAvailabilityColor(
                                            match.availability
                                        )}`}
                                    ></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-gray-900 dark:text-white truncate">
                                        {match.name}
                                    </h4>
                                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                        <span>{match.rating.toFixed(1)}</span>
                                        <span>•</span>
                                        <span>{match.totalSwaps} swaps</span>
                                    </div>
                                </div>
                                <div
                                    className={`text-sm font-bold ${getMatchScoreColor(
                                        match.matchScore
                                    )}`}
                                >
                                    {match.matchScore}% match
                                </div>
                            </div>

                            {/* Skills Exchange */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        Offers:{" "}
                                        <span className="font-medium">
                                            {match.skillOffered}
                                        </span>
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        Wants:{" "}
                                        <span className="font-medium">
                                            {match.skillNeeded}
                                        </span>
                                    </span>
                                </div>
                                {match.distance && (
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        📍 {match.distance}
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Button size="sm" className="flex-1">
                                    Connect
                                </Button>
                                <Button variant="outline" size="sm">
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {matches.recommended.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No recommendations yet</p>
                        <p className="text-sm">
                            Complete your profile to get better matches
                        </p>
                    </div>
                )}
            </motion.div>

            {/* Search Results */}
            {searchQuery && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6"
                >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Search Results for "{searchQuery}"
                    </h3>

                    <div className="space-y-3">
                        {matches.searchResults.map((result) => (
                            <div
                                key={result.id}
                                className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                                    <Image
                                        src={result.photo}
                                        alt={result.name}
                                        width={48}
                                        height={48}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-medium text-gray-900 dark:text-white">
                                            {result.name}
                                        </h4>
                                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                            <span>
                                                {result.rating.toFixed(1)}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {result.skill} • {result.availability}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-primary">
                                        {result.price} credits
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="mt-1"
                                    >
                                        View Profile
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default MatchSuggestions;
