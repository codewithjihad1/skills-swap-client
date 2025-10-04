"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { motion } from "framer-motion";
import {
    Plus,
    X,
    Tag,
    MapPin,
    Clock,
    Monitor,
    Award,
    CheckCircle2,
    ArrowRight,
    Sparkles,
    BookOpen,
    Users,
    TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Zod schema matching the MongoDB schema
const FormSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters." }),
    description: z
        .string()
        .min(10, { message: "Description must be at least 10 characters." }),
    category: z.string().min(1, { message: "Category is required." }),
    proficiency: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]),
    tags: z.array(z.string()).min(1, { message: "Add at least one tag." }),
    exchangeFor: z.array(z.string()).optional(),
    availability: z.string(),
    location: z.string(),
    mode: z.enum(["Online", "Offline", "Both"]),
});

// Categories matching your schema
const categories = [
    "Programming",
    "Music",
    "Cooking",
    "Design",
    "Writing",
    "Languages",
    "Photography",
    "Video Editing",
    "Marketing",
    "Business",
    "Sports",
    "Art",
    "SEO",
    "Graphic Design",
    "Web Development",
    "Data Analysis",
    "Machine Learning",
    "Other",
];

// Availability options
const availabilityOptions = [
    "Weekdays",
    "Weekends",
    "Evenings",
    "Mornings",
    "Afternoons",
    "Flexible",
];

function PostSkillForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [tagInput, setTagInput] = useState("");
    const [exchangeInput, setExchangeInput] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            proficiency: "Beginner",
            tags: [],
            exchangeFor: [],
            availability: "Flexible",
            location: "Remote",
            mode: "Online",
        },
    });

    // Add tag
    const addTag = () => {
        const currentTags = form.getValues("tags");
        if (tagInput.trim() && !currentTags.includes(tagInput.trim())) {
            form.setValue("tags", [...currentTags, tagInput.trim()]);
            setTagInput("");
        }
    };

    // Remove tag
    const removeTag = (tagToRemove: string) => {
        const currentTags = form.getValues("tags");
        form.setValue(
            "tags",
            currentTags.filter((tag) => tag !== tagToRemove)
        );
    };

    // Add exchange skill
    const addExchangeSkill = () => {
        const currentExchange = form.getValues("exchangeFor") || [];
        if (
            exchangeInput.trim() &&
            !currentExchange.includes(exchangeInput.trim())
        ) {
            form.setValue("exchangeFor", [
                ...currentExchange,
                exchangeInput.trim(),
            ]);
            setExchangeInput("");
        }
    };

    // Remove exchange skill
    const removeExchangeSkill = (skillToRemove: string) => {
        const currentExchange = form.getValues("exchangeFor") || [];
        form.setValue(
            "exchangeFor",
            currentExchange.filter((skill) => skill !== skillToRemove)
        );
    };

    // Handle key press for tags
    const handleTagKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag();
        }
    };

    // Handle key press for exchange skills
    const handleExchangeKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addExchangeSkill();
        }
    };

    // Validate step
    const validateStep = (step: number): boolean => {
        switch (step) {
            case 1:
                return !!(
                    form.getValues("title") &&
                    form.getValues("description") &&
                    form.getValues("category")
                );
            case 2:
                return !!(
                    form.getValues("proficiency") &&
                    form.getValues("tags").length > 0
                );
            case 3:
                return true;
            default:
                return true;
        }
    };

    // Go to next step
    const nextStep = async () => {
        // Trigger validation for current step fields
        let isValid = true;

        if (currentStep === 1) {
            const titleValid = await form.trigger("title");
            const descValid = await form.trigger("description");
            const catValid = await form.trigger("category");
            isValid = titleValid && descValid && catValid;

            if (!isValid) {
                toast.error("Please fill in all required fields", {
                    description: "Complete Step 1 before proceeding",
                });
                return;
            }
        } else if (currentStep === 2) {
            const profValid = await form.trigger("proficiency");
            const tagsValid = await form.trigger("tags");
            isValid = profValid && tagsValid;

            if (!isValid) {
                toast.error("Please complete Step 2", {
                    description:
                        "Select proficiency level and add at least one tag",
                });
                return;
            }
        }

        if (isValid && validateStep(currentStep)) {
            setCurrentStep((prev) => Math.min(prev + 1, 3));
        }
    };

    // Go to previous step
    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    // Submit handler
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsSubmitting(true);
        console.log("Submitted Data", data);

        try {
            const res = await fetch(
                "https://skills-swap-server.vercel.app/api/skills",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!res.ok) {
                throw new Error("Failed to post skill");
            }

            toast.success("Skill posted successfully!", {
                description:
                    "Your skill is now live and available for exchange.",
            });

            // Reset form
            form.reset();
            setCurrentStep(1);
        } catch (error) {
            console.error(error);
            toast.error("Failed to post skill", {
                description: "Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Step Indicator */}
                <div className="flex items-center justify-between">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center flex-1">
                            <div className="flex items-center">
                                <motion.div
                                    animate={{
                                        scale: currentStep === step ? 1.1 : 1,
                                    }}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                                        currentStep >= step
                                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                                            : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                    }`}
                                >
                                    {step}
                                </motion.div>
                                <span className="ml-3 text-sm font-medium hidden sm:inline">
                                    {step === 1 && "Basic Info"}
                                    {step === 2 && "Skills & Tags"}
                                    {step === 3 && "Preferences"}
                                </span>
                            </div>
                            {step < 3 && (
                                <div
                                    className={`flex-1 h-1 mx-3 rounded transition-all ${
                                        currentStep > step
                                            ? "bg-gradient-to-r from-blue-600 to-purple-600"
                                            : "bg-gray-200 dark:bg-gray-700"
                                    }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <Separator />

                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        {/* Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-semibold flex items-center gap-2">
                                        <BookOpen className="h-4 w-4" />
                                        Skill Title *
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g., React Development, Guitar Lessons, Italian Cooking"
                                            {...field}
                                            className="text-base"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Give your skill a clear and descriptive
                                        title
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-semibold">
                                        Description *
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe your skill, what you can teach, your experience, and what makes you qualified..."
                                            {...field}
                                            rows={6}
                                            className="resize-none text-base"
                                        />
                                    </FormControl>
                                    <FormDescription className="flex justify-between">
                                        <span>
                                            Be specific about what learners will
                                            gain
                                        </span>
                                        <span className="text-xs">
                                            {field.value.length} characters
                                        </span>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Category */}
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-semibold">
                                        Category *
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="text-base">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category}
                                                    value={category}
                                                >
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Choose the category that best fits your
                                        skill
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </motion.div>
                )}

                {/* Step 2: Skill Details */}
                {currentStep === 2 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        {/* Proficiency Level */}
                        <FormField
                            control={form.control}
                            name="proficiency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-semibold flex items-center gap-2">
                                        <Award className="h-4 w-4" />
                                        Proficiency Level *
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="grid grid-cols-2 gap-4"
                                        >
                                            {[
                                                "Beginner",
                                                "Intermediate",
                                                "Advanced",
                                                "Expert",
                                            ].map((level) => (
                                                <div key={level}>
                                                    <RadioGroupItem
                                                        value={level}
                                                        id={level}
                                                        className="peer sr-only"
                                                    />
                                                    <Label
                                                        htmlFor={level}
                                                        className="flex items-center justify-center rounded-lg border-2 border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 dark:peer-data-[state=checked]:bg-blue-900/20 cursor-pointer transition-all"
                                                    >
                                                        <Award className="h-5 w-5 mr-2" />
                                                        {level}
                                                    </Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormDescription>
                                        Select your expertise level in this
                                        skill
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Tags */}
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-semibold flex items-center gap-2">
                                        <Tag className="h-4 w-4" />
                                        Tags * (Press Enter to add)
                                    </FormLabel>
                                    <FormControl>
                                        <div className="space-y-3">
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder="e.g., React, Hooks, TypeScript, Frontend"
                                                    value={tagInput}
                                                    onChange={(e) =>
                                                        setTagInput(
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={
                                                        handleTagKeyPress
                                                    }
                                                    className="flex-1"
                                                />
                                                <Button
                                                    type="button"
                                                    onClick={addTag}
                                                    variant="outline"
                                                    size="icon"
                                                    className="shrink-0"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            {field.value.length > 0 && (
                                                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                    {field.value.map((tag) => (
                                                        <Badge
                                                            key={tag}
                                                            variant="secondary"
                                                            className="pl-3 pr-2 py-2 flex items-center gap-2 text-sm"
                                                        >
                                                            {tag}
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-4 w-4 p-0 hover:bg-transparent"
                                                                onClick={() =>
                                                                    removeTag(
                                                                        tag
                                                                    )
                                                                }
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </Button>
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        Add relevant tags to help others find
                                        your skill (e.g., React, Guitar, UI/UX)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Exchange For */}
                        <FormField
                            control={form.control}
                            name="exchangeFor"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-semibold flex items-center gap-2">
                                        <Users className="h-4 w-4" />
                                        Skills You Want to Learn (Optional)
                                    </FormLabel>
                                    <FormControl>
                                        <div className="space-y-3">
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder="e.g., Python, Photography, Spanish, Marketing"
                                                    value={exchangeInput}
                                                    onChange={(e) =>
                                                        setExchangeInput(
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={
                                                        handleExchangeKeyPress
                                                    }
                                                    className="flex-1"
                                                />
                                                <Button
                                                    type="button"
                                                    onClick={addExchangeSkill}
                                                    variant="outline"
                                                    size="icon"
                                                    className="shrink-0"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            {field.value &&
                                                field.value.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 p-3 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                                                        {field.value.map(
                                                            (skill) => (
                                                                <Badge
                                                                    key={skill}
                                                                    className="pl-3 pr-2 py-2 flex items-center gap-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600"
                                                                >
                                                                    {skill}
                                                                    <Button
                                                                        type="button"
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        className="h-4 w-4 p-0 hover:bg-transparent"
                                                                        onClick={() =>
                                                                            removeExchangeSkill(
                                                                                skill
                                                                            )
                                                                        }
                                                                    >
                                                                        <X className="h-3 w-3" />
                                                                    </Button>
                                                                </Badge>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        Specify skills you're interested in
                                        learning through exchange
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </motion.div>
                )}

                {/* Step 3: Preferences */}
                {currentStep === 3 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        {/* Availability */}
                        <FormField
                            control={form.control}
                            name="availability"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-semibold flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        Availability
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="text-base">
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {availabilityOptions.map(
                                                (option) => (
                                                    <SelectItem
                                                        key={option}
                                                        value={option}
                                                    >
                                                        {option}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        When are you available to teach this
                                        skill?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Location */}
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-semibold flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        Location
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g., Remote, New York, London, Paris"
                                            {...field}
                                            className="text-base"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Where will you offer this skill?
                                        (Default: Remote)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Mode */}
                        <FormField
                            control={form.control}
                            name="mode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-semibold flex items-center gap-2">
                                        <Monitor className="h-4 w-4" />
                                        Teaching Mode
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="grid grid-cols-3 gap-4"
                                        >
                                            {["Online", "Offline", "Both"].map(
                                                (mode) => (
                                                    <div key={mode}>
                                                        <RadioGroupItem
                                                            value={mode}
                                                            id={`mode-${mode}`}
                                                            className="peer sr-only"
                                                        />
                                                        <Label
                                                            htmlFor={`mode-${mode}`}
                                                            className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 dark:peer-data-[state=checked]:bg-blue-900/20 cursor-pointer transition-all"
                                                        >
                                                            <Monitor className="h-6 w-6 mb-2" />
                                                            <span className="font-medium">
                                                                {mode}
                                                            </span>
                                                        </Label>
                                                    </div>
                                                )
                                            )}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormDescription>
                                        How do you prefer to teach this skill?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Summary Card */}
                        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Sparkles className="h-5 w-5 text-blue-600" />
                                    Skill Summary
                                </CardTitle>
                                <CardDescription>
                                    Review your skill details before posting
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                            Title
                                        </p>
                                        <p className="font-medium truncate">
                                            {form.getValues("title") || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                            Category
                                        </p>
                                        <p className="font-medium">
                                            {form.getValues("category") ||
                                                "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                            Proficiency
                                        </p>
                                        <p className="font-medium">
                                            {form.getValues("proficiency") ||
                                                "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                            Mode
                                        </p>
                                        <p className="font-medium">
                                            {form.getValues("mode")}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                            Tags
                                        </p>
                                        <p className="font-medium">
                                            {form.getValues("tags").length}{" "}
                                            added
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                            Location
                                        </p>
                                        <p className="font-medium truncate">
                                            {form.getValues("location")}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="px-8"
                    >
                        Previous
                    </Button>

                    {currentStep < 3 ? (
                        <Button
                            type="button"
                            onClick={nextStep}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
                        >
                            Next
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                    Posting...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    Post Skill
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
}

export default function PostSkillPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                        Share Your Expertise
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Post a skill and connect with learners around the world.
                        Exchange knowledge and grow together.
                    </p>
                </motion.div>

                {/* Main Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-2xl">
                        <CardContent className="p-8 md:p-10">
                            <PostSkillForm />
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
