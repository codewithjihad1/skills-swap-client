"use client";

import React, { useState } from "react";

interface FAQItem {
    id: number;
    question: string;
    answer: string;
    category: "general" | "learning" | "technical" | "billing";
}

const faqData: FAQItem[] = [
    {
        id: 1,
        category: "general",
        question: "What is Skill Swap?",
        answer: "Skill Swap is a comprehensive learning platform that connects learners with expert mentors. We offer a wide range of courses in technology, design, business, and more. Our community-driven approach ensures personalized learning experiences and real-world skill development.",
    },
    {
        id: 2,
        category: "learning",
        question: "How do I get started with learning?",
        answer: "Getting started is easy! Simply browse our course catalog, choose a skill you want to learn, and enroll. You can start with our free courses or subscribe to access premium content. Each course includes hands-on projects, mentor support, and a learning community.",
    },
    {
        id: 3,
        category: "learning",
        question: "Can I learn at my own pace?",
        answer: "Absolutely! All our courses are self-paced, allowing you to learn when it fits your schedule. You have lifetime access to course materials, and you can pause and resume your learning journey anytime. Our flexible approach accommodates busy professionals and students alike.",
    },
    {
        id: 4,
        category: "technical",
        question: "What devices can I use to access courses?",
        answer: "Our platform is fully responsive and works on all devices - desktop, laptop, tablet, and mobile. You can switch between devices seamlessly, and your progress is automatically synced across all platforms. We also offer offline viewing for mobile apps.",
    },
    {
        id: 5,
        category: "general",
        question: "Do I get a certificate upon completion?",
        answer: "Yes! Upon successful completion of any course, you receive a verified certificate that you can share on LinkedIn, add to your resume, or showcase in your portfolio. Our certificates are recognized by industry professionals and employers.",
    },
    {
        id: 6,
        category: "billing",
        question: "What are the pricing options?",
        answer: "We offer flexible pricing with free courses, individual course purchases, and monthly/annual subscriptions. Our premium subscription gives you access to all courses, exclusive content, and priority mentor support. We also offer student discounts and team plans for organizations.",
    },
    {
        id: 7,
        category: "learning",
        question: "How does mentorship work?",
        answer: "Our mentorship program connects you with industry experts who provide personalized guidance, code reviews, and career advice. Mentors are available through live sessions, messaging, and project feedback. Premium subscribers get priority access to mentors.",
    },
    {
        id: 8,
        category: "technical",
        question: "Is there a mobile app available?",
        answer: "Yes! Our mobile apps for iOS and Android offer the complete learning experience with offline download capabilities, progress tracking, and push notifications for new content and mentor messages. Download from the App Store or Google Play.",
    },
    {
        id: 9,
        category: "billing",
        question: "Can I cancel my subscription anytime?",
        answer: "Absolutely! You can cancel your subscription at any time with no cancellation fees. You'll continue to have access to your subscription benefits until the end of your current billing period. We also offer a 30-day money-back guarantee for new subscribers.",
    },
    {
        id: 10,
        category: "general",
        question: "How do I become a mentor or instructor?",
        answer: "We're always looking for skilled professionals to join our mentor community! Apply through our instructor portal by showcasing your expertise, teaching experience, and passion for helping others. Our team reviews applications and provides onboarding support for accepted mentors.",
    },
];

const categories = {
    general: {
        name: "General",
        icon: "🌟",
        color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    },
    learning: {
        name: "Learning",
        icon: "📚",
        color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    },
    technical: {
        name: "Technical",
        icon: "⚙️",
        color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    },
    billing: {
        name: "Billing",
        icon: "💳",
        color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    },
};

const FAQ = () => {
    const [openItems, setOpenItems] = useState<number[]>([1]); // First item open by default
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState("");

    const toggleItem = (id: number) => {
        setOpenItems((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const filteredFAQs = faqData.filter((faq) => {
        const matchesCategory =
            selectedCategory === "all" || faq.category === selectedCategory;
        const matchesSearch =
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                        <svg
                            className="w-8 h-8 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Got questions? We've got answers! Find everything you
                        need to know about Skill Swap, from getting started to
                        advanced features.
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="max-w-4xl mx-auto mb-12">
                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search FAQs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3">
                        <button
                            onClick={() => setSelectedCategory("all")}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                selectedCategory === "all"
                                    ? "bg-primary text-white shadow-lg transform scale-105"
                                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md"
                            }`}
                        >
                            🌈 All Topics
                        </button>
                        {Object.entries(categories).map(([key, category]) => (
                            <button
                                key={key}
                                onClick={() => setSelectedCategory(key)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                    selectedCategory === key
                                        ? "bg-primary text-white shadow-lg transform scale-105"
                                        : `${category.color} hover:scale-105 shadow-md`
                                }`}
                            >
                                {category.icon} {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQ Items */}
                <div className="max-w-4xl mx-auto">
                    {filteredFAQs.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-12 h-12 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.58-6.322 1.582C3.492 17.294 3.017 19.026 3 21h18c-.017-1.974-.492-3.706-2.678-4.418A7.962 7.962 0 0112 15z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                No FAQs found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Try adjusting your search or filter criteria.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredFAQs.map((faq, index) => (
                                <div
                                    key={faq.id}
                                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                    }}
                                >
                                    <button
                                        onClick={() => toggleItem(faq.id)}
                                        className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    categories[faq.category]
                                                        .color
                                                }`}
                                            >
                                                {categories[faq.category].icon}{" "}
                                                {categories[faq.category].name}
                                            </span>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 pr-4">
                                                {faq.question}
                                            </h3>
                                        </div>
                                        <div
                                            className={`flex-shrink-0 transform transition-transform duration-200 ${
                                                openItems.includes(faq.id)
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        >
                                            <svg
                                                className="w-5 h-5 text-gray-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </div>
                                    </button>

                                    <div
                                        className={`transition-all duration-300 ease-in-out ${
                                            openItems.includes(faq.id)
                                                ? "max-h-96 opacity-100"
                                                : "max-h-0 opacity-0"
                                        } overflow-hidden`}
                                    >
                                        <div className="px-6 pb-5">
                                            <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* CTA Section */}
                <div className="text-center mt-12">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-gray-200 dark:border-gray-700">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-8 h-8 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Still have questions?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Can't find the answer you're looking for? Our
                            support team is here to help you 24/7.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                                Contact Support
                            </button>
                            <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                Browse Help Center
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
