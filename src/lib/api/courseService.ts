import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Create axios instance
const courseAPI = axios.create({
    baseURL: `${API_BASE_URL}/api/courses`,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add auth token to requests (implement when auth is ready)
courseAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export interface Course {
    _id: string;
    title: string;
    description: string;
    instructor: {
        _id: string;
        name: string;
        email: string;
        avatar?: string;
        bio?: string;
    };
    category: string;
    level: "beginner" | "intermediate" | "advanced";
    duration: number;
    thumbnail?: string;
    price: number;
    currency: string;
    tags: string[];
    syllabus?: Array<{
        week: number;
        title: string;
        topics: string[];
        duration: number;
    }>;
    prerequisites?: string[];
    learningOutcomes?: string[];
    published: boolean;
    publishedAt?: string;
    enrollmentCount: number;
    rating: {
        average: number;
        count: number;
    };
    language: string;
    createdAt: string;
    lastUpdated: string;
}

export interface CourseFilters {
    page?: number;
    limit?: number;
    category?: string;
    level?: string;
    search?: string;
    sortBy?: string;
    order?: "asc" | "desc";
}

export interface CoursesResponse {
    success: boolean;
    count: number;
    totalCourses: number;
    currentPage: number;
    totalPages: number;
    courses: Course[];
}

export interface SingleCourseResponse {
    success: boolean;
    course: Course;
}

export interface CourseResponse {
    success: boolean;
    message: string;
    course: Course;
}

export const courseService = {
    // Get all courses with filters
    getAllCourses: async (
        filters: CourseFilters = {}
    ): Promise<CoursesResponse> => {
        const response = await courseAPI.get("/", { params: filters });
        return response.data;
    },

    // Get single course
    getCourseById: async (courseId: string): Promise<SingleCourseResponse> => {
        const response = await courseAPI.get(`/${courseId}`);
        return response.data;
    },

    // Get courses by instructor
    getInstructorCourses: async (
        instructorId: string,
        includeUnpublished = false
    ): Promise<CoursesResponse> => {
        const response = await courseAPI.get(`/instructor/${instructorId}`, {
            params: { includeUnpublished },
        });
        return response.data;
    },

    // Create new course
    createCourse: async (
        courseData: Partial<Course>
    ): Promise<CourseResponse> => {
        const response = await courseAPI.post("/", courseData);
        return response.data;
    },

    // Update course
    updateCourse: async (
        courseId: string,
        updates: Partial<Course>
    ): Promise<CourseResponse> => {
        const response = await courseAPI.put(`/${courseId}`, updates);
        return response.data;
    },

    // Publish/unpublish course
    togglePublish: async (
        courseId: string,
        publishStatus: boolean
    ): Promise<CourseResponse> => {
        const response = await courseAPI.patch(`/${courseId}/publish`, {
            published: publishStatus,
        });
        return response.data;
    },

    // Delete course
    deleteCourse: async (
        courseId: string
    ): Promise<{ success: boolean; message: string }> => {
        const response = await courseAPI.delete(`/${courseId}`);
        return response.data;
    },
};
