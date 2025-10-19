"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    Loader2,
    Github,
    CheckCircle2,
} from "lucide-react";
import AccountStatus from "@/components/auth/AccountStatus";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import SocialLogin from "../components/SocialLogin";

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/20 via-white to-primary/10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 py-12 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 relative z-10">
                {/* Left Side - Welcome Section */}
                <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-primary to-secondary rounded-3xl shadow-2xl text-white relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10">
                        <div className="inline-block p-3 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                            <svg
                                className="w-12 h-12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        </div>
                        <h1 className="text-5xl font-bold mb-4 leading-tight">
                            Welcome Back to
                            <br />
                            <span className="text-accent">Skills Swap</span>
                        </h1>
                        <p className="text-white/90 text-lg mb-8 leading-relaxed">
                            Continue your journey of learning and teaching.
                            Connect with thousands of learners and share your
                            expertise.
                        </p>

                        {/* Features List */}
                        <div className="space-y-4">
                            {[
                                "Access unlimited courses",
                                "Connect with expert instructors",
                                "Track your learning progress",
                                "Join a thriving community",
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 text-white/90"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                                    <span className="text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side - Sign In Form */}
                <div className="flex items-center justify-center">
                    <Card className="w-full max-w-md border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                        <CardHeader className="space-y-1 pb-4">
                            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
                                Sign In
                            </CardTitle>
                            <CardDescription className="text-base">
                                Enter your credentials to access your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* Account Status */}
                            {formData.email && (
                                <div className="mb-4">
                                    <AccountStatus email={formData.email} />
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 mt-0.5">
                                            <svg
                                                className="h-5 w-5 text-red-600 dark:text-red-400"
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
                                        <p className="text-sm text-red-800 dark:text-red-300 font-medium">
                                            {error}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <form className="space-y-5" onSubmit={handleSubmit}>
                                {/* Email Field */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="email"
                                        className="text-gray-700 dark:text-gray-300 flex items-center gap-2"
                                    >
                                        <Mail className="w-4 h-4 text-primary" />
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        required
                                        className="h-11 bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 focus:border-primary focus:ring-primary"
                                    />
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="password"
                                        className="text-gray-700 dark:text-gray-300 flex items-center gap-2"
                                    >
                                        <Lock className="w-4 h-4 text-primary" />
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            name="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            disabled={isLoading}
                                            required
                                            className="h-11 pr-10 bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 focus:border-primary focus:ring-primary"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
                                            disabled={isLoading}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <input
                                            id="rememberMe"
                                            name="rememberMe"
                                            type="checkbox"
                                            checked={formData.rememberMe}
                                            onChange={handleInputChange}
                                            disabled={isLoading}
                                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary focus:ring-offset-0"
                                        />
                                        <Label
                                            htmlFor="rememberMe"
                                            className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
                                        >
                                            Remember me
                                        </Label>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleForgotPassword}
                                        className="text-sm font-medium text-primary hover:text-secondary transition-colors"
                                        disabled={isLoading}
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                                    size="lg"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        "Sign In"
                                    )}
                                </Button>
                            </form>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200 dark:border-slate-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white dark:bg-slate-900/80 text-gray-500 dark:text-gray-400">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            {/* Social Login Buttons */}
                            <SocialLogin isLoading={isLoading} />

                            {/* Sign Up Link */}
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Don't have an account?{" "}
                                    <Link
                                        href="/auth/signup"
                                        className="font-semibold text-primary hover:text-secondary transition-colors"
                                    >
                                        Sign up for free
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
