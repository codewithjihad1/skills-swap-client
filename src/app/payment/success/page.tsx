"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Download, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import axiosInstance from "@/axios/axiosInstance";

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isVerifying, setIsVerifying] = useState(true);
    const [paymentData, setPaymentData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const verifyPayment = async () => {
            const paymentID = searchParams.get("paymentID");
            const orderId = sessionStorage.getItem("currentOrderId");

            if (!paymentID || !orderId) {
                setError("Invalid payment information");
                setIsVerifying(false);
                return;
            }

            try {
                // Complete the payment
                const response = await axiosInstance.post(
                    "/api/payments/complete",
                    {
                        paymentID,
                        orderId,
                    }
                );

                const data = await response.data;
                if (response.status !== 200 || !data.success) {
                    throw new Error(
                        data.message || "Payment verification failed"
                    );
                }

                setPaymentData(data.data);
                toast.success("Payment completed successfully!");

                // Clear session storage
                sessionStorage.removeItem("currentOrderId");
                sessionStorage.removeItem("currentPaymentID");
            } catch (error: any) {
                console.error("Payment verification error:", error);
                setError(error.message || "Failed to verify payment");
                toast.error(error.message || "Payment verification failed");
            } finally {
                setIsVerifying(false);
            }
        };

        verifyPayment();
    }, [searchParams]);

    if (isVerifying) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
                <Loader2 className="w-16 h-16 animate-spin text-green-600 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800">
                    Verifying Payment...
                </h2>
                <p className="text-gray-600 mt-2">
                    Please wait while we confirm your payment
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="text-4xl text-red-600">✕</div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Payment Verification Failed
                    </h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link
                        href="/courses"
                        className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
                    >
                        Browse Courses
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4 py-10">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Success Header */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-white text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                        Payment Successful!
                    </h1>
                    <p className="text-green-100">
                        Your payment has been processed successfully
                    </p>
                </div>

                {/* Payment Details */}
                <div className="p-8">
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Payment Details
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Order ID:</span>
                                <span className="font-semibold text-gray-800">
                                    {paymentData?.orderId}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Transaction ID:
                                </span>
                                <span className="font-semibold text-gray-800">
                                    {paymentData?.trxID}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Payment ID:
                                </span>
                                <span className="font-mono text-sm text-gray-800">
                                    {paymentData?.paymentID}
                                </span>
                            </div>
                            <div className="flex justify-between border-t pt-3 mt-3">
                                <span className="text-gray-600">
                                    Amount Paid:
                                </span>
                                <span className="font-bold text-green-600 text-xl">
                                    ৳ {paymentData?.amount}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* What's Next */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                        <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                            <ArrowRight className="w-5 h-5" />
                            What's Next?
                        </h3>
                        <ul className="space-y-2 text-blue-800 text-sm">
                            <li>✓ You now have full access to the course</li>
                            <li>
                                ✓ Start learning immediately from your dashboard
                            </li>
                            <li>✓ Download course materials and resources</li>
                            <li>
                                ✓ Join the community and connect with others
                            </li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link
                            href="/dashboard"
                            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
                        >
                            Go to Dashboard
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button
                            onClick={() => window.print()}
                            className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-lg transition"
                        >
                            <Download className="w-4 h-4" />
                            Download Receipt
                        </button>
                    </div>

                    {/* Support */}
                    <div className="mt-6 text-center text-sm text-gray-600">
                        <p>
                            Need help?{" "}
                            <Link
                                href="/contact"
                                className="text-green-600 hover:underline font-medium"
                            >
                                Contact Support
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
                    <Loader2 className="w-16 h-16 animate-spin text-green-600 mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Loading...
                    </h2>
                </div>
            }
        >
            <PaymentSuccessContent />
        </Suspense>
    );
}
