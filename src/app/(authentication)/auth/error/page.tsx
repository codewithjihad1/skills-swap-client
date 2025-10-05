"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const AuthErrorContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const error = searchParams.get("error");

    const getErrorMessage = (error: string | null) => {
        switch (error) {
            case "CredentialsSignin":
                return "Invalid credentials. Please check your email and password.";
            case "EmailSignin":
                return "Email sign-in failed. Please try again.";
            case "OAuthSignin":
                return "OAuth sign-in failed. Please try again.";
            case "OAuthCallback":
                return "OAuth callback error. Please try again.";
            case "OAuthCreateAccount":
                return "Could not create OAuth account. Please try again.";
            case "EmailCreateAccount":
                return "Could not create email account. Please try again.";
            case "Callback":
                return "Callback error. Please try again.";
            case "OAuthAccountNotLinked":
                return "Email already exists with a different provider. Please sign in with the original method.";
            case "SessionRequired":
                return "Please sign in to access this page.";
            default:
                return "An authentication error occurred. Please try again.";
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-[#0f172a] dark:to-[#1e293b] text-gray-900 dark:text-white px-4 transition-colors duration-300">
            <div className="w-full max-w-md">
                <div className="bg-white/90 dark:bg-[#0b1120]/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 text-center transition-colors duration-300">
                    {/* Error Icon */}
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-6">
                        <svg
                            className="h-8 w-8 text-red-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>

                    {/* Header */}
                    <h1 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                        Authentication Error
                    </h1>

                    {/* Error Message */}
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        {getErrorMessage(error)}
                    </p>

                    {/* Actions */}
                    <div className="space-y-4">
                        <Link
                            href="/auth/signin"
                            className="block w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 font-semibold text-center"
                        >
                            Try Sign In Again
                        </Link>

                        <Link
                            href="/auth/signup"
                            className="block w-full bg-gray-600 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-700 transition rounded-lg py-3 font-semibold text-center text-white"
                        >
                            Create New Account
                        </Link>

                        <button
                            onClick={() => router.back()}
                            className="block w-full text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition py-2"
                        >
                            ← Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AuthErrorPage = () => {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-[#0f172a] dark:to-[#1e293b] text-gray-900 dark:text-white transition-colors duration-300">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
                </div>
            }
        >
            <AuthErrorContent />
        </Suspense>
    );
};

export default AuthErrorPage;
