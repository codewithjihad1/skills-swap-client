"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";


const fetchCourse = async (courseId: string) => {
  const res = await fetch(`http://localhost:5000/api/courses/${courseId}`);
  if (!res.ok) throw new Error("Failed to fetch course data");
  const data = await res.json();
  return data.course;
};

export default function CheckoutPage() {
  const { courseId } = useParams();

  const { data: course, isLoading, error } = useQuery({
    queryKey: ["checkoutCourse", courseId],
    queryFn: () => fetchCourse(courseId!),
    enabled: !!courseId,
  });

  if (isLoading)
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (error)
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error loading course!</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Left Image */}
          <div className="md:w-1/2 relative">
            <Image
              src={course.thumbnail}
              alt={course.title}
              width={400}
              height={250}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
              <p className="text-gray-600 mb-4">Instructor: {course.instructor?.name || "N/A"}</p>
              <p className="text-gray-600 mb-2">Duration: {course.duration || "N/A"}</p>
              <p className="text-gray-600 mb-2">Level: {course.level || "N/A"}</p>
              <p className="text-3xl font-bold text-blue-600 my-4">${course.price}</p>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition">
                Proceed to Payment
              </button>
              <Link
                href={`/courses/${courseId}`}
                className="w-full text-center border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-100 transition"
              >
                Back to Course
              </Link>
            </div>
          </div>
        </div>

        {/* Optional Footer */}
        <div className="p-6 bg-gray-50 text-gray-500 text-sm text-center">
          By enrolling, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
        </div>
      </div>
    </div>
  );
}
