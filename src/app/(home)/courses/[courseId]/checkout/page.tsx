"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Link, Phone } from "lucide-react";

const fetchCourse = async (courseId: string) => {
  const res = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch course data");
  const data = await res.json();
  return data.course;
};

export default function CheckoutPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  const { data: course, isLoading, error } = useQuery({
    queryKey: ["checkoutCourse", courseId],
    queryFn: () => fetchCourse(courseId as string),
    enabled: !!courseId,
  });

  if (status === "loading" || isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load course data!
      </div>
    );

  const handleProceed = () => {
    router.push(`/courses/${courseId}/checkout/payment`);
  };

  return (
    <div className="min-h-screen  py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white  shadow-lg overflow-hidden border">
        {/* Header */}
        <div className="border-b py-4 px-6">
          <div>
           <h1 className="text-2xl font-semibold text-gray-800">My Cart</h1>
         </div>
          
          {/* Progress Bar */}
          <div className="flex items-center justify-center mt-4 space-x-8">
            <div className="flex items-center space-x-2 text-green-600 font-medium">
              <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">
                ✓
              </div>
              <span>Order Confirmation</span>
            </div>

            <div className="w-12 h-[2px] bg-green-500"></div>

            <div className="flex items-center space-x-2 text-gray-400 font-medium">
              <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center text-sm">
                2
              </div>
              <span>Payment</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Left Section */}
          <div className="border rounded-xl p-6 bg-gray-50">
            <h2 className="text-lg font-semibold mb-4">
              Order ID: <span className="text-gray-700">TMS49502045</span>
            </h2>

            <div className="flex items-center space-x-4">
              <Image
                src={course.thumbnail}
                alt={course.title}
                width={100}
                height={100}
                className="rounded-lg border object-cover"
              />
              <div>
                <p className="text-gray-800 font-semibold">{course.title}</p>
                <p className="text-gray-500 text-sm mt-1">
                  {course.instructor?.name || "Instructor"}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t pt-4 space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Course Price</span>
                <span>৳ {course.price}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-3">
                <span>Total (incl. VAT)</span>
                <span className="text-green-600">৳ {course.price}</span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="border rounded-xl p-6 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Choose Your Payment Method
            </h2>

            <div className="space-y-4">
              <label className="flex items-center justify-between border rounded-lg p-4 cursor-pointer hover:bg-pink-50 transition">
                <div className="flex items-center space-x-3">
                  <input type="radio" name="payment" defaultChecked />
                  <span>bKash</span>
                </div>
                <Image
                  src="/bKash-Logo.png"
                  alt="bKash"
                  width={80}
                  height={30}
                  className="object-contain"
                />
              </label>

              <label className="flex items-center justify-between border rounded-lg p-4 cursor-pointer hover:bg-orange-50 transition">
                <div className="flex items-center space-x-3">
                  <input type="radio" name="payment" />
                  <span>Nagad</span>
                </div>
                <Image
                  src="/NagadLogo.png"
                  alt="Nagad"
                  width={80}
                  height={30}
                  className="object-contain"
                />
              </label>
            </div>

            <div className="mt-6 bg-white border rounded-lg p-4 text-sm text-gray-600">
              <p className="flex items-center  space-x-2">
                 <Phone /> Need help? Call our support at{" "}
                <span className="font-bold text-green-600">16910</span>
              </p>
            </div>

            <div className="flex items-start space-x-2 mt-4 text-sm text-gray-600">
              <input type="checkbox" defaultChecked className="mt-1" />
              <p>
                I agree to the{" "}
                <span className="text-blue-600 underline">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-blue-600 underline">Privacy Policy</span>.
              </p>
            </div>

            <button
              onClick={handleProceed}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Pay ৳ {course.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
