"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { XCircle, RotateCcw, Home, Loader2 } from "lucide-react";
import Link from "next/link";

function PaymentFailureContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const paymentID = searchParams.get("paymentID");

    const handleRetry = () => {
        // Clear session storage
        sessionStorage.removeItem("currentOrderId");
        sessionStorage.removeItem("currentPaymentID");

        // Go back to previous page
        router.back();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                {/* Error Icon */}
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle className="w-12 h-12 text-red-600" />
                </div>

                {/* Error Message */}
                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                    Payment Failed
                </h1>
                <p className="text-gray-600 mb-6">
                    Unfortunately, your payment could not be processed. Please
                    try again or contact support if the problem persists.
                </p>

                {/* Payment ID if available */}
                {paymentID && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                        <p className="text-sm text-gray-600">
                            Payment Reference:
                        </p>
                        <p className="font-mono text-sm text-gray-800 break-all">
                            {paymentID}
                        </p>
                    </div>
                )}

                {/* Common Reasons */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 text-left">
                    <h3 className="font-semibold text-orange-900 mb-2">
                        Common Reasons:
                    </h3>
                    <ul className="space-y-1 text-sm text-orange-800">
                        <li>• Insufficient balance</li>
                        <li>• Incorrect PIN or OTP</li>
                        <li>• Transaction timeout</li>
                        <li>• Network connectivity issues</li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={handleRetry}
                        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Try Again
                    </button>

                    <Link
                        href="/courses"
                        className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-lg transition"
                    >
                        <Home className="w-5 h-5" />
                        Browse Courses
                    </Link>
                </div>

                {/* Support Link */}
                <div className="mt-6 text-sm text-gray-600">
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
    );
}

export default function PaymentFailurePage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-green-600" />
                </div>
            }
        >
            <PaymentFailureContent />
        </Suspense>
    );
}
