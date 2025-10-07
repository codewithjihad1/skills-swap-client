"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const ResetPasswordForm = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const tokenParam = searchParams.get("token");
        if (tokenParam) {
            setToken(tokenParam);
        } else {
            setError("Invalid or missing reset token");
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setMessage("");

        try {
            // Validation
            if (!password || !confirmPassword) {
                throw new Error("All fields are required");
            }

            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }

            if (password.length < 6) {
                throw new Error("Password must be at least 6 characters long");
            }

            if (!token) {
                throw new Error("Invalid reset token");
            }

            // Send reset password request
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to reset password");
            }

            setMessage(
                "Password has been reset successfully! Redirecting to sign in..."
            );

            // Redirect to sign in after success
            setTimeout(() => {
                router.push("/auth/signin");
            }, 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    if (!token && !error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-[#0f172a] dark:to-[#1e293b] text-gray-900 dark:text-white transition-colors duration-300">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-[#0f172a] dark:to-[#1e293b] text-gray-900 dark:text-white px-4 transition-colors duration-300">
            <div className="w-full max-w-md">
                <div className="bg-white/90 dark:bg-[#0b1120]/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 transition-colors duration-300">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                            Reset Password
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Enter your new password below
                        </p>
                    </div>

                    {/* Success Message */}
                    {message && (
                        <div className="mb-4 rounded-md bg-green-100 dark:bg-green-900/20 p-3 border border-green-300 dark:border-green-700">
                            <div className="flex items-center">
                                <svg
                                    className="h-5 w-5 text-green-400 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="text-green-700 dark:text-green-300 text-sm">
                                    {message}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 rounded-md bg-red-100 dark:bg-red-900/20 p-3 border border-red-300 dark:border-red-700">
                            <div className="flex items-center">
                                <svg
                                    className="h-5 w-5 text-red-400 mr-2"
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
                                <span className="text-red-700 dark:text-red-300 text-sm">
                                    {error}
                                </span>
                            </div>
                        </div>
                    )}

                    {token && !message && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* New Password */}
                            <div className="relative">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    New Password
                                </label>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter new password (min. 6 characters)"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-[#1e293b] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 dark:border-gray-700 transition-all pr-12"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    disabled={isLoading}
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-9 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                                    disabled={isLoading}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Confirm New Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Confirm new password"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-[#1e293b] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 dark:border-gray-700 transition-all pr-12"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    disabled={isLoading}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="absolute right-3 top-9 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                                    disabled={isLoading}
                                >
                                    {showConfirmPassword ? "Hide" : "Show"}
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Resetting...
                                    </>
                                ) : (
                                    "Reset Password"
                                )}
                            </button>
                        </form>
                    )}

                    {/* Back to Sign In */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Remember your password?{" "}
                            <Link
                                href="/auth/signin"
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors font-medium"
                            >
                                Back to Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ResetPasswordPage = () => {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-[#0f172a] dark:to-[#1e293b] text-gray-900 dark:text-white transition-colors duration-300">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
                </div>
            }
        >
            <ResetPasswordForm />
        </Suspense>
    );
};

export default ResetPasswordPage;
