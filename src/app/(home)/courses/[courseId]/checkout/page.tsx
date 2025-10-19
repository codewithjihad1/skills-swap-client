"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Phone, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

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
    const [selectedPayment, setSelectedPayment] = useState<"bkash" | "nagad">(
        "bkash"
    );
    const [isProcessing, setIsProcessing] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        }
    }, [status, router]);

    const {
        data: course,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["checkoutCourse", courseId],
        queryFn: () => fetchCourse(courseId as string),
        enabled: !!courseId,
    });

    const handlePayment = async () => {
        if (!agreedToTerms) {
            toast.error(
                "Please agree to the Terms of Service and Privacy Policy"
            );
            return;
        }

        if (!session?.user) {
            toast.error("Please sign in to continue");
            router.push("/auth/signin");
            return;
        }

        setIsProcessing(true);

        try {
            // Initiate payment
            const response = await fetch(
                "http://localhost:5000/api/payments/initiate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId:
                            (session.user as any)._id ||
                            (session.user as any).id,
                        userEmail: session.user.email,
                        courseId: courseId,
                        courseName: course.title,
                        amount: course.price,
                        paymentMethod: selectedPayment,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Failed to initiate payment");
            }

            // For bKash, redirect to bKash payment URL
            if (selectedPayment === "bkash" && data.data.bkashURL) {
                toast.success("Redirecting to bKash...");
                // Store order ID in session storage for later use
                sessionStorage.setItem("currentOrderId", data.data.orderId);
                sessionStorage.setItem("currentPaymentID", data.data.paymentID);

                // Redirect to bKash payment page
                window.location.href = data.data.bkashURL;
            } else if (selectedPayment === "nagad") {
                toast.info("Nagad payment coming soon!");
                setIsProcessing(false);
            }
        } catch (error: any) {
            console.error("Payment error:", error);
            toast.error(error.message || "Failed to process payment");
            setIsProcessing(false);
        }
    };

    if (status === "loading" || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                Failed to load course data!
            </div>
        );
    }

    return (
        <div className="min-h-screen py-10 px-4">
            <div className="max-w-6xl mx-auto bg-white shadow-lg overflow-hidden border rounded-xl">
                {/* Header */}
                <div className="border-b py-4 px-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">
                            My Cart
                        </h1>
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
                            Order Summary
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
                                <p className="text-gray-800 font-semibold">
                                    {course.title}
                                </p>
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
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">
                                    VAT (0%)
                                </span>
                                <span className="text-sm">৳ 0</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-3">
                                <span>Total Amount</span>
                                <span className="text-green-600">
                                    ৳ {course.price}
                                </span>
                            </div>
                        </div>

                        {/* Security Badge */}
                        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2 text-green-700">
                                <CheckCircle2 className="w-5 h-5" />
                                <p className="text-sm font-medium">
                                    Secure Payment
                                </p>
                            </div>
                            <p className="text-xs text-green-600 mt-1">
                                Your payment information is encrypted and secure
                            </p>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="border rounded-xl p-6 bg-gray-50">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6">
                            Choose Your Payment Method
                        </h2>

                        <div className="space-y-4">
                            <label
                                className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition ${
                                    selectedPayment === "bkash"
                                        ? "bg-pink-50 border-pink-500 border-2"
                                        : "hover:bg-pink-50"
                                }`}
                                onClick={() => setSelectedPayment("bkash")}
                            >
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={selectedPayment === "bkash"}
                                        onChange={() =>
                                            setSelectedPayment("bkash")
                                        }
                                        className="w-4 h-4 text-pink-600"
                                    />
                                    <span className="font-medium">bKash</span>
                                </div>
                                <Image
                                    src="/bKash-Logo.png"
                                    alt="bKash"
                                    width={80}
                                    height={30}
                                    className="object-contain"
                                />
                            </label>

                            <label
                                className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition opacity-50 ${
                                    selectedPayment === "nagad"
                                        ? "bg-orange-50 border-orange-500 border-2"
                                        : "hover:bg-orange-50"
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={selectedPayment === "nagad"}
                                        onChange={() =>
                                            setSelectedPayment("nagad")
                                        }
                                        disabled
                                        className="w-4 h-4"
                                    />
                                    <div>
                                        <span className="font-medium">
                                            Nagad
                                        </span>
                                        <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">
                                            Coming Soon
                                        </span>
                                    </div>
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
                            <p className="flex items-center space-x-2">
                                <Phone className="w-4 h-4" />
                                <span>
                                    Need help? Call our support at{" "}
                                    <span className="font-bold text-green-600">
                                        16910
                                    </span>
                                </span>
                            </p>
                        </div>

                        <div className="flex items-start space-x-2 mt-4 text-sm text-gray-600">
                            <input
                                type="checkbox"
                                checked={agreedToTerms}
                                onChange={(e) =>
                                    setAgreedToTerms(e.target.checked)
                                }
                                className="mt-1"
                                id="terms"
                            />
                            <label htmlFor="terms" className="cursor-pointer">
                                I agree to the{" "}
                                <span className="text-blue-600 underline">
                                    Terms of Service
                                </span>{" "}
                                and{" "}
                                <span className="text-blue-600 underline">
                                    Privacy Policy
                                </span>
                                .
                            </label>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={isProcessing || !agreedToTerms}
                            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>Pay ৳ {course.price}</>
                            )}
                        </button>

                        <p className="text-xs text-center text-gray-500 mt-4">
                            By completing this purchase, you agree to our terms
                            and conditions
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
