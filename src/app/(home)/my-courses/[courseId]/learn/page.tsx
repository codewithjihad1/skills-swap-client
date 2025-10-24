"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
    CheckCircle2,
    Circle,
    Clock,
    ArrowLeft,
    PlayCircle,
    BookOpen,
    FileText,
    Download,
    ChevronRight,
    Lock,
    Video,
} from "lucide-react";
import { useCourseLessons, useLesson, Lesson } from "@/lib/api/lessons";
import { toast } from "sonner";

export default function CourseLearningPage() {
    const { data: session } = useSession();
    const params = useParams();
    const router = useRouter();
    const courseId = params?.courseId as string;

    const [selectedLessonId, setSelectedLessonId] = useState<string | null>(
        null
    );

    // API Hooks
    const {
        data: lessonsData,
        isLoading: lessonsLoading,
        error: lessonsError,
    } = useCourseLessons(courseId, true, false);

    const {
        data: lessonData,
        isLoading: lessonLoading,
        error: lessonError,
    } = useLesson(selectedLessonId || undefined);

    // Auto-select first lesson when data loads
    React.useEffect(() => {
        if (
            lessonsData?.lessons &&
            lessonsData.lessons.length > 0 &&
            !selectedLessonId
        ) {
            setSelectedLessonId(lessonsData.lessons[0]._id);
        }
    }, [lessonsData, selectedLessonId]);

    // Handle lesson selection
    const handleLessonSelect = (lessonId: string) => {
        setSelectedLessonId(lessonId);
    };

    // Extract video ID from YouTube URL
    const getYouTubeVideoId = (url: string) => {
        const match = url.match(
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
        );
        return match ? match[1] : null;
    };

    // Loading state
    if (lessonsLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-6">
                    {/* Header Skeleton */}
                    <div className="flex items-center gap-4 mb-8">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-8 w-2/3" />
                            <Skeleton className="h-4 w-1/3" />
                        </div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-2">
                            <Skeleton className="h-[500px] w-full" />
                        </Card>
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-6 w-32" />
                            </CardHeader>
                            <CardContent>
                                {[...Array(5)].map((_, i) => (
                                    <Skeleton
                                        key={i}
                                        className="h-16 w-full mb-3"
                                    />
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (lessonsError) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card className="border-red-200 bg-red-50">
                    <CardHeader>
                        <CardTitle className="text-red-700">
                            Error Loading Course
                        </CardTitle>
                        <CardDescription className="text-red-600">
                            {(lessonsError as any).response?.data?.error ||
                                "Failed to load course lessons. Please try again."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            onClick={() => router.push("/my-courses")}
                            variant="outline"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to My Courses
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const lessons = lessonsData?.lessons || [];
    const currentLesson = lessonData?.lesson;
    const videoId = currentLesson?.videoUrl
        ? getYouTubeVideoId(currentLesson.videoUrl)
        : null;

    // Calculate progress
    const totalLessons = lessons.length;
    const completedLessons = 0; // This should come from enrollment progress
    const progressPercentage =
        totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        onClick={() => router.push("/my-courses")}
                        className="mb-4 hover:bg-[var(--color-accent)]"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to My Courses
                    </Button>

                    <div className="flex items-start gap-4">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold mb-2">
                                {lessonsData?.course.title}
                            </h1>
                            <p className="text-gray-600 mb-4">
                                {lessonsData?.course.description}
                            </p>

                            {/* Progress Bar */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600 font-medium">
                                        Course Progress
                                    </span>
                                    <span className="font-bold text-[var(--color-primary)]">
                                        {progressPercentage.toFixed(0)}%
                                    </span>
                                </div>
                                <Progress
                                    value={progressPercentage}
                                    className="h-2"
                                />
                                <p className="text-xs text-gray-500">
                                    {completedLessons} of {totalLessons} lessons
                                    completed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Video and Content - Main Panel */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Video Player */}
                        <Card>
                            <CardContent className="p-0">
                                {lessonLoading ? (
                                    <Skeleton className="w-full h-[500px] rounded-t-lg" />
                                ) : videoId ? (
                                    <div className="relative w-full pt-[56.25%] bg-black rounded-t-lg overflow-hidden">
                                        <iframe
                                            className="absolute top-0 left-0 w-full h-full"
                                            src={`https://www.youtube.com/embed/${videoId}`}
                                            title={currentLesson?.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                                        <div className="text-center">
                                            <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                            <p className="text-gray-500">
                                                No video available for this
                                                lesson
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Lesson Title Bar */}
                                <div className="p-6 border-t">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-bold mb-2">
                                                {currentLesson?.title ||
                                                    "Select a lesson"}
                                            </h2>
                                            {currentLesson?.description && (
                                                <p className="text-gray-600">
                                                    {currentLesson.description}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {currentLesson?.duration && (
                                                <Badge
                                                    variant="outline"
                                                    className="border-[var(--color-primary)] text-[var(--color-primary)]"
                                                >
                                                    <Clock className="h-3 w-3 mr-1" />
                                                    {currentLesson.duration} min
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Lesson Content Tabs */}
                        {currentLesson && (
                            <Card>
                                <Tabs
                                    defaultValue="overview"
                                    className="w-full"
                                >
                                    <CardHeader className="pb-3">
                                        <TabsList className="grid w-full grid-cols-3">
                                            <TabsTrigger value="overview">
                                                Overview
                                            </TabsTrigger>
                                            <TabsTrigger value="resources">
                                                Resources
                                            </TabsTrigger>
                                            <TabsTrigger value="notes">
                                                Notes
                                            </TabsTrigger>
                                        </TabsList>
                                    </CardHeader>

                                    <CardContent>
                                        {/* Overview Tab */}
                                        <TabsContent
                                            value="overview"
                                            className="space-y-6"
                                        >
                                            {/* Learning Objectives */}
                                            {currentLesson.learningObjectives
                                                ?.length > 0 && (
                                                <div>
                                                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                                        <CheckCircle2 className="h-5 w-5 text-[var(--color-primary)]" />
                                                        Learning Objectives
                                                    </h3>
                                                    <ul className="space-y-2">
                                                        {currentLesson.learningObjectives.map(
                                                            (
                                                                objective,
                                                                idx
                                                            ) => (
                                                                <li
                                                                    key={idx}
                                                                    className="flex items-start gap-2"
                                                                >
                                                                    <ChevronRight className="h-4 w-4 text-[var(--color-primary)] mt-1 flex-shrink-0" />
                                                                    <span>
                                                                        {
                                                                            objective
                                                                        }
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}

                                            <Separator />

                                            {/* Lesson Content */}
                                            <div>
                                                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                                    <FileText className="h-5 w-5 text-[var(--color-primary)]" />
                                                    Lesson Content
                                                </h3>
                                                <div className="prose max-w-none whitespace-pre-wrap">
                                                    {currentLesson.content}
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            {currentLesson.tags?.length > 0 && (
                                                <>
                                                    <Separator />
                                                    <div>
                                                        <h3 className="font-semibold text-sm mb-2 text-gray-600">
                                                            Tags
                                                        </h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            {currentLesson.tags.map(
                                                                (tag, idx) => (
                                                                    <Badge
                                                                        key={
                                                                            idx
                                                                        }
                                                                        variant="secondary"
                                                                        className="bg-[var(--color-accent)] hover:bg-[var(--color-primary)] hover:text-white"
                                                                    >
                                                                        {tag}
                                                                    </Badge>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </TabsContent>

                                        {/* Resources Tab */}
                                        <TabsContent value="resources">
                                            {currentLesson.resources?.length >
                                            0 ? (
                                                <div className="space-y-3">
                                                    {currentLesson.resources.map(
                                                        (resource, idx) => (
                                                            <Card
                                                                key={idx}
                                                                className="hover:shadow-md transition-shadow"
                                                            >
                                                                <CardContent className="p-4">
                                                                    <div className="flex items-center justify-between">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="p-2 bg-[var(--color-accent)] rounded-lg">
                                                                                <FileText className="h-5 w-5 text-[var(--color-primary)]" />
                                                                            </div>
                                                                            <div>
                                                                                <h4 className="font-semibold">
                                                                                    {
                                                                                        resource.title
                                                                                    }
                                                                                </h4>
                                                                                <p className="text-sm text-gray-500 capitalize">
                                                                                    {
                                                                                        resource.type
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <Button
                                                                            size="sm"
                                                                            variant="outline"
                                                                            onClick={() =>
                                                                                window.open(
                                                                                    resource.url,
                                                                                    "_blank"
                                                                                )
                                                                            }
                                                                            className="border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-accent)]"
                                                                        >
                                                                            <Download className="h-4 w-4 mr-2" />
                                                                            Download
                                                                        </Button>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        )
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="text-center py-12 text-gray-500">
                                                    <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                                    <p>
                                                        No resources available
                                                        for this lesson
                                                    </p>
                                                </div>
                                            )}
                                        </TabsContent>

                                        {/* Notes Tab */}
                                        <TabsContent value="notes">
                                            <div className="text-center py-12 text-gray-500">
                                                <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                                <p>
                                                    Notes feature coming soon!
                                                </p>
                                            </div>
                                        </TabsContent>
                                    </CardContent>
                                </Tabs>
                            </Card>
                        )}
                    </div>

                    {/* Lessons Sidebar */}
                    <Card className="lg:col-span-1 h-fit">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-[var(--color-primary)]" />
                                Course Lessons
                            </CardTitle>
                            <CardDescription>
                                {lessonsData?.counts.published || 0} lessons
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[700px]">
                                <div className="space-y-2 p-4">
                                    {lessons.map((lesson, index) => {
                                        const isSelected =
                                            selectedLessonId === lesson._id;
                                        const isCompleted = false; // This should come from enrollment progress

                                        return (
                                            <button
                                                key={lesson._id}
                                                onClick={() =>
                                                    handleLessonSelect(
                                                        lesson._id
                                                    )
                                                }
                                                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                                    isSelected
                                                        ? "border-[var(--color-primary)] bg-[var(--color-accent)] shadow-md"
                                                        : "border-gray-200 hover:border-[var(--color-accent)] hover:bg-gray-50"
                                                }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    {/* Status Icon */}
                                                    <div className="flex-shrink-0 mt-1">
                                                        {isCompleted ? (
                                                            <CheckCircle2 className="h-5 w-5 text-[var(--color-primary)]" />
                                                        ) : (
                                                            <Circle className="h-5 w-5 text-gray-400" />
                                                        )}
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-2 mb-1">
                                                            <span className="text-xs font-semibold text-gray-500">
                                                                Lesson{" "}
                                                                {lesson.order}
                                                            </span>
                                                            {lesson.videoUrl && (
                                                                <PlayCircle className="h-4 w-4 text-[var(--color-primary)]" />
                                                            )}
                                                        </div>
                                                        <h4
                                                            className={`font-semibold text-sm mb-1 line-clamp-2 ${
                                                                isSelected
                                                                    ? "text-[var(--color-primary)]"
                                                                    : "text-gray-900"
                                                            }`}
                                                        >
                                                            {lesson.title}
                                                        </h4>
                                                        {lesson.duration >
                                                            0 && (
                                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                                <Clock className="h-3 w-3" />
                                                                <span>
                                                                    {
                                                                        lesson.duration
                                                                    }{" "}
                                                                    min
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}

                                    {lessons.length === 0 && (
                                        <div className="text-center py-12 text-gray-500">
                                            <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                            <p>No lessons available</p>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
