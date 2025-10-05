"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import AccountStatus from "@/components/auth/AccountStatus";

// Define TypeScript interface for login form data
interface LoginForm {
    email: string;
    password: string;
    rememberMe: boolean;
}

// Main LoginPage component
const LoginPage: React.FC = () => {
    // Initialize the Next.js router
    const router = useRouter();

    // State for login form data
    const [formData, setFormData] = useState<LoginForm>({
        email: "",
        password: "",
        rememberMe: false,
    });

    // State for showing/hiding password
    const [showPassword, setShowPassword] = useState(false);

    // State for loading status
    const [isLoading, setIsLoading] = useState(false);

    // State for error messages
    const [error, setError] = useState("");

    // Handle input changes in the login form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        // Update form state based on input type
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

        // Clear any previous errors when user starts typing
        if (error) setError("");
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            // Validation
            if (!formData.email || !formData.password) {
                throw new Error("Please fill in all fields");
            }

            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                throw new Error("Please enter a valid email address");
            }

            // Attempt to sign in using NextAuth
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                throw new Error(result.error);
            }

            if (result?.ok) {
                // Get session to check user data
                // const session = await getSession();

                // Redirect to dashboard or home page
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            // Set error message for display
            setError(
                err instanceof Error
                    ? err.message
                    : "An error occurred during login"
            );
        } finally {
            // Reset loading state
            setIsLoading(false);
        }
    };

    // Handle "Forgot Password" click
    const handleForgotPassword = () => {
        // Navigate to the forgot password page
        router.push("/auth/forgot-password");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-[#0f172a] dark:to-[#1e293b] text-gray-900 dark:text-white px-4 transition-colors duration-300">
            <div className="grid md:grid-cols-2 w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden bg-white/90 dark:bg-[#0b1120]/80 backdrop-blur-lg transition-colors duration-300">
                {/* Left Side - Welcome Message */}
                <div className="hidden md:flex flex-col items-center justify-center bg-transparent p-10">
                    <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        Welcome back!
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                        Sign in to your account and continue your skill-swapping
                        journey with us.
                    </p>
                    <div className="mt-8 w-24 h-1 bg-blue-500 dark:bg-blue-600 rounded-full"></div>
                </div>

                {/* Right Side (Form) */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Sign in to your account
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Welcome back! Please enter your details.
                    </p>

                    {/* Account Status - Show lockout info if available */}
                    {formData.email && (
                        <div className="mt-4">
                            <AccountStatus email={formData.email} />
                        </div>
                    )}

                    {/* Error Message Display */}
                    {error && (
                        <div className="mt-4 rounded-md bg-red-100 dark:bg-red-900/20 p-3 border border-red-300 dark:border-red-700">
                            <div className="flex items-center">
                                <svg
                                    className="h-5 w-5 text-red-400 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="text-red-300 text-sm">
                                    {error}
                                </span>
                            </div>
                        </div>
                    )}

                    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-[#1e293b] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 dark:border-gray-700 transition-all"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={isLoading}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-[#1e293b] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 dark:border-gray-700 transition-all pr-12"
                                value={formData.password}
                                onChange={handleInputChange}
                                disabled={isLoading}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-9 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                                disabled={isLoading}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
                            <div className="flex items-center space-x-2">
                                <input
                                    id="rememberMe"
                                    name="rememberMe"
                                    type="checkbox"
                                    className="accent-blue-500"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                                <label
                                    htmlFor="rememberMe"
                                    className="text-gray-400"
                                >
                                    Remember me
                                </label>
                            </div>
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                                disabled={isLoading}
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit */}
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
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
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
                    <div className="mt-6 space-y-3">
                        {/* Google Login */}
                        <button
                            type="button"
                            onClick={() =>
                                signIn("google", { callbackUrl: "/dashboard" })
                            }
                            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-white text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-100 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
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
                        </button>

                        {/* GitHub Login */}
                        <button
                            type="button"
                            onClick={() =>
                                signIn("github", { callbackUrl: "/dashboard" })
                            }
                            className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account?{" "}
                            <Link
                                href="/auth/signup"
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors font-medium"
                            >
                                Sign up for free
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Export the component
export default LoginPage;
