import React from "react";
import Link from "next/link";
import { Course } from "@/types/course";
import { Star, Clock, Users } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link href={`/courses/${course._id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer h-full flex flex-col">
        {/* Course Thumbnail */}
        <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-xl font-semibold">
              {course.title.substring(0, 2).toUpperCase()}
            </div>
          )}
          {/* Level Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                course.level === "beginner"
                  ? "bg-green-500 text-white"
                  : course.level === "intermediate"
                  ? "bg-yellow-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
            </span>
          </div>
        </div>

        {/* Course Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Category */}
          <div className="text-sm text-blue-600 font-medium mb-2">
            {course.category}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
            {course.description}
          </p>

          {/* Instructor */}
          <div className="text-sm text-gray-700 mb-3">
            <span className="font-medium">By:</span>{" "}
            {course.instructor?.name || "Anonymous"}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-semibold">
                {course.rating?.average?.toFixed(1) || "0.0"}
              </span>
              <span>({course.rating?.count || 0})</span>
            </div>

            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration || 0}h</span>
            </div>

            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{course.enrollmentCount || 0}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between border-t pt-4">
            <div className="text-2xl font-bold text-gray-900">
              {course.price === 0 ? (
                <span className="text-green-600">Free</span>
              ) : (
                <span>${course.price}</span>
              )}
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
