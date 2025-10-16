import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface Course {
    _id: string;
    title: string;
    description: string;
    instructor: { _id: string; name: string; email: string };
    category: string;
    level: "beginner" | "intermediate" | "advanced";
    price: number;
    duration: number;
    published: boolean;
    tags: string[];
    learningOutcomes: string[];
    prerequisites: string[];
    syllabus: { module: string; lessons: string[] }[];
    rating: { average: number; count: number };
    enrollmentCount: number;
    thumbnail?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CourseFilters {
    page?: number;
    limit?: number;
    category?: string;
    level?: "beginner" | "intermediate" | "advanced";
    search?: string;
    instructor?: string;
    published?: boolean;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: "createdAt" | "title" | "price" | "rating.average";
    order?: "asc" | "desc";
}

export interface GetCoursesResponse {
    success: boolean;
    courses: Course[];
    totalCourses: number;
    totalPages: number;
    currentPage: number;
}

export interface GetCourseResponse {
    success: boolean;
    course: Course;
}

export interface CreateCourseResponse {
    success: boolean;
    course: Course;
    message: string;
}

export interface UpdateCourseResponse {
    success: boolean;
    course: Course;
    message: string;
}

export interface DeleteCourseResponse {
    success: boolean;
    message: string;
}

export const courseService = {
    getAllCourses: async (
        filters: CourseFilters = {}
    ): Promise<GetCoursesResponse> => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== "") {
                params.append(key, value.toString());
            }
        });
        const response = await axios.get(
            `${API_BASE_URL}/api/courses?${params.toString()}`
        );
        return response.data;
    },
    getCourseById: async (id: string): Promise<GetCourseResponse> => {
        const response = await axios.get(`${API_BASE_URL}/api/courses/${id}`);
        return response.data;
    },
    getInstructorCourses: async (
        instructorId: string,
        filters: CourseFilters = {}
    ): Promise<GetCoursesResponse> => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== "") {
                params.append(key, value.toString());
            }
        });
        const response = await axios.get(
            `${API_BASE_URL}/api/courses/instructor/${instructorId}?${params.toString()}`
        );
        return response.data;
    },
    createCourse: async (
        courseData: Partial<Course>
    ): Promise<CreateCourseResponse> => {
        const response = await axios.post(
            `${API_BASE_URL}/api/courses`,
            courseData
        );
        return response.data;
    },
    updateCourse: async (
        id: string,
        courseData: Partial<Course>
    ): Promise<UpdateCourseResponse> => {
        const response = await axios.put(
            `${API_BASE_URL}/api/courses/${id}`,
            courseData
        );
        return response.data;
    },
    togglePublish: async (id: string): Promise<UpdateCourseResponse> => {
        const response = await axios.patch(
            `${API_BASE_URL}/api/courses/${id}/publish`
        );
        return response.data;
    },
    deleteCourse: async (id: string): Promise<DeleteCourseResponse> => {
        const response = await axios.delete(
            `${API_BASE_URL}/api/courses/${id}`
        );
        return response.data;
    },
};

export default courseService;
