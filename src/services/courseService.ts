import axios from "axios";
import { Course, CourseFilters, GetCoursesResponse } from "@/types/course";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getCourses = async (
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
};

export const getCourseById = async (id: string): Promise<Course> => {
  const response = await axios.get(`${API_BASE_URL}/api/courses/${id}`);
  return response.data.course;
};
