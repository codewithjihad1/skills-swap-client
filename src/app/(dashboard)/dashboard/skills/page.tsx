"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    BookOpen,
    Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AddSkillComponent from "@/components/skills/AddSkill";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axiosInstance from "@/axios/axiosInstance";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import SkillCard from "./components/SkillCard";

const mockSkillsWanted = [
    {
        id: 1,
        title: "Machine Learning",
        category: "Data Science",
        priority: "High",
        progress: 65,
        provider: "Dr. Sarah Chen",
        nextSession: "Tomorrow, 2:00 PM",
        description: "Learning ML algorithms and neural networks",
        status: "learning",
        tags: ["ML", "AI", "Python"],
        providerImage: "/api/placeholder/40/40",
    },
    {
        id: 2,
        title: "Digital Marketing",
        category: "Marketing",
        priority: "Medium",
        progress: 30,
        provider: "Mark Johnson",
        nextSession: "Friday, 10:00 AM",
        description: "SEO, social media marketing, and analytics",
        status: "pending",
        tags: ["SEO", "Social Media", "Analytics"],
        providerImage: "/api/placeholder/40/40",
    },
    {
        id: 3,
        title: "Photography",
        category: "Creative",
        priority: "Low",
        progress: 80,
        provider: "Emma Wilson",
        nextSession: "Next week",
        description: "Portrait and landscape photography techniques",
        status: "completed",
        tags: ["Photography", "Editing", "Composition"],
        providerImage: "/api/placeholder/40/40",
    },
];

const SkillsPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [activeTab, setActiveTab] = useState("offered");
    const { data: session } = useSession();

    // const stats = {
    //     totalOffered: 8,
    //     totalWanted: 5,
    //     activeStudents: 74,
    //     totalEarnings: 1280,
    //     averageRating: 4.7,
    //     completedSessions: 47,
    // };

    // get skills by user id from session
    const {
        data: skillsOffered,
        isLoading: skillsLoading,
    }: { data: any; isLoading: boolean } = useQuery({
        queryKey: ["userSkills", session?.user?.id],
        queryFn: async () => {
            const res = await axiosInstance.get(
                `/api/skills/user/${session?.user?.id}`
            );
            return res.data;
        },
    });

    const categories = [
        "All",
        "Programming",
        "Design",
        "Marketing",
        "Data Science",
        "Creative",
        "Business",
    ];

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

    // Loading state
    if (skillsLoading && skillsOffered?.length > 0) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-6">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-7xl mx-auto space-y-6"
            >
                {/* Header */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Skills Dashboard
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Manage your skills and track your learning journey
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="gap-2">
                            <Filter className="h-4 w-4" />
                            Filter
                        </Button>
                        <AddSkillComponent />
                    </div>
                </motion.div>

                {/* Search and Filter */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col md:flex-row gap-4"
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search skills..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                    >
                        <SelectTrigger className="w-full md:w-48">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem
                                    key={category}
                                    value={category.toLowerCase()}
                                >
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </motion.div>

                {/* Main Content Tabs */}
                <motion.div variants={itemVariants}>
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full"
                    >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="offered" className="gap-2">
                                <BookOpen className="h-4 w-4" />
                                Skills I Offer
                            </TabsTrigger>
                            <TabsTrigger value="wanted" className="gap-2">
                                <Target className="h-4 w-4" />
                                Skills I Want
                            </TabsTrigger>
                        </TabsList>

                        {/* Skills Offered Tab */}
                        <TabsContent value="offered" className="mt-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {skillsOffered?.map(
                                    (skill: any, index: number) => (
                                        <SkillCard
                                            key={skill.id}
                                            skillData={skill}
                                        />
                                    )
                                )}
                            </div>
                        </TabsContent>

                        {/* Skills Wanted Tab */}
                        <TabsContent value="wanted" className="mt-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {mockSkillsWanted.map((skill, index) => (
                                    <motion.div
                                        key={skill.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                                            <CardHeader className="pb-3">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                                                            {skill.title}
                                                        </CardTitle>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {skill.category}
                                                        </p>
                                                    </div>

                                                    <Badge
                                                        variant={
                                                            skill.priority ===
                                                            "High"
                                                                ? "destructive"
                                                                : skill.priority ===
                                                                  "Medium"
                                                                ? "default"
                                                                : "secondary"
                                                        }
                                                    >
                                                        {skill.priority}{" "}
                                                        Priority
                                                    </Badge>
                                                </div>
                                            </CardHeader>

                                            <CardContent className="space-y-4">
                                                {/* <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {skill.description}
                                                </p> */}

                                                <div className="flex flex-wrap gap-1">
                                                    {skill.tags.map((tag) => (
                                                        <Badge
                                                            key={tag}
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600 dark:text-gray-400">
                                                            Progress
                                                        </span>
                                                        <span className="font-medium">
                                                            {skill.progress}%
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                        <div
                                                            className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                                                            style={{
                                                                width: `${skill.progress}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                {/* Provider Info */}
                                                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage
                                                            src={
                                                                skill.providerImage
                                                            }
                                                            alt={skill.provider}
                                                        />
                                                        <AvatarFallback>
                                                            {skill.provider.slice(
                                                                0,
                                                                2
                                                            )}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium">
                                                            {skill.provider}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            {skill.nextSession}
                                                        </p>
                                                    </div>
                                                    <Badge
                                                        variant={
                                                            skill.status ===
                                                            "learning"
                                                                ? "default"
                                                                : skill.status ===
                                                                  "completed"
                                                                ? "secondary"
                                                                : "outline"
                                                        }
                                                        className={
                                                            skill.status ===
                                                            "learning"
                                                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                                                : skill.status ===
                                                                  "completed"
                                                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                                : ""
                                                        }
                                                    >
                                                        {skill.status}
                                                    </Badge>
                                                </div>

                                                <Button
                                                    className={`w-full ${
                                                        skill.status ===
                                                        "completed"
                                                            ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                                                            : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                                    }`}
                                                >
                                                    {skill.status ===
                                                    "completed"
                                                        ? "View Certificate"
                                                        : skill.status ===
                                                          "learning"
                                                        ? "Continue Learning"
                                                        : "Start Learning"}
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default SkillsPage;
