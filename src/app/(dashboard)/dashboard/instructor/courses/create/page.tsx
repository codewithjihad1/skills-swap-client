"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    ArrowLeft,
    Plus,
    Trash2,
    BookOpen,
    DollarSign,
    Clock,
    Tag,
    FileText,
    Target,
    AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { courseService } from "@/lib/api/courseService";
import { toast } from "sonner";

// Validation schema based on API requirements
const courseSchema = z.object({
    title: z
        .string()
        .min(5, "Title must be at least 5 characters")
        .max(200, "Title must not exceed 200 characters"),
    description: z
        .string()
        .min(20, "Description must be at least 20 characters"),
    category: z.string().min(1, "Category is required"),
    level: z.enum(["beginner", "intermediate", "advanced"]),
    duration: z
        .number()
        .min(1, "Duration must be at least 1 hour")
        .max(1000, "Duration must not exceed 1000 hours"),
    price: z.number().min(0, "Price cannot be negative"),
    currency: z.string(),
    thumbnail: z
        .string()
        .url("Must be a valid URL")
        .optional()
        .or(z.literal("")),
    tags: z.array(z.string()).min(1, "At least one tag is required"),
    syllabus: z
        .array(
            z.object({
                module: z.string().min(1, "Module title is required"),
                lessons: z
                    .array(z.string())
                    .min(1, "At least one lesson is required"),
            })
        )
        .optional(),
    prerequisites: z.array(z.string()).optional(),
    learningOutcomes: z
        .array(z.string())
        .min(1, "At least one learning outcome is required"),
    language: z.string(),
});

type CourseFormData = z.infer<typeof courseSchema>;

const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Programming",
    "Database",
    "DevOps",
    "Cloud Computing",
    "Cybersecurity",
    "UI/UX Design",
    "Graphic Design",
    "Digital Marketing",
    "Business",
    "Photography",
    "Video Editing",
    "Other",
];

export default function CreateCoursePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        watch,
    } = useForm<CourseFormData>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            currency: "USD",
            language: "English",
            level: "beginner",
            price: 0,
            duration: 10,
            tags: [],
            learningOutcomes: [""],
            prerequisites: [""],
            syllabus: [],
        },
    });

    const {
        fields: learningOutcomeFields,
        append: appendLearningOutcome,
        remove: removeLearningOutcome,
    } = useFieldArray({
        control,
        name: "learningOutcomes" as any,
    });

    const {
        fields: prerequisiteFields,
        append: appendPrerequisite,
        remove: removePrerequisite,
    } = useFieldArray({
        control,
        name: "prerequisites" as any,
    });

    const {
        fields: syllabusFields,
        append: appendSyllabus,
        remove: removeSyllabus,
    } = useFieldArray({
        control,
        name: "syllabus" as any,
    });

    useEffect(() => {
        if (status === "loading") return;

        const userRole = (session?.user as any)?.role;
        if (!session || (userRole !== "instructor" && userRole !== "admin")) {
            router.push("/dashboard");
            return;
        }
    }, [session, status, router]);

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            const newTags = [...tags, tagInput.trim()];
            setTags(newTags);
            setValue("tags", newTags);
            setTagInput("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        const newTags = tags.filter((tag) => tag !== tagToRemove);
        setTags(newTags);
        setValue("tags", newTags);
    };

    const handleAddSyllabusWeek = () => {
        appendSyllabus({
            module: "",
            lessons: [""],
        });
    };

    const onSubmit = async (data: CourseFormData) => {
        try {
            setLoading(true);

            // Get instructor ID from session
            const instructorId = (session?.user as any)?.id;

            if (!instructorId) {
                toast.error("Instructor ID not found. Please login again.");
                return;
            }

            // Filter out empty prerequisites and learning outcomes
            const filteredData = {
                ...data,
                instructor: instructorId,
                prerequisites: data.prerequisites?.filter(
                    (p) => p.trim() !== ""
                ),
                learningOutcomes: data.learningOutcomes.filter(
                    (o) => o.trim() !== ""
                ),
                syllabus: data.syllabus?.map((s) => ({
                    module: s.module,
                    lessons: s.lessons.filter((l) => l.trim() !== ""),
                })),
            };

            const response = await courseService.createCourse(filteredData);

            toast.success("Course created successfully!");
            router.push(`/dashboard/courses/${response.course._id}/edit`);
        } catch (err: any) {
            console.error("Error creating course:", err);
            toast.error(err.response?.data?.error || "Failed to create course");
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => router.push("/dashboard/courses")}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Courses
                </button>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Create New Course
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Fill in the details to create your course. Required fields
                    are marked with *
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-purple-600" />
                            Basic Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Course Title *
                            </label>
                            <input
                                {...register("title")}
                                type="text"
                                placeholder="e.g., Complete Web Development Bootcamp"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-800"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Description *
                            </label>
                            <textarea
                                {...register("description")}
                                rows={4}
                                placeholder="Describe what students will learn in this course..."
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-800"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Category and Level */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Category *
                                </label>
                                <select
                                    {...register("category")}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-800"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.category.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Level *
                                </label>
                                <select
                                    {...register("level")}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-800"
                                >
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">
                                        Intermediate
                                    </option>
                                    <option value="advanced">Advanced</option>
                                </select>
                                {errors.level && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.level.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Duration and Price */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Duration (hours) *
                                </label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    <input
                                        {...register("duration", {
                                            valueAsNumber: true,
                                        })}
                                        type="number"
                                        min="1"
                                        placeholder="40"
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-800"
                                    />
                                </div>
                                {errors.duration && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.duration.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Price ({watch("currency")}) *
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    <input
                                        {...register("price", {
                                            valueAsNumber: true,
                                        })}
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="49.99"
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-800"
                                    />
                                </div>
                                {errors.price && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.price.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Thumbnail URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Thumbnail URL
                            </label>
                            <input
                                {...register("thumbnail")}
                                type="url"
                                placeholder="https://example.com/course-thumbnail.jpg"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-800"
                            />
                            {errors.thumbnail && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.thumbnail.message}
                                </p>
                            )}
                        </div>

                        {/* Language */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Language
                            </label>
                            <input
                                {...register("language")}
                                type="text"
                                placeholder="English"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-800"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Tags */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Tag className="h-5 w-5 text-purple-600" />
                            Tags *
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddTag();
                                    }
                                }}
                                placeholder="e.g., html, css, javascript"
                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-800"
                            />
                            <button
                                type="button"
                                onClick={handleAddTag}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag)}
                                        className="ml-2 hover:text-red-600"
                                    >
                                        ×
                                    </button>
                                </Badge>
                            ))}
                        </div>
                        {errors.tags && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.tags.message}
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Learning Outcomes */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-purple-600" />
                            Learning Outcomes *
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {learningOutcomeFields.map((field, index) => (
                            <div key={field.id} className="flex gap-2">
                                <input
                                    {...register(
                                        `learningOutcomes.${index}` as const
                                    )}
                                    placeholder="What will students be able to do?"
                                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-800"
                                />
                                {learningOutcomeFields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeLearningOutcome(index)
                                        }
                                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => appendLearningOutcome("")}
                            className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
                        >
                            <Plus className="h-4 w-4" />
                            Add Learning Outcome
                        </button>
                        {errors.learningOutcomes && (
                            <p className="text-red-500 text-sm">
                                {errors.learningOutcomes.message}
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Prerequisites */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-purple-600" />
                            Prerequisites
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {prerequisiteFields.map((field, index) => (
                            <div key={field.id} className="flex gap-2">
                                <input
                                    {...register(
                                        `prerequisites.${index}` as const
                                    )}
                                    placeholder="What should students know before taking this course?"
                                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-800"
                                />
                                {prerequisiteFields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removePrerequisite(index)
                                        }
                                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => appendPrerequisite("")}
                            className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
                        >
                            <Plus className="h-4 w-4" />
                            Add Prerequisite
                        </button>
                    </CardContent>
                </Card>

                {/* Syllabus (Optional) */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-purple-600" />
                            Syllabus (Optional)
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Note: You need to add syllabus before publishing the
                            course
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {syllabusFields.map((field, index) => (
                            <div
                                key={field.id}
                                className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 space-y-3"
                            >
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                        Module {index + 1}
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={() => removeSyllabus(index)}
                                        className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>

                                <input
                                    {...register(
                                        `syllabus.${index}.module` as const
                                    )}
                                    placeholder="Module name (e.g., HTML Fundamentals)"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-800"
                                />

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Lessons (comma-separated)
                                    </label>
                                    <input
                                        {...register(
                                            `syllabus.${index}.lessons.0` as const
                                        )}
                                        placeholder="Lesson 1, Lesson 2, Lesson 3"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-800"
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddSyllabusWeek}
                            className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
                        >
                            <Plus className="h-4 w-4" />
                            Add Module
                        </button>
                    </CardContent>
                </Card>

                {/* Info Box */}
                <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <CardContent className="pt-6">
                        <div className="flex gap-3">
                            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-blue-900 dark:text-blue-100">
                                <p className="font-semibold mb-1">
                                    Publishing Requirements
                                </p>
                                <p>
                                    To publish your course, you must add:
                                    <br />
                                    • Complete syllabus with module breakdown
                                    <br />• Learning outcomes (what students
                                    will learn)
                                </p>
                                <p className="mt-2 text-xs">
                                    You can save the course as a draft now and
                                    publish it later after adding these details.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Submit Buttons */}
                <div className="flex gap-4 justify-end">
                    <button
                        type="button"
                        onClick={() => router.push("/dashboard/courses")}
                        disabled={loading}
                        className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Creating...
                            </>
                        ) : (
                            "Create Course"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
