"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    Star,
    Clock,
    Users,
    Edit,
    Trash2,
    Eye,
    MoreVertical,
    BookOpen,
    Target,
    TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AddSkillComponent from "@/components/skills/AddSkill";

// Mock data for skills
const mockSkillsOffered = [
    {
        id: 1,
        title: "React Development",
        category: "Programming",
        level: "Expert",
        rating: 4.8,
        students: 24,
        sessions: 15,
        earnings: 350,
        description:
            "Advanced React concepts including hooks, context, and performance optimization",
        status: "active",
        tags: ["React", "JavaScript", "Frontend"],
        image: "/api/placeholder/60/60",
    },
    {
        id: 2,
        title: "UI/UX Design",
        category: "Design",
        level: "Intermediate",
        rating: 4.6,
        students: 18,
        sessions: 12,
        earnings: 280,
        description:
            "User interface and experience design principles with Figma",
        status: "active",
        tags: ["Design", "Figma", "Prototyping"],
        image: "/api/placeholder/60/60",
    },
    {
        id: 3,
        title: "Python Programming",
        category: "Programming",
        level: "Advanced",
        rating: 4.9,
        students: 32,
        sessions: 20,
        earnings: 450,
        description:
            "Python fundamentals to advanced concepts including data structures",
        status: "paused",
        tags: ["Python", "Backend", "Data Science"],
        image: "/api/placeholder/60/60",
    },
];

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

    const stats = {
        totalOffered: 8,
        totalWanted: 5,
        activeStudents: 74,
        totalEarnings: 1280,
        averageRating: 4.7,
        completedSessions: 47,
    };

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

                {/* Stats Cards */}
                {/* <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4"
                >
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-600 rounded-lg">
                                    <BookOpen className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Skills Offered
                                    </p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {stats.totalOffered}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-600 rounded-lg">
                                    <Target className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Learning
                                    </p>
                                    <p className="text-2xl font-bold text-purple-600">
                                        {stats.totalWanted}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-600 rounded-lg">
                                    <Users className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Students
                                    </p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {stats.activeStudents}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-600 rounded-lg">
                                    <TrendingUp className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Earnings
                                    </p>
                                    <p className="text-2xl font-bold text-orange-600">
                                        ${stats.totalEarnings}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-700">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-yellow-600 rounded-lg">
                                    <Star className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Rating
                                    </p>
                                    <p className="text-2xl font-bold text-yellow-600">
                                        {stats.averageRating}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-indigo-200 dark:border-indigo-700">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-600 rounded-lg">
                                    <Award className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Sessions
                                    </p>
                                    <p className="text-2xl font-bold text-indigo-600">
                                        {stats.completedSessions}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div> */}

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
                                {mockSkillsOffered.map((skill, index) => (
                                    <motion.div
                                        key={skill.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                                            <CardHeader className="pb-3">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-12 w-12">
                                                            <AvatarImage
                                                                src={
                                                                    skill.image
                                                                }
                                                                alt={
                                                                    skill.title
                                                                }
                                                            />
                                                            <AvatarFallback>
                                                                {skill.title.slice(
                                                                    0,
                                                                    2
                                                                )}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                                                                {skill.title}
                                                            </CardTitle>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                {skill.category}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                            >
                                                                <MoreVertical className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuItem>
                                                                <Eye className="h-4 w-4 mr-2" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Edit className="h-4 w-4 mr-2" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="text-red-600">
                                                                <Trash2 className="h-4 w-4 mr-2" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>

                                                <div className="flex items-center gap-2 mt-2">
                                                    <Badge
                                                        variant={
                                                            skill.status ===
                                                            "active"
                                                                ? "default"
                                                                : "secondary"
                                                        }
                                                        className={
                                                            skill.status ===
                                                            "active"
                                                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                                : ""
                                                        }
                                                    >
                                                        {skill.status}
                                                    </Badge>
                                                    <Badge variant="outline">
                                                        {skill.level}
                                                    </Badge>
                                                </div>
                                            </CardHeader>

                                            <CardContent className="space-y-4">
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {skill.description}
                                                </p>

                                                <div className="flex flex-wrap gap-1">
                                                    {skill.tags.map((tag) => (
                                                        <Badge
                                                            key={tag}
                                                            variant="secondary"
                                                            className="text-xs"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                                                    <div className="flex items-center gap-2">
                                                        <Star className="h-4 w-4 text-yellow-500" />
                                                        <span className="text-sm font-medium">
                                                            {skill.rating}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Users className="h-4 w-4 text-blue-500" />
                                                        <span className="text-sm">
                                                            {skill.students}{" "}
                                                            students
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4 text-green-500" />
                                                        <span className="text-sm">
                                                            {skill.sessions}{" "}
                                                            sessions
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <TrendingUp className="h-4 w-4 text-purple-500" />
                                                        <span className="text-sm font-medium">
                                                            ${skill.earnings}
                                                        </span>
                                                    </div>
                                                </div>

                                                <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                                    Manage Skill
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
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
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {skill.description}
                                                </p>

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
