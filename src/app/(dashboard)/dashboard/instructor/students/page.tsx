"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useInstructorStudents } from "@/lib/api/instructor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Users,
    GraduationCap,
    TrendingUp,
    DollarSign,
    Search,
    BookOpen,
    Calendar,
    Star,
    Filter,
    Download,
    Mail,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const InstructorStudentsPage = () => {
    const { data: session } = useSession();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [sortBy, setSortBy] = useState<string>("recent");

    const { data, isLoading, error } = useInstructorStudents(
        session?.user?.id || ""
    );

    // Filter and sort students
    const filteredStudents =
        data?.students
            ?.filter((student) => {
                const matchesSearch =
                    student.user.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    student.user.email
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    student.course.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());

                const matchesStatus =
                    statusFilter === "all" || student.status === statusFilter;

                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => {
                switch (sortBy) {
                    case "recent":
                        return (
                            new Date(b.enrolledAt).getTime() -
                            new Date(a.enrolledAt).getTime()
                        );
                    case "progress":
                        return (
                            b.progress.progressPercentage -
                            a.progress.progressPercentage
                        );
                    case "name":
                        return a.user.name.localeCompare(b.user.name);
                    default:
                        return 0;
                }
            }) || [];

    if (!session) {
        return (
            <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">
                    Please sign in to view your students
                </p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading students...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-96">
                <Card className="max-w-md">
                    <CardContent className="pt-6">
                        <p className="text-destructive text-center">
                            Failed to load students. Please try again later.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const stats = data?.stats || {
        totalStudents: 0,
        activeStudents: 0,
        completedStudents: 0,
        averageProgress: 0,
        totalRevenue: 0,
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        My Students
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage and track your students' progress
                    </p>
                </div>
                <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-accent/20 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Students
                        </CardTitle>
                        <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/30 rounded-lg">
                            <Users className="w-4 h-4 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.totalStudents}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            All time enrollments
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-accent/20 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Active Students
                        </CardTitle>
                        <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/30 rounded-lg">
                            <BookOpen className="w-4 h-4 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.activeStudents}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Currently learning
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-accent/20 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Completed
                        </CardTitle>
                        <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/30 rounded-lg">
                            <GraduationCap className="w-4 h-4 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.completedStudents}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Finished courses
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-accent/20 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Avg. Progress
                        </CardTitle>
                        <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/30 rounded-lg">
                            <TrendingUp className="w-4 h-4 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.averageProgress}%
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Overall completion
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Search */}
            <Card className="border-accent/20 shadow-lg">
                <CardContent className="pt-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by student name, email, or course..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-background border-accent/20 focus-visible:ring-primary"
                            />
                        </div>

                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >
                            <SelectTrigger className="w-full md:w-[180px] border-accent/20">
                                <Filter className="w-4 h-4 mr-2" />
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="completed">
                                    Completed
                                </SelectItem>
                                <SelectItem value="dropped">Dropped</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-full md:w-[180px] border-accent/20">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="recent">
                                    Most Recent
                                </SelectItem>
                                <SelectItem value="progress">
                                    Progress
                                </SelectItem>
                                <SelectItem value="name">Name (A-Z)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Students List */}
            <Card className="border-accent/20 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl">
                        Students ({filteredStudents.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[600px] pr-4">
                        {filteredStudents.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                                    <Users className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">
                                    No students found
                                </h3>
                                <p className="text-muted-foreground">
                                    {searchQuery || statusFilter !== "all"
                                        ? "Try adjusting your filters"
                                        : "Students will appear here once they enroll"}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredStudents.map((student) => (
                                    <Card
                                        key={student._id}
                                        className="border-accent/10 hover:border-primary/30 transition-all duration-200 hover:shadow-md"
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex flex-col lg:flex-row gap-4">
                                                {/* Student Info */}
                                                <div className="flex items-start gap-4 flex-1">
                                                    <Avatar className="h-12 w-12 border-2 border-accent/30">
                                                        <AvatarImage
                                                            src={
                                                                student.user
                                                                    .avatar
                                                            }
                                                            alt={
                                                                student.user
                                                                    .name
                                                            }
                                                        />
                                                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                                                            {student.user.name
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="font-semibold truncate">
                                                                {
                                                                    student.user
                                                                        .name
                                                                }
                                                            </h3>
                                                            <Badge
                                                                variant={
                                                                    student.status ===
                                                                    "active"
                                                                        ? "default"
                                                                        : student.status ===
                                                                          "completed"
                                                                        ? "secondary"
                                                                        : "outline"
                                                                }
                                                                className={
                                                                    student.status ===
                                                                    "active"
                                                                        ? "bg-gradient-to-r from-primary to-secondary"
                                                                        : student.status ===
                                                                          "completed"
                                                                        ? "bg-accent text-secondary"
                                                                        : ""
                                                                }
                                                            >
                                                                {student.status}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground truncate flex items-center gap-1">
                                                            <Mail className="w-3 h-3" />
                                                            {student.user.email}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground mt-1 truncate flex items-center gap-1">
                                                            <BookOpen className="w-3 h-3" />
                                                            {
                                                                student.course
                                                                    .title
                                                            }
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Progress Section */}
                                                <div className="flex-1 space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">
                                                            Progress
                                                        </span>
                                                        <span className="text-sm font-bold text-primary">
                                                            {
                                                                student.progress
                                                                    .progressPercentage
                                                            }
                                                            %
                                                        </span>
                                                    </div>
                                                    <Progress
                                                        value={
                                                            student.progress
                                                                .progressPercentage
                                                        }
                                                        className="h-2"
                                                    />
                                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                        <span className="flex items-center gap-1">
                                                            <GraduationCap className="w-3 h-3" />
                                                            {
                                                                student.progress
                                                                    .totalLessonsCompleted
                                                            }{" "}
                                                            lessons
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            {formatDistanceToNow(
                                                                new Date(
                                                                    student.enrolledAt
                                                                ),
                                                                {
                                                                    addSuffix:
                                                                        true,
                                                                }
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Rating & Actions */}
                                                <div className="flex flex-col items-end justify-between gap-2">
                                                    {student.rating && (
                                                        <div className="flex items-center gap-1 text-sm">
                                                            <Star className="w-4 h-4 fill-primary text-primary" />
                                                            <span className="font-semibold">
                                                                {
                                                                    student
                                                                        .rating
                                                                        .score
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-primary/20 hover:bg-primary/5 hover:text-primary"
                                                    >
                                                        <Mail className="w-4 h-4 mr-1" />
                                                        Contact
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
};

export default InstructorStudentsPage;
