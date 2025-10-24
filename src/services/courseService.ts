// services/courseService.ts
import axiosInstance from "@/axios/axiosInstance";
import { CourseFilters, CoursesResponse } from "@/types/course";

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

    const response = await axiosInstance.get(
        `/api/courses?${params.toString()}`
    );

    if (!response.status || response.status !== 200) {
        throw new Error("Failed to fetch courses");
    }

    return response.data;
};

export const getCourseById = async (id: string) => {
    const response = await axiosInstance.get(`/api/courses/${id}`);

    if (!response.status || response.status !== 200) {
        throw new Error("Failed to fetch course");
    }

    return response.data;
};
