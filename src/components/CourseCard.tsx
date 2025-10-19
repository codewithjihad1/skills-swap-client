import Image from "next/image";
import Link from "next/link";
import { Course } from "@/types/course";
import {  Users } from "lucide-react";

interface CourseCardProps {
    course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
    const getLevelColor = (level: string) => {
        switch (level) {
            case "beginner":
                return "bg-green-100 text-green-800";
            case "intermediate":
                return "bg-yellow-100 text-yellow-800";
            case "advanced":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:border-primary border-[1px] transition-shadow duration-300 flex flex-col h-full">
            {/* Thumbnail */}
            <div className="relative h-36 w-full bg-gray-200">
                <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-5 -left-7 -rotate-45">
                    <span
                        className={`px-8 py-1 text-xs font-semibold ${getLevelColor(
                            course.level
                        )}`}
                    >
                        {course.level.charAt(0).toUpperCase() +
                            course.level.slice(1)}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors transition-duration-300">
                    <Link href={`/courses/${course._id}`}>{course.title}</Link>
                </h3>

                {/* Instructor */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                            <Image
                                src={course.instructor.avatar}
                                alt={course.instructor.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="text-sm text-gray-700">
                            {course.instructor.name}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{course.enrollmentCount}</span>
                    </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                    <div className="text-2xl font-bold text-primary">
                        {/* {course.currency === "USD" ? "$" : course.currency} */} 
                        ৳ {" "}
                        {course.price.toFixed(2)}
                    </div>
                    <Link
                        href={`/courses/${course._id}`}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary hover:shadow transition-colors text-sm font-medium"
                    >
                        View Course
                    </Link>
                </div>
            </div>
        </div>
    );
}
