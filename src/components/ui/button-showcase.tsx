"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
    Download,
    Heart,
    Star,
    Send,
    Plus,
    Settings,
    User,
    ShoppingCart,
    Play,
    Pause,
} from "lucide-react";

const ButtonShowcase = () => {
    return (
        <div className="p-8 space-y-8 bg-gray-50 dark:bg-slate-900 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Reusable Button Components
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Professional button components with gradient effects,
                    perfect for both light and dark themes.
                </p>

                {/* Primary Buttons */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Primary Buttons
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        <Button variant="default" size="sm">
                            Small Button
                        </Button>
                        <Button variant="default" size="default">
                            Default Button
                        </Button>
                        <Button variant="default" size="lg">
                            Large Button
                        </Button>
                        <Button variant="default" size="xl">
                            Extra Large Button
                        </Button>
                    </div>
                </section>

                {/* Gradient Buttons */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Gradient Buttons (Like Your Image)
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        <Button variant="gradient" size="sm">
                            Start Matching Demo
                        </Button>
                        <Button variant="gradient" size="default">
                            <Play className="w-4 h-4" />
                            Start Matching Demo
                        </Button>
                        <Button variant="gradient" size="lg">
                            <Star className="w-5 h-5" />
                            Start Matching Demo
                        </Button>
                        <Button variant="gradient" size="xl">
                            <Send className="w-6 h-6" />
                            Start Matching Demo
                        </Button>
                    </div>
                </section>

                {/* Button Variants */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Button Variants
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        <Button variant="outline">
                            <User className="w-4 h-4" />
                            Outline
                        </Button>
                        <Button variant="secondary">
                            <Settings className="w-4 h-4" />
                            Secondary
                        </Button>
                        <Button variant="destructive">Delete Account</Button>
                        <Button variant="ghost">Ghost Button</Button>
                        <Button variant="link">Link Button</Button>
                        <Button variant="success">
                            <Heart className="w-4 h-4" />
                            Success
                        </Button>
                        <Button variant="warning">Warning</Button>
                    </div>
                </section>

                {/* Icon Buttons */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Icon Buttons
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        <Button variant="default" size="icon-sm">
                            <Plus className="w-3 h-3" />
                        </Button>
                        <Button variant="gradient" size="icon">
                            <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon-lg">
                            <ShoppingCart className="w-5 h-5" />
                        </Button>
                        <Button variant="secondary" size="icon">
                            <Settings className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="icon">
                            <Heart className="w-4 h-4" />
                        </Button>
                    </div>
                </section>

                {/* Disabled States */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Disabled States
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        <Button variant="default" disabled>
                            Disabled Default
                        </Button>
                        <Button variant="gradient" disabled>
                            <Play className="w-4 h-4" />
                            Disabled Gradient
                        </Button>
                        <Button variant="outline" disabled>
                            Disabled Outline
                        </Button>
                        <Button variant="secondary" disabled>
                            Disabled Secondary
                        </Button>
                    </div>
                </section>

                {/* Interactive Examples */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Interactive Examples
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="card-professional p-6">
                            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
                                Call to Action
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Ready to start your skill exchange journey?
                            </p>
                            <Button
                                variant="gradient"
                                size="lg"
                                className="w-full"
                            >
                                <Star className="w-5 h-5" />
                                Start Matching Demo
                            </Button>
                        </div>

                        <div className="card-professional p-6">
                            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
                                Actions
                            </h3>
                            <div className="flex gap-3">
                                <Button variant="outline" className="flex-1">
                                    <User className="w-4 h-4" />
                                    Profile
                                </Button>
                                <Button variant="default" className="flex-1">
                                    <Send className="w-4 h-4" />
                                    Connect
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Loading States */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        With Loading States (Example)
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        <Button variant="gradient" disabled>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Processing...
                        </Button>
                        <Button variant="default" disabled>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Saving...
                        </Button>
                    </div>
                </section>

                {/* Usage Code Examples */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Usage Examples
                    </h2>
                    <div className="card-professional p-6 bg-gray-900 dark:bg-slate-800">
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                            {`// Basic Usage
<Button variant="gradient" size="lg">
  <Star className="w-5 h-5" />
  Start Matching Demo
</Button>

// With different variants
<Button variant="default">Primary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="gradient">Gradient Button</Button>

// Icon buttons
<Button variant="gradient" size="icon">
  <Download className="w-4 h-4" />
</Button>

// Disabled state
<Button variant="gradient" disabled>
  Disabled Button
</Button>`}
                        </pre>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ButtonShowcase;
