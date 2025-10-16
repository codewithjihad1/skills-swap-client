// Course Types
export interface Course {
    _id: string;
    title: string;
    description: string;
    instructor: {
        _id: string;
        name: string;
        email: string;
    };
    category: string;
    level: "beginner" | "intermediate" | "advanced";
    price: number;
    duration: number; // in hours
    published: boolean;
    tags: string[];
    learningOutcomes: string[];
    prerequisites: string[];
    syllabus: {
        module: string;
        lessons: string[];
    }[];
    rating: {
        average: number;
        count: number;
    };
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
