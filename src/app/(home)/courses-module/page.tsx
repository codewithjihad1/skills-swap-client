import Image from "next/image";

import React from "react";
export default function page() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-96">
                {/* Course Image */}
                <div className="mb-4">
                    <Image
                        src="https://via.placeholder.com/350x150"
                        alt="Course"
                        className="rounded-md w-full"
                    />
                </div>

                {/* Course Info */}
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold mb-2">React Basics Course</h2>
                    <p className="text-gray-600">
                        Congratulations! Your payment was successful.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Continue Course
                    </button>
                    <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
                        Course Outline
                    </button>
                </div>
            </div>
        </div>
    );
}
