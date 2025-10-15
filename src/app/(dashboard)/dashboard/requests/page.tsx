"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Clock,
    Check,
    X,
    User,
    Calendar,
    MessageCircle,
    Star,
    Filter,
    Search,
    Send,
    MoreVertical,
    AlertCircle,
    CheckCircle,
    XCircle,
    Eye,
    ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import BookingSchedule from "@/components/modals/BookingSchedule";

// Mock data for incoming requests
const mockIncomingRequests = [
    {
        id: 1,
        requesterName: "Sarah Chen",
        requesterImage: "/api/placeholder/48/48",
        requesterRating: 4.8,
        requesterTotalSwaps: 24,
        skillRequested: "React Development",
        skillCategory: "Programming",
        requestDate: "2024-01-15",
        preferredDate: "2024-01-20",
        preferredTime: "2:00 PM - 4:00 PM",
        duration: "2 hours",
        message:
            "Hi! I'm looking to learn advanced React patterns and hooks. I've been working with React for 6 months and want to take my skills to the next level. Would love to learn from your experience!",
        status: "pending",
        priority: "high",
        sessionType: "online",
        budget: 50,
    },
    {
        id: 2,
        requesterName: "David Kim",
        requesterImage: "/api/placeholder/48/48",
        requesterRating: 4.6,
        requesterTotalSwaps: 18,
        skillRequested: "UI/UX Design",
        skillCategory: "Design",
        requestDate: "2024-01-14",
        preferredDate: "2024-01-22",
        preferredTime: "10:00 AM - 12:00 PM",
        duration: "2 hours",
        message:
            "I'm a developer looking to improve my design skills. Specifically interested in learning about user research and prototyping in Figma.",
        status: "pending",
        priority: "medium",
        sessionType: "in-person",
        budget: 40,
    },
    {
        id: 3,
        requesterName: "Emily Rodriguez",
        requesterImage: "/api/placeholder/48/48",
        requesterRating: 4.9,
        requesterTotalSwaps: 31,
        skillRequested: "Python Programming",
        skillCategory: "Programming",
        requestDate: "2024-01-13",
        preferredDate: "2024-01-18",
        preferredTime: "6:00 PM - 8:00 PM",
        duration: "2 hours",
        message:
            "Need help with data structures and algorithms in Python. Preparing for technical interviews and would appreciate guidance.",
        status: "accepted",
        priority: "high",
        sessionType: "online",
        budget: 60,
    },
];

// Mock data for outgoing requests
const mockOutgoingRequests = [
    {
        id: 1,
        providerName: "Dr. Michael Chen",
        providerImage: "/api/placeholder/48/48",
        providerRating: 4.9,
        providerTotalSwaps: 45,
        skillRequested: "Machine Learning",
        skillCategory: "Data Science",
        requestDate: "2024-01-12",
        preferredDate: "2024-01-19",
        preferredTime: "3:00 PM - 5:00 PM",
        duration: "2 hours",
        message:
            "Looking to learn ML fundamentals and neural networks. I have Python experience but new to ML.",
        status: "pending",
        responseDate: null,
        sessionType: "online",
        budget: 80,
    },
    {
        id: 2,
        providerName: "Lisa Johnson",
        providerImage: "/api/placeholder/48/48",
        providerRating: 4.7,
        providerTotalSwaps: 28,
        skillRequested: "Digital Marketing",
        skillCategory: "Marketing",
        requestDate: "2024-01-10",
        preferredDate: "2024-01-17",
        preferredTime: "1:00 PM - 3:00 PM",
        duration: "2 hours",
        message:
            "Want to learn SEO and social media marketing strategies for my startup.",
        status: "accepted",
        responseDate: "2024-01-11",
        sessionType: "online",
        budget: 45,
    },
    {
        id: 3,
        providerName: "Alex Thompson",
        providerImage: "/api/placeholder/48/48",
        providerRating: 4.5,
        providerTotalSwaps: 22,
        skillRequested: "Photography",
        skillCategory: "Creative",
        requestDate: "2024-01-08",
        preferredDate: "2024-01-15",
        preferredTime: "10:00 AM - 2:00 PM",
        duration: "4 hours",
        message:
            "Interested in portrait photography techniques and lighting setup.",
        status: "declined",
        responseDate: "2024-01-09",
        sessionType: "in-person",
        budget: 70,
    },
];

const SkillRequestsPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [activeTab, setActiveTab] = useState("incoming");
    const [open, setOpen] = useState(false);
    const stats = {
        totalIncoming: 12,
        pendingIncoming: 8,
        acceptedIncoming: 3,
        totalOutgoing: 7,
        pendingOutgoing: 2,
        acceptedOutgoing: 4,
        declinedOutgoing: 1,
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
    const statuses = ["All", "Pending", "Accepted", "Declined"];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
            case "accepted":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
            case "declined":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "pending":
                return <Clock className="h-3 w-3" />;
            case "accepted":
                return <CheckCircle className="h-3 w-3" />;
            case "declined":
                return <XCircle className="h-3 w-3" />;
            default:
                return <AlertCircle className="h-3 w-3" />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
            case "medium":
                return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
            case "low":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
        }
    };

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
                            Skill Requests
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Manage incoming and outgoing skill exchange requests
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="gap-2">
                            <Filter className="h-4 w-4" />
                            Filter
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                    <Send className="h-4 w-4" />
                                    Send Request
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>
                                        Send Skill Request
                                    </DialogTitle>
                                    <DialogDescription>
                                        Request a skill exchange session with
                                        another user.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <Input placeholder="Search for skills or users..." />
                                    <Textarea placeholder="Describe what you'd like to learn and your experience level..." />
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Preferred date"
                                            type="date"
                                        />
                                        <Input placeholder="Duration" />
                                    </div>
                                    <Button className="w-full">
                                        Send Request
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-600 rounded-lg">
                                    <ArrowRight className="h-4 w-4 text-white rotate-180" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Incoming Requests
                                    </p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {stats.totalIncoming}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-700">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-yellow-600 rounded-lg">
                                    <Clock className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Pending
                                    </p>
                                    <p className="text-2xl font-bold text-yellow-600">
                                        {stats.pendingIncoming}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-600 rounded-lg">
                                    <CheckCircle className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Accepted
                                    </p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {stats.acceptedIncoming}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-600 rounded-lg">
                                    <Send className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Sent Requests
                                    </p>
                                    <p className="text-2xl font-bold text-purple-600">
                                        {stats.totalOutgoing}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Search and Filter */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col md:flex-row gap-4"
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search requests..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <div className="flex gap-2">
                        <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                        >
                            <SelectTrigger className="w-40">
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

                        <Select
                            value={selectedStatus}
                            onValueChange={setSelectedStatus}
                        >
                            <SelectTrigger className="w-32">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statuses.map((status) => (
                                    <SelectItem
                                        key={status}
                                        value={status.toLowerCase()}
                                    >
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </motion.div>

                {/* Main Content Tabs */}
                <motion.div variants={itemVariants}>
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full"
                    >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="incoming" className="gap-2">
                                <ArrowRight className="h-4 w-4 rotate-180" />
                                Incoming Requests ({stats.totalIncoming})
                            </TabsTrigger>
                            <TabsTrigger value="outgoing" className="gap-2">
                                <Send className="h-4 w-4" />
                                Sent Requests ({stats.totalOutgoing})
                            </TabsTrigger>
                        </TabsList>

                        {/* Incoming Requests Tab */}
                        <TabsContent value="incoming" className="mt-6">
                            <div className="space-y-4">
                                {mockIncomingRequests.map((request, index) => (
                                    <motion.div
                                        key={request.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                                            <CardHeader className="pb-3">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <Avatar className="h-12 w-12">
                                                            <AvatarImage
                                                                src={
                                                                    request.requesterImage
                                                                }
                                                                alt={
                                                                    request.requesterName
                                                                }
                                                            />
                                                            <AvatarFallback>
                                                                {request.requesterName
                                                                    .split(" ")
                                                                    .map(
                                                                        (n) =>
                                                                            n[0]
                                                                    )
                                                                    .join("")}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <h3 className="font-semibold text-lg">
                                                                    {
                                                                        request.requesterName
                                                                    }
                                                                </h3>
                                                                <div className="flex items-center gap-1">
                                                                    <Star className="h-4 w-4 text-yellow-500" />
                                                                    <span className="text-sm font-medium">
                                                                        {
                                                                            request.requesterRating
                                                                        }
                                                                    </span>
                                                                    <span className="text-sm text-gray-500">
                                                                        (
                                                                        {
                                                                            request.requesterTotalSwaps
                                                                        }{" "}
                                                                        swaps)
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <Badge
                                                                    variant="outline"
                                                                    className="text-xs"
                                                                >
                                                                    {
                                                                        request.skillRequested
                                                                    }
                                                                </Badge>
                                                                <Badge
                                                                    className={getPriorityColor(
                                                                        request.priority
                                                                    )}
                                                                >
                                                                    {
                                                                        request.priority
                                                                    }{" "}
                                                                    priority
                                                                </Badge>
                                                                <Badge
                                                                    className={getStatusColor(
                                                                        request.status
                                                                    )}
                                                                >
                                                                    {getStatusIcon(
                                                                        request.status
                                                                    )}
                                                                    <span className="ml-1">
                                                                        {
                                                                            request.status
                                                                        }
                                                                    </span>
                                                                </Badge>
                                                            </div>
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
                                                                View Profile
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <MessageCircle className="h-4 w-4 mr-2" />
                                                                Send Message
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </CardHeader>

                                            <CardContent className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-blue-500" />
                                                        <span>
                                                            Preferred:{" "}
                                                            {
                                                                request.preferredDate
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4 text-green-500" />
                                                        <span>
                                                            {
                                                                request.preferredTime
                                                            }{" "}
                                                            ({request.duration})
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4 text-purple-500" />
                                                        <span>
                                                            {
                                                                request.sessionType
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg font-semibold text-green-600">
                                                            ${request.budget}
                                                        </span>
                                                        <span className="text-gray-500">
                                                            credits
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        {request.message}
                                                    </p>
                                                </div>

                                                {request.status ===
                                                    "pending" && (
                                                        <div className="flex gap-2 pt-2">
                                                            <Button
                                                                size="sm"
                                                                className="flex-1 bg-green-600 hover:bg-green-700"
                                                            >
                                                                <Check className="h-4 w-4 mr-2" />
                                                                Accept
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="flex-1"
                                                            >
                                                                <MessageCircle className="h-4 w-4 mr-2" />
                                                                Negotiate
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="destructive"
                                                                className="flex-1"
                                                            >
                                                                <X className="h-4 w-4 mr-2" />
                                                                Decline
                                                            </Button>
                                                        </div>
                                                    )}

                                                {request.status ===
                                                    "accepted" && (
                                                        <div className="flex gap-2 pt-2">
                                                            <div className="flex-1">
                                                       <Button
                                                             size="sm"
                                                         className=" bg-blue-600 hover:bg-blue-700 text-white w-full"
                                                                    onClick={() => setOpen(true)}
                                                                >
                                                                    <Calendar className="h-4 w-4 mr-2" />
                                                                    Schedule Session
                                                                </Button>
                                                                <BookingSchedule open={open} setOpen={setOpen} />

                                                            </div>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                            >
                                                                <MessageCircle className="h-4 w-4 mr-2" />
                                                                Message
                                                            </Button>
                                                        </div>
                                                    )}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>

                        {/* Outgoing Requests Tab */}
                        <TabsContent value="outgoing" className="mt-6">
                            <div className="space-y-4">
                                {mockOutgoingRequests.map((request, index) => (
                                    <motion.div
                                        key={request.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                                            <CardHeader className="pb-3">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <Avatar className="h-12 w-12">
                                                            <AvatarImage
                                                                src={
                                                                    request.providerImage
                                                                }
                                                                alt={
                                                                    request.providerName
                                                                }
                                                            />
                                                            <AvatarFallback>
                                                                {request.providerName
                                                                    .split(" ")
                                                                    .map(
                                                                        (n) =>
                                                                            n[0]
                                                                    )
                                                                    .join("")}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <h3 className="font-semibold text-lg">
                                                                    {
                                                                        request.providerName
                                                                    }
                                                                </h3>
                                                                <div className="flex items-center gap-1">
                                                                    <Star className="h-4 w-4 text-yellow-500" />
                                                                    <span className="text-sm font-medium">
                                                                        {
                                                                            request.providerRating
                                                                        }
                                                                    </span>
                                                                    <span className="text-sm text-gray-500">
                                                                        (
                                                                        {
                                                                            request.providerTotalSwaps
                                                                        }{" "}
                                                                        swaps)
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <Badge
                                                                    variant="outline"
                                                                    className="text-xs"
                                                                >
                                                                    {
                                                                        request.skillRequested
                                                                    }
                                                                </Badge>
                                                                <Badge
                                                                    className={getStatusColor(
                                                                        request.status
                                                                    )}
                                                                >
                                                                    {getStatusIcon(
                                                                        request.status
                                                                    )}
                                                                    <span className="ml-1">
                                                                        {
                                                                            request.status
                                                                        }
                                                                    </span>
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="text-right text-sm text-gray-500">
                                                        <p>
                                                            Sent:{" "}
                                                            {
                                                                request.requestDate
                                                            }
                                                        </p>
                                                        {request.responseDate && (
                                                            <p>
                                                                Response:{" "}
                                                                {
                                                                    request.responseDate
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardHeader>

                                            <CardContent className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-blue-500" />
                                                        <span>
                                                            Preferred:{" "}
                                                            {
                                                                request.preferredDate
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4 text-green-500" />
                                                        <span>
                                                            {
                                                                request.preferredTime
                                                            }{" "}
                                                            ({request.duration})
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4 text-purple-500" />
                                                        <span>
                                                            {
                                                                request.sessionType
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg font-semibold text-green-600">
                                                            ${request.budget}
                                                        </span>
                                                        <span className="text-gray-500">
                                                            credits
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        {request.message}
                                                    </p>
                                                </div>

                                                <div className="flex gap-2 pt-2">
                                                    {request.status ===
                                                        "pending" && (
                                                            <>
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    className="flex-1"
                                                                >
                                                                    <MessageCircle className="h-4 w-4 mr-2" />
                                                                    Follow Up
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    variant="destructive"
                                                                >
                                                                    <X className="h-4 w-4 mr-2" />
                                                                    Cancel
                                                                </Button>
                                                            </>
                                                        )}

                                                    {request.status ===
                                                        "accepted" && (
                                                            <>
                                                                <Button
                                                                    size="sm"
                                                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                                                >
                                                                    <Calendar className="h-4 w-4 mr-2" />
                                                                    View Session
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                >
                                                                    <MessageCircle className="h-4 w-4 mr-2" />
                                                                    Message
                                                                </Button>
                                                            </>
                                                        )}

                                                    {request.status ===
                                                        "declined" && (
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="flex-1"
                                                            >
                                                                <Send className="h-4 w-4 mr-2" />
                                                                Send New Request
                                                            </Button>
                                                        )}
                                                </div>
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

export default SkillRequestsPage;
