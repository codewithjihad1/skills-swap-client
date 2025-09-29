"use client";

import { motion } from "framer-motion";
import {
    Coins,
    TrendingUp,
    TrendingDown,
    Plus,
    ArrowUpRight,
    ArrowDownLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SkillWalletProps {
    balance: {
        totalCredits: number;
        earnedThisMonth: number;
        spentThisMonth: number;
        pendingCredits: number;
    };
    recentTransactions: {
        id: string;
        type: "earned" | "spent" | "pending";
        amount: number;
        description: string;
        date: string;
        skillName?: string;
    }[];
}

const SkillWallet = ({ balance, recentTransactions }: SkillWalletProps) => {
    const getTransactionIcon = (type: "earned" | "spent" | "pending") => {
        switch (type) {
            case "earned":
                return (
                    <ArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
                );
            case "spent":
                return (
                    <ArrowDownLeft className="w-4 h-4 text-red-600 dark:text-red-400" />
                );
            case "pending":
                return (
                    <Plus className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                );
        }
    };

    const getTransactionColor = (type: "earned" | "spent" | "pending") => {
        switch (type) {
            case "earned":
                return "text-green-600 dark:text-green-400";
            case "spent":
                return "text-red-600 dark:text-red-400";
            case "pending":
                return "text-yellow-600 dark:text-yellow-400";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Coins className="w-6 h-6 text-yellow-500" />
                    Skill Wallet
                </h2>
                <Button variant="outline" size="sm">
                    View All Transactions
                </Button>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {/* Total Credits */}
                <div className="bg-gradient-to-r from-primary to-purple-600 rounded-lg p-4 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <Coins className="w-5 h-5" />
                        <span className="text-xs opacity-90">Available</span>
                    </div>
                    <div className="text-2xl font-bold">
                        {balance.totalCredits}
                    </div>
                    <div className="text-xs opacity-90">Skill Credits</div>
                </div>

                {/* Earned This Month */}
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            This Month
                        </span>
                    </div>
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">
                        +{balance.earnedThisMonth}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        Earned
                    </div>
                </div>

                {/* Spent This Month */}
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            This Month
                        </span>
                    </div>
                    <div className="text-xl font-bold text-red-600 dark:text-red-400">
                        -{balance.spentThisMonth}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        Spent
                    </div>
                </div>

                {/* Pending Credits */}
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                        <Plus className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            Pending
                        </span>
                    </div>
                    <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                        {balance.pendingCredits}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        Credits
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Recent Transactions
                </h3>
                <div className="space-y-3">
                    {recentTransactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white dark:bg-gray-600 rounded-full flex items-center justify-center">
                                    {getTransactionIcon(transaction.type)}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                                        {transaction.description}
                                    </p>
                                    {transaction.skillName && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Skill: {transaction.skillName}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {transaction.date}
                                    </p>
                                </div>
                            </div>
                            <div
                                className={`font-bold text-sm ${getTransactionColor(
                                    transaction.type
                                )}`}
                            >
                                {transaction.type === "spent" ? "-" : "+"}
                                {transaction.amount} credits
                            </div>
                        </div>
                    ))}
                </div>

                {recentTransactions.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <Coins className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No transactions yet</p>
                        <p className="text-sm">
                            Start swapping skills to see your activity here
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default SkillWallet;
