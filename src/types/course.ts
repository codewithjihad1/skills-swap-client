// types/course.ts
export interface Instructor {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Rating {
  average: number;
  count: number;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: Instructor;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  thumbnail: string;
  price: number;
  currency: string;
  tags: string[];
  published: boolean;
  enrollmentCount: number;
  rating: Rating;
  language: string;
  createdAt: string;
  lastUpdated: string;
}

export interface CourseFilters {
  page?: number;
  limit?: number;
  category?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  search?: string;
  sortBy?: 'createdAt' | 'title' | 'price' | 'rating.average';
  order?: 'asc' | 'desc';
}

export interface CoursesResponse {
  success: boolean;
  count: number;
  totalCourses: number;
  currentPage: number;
  totalPages: number;
  courses: Course[];
}

// services/courseService.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCourses = async (filters: CourseFilters = {}): Promise<CoursesResponse> => {
  const { page, limit, category, level, search, sortBy, order } = filters;

  const params = new URLSearchParams();
  if (page) params.append('page', page.toString());
  if (limit) params.append('limit', limit.toString());
  if (category) params.append('category', category);
  if (level) params.append('level', level);
  if (search) params.append('search', search);
  if (sortBy) params.append('sortBy', sortBy);
  if (order) params.append('order', order);

  const response = await fetch(`${API_BASE_URL}/api/courses?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }

  return response.json();
};
