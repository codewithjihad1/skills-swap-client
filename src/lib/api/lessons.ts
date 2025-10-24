import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/axios/axiosInstance";

// Types
export interface Resource {
    title: string;
    url: string;
    type: "pdf" | "document" | "image" | "code" | "other";
}

export interface Instructor {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
}

export interface LessonCourse {
    _id: string;
    title: string;
    description: string;
    category?: string;
    level?: string;
}

export interface Lesson {
    _id: string;
    title: string;
    description?: string;
    content: string;
    videoUrl?: string;
    duration: number;
    order: number;
    course: string | LessonCourse;
    instructor: string | Instructor;
    isPublished: boolean;
    resources: Resource[];
    prerequisites: string[] | Lesson[];
    learningObjectives: string[];
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export interface LessonsResponse {
    success: boolean;
    course: {
        _id: string;
        title: string;
        description: string;
    };
    lessons: Lesson[];
    counts: {
        total: number;
        published: number;
        draft: number;
    };
}

export interface LessonResponse {
    success: boolean;
    lesson: Lesson;
}

// API Functions
export const getCourseLessons = async (
    courseId: string,
    publishedOnly: boolean = true,
    includeContent: boolean = false
): Promise<LessonsResponse> => {
    const { data } = await axiosInstance.get(
        `/api/lessons/course/${courseId}`
    );
    return data;
};

export const getLesson = async (lessonId: string): Promise<LessonResponse> => {
    const { data } = await axiosInstance.get(`/api/lessons/${lessonId}`);
    return data;
};

// React Query Hooks
export const useCourseLessons = (
    courseId: string | undefined,
    publishedOnly: boolean = true,
    includeContent: boolean = false
) => {
    return useQuery({
        queryKey: ["course-lessons", courseId, publishedOnly, includeContent],
        queryFn: () =>
            getCourseLessons(courseId!, publishedOnly, includeContent),
        enabled: !!courseId,
        staleTime: 60000, // 1 minute
    });
};

export const useLesson = (lessonId: string | undefined) => {
    return useQuery({
        queryKey: ["lesson", lessonId],
        queryFn: () => getLesson(lessonId!),
        enabled: !!lessonId,
        staleTime: 300000, // 5 minutes
    });
};
