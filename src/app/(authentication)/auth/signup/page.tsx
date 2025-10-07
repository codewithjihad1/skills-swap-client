"use client";

import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { registerUser } from "@/app/actions/auth/registerUser";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Handle signup form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            // Validation
            if (!name || !email || !password || !confirmPassword) {
                throw new Error("All fields are required");
            }

            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }

            if (password.length < 6) {
                throw new Error("Password must be at least 6 characters long");
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error("Please enter a valid email address");
            }

            const result = await registerUser({ name, email, password });

            if (!result.success) {
                throw new Error(result.error || "Registration failed");
            }

            setSuccess(
                "Registration successful! You can now sign in to your account."
            );

            // Clear form
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            // Redirect to signin after a delay
            setTimeout(() => {
                router.push("/auth/signin");
            }, 2000);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Registration failed"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-[#0f172a] dark:to-[#1e293b] px-4 transition-colors duration-300">
            <Card className="w-full max-w-md shadow-2xl rounded-2xl bg-white/90 dark:bg-[#0b1120]/90 backdrop-blur-lg border-gray-200 dark:border-gray-700 transition-colors duration-300">
                {/* Header */}
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                        Create your account
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                        Join our skill-swapping community today
                    </CardDescription>
                </CardHeader>

                {/* Form */}
                <CardContent>
                    {/* Success Message */}
                    {success && (
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
                                    {success}
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

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        {/* Name */}
                        <div className="grid gap-2">
                            <Label
                                htmlFor="name"
                                className="text-gray-700 dark:text-gray-300"
                            >
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isLoading}
                                className="bg-gray-100 dark:bg-[#1e293b] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="grid gap-2">
                            <Label
                                htmlFor="email"
                                className="text-gray-700 dark:text-gray-300"
                            >
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                className="bg-gray-100 dark:bg-[#1e293b] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="grid gap-2 relative">
                            <Label
                                htmlFor="password"
                                className="text-gray-700 dark:text-gray-300"
                            >
                                Password
                            </Label>
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password (min. 6 characters)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                className="bg-gray-100 dark:bg-[#1e293b] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 pr-12 transition-colors"
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-8 text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="grid gap-2 relative">
                            <Label
                                htmlFor="confirmPassword"
                                className="text-gray-700 dark:text-gray-300"
                            >
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Re-enter your password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                disabled={isLoading}
                                className="bg-gray-100 dark:bg-[#1e293b] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 pr-12 transition-colors"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-8 text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                disabled={isLoading}
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
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
                                    Creating account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                    </form>

                    {/* Social Login Divider */}
                    <div className="mt-6 flex items-center">
                        <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
                        <span className="px-4 text-gray-600 dark:text-gray-400 text-sm">
                            Or continue with
                        </span>
                        <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="mt-4 space-y-3">
                        {/* Google Login */}
                        <Button
                            type="button"
                            onClick={() =>
                                signIn("google", { callbackUrl: "/dashboard" })
                            }
                            className="w-full flex items-center justify-center bg-white dark:bg-white text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-100 border border-gray-300 dark:border-gray-600"
                            disabled={isLoading}
                            variant="outline"
                        >
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </Button>

                        {/* GitHub Login */}
                        <Button
                            type="button"
                            onClick={() =>
                                signIn("github", { callbackUrl: "/dashboard" })
                            }
                            className="w-full flex items-center justify-center bg-gray-900 dark:bg-gray-900 text-white hover:bg-gray-800 dark:hover:bg-gray-800"
                            disabled={isLoading}
                        >
                            <svg
                                className="w-5 h-5 mr-3"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            Continue with GitHub
                        </Button>
                    </div>

                    {/* Already have account */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
                        Already have an account?{" "}
                        <Link
                            href="/auth/signin"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors font-medium"
                        >
                            Sign in
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default RegisterPage;
