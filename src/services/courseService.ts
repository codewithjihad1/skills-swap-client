// services/courseService.ts
import { CourseFilters, CoursesResponse } from "@/types/course";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCourses = async (
    filters: CourseFilters = {}
): Promise<CoursesResponse> => {
    const { page, limit, category, level, search, sortBy, order } = filters;

    const params = new URLSearchParams();
    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());
    if (category) params.append("category", category);
    if (level) params.append("level", level);
    if (search) params.append("search", search);
    if (sortBy) params.append("sortBy", sortBy);
    if (order) params.append("order", order);

    const response = await fetch(`/api/courses?${params.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch courses");
    }

    return response.json();
};

export const getCourseById = async (id: string) => {
    const response = await fetch(`/api/courses/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch course");
    }

    return response.json();
};
