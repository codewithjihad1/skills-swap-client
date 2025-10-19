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
import {
    Eye,
    EyeOff,
    User,
    Mail,
    Lock,
    Loader2,
    Github,
    CheckCircle2,
    UserCircle,
    GraduationCap,
} from "lucide-react";
import SocialLogin from "../components/SocialLogin";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState<"user" | "instructor">("user");
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

            const result = await registerUser({ name, email, password, role });

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
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-accent/20 via-white to-primary/10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 relative z-10">
                {/* Left Side - Welcome Section */}
                <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-primary to-secondary rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl">
                    {/* Decorative Elements */}
                    <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

                    <div className="relative z-10">
                        {/* Logo/Icon */}
                        <div className="mb-8">
                            <svg
                                className="w-16 h-16 text-accent"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        </div>

                        <h1 className="text-4xl font-bold mb-4 leading-tight">
                            Join the
                            <br />
                            <span className="text-accent">
                                Skills Swap
                            </span>{" "}
                            Community
                        </h1>
                        <p className="text-lg text-white/90 mb-8">
                            Connect with learners and instructors. Share your
                            knowledge and grow your skills.
                        </p>

                        {/* Features List */}
                        <div className="space-y-4">
                            {[
                                "Create and share courses",
                                "Learn from expert instructors",
                                "Build your professional network",
                                "Track your learning progress",
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 text-white/90"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side - Sign Up Form */}
                <div className="flex items-center justify-center">
                    <Card className="w-full max-w-md border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                        <CardHeader className="space-y-1 pb-4">
                            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
                                Create Account
                            </CardTitle>
                            <CardDescription className="text-base text-gray-600 dark:text-gray-400">
                                Join our skill-swapping community today
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            {/* Success Message */}
                            {success && (
                                <div className="mb-4 rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-green-800 dark:text-green-300 font-medium">
                                            {success}
                                        </p>
                                    </div>
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

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Role Selection */}
                                <div className="space-y-3">
                                    <Label className="text-gray-700 dark:text-gray-300 font-medium">
                                        I want to join as
                                    </Label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setRole("user")}
                                            disabled={isLoading}
                                            className={`relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                                                role === "user"
                                                    ? "border-primary bg-primary/5 shadow-md"
                                                    : "border-gray-200 dark:border-slate-700 hover:border-primary/50"
                                            }`}
                                        >
                                            <UserCircle
                                                className={`w-8 h-8 ${
                                                    role === "user"
                                                        ? "text-primary"
                                                        : "text-gray-400"
                                                }`}
                                            />
                                            <div className="text-center">
                                                <div
                                                    className={`font-semibold ${
                                                        role === "user"
                                                            ? "text-primary"
                                                            : "text-gray-700 dark:text-gray-300"
                                                    }`}
                                                >
                                                    Student
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    Learn new skills
                                                </div>
                                            </div>
                                            {role === "user" && (
                                                <CheckCircle2 className="absolute top-2 right-2 w-5 h-5 text-primary" />
                                            )}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setRole("instructor")
                                            }
                                            disabled={isLoading}
                                            className={`relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                                                role === "instructor"
                                                    ? "border-primary bg-primary/5 shadow-md"
                                                    : "border-gray-200 dark:border-slate-700 hover:border-primary/50"
                                            }`}
                                        >
                                            <GraduationCap
                                                className={`w-8 h-8 ${
                                                    role === "instructor"
                                                        ? "text-primary"
                                                        : "text-gray-400"
                                                }`}
                                            />
                                            <div className="text-center">
                                                <div
                                                    className={`font-semibold ${
                                                        role === "instructor"
                                                            ? "text-primary"
                                                            : "text-gray-700 dark:text-gray-300"
                                                    }`}
                                                >
                                                    Instructor
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    Teach & share
                                                </div>
                                            </div>
                                            {role === "instructor" && (
                                                <CheckCircle2 className="absolute top-2 right-2 w-5 h-5 text-primary" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Name Field */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="name"
                                        className="text-gray-700 dark:text-gray-300 flex items-center gap-2"
                                    >
                                        <User className="w-4 h-4 text-primary" />
                                        Full Name
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        disabled={isLoading}
                                        required
                                        className="h-11 bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 focus:border-primary focus:ring-primary"
                                    />
                                </div>

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
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
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
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            disabled={isLoading}
                                            required
                                            minLength={6}
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
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Must be at least 6 characters
                                    </p>
                                </div>

                                {/* Confirm Password Field */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="confirmPassword"
                                        className="text-gray-700 dark:text-gray-300 flex items-center gap-2"
                                    >
                                        <Lock className="w-4 h-4 text-primary" />
                                        Confirm Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="••••••••"
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                            disabled={isLoading}
                                            required
                                            className="h-11 pr-10 bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 focus:border-primary focus:ring-primary"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
                                            disabled={isLoading}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
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
                                            Creating account...
                                        </>
                                    ) : (
                                        "Create Account"
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

                            {/* Sign In Link */}
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Already have an account?{" "}
                                    <Link
                                        href="/auth/signin"
                                        className="font-semibold text-primary hover:text-secondary transition-colors"
                                    >
                                        Sign in
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

export default RegisterPage;
