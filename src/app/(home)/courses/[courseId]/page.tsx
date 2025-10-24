// src/app/(home)/courses/[courseId]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, 
  Clock, 
  Users, 
  BookOpen, 
  CheckCircle, 
  ArrowLeft,
  PlayCircle,
  Download,
  Share2,
  Heart,
  Calendar,
  Globe,
  Award,
  BarChart3,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  AlertCircle,
  Home,
  List,
  User,
  Info,
  Menu,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axiosInstance from "@/axios/axiosInstance";

// Types based on your API
interface Instructor {
  _id: string;
  email: string;
  name: string;
  avatar: string;
}

interface Rating {
  average: number;
  count: number;
}

interface SyllabusItem {
  _id: string;
  title: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: Instructor;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  thumbnail: string;
  price: number;
  currency: string;
  tags: string[];
  syllabus: SyllabusItem[];
  prerequisites: string[];
  learningOutcomes: string[];
  published: boolean;
  enrollmentCount: number;
  rating: Rating;
  language: string;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  publishedAt: string;
}


const fetchCourse = async (courseId: string): Promise<Course> => {
  const res = await axiosInstance.get(`/api/courses/${courseId}`);
  if (res.status !== 200) throw new Error("Failed to fetch course data");
  return res.data.course;
};

// StatRow Component
function StatRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2 sm:gap-3 text-gray-600">
        <div className="text-emerald-600 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-xs sm:text-sm">{label}</span>
      </div>
      <span className="font-semibold text-gray-900 text-xs sm:text-sm">{value}</span>
    </div>
  );
}

// Accordion Item Component
function AccordionItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border border-gray-200 rounded-lg mb-3 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 sm:p-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 text-left text-sm sm:text-base">{question}</span>
        {isOpen ? <ChevronUp size={20} className="flex-shrink-0 ml-2" /> : <ChevronDown size={20} className="flex-shrink-0 ml-2" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-3 sm:p-4 bg-gray-50 border-t border-gray-200">
              <p className="text-gray-700 text-sm sm:text-base">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Loading Skeleton
function CourseDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <div className="h-3 sm:h-4 bg-gray-200 rounded w-12 sm:w-16"></div>
        <div className="h-3 sm:h-4 bg-gray-200 rounded w-3 sm:w-4"></div>
        <div className="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24"></div>
        <div className="h-3 sm:h-4 bg-gray-200 rounded w-3 sm:w-4"></div>
        <div className="h-3 sm:h-4 bg-gray-200 rounded w-24 sm:w-32"></div>
      </div>

      {/* Header Skeleton */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="h-8 sm:h-12 bg-gray-200 rounded w-3/4 mx-auto mb-3 sm:mb-4"></div>
        <div className="h-4 sm:h-6 bg-gray-200 rounded w-full sm:w-1/2 mx-auto"></div>
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left Sidebar Skeleton - Hidden on mobile */}
        <div className="hidden lg:block lg:col-span-2">
          <div className="h-80 sm:h-96 bg-gray-200 rounded-xl"></div>
        </div>

        {/* Center Content Skeleton */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          <div className="aspect-video bg-gray-200 rounded-xl"></div>
          <div className="h-48 sm:h-64 bg-gray-200 rounded-xl"></div>
        </div>

        {/* Right Sidebar Skeleton */}
        <div className="lg:col-span-3">
          <div className="h-80 sm:h-96 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}

// Mobile Navigation Drawer
function MobileNavDrawer({ 
  isOpen, 
  onClose, 
  activeNav, 
  setActiveNav, 
  setActiveTab 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  activeNav: string; 
  setActiveNav: (nav: string) => void;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-white z-50 shadow-xl lg:hidden overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Navigation</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>
              
              <nav className="space-y-2">
                {[
                  { id: "overview", label: "Overview", icon: BookOpen },
                  { id: "curriculum", label: "Curriculum", icon: List },
                  { id: "instructor", label: "Instructor", icon: User },
                  { id: "requirements", label: "Requirements", icon: CheckCircle },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveNav(item.id);
                      setActiveTab(item.id);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                      activeNav === item.id
                        ? "bg-emerald-600 text-white font-semibold"
                        : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                    }`}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
              
              <button className="w-full mt-6 border-2 border-emerald-600 text-emerald-600 py-3 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                <Info size={18} />
                Course Details
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function CoursePage() {
  const { courseId } = useParams() as { courseId: string };
  const [activeTab, setActiveTab] = useState("overview");
  const [activeNav, setActiveNav] = useState("overview");
  const [isSaved, setIsSaved] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const { data: course, isLoading, error } = useQuery<Course, Error>({
    queryKey: ["course", courseId],
    queryFn: () => fetchCourse(courseId),
    enabled: !!courseId,
  });

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatLevel = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  // FAQ Data
  const faqs = [
    {
      question: "How long do I have access to the course?",
      answer: "You get lifetime access to this course, including all future updates and additional content."
    },
    {
      question: "Can I download the course materials?",
      answer: "Yes, all course materials including videos, PDFs, and source code are available for download."
    },
    {
      question: "Do I get a certificate after completion?",
      answer: "Yes, you'll receive a certificate of completion that you can share on LinkedIn and other platforms."
    },
    {
      question: "What if I'm not satisfied with the course?",
      answer: "We offer a 30-day money-back guarantee if you're not satisfied with the course content."
    }
  ];

  if (isLoading) return <CourseDetailsSkeleton />;

  if (error || !course) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg max-w-md w-full"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">Course Not Found</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6">We couldn't find the course you're looking for.</p>
        <Link href="/courses">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors text-sm sm:text-base"
          >
            Browse All Courses
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer 
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        setActiveTab={setActiveTab}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Mobile Menu Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsMobileNavOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Menu size={20} />
            <span className="font-semibold">Menu</span>
          </button>
        </div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
          data-aos="fade-up"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Award size={14} className="sm:w-4 sm:h-4" />
            <span>{course.category}</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 leading-tight px-2">
            {course.title}
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            {course.description}
          </p>
        </motion.div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-6 mb-8 sm:mb-12">
          {/* Left Sidebar - Navigation (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block lg:col-span-3"
            data-aos="fade-right"
          >
            <div className="bg-white rounded-xl shadow-md p-4 xl:p-6 sticky top-24">
              <nav className="space-y-2">
                {[
                  { id: "overview", label: "Overview", icon: BookOpen },
                  { id: "curriculum", label: "Curriculum", icon: List },
                  { id: "instructor", label: "Instructor", icon: User },
                  { id: "requirements", label: "Requirements", icon: CheckCircle },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveNav(item.id);
                      setActiveTab(item.id);
                    }}
                    className={`w-full flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2 xl:py-3 rounded-lg text-left transition-all duration-300 text-sm xl:text-base ${
                      activeNav === item.id
                        ? "bg-emerald-600 text-white font-semibold border-l-4 border-emerald-700"
                        : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                    }`}
                  >
                    <item.icon size={16} className="xl:w-5 xl:h-5 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </nav>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 xl:mt-6 border-2 border-emerald-600 text-emerald-600 py-2 xl:py-3 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 text-sm xl:text-base"
              >
                <Info size={16} className="xl:w-5 xl:h-5" />
                <span className="truncate">Course Details</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Center Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-6 space-y-4 sm:space-y-6 lg:space-y-8"
            data-aos="fade-up"
          >
            {/* Video/Thumbnail Section */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border-2 border-emerald-500">
              <div className="relative">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  width={800}
                  height={450}
                  className="w-full aspect-video object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="bg-white/20 backdrop-blur-sm text-white p-4 sm:p-6 rounded-full"
                  >
                    <PlayCircle size={32} className="sm:w-12 sm:h-12" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200 overflow-x-auto">
                <div className="flex min-w-max sm:min-w-0">
                  {[
                    { id: "overview", label: "Overview" },
                    { id: "curriculum", label: "Curriculum" },
                    { id: "pricing", label: "Pricing" },
                    { id: "reviews", label: "Reviews" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 font-semibold transition-all duration-300 whitespace-nowrap text-xs sm:text-sm lg:text-base ${
                        activeTab === tab.id
                          ? "text-emerald-600 border-b-3 border-emerald-600 bg-emerald-50"
                          : "text-gray-600 hover:text-emerald-600"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-4 sm:p-6">
                <AnimatePresence mode="wait">
                  {/* Overview Tab */}
                  {activeTab === "overview" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">About This Course</h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8">
                        {course.description}
                      </p>

                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">What You'll Learn</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                        {course.learningOutcomes.map((outcome, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-2 sm:gap-3"
                          >
                            <CheckCircle className="text-emerald-500 mt-0.5 sm:mt-1 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-sm sm:text-base text-gray-700">{outcome}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Course Info Grid */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-8">
                        <div className="text-center p-3 sm:p-4 lg:p-6 bg-gray-50 rounded-lg">
                          <Clock className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 mx-auto text-emerald-600 mb-2 sm:mb-3" />
                          <p className="font-bold text-sm sm:text-base lg:text-lg text-gray-900">{formatDuration(course.duration)}</p>
                          <p className="text-xs sm:text-sm text-gray-600">Duration</p>
                        </div>
                        <div className="text-center p-3 sm:p-4 lg:p-6 bg-gray-50 rounded-lg">
                          <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 mx-auto text-emerald-600 mb-2 sm:mb-3" />
                          <p className="font-bold text-sm sm:text-base lg:text-lg text-gray-900">{course.enrollmentCount}</p>
                          <p className="text-xs sm:text-sm text-gray-600">Students</p>
                        </div>
                        <div className="text-center p-3 sm:p-4 lg:p-6 bg-gray-50 rounded-lg">
                          <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 mx-auto text-emerald-600 mb-2 sm:mb-3" />
                          <p className="font-bold text-sm sm:text-base lg:text-lg text-gray-900">{course.syllabus.length}</p>
                          <p className="text-xs sm:text-sm text-gray-600">Modules</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Curriculum Tab */}
                  {activeTab === "curriculum" && (
                    <motion.div
                      key="curriculum"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">
                        Course Curriculum ({course.syllabus.length} Modules)
                      </h3>
                      
                      <div className="space-y-2 sm:space-y-3">
                        {course.syllabus.map((module, index) => (
                          <motion.div
                            key={module._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                          >
                            <button className="w-full p-3 sm:p-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <span className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                                  {index + 1}
                                </span>
                                <span className="font-semibold text-gray-900 text-left text-sm sm:text-base">{module.title}</span>
                              </div>
                              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 ml-2" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Pricing & Details Tab */}
                  {activeTab === "pricing" && (
                    <motion.div
                      key="pricing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Course Details</h3>
                      
                      <div className="space-y-4 sm:space-y-6">
                        <div>
                          <h4 className="text-base sm:text-lg font-semibold mb-3 text-gray-900">Pricing Information</h4>
                          <div className="bg-emerald-50 p-3 sm:p-4 rounded-lg">
                            <div className="flex flex-wrap items-baseline gap-2 mb-2">
                              <span className="text-2xl sm:text-3xl font-bold text-emerald-600">${course.price}</span>
                              <span className="text-gray-500 line-through text-base sm:text-lg">
                                ${Math.round(course.price * 1.5)}
                              </span>
                              <span className="bg-emerald-600 text-white px-2 py-1 rounded text-xs sm:text-sm font-semibold">
                                33% OFF
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600">One-time payment • Lifetime access</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-base sm:text-lg font-semibold mb-3 text-gray-900">Course Features</h4>
                          <div className="space-y-2">
                            {[
                              "Lifetime access to all course materials",
                              "Certificate of completion",
                              "Q&A support from instructor",
                              "Downloadable resources",
                              "Mobile and TV access",
                              "Regular content updates"
                            ].map((feature, index) => (
                              <div key={index} className="flex items-center gap-2 sm:gap-3">
                                <CheckCircle size={16} className="text-emerald-500 flex-shrink-0 sm:w-5 sm:h-5" />
                                <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Reviews Tab */}
                  {activeTab === "reviews" && (
                    <motion.div
                      key="reviews"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {course.rating.count > 0 ? (
                        <div>
                          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                            <div className="text-center">
                              <p className="text-4xl sm:text-5xl font-bold text-emerald-600">
                                {course.rating.average.toFixed(1)}
                              </p>
                              <div className="flex gap-1 mt-2 justify-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={
                                      i < Math.round(course.rating.average) 
                                        ? "fill-yellow-400 text-yellow-400" 
                                        : "text-gray-300"
                                    }
                                    size={18}
                                  />
                                ))}
                              </div>
                              <p className="text-sm sm:text-base text-gray-600 mt-2">{course.rating.count} reviews</p>
                            </div>
                          </div>
                          
                          {/* Sample Reviews */}
                          <div className="space-y-3 sm:space-y-4">
                            <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
                              <div className="flex items-center gap-1 sm:gap-2 mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="fill-yellow-400 text-yellow-400 w-3 h-3 sm:w-4 sm:h-4" />
                                ))}
                              </div>
                              <p className="text-sm sm:text-base text-gray-700 mb-2">"This course completely transformed my understanding of web development. The instructor explains complex concepts in a very simple way."</p>
                              <p className="text-xs sm:text-sm text-gray-600">- John Doe</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 sm:py-12">
                          <Star className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-300 mb-4" />
                          <p className="text-base sm:text-lg text-gray-500">No reviews yet</p>
                          <p className="text-sm text-gray-400 mt-2">Be the first to review this course</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-md p-4 sm:p-6"
              data-aos="fade-up"
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Frequently Asked Questions</h2>
              
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  question={faq.question} 
                  answer={faq.answer} 
                  index={index} 
                />
              ))}
            </motion.div>

            {/* Tags Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-md p-4 sm:p-6"
              data-aos="fade-up"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">Course Tags</h3>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-emerald-100 text-emerald-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-emerald-200 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Sidebar - Price Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
            data-aos="fade-left"
          >
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 sticky top-4 sm:top-24">
              <div className="p-4 sm:p-6">
                {/* Price Section */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold text-emerald-600">
                      ${course.price}
                    </span>
                    {course.currency === 'USD' && (
                      <span className="text-gray-500 text-base sm:text-lg">USD</span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2">
                    One-time payment • Lifetime access
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="space-y-1 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
                  <StatRow 
                    icon={<Clock size={16} />} 
                    label="Duration" 
                    value={`${formatDuration(course.duration)}`} 
                  />
                  <StatRow 
                    icon={<BookOpen size={16} />} 
                    label="Modules" 
                    value={`${course.syllabus.length} chapters`} 
                  />
                  <StatRow 
                    icon={<Users size={16} />} 
                    label="Students" 
                    value={`${course.enrollmentCount} enrolled`} 
                  />
                  <StatRow 
                    icon={<BarChart3 size={16} />} 
                    label="Level" 
                    value={formatLevel(course.level)} 
                  />
                  <StatRow 
                    icon={<Globe size={16} />} 
                    label="Language" 
                    value={course.language} 
                  />
                  <StatRow 
                    icon={<Calendar size={16} />} 
                    label="Updated" 
                    value={new Date(course.lastUpdated).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })} 
                  />
                </div>

                {/* Payment Methods */}
                <div className="mb-4 sm:mb-6">
                  <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Payment Methods:</p>
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start">
                    {/* bKash Logo */}
                    <div className="w-12 sm:w-14 h-7 sm:h-8 bg-white border border-gray-200 rounded flex items-center justify-center p-1">
                      <Image
                        src="/bKash-Logo.png"
                        alt="bKash"
                        width={50}
                        height={20}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    
                    {/* Nagad Logo */}
                    <div className="w-12 sm:w-14 h-7 sm:h-8 bg-white border border-gray-200 rounded flex items-center justify-center p-1">
                      <Image
                        src="/NagadLogo.png"
                        alt="Nagad"
                        width={50}
                        height={20}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    
                    {/* Upay Logo */}
                    <div className="w-12 sm:w-14 h-7 sm:h-8 bg-white border border-gray-200 rounded flex items-center justify-center p-1">
                      <Image
                        src="/upay.png"
                        alt="Upay"
                        width={50}
                        height={20}
                        className="object-contain w-full h-full"
                      />
                    </div>

                    {/* Skrill Logo */}
                    <div className="w-12 sm:w-14 h-7 sm:h-8 bg-white border border-gray-200 rounded flex items-center justify-center p-1">
                      <Image
                        src="/skrill.png"
                        alt="Skrill"
                        width={50}
                        height={20}
                        className="object-contain w-full h-full"
                      />
                    </div>

                    {/* Mastercard */}
                    <div className="w-12 sm:w-14 h-7 sm:h-8 bg-white border border-gray-200 rounded flex items-center justify-center p-1">
                      <Image
                        src="/mastercard.png"
                        alt="Mastercard"
                        width={50}
                        height={20}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-emerald-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors mb-2 sm:mb-3 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
                  Enroll Now
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full border-2 border-emerald-600 text-emerald-600 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Heart size={18} className="sm:w-5 sm:h-5" />
                  Add to Wishlist
                </motion.button>

                {/* Instructor Card */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                  <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Instructor:</p>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Image
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover border-2 border-emerald-500 sm:w-12 sm:h-12"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{course.instructor.name}</p>
                      <p className="text-xs text-gray-600 truncate">{course.instructor.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ChevronRight component for breadcrumb
function ChevronRight({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}