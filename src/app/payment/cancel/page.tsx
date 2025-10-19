"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Ban, ArrowLeft, Home, Loader2 } from "lucide-react";
import Link from "next/link";

function PaymentCancelContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const paymentID = searchParams.get("paymentID");

    const handleBack = () => {
        // Clear session storage
        sessionStorage.removeItem("currentOrderId");
        sessionStorage.removeItem("currentPaymentID");

        // Go back to previous page
        router.back();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                {/* Cancel Icon */}
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Ban className="w-12 h-12 text-yellow-600" />
                </div>

                {/* Cancel Message */}
                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                    Payment Cancelled
                </h1>
                <p className="text-gray-600 mb-6">
                    You have cancelled the payment process. No charges were made
                    to your account.
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

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                    <h3 className="font-semibold text-blue-900 mb-2">
                        What happens now?
                    </h3>
                    <ul className="space-y-1 text-sm text-blue-800">
                        <li>• No payment was processed</li>
                        <li>• Your cart items are still saved</li>
                        <li>• You can complete payment anytime</li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={handleBack}
                        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Return to Checkout
                    </button>

                    <Link
                        href="/courses"
                        className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-lg transition"
                    >
                        <Home className="w-5 h-5" />
                        Browse More Courses
                    </Link>
                </div>

                {/* Support Link */}
                <div className="mt-6 text-sm text-gray-600">
                    <p>
                        Have questions?{" "}
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

export default function PaymentCancelPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-green-600" />
                </div>
            }
        >
            <PaymentCancelContent />
        </Suspense>
    );
}
