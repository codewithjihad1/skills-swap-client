"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Plus,
    X,
    Tag,
    MapPin,
    Clock,
    Monitor,
    Award,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Categories for skills
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
    "Other",
];

// Proficiency levels
const proficiencyLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

// Availability options
const availabilityOptions = [
    "Weekdays",
    "Weekends",
    "Evenings",
    "Mornings",
    "Afternoons",
    "Flexible",
];

interface SkillFormData {
    title: string;
    description: string;
    category: string;
    proficiency: string;
    tags: string[];
    exchangeFor: string[];
    availability: string;
    location: string;
    mode: string;
}

const AddSkillComponent = () => {
    const [open, setOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [formData, setFormData] = useState<SkillFormData>({
        title: "",
        description: "",
        category: "",
        proficiency: "",
        tags: [],
        exchangeFor: [],
        availability: "Flexible",
        location: "Remote",
        mode: "Online",
    });

    const [tagInput, setTagInput] = useState("");
    const [exchangeInput, setExchangeInput] = useState("");

    // Handle input changes
    const handleInputChange = (field: keyof SkillFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Add tag
    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()],
            }));
            setTagInput("");
        }
    };

    // Remove tag
    const removeTag = (tagToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    // Add exchange skill
    const addExchangeSkill = () => {
        if (
            exchangeInput.trim() &&
            !formData.exchangeFor.includes(exchangeInput.trim())
        ) {
            setFormData((prev) => ({
                ...prev,
                exchangeFor: [...prev.exchangeFor, exchangeInput.trim()],
            }));
            setExchangeInput("");
        }
    };

    // Remove exchange skill
    const removeExchangeSkill = (skillToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            exchangeFor: prev.exchangeFor.filter(
                (skill) => skill !== skillToRemove
            ),
        }));
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
                    formData.title &&
                    formData.description &&
                    formData.category
                );
            case 2:
                return !!(formData.proficiency && formData.tags.length > 0);
            case 3:
                return true; // Optional fields
            default:
                return true;
        }
    };

    // Go to next step
    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((prev) => Math.min(prev + 1, 3));
        }
    };

    // Go to previous step
    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    // Submit form
    const handleSubmit = async () => {
        if (!validateStep(currentStep)) return;

        setIsSubmitting(true);

        try {
            

            setShowSuccess(true);

            // Reset form after 2 seconds
            setTimeout(() => {
                setShowSuccess(false);
                setOpen(false);
                setCurrentStep(1);
                setFormData({
                    title: "",
                    description: "",
                    category: "",
                    proficiency: "",
                    tags: [],
                    exchangeFor: [],
                    availability: "Flexible",
                    location: "Remote",
                    mode: "Online",
                });
            }, 2000);
        } catch (error) {
            console.error("Error submitting skill:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Skill
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {showSuccess ? "Success! 🎉" : "Add Your Skill"}
                    </DialogTitle>
                    <DialogDescription>
                        {showSuccess
                            ? "Your skill has been added successfully!"
                            : "Share your expertise and find skills to learn in return"}
                    </DialogDescription>
                </DialogHeader>

                {showSuccess ? (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex flex-col items-center justify-center py-8"
                    >
                        <CheckCircle2 className="h-20 w-20 text-green-500 mb-4" />
                        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Skill Added Successfully!
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Your skill is now live and available for exchange
                        </p>
                    </motion.div>
                ) : (
                    <>
                        {/* Step Indicator */}
                        <div className="flex items-center justify-between mb-6">
                            {[1, 2, 3].map((step) => (
                                <div
                                    key={step}
                                    className="flex items-center flex-1"
                                >
                                    <div className="flex items-center">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all ${
                                                currentStep >= step
                                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                            }`}
                                        >
                                            {step}
                                        </div>
                                        <span className="ml-2 text-sm font-medium hidden sm:inline">
                                            {step === 1 && "Basic Info"}
                                            {step === 2 && "Details"}
                                            {step === 3 && "Preferences"}
                                        </span>
                                    </div>
                                    {step < 3 && (
                                        <div
                                            className={`flex-1 h-1 mx-2 rounded transition-all ${
                                                currentStep > step
                                                    ? "bg-gradient-to-r from-blue-600 to-purple-600"
                                                    : "bg-gray-200 dark:bg-gray-700"
                                            }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6">
                            {/* Step 1: Basic Information */}
                            {currentStep === 1 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="title">
                                            Skill Title *
                                        </Label>
                                        <Input
                                            id="title"
                                            placeholder="e.g., React Development, Guitar Lessons, Italian Cooking"
                                            value={formData.title}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "title",
                                                    e.target.value
                                                )
                                            }
                                            className="border-gray-300 dark:border-gray-600"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">
                                            Description *
                                        </Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Describe your skill, what you can teach, and what makes you qualified..."
                                            value={formData.description}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            rows={4}
                                            className="border-gray-300 dark:border-gray-600"
                                        />
                                        <p className="text-xs text-gray-500">
                                            {formData.description.length}{" "}
                                            characters
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="category">
                                            Category *
                                        </Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value) =>
                                                handleInputChange(
                                                    "category",
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger id="category">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
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
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: Skill Details */}
                            {currentStep === 2 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label>Proficiency Level *</Label>
                                        <RadioGroup
                                            value={formData.proficiency}
                                            onValueChange={(value: string) =>
                                                handleInputChange(
                                                    "proficiency",
                                                    value
                                                )
                                            }
                                            className="grid grid-cols-2 gap-3"
                                        >
                                            {proficiencyLevels.map((level) => (
                                                <div key={level}>
                                                    <RadioGroupItem
                                                        value={level}
                                                        id={level}
                                                        className="peer sr-only"
                                                    />
                                                    <Label
                                                        htmlFor={level}
                                                        className="flex items-center justify-center rounded-lg border-2 border-gray-200 dark:border-gray-700 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 dark:peer-data-[state=checked]:bg-blue-900/20 cursor-pointer transition-all"
                                                    >
                                                        <Award className="h-4 w-4 mr-2" />
                                                        {level}
                                                    </Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="tags">
                                            Tags * (Press Enter to add)
                                        </Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="tags"
                                                placeholder="e.g., React, Hooks, TypeScript"
                                                value={tagInput}
                                                onChange={(e) =>
                                                    setTagInput(e.target.value)
                                                }
                                                onKeyPress={handleTagKeyPress}
                                                className="flex-1"
                                            />
                                            <Button
                                                type="button"
                                                onClick={addTag}
                                                variant="outline"
                                            >
                                                <Tag className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {formData.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {formData.tags.map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="secondary"
                                                        className="pl-3 pr-1 py-1 flex items-center gap-1"
                                                    >
                                                        {tag}
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-4 w-4 p-0 hover:bg-transparent"
                                                            onClick={() =>
                                                                removeTag(tag)
                                                            }
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </Button>
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="exchangeFor">
                                            Skills You Want to Learn (Optional)
                                        </Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="exchangeFor"
                                                placeholder="e.g., Python, Photography, Spanish"
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
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {formData.exchangeFor.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {formData.exchangeFor.map(
                                                    (skill) => (
                                                        <Badge
                                                            key={skill}
                                                            className="pl-3 pr-1 py-1 flex items-center gap-1 bg-gradient-to-r from-blue-600 to-purple-600"
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
                                </motion.div>
                            )}

                            {/* Step 3: Preferences */}
                            {currentStep === 3 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="availability">
                                            Availability
                                        </Label>
                                        <Select
                                            value={formData.availability}
                                            onValueChange={(value) =>
                                                handleInputChange(
                                                    "availability",
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger id="availability">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availabilityOptions.map(
                                                    (option) => (
                                                        <SelectItem
                                                            key={option}
                                                            value={option}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="h-4 w-4" />
                                                                {option}
                                                            </div>
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="location">
                                            Location
                                        </Label>
                                        <Input
                                            id="location"
                                            placeholder="e.g., Remote, New York, London"
                                            value={formData.location}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "location",
                                                    e.target.value
                                                )
                                            }
                                            className="border-gray-300 dark:border-gray-600"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Teaching Mode</Label>
                                        <RadioGroup
                                            value={formData.mode}
                                            onValueChange={(value: string) =>
                                                handleInputChange("mode", value)
                                            }
                                            className="grid grid-cols-3 gap-3"
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
                                                            <Monitor className="h-5 w-5 mb-2" />
                                                            <span className="text-sm font-medium">
                                                                {mode}
                                                            </span>
                                                        </Label>
                                                    </div>
                                                )
                                            )}
                                        </RadioGroup>
                                    </div>

                                    {/* Summary Card */}
                                    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700">
                                        <CardHeader>
                                            <CardTitle className="text-lg">
                                                Skill Summary
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">
                                                    Title:
                                                </span>
                                                <span className="font-medium">
                                                    {formData.title || "N/A"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">
                                                    Category:
                                                </span>
                                                <span className="font-medium">
                                                    {formData.category || "N/A"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">
                                                    Proficiency:
                                                </span>
                                                <span className="font-medium">
                                                    {formData.proficiency ||
                                                        "N/A"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">
                                                    Tags:
                                                </span>
                                                <span className="font-medium">
                                                    {formData.tags.length} added
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">
                                                    Mode:
                                                </span>
                                                <span className="font-medium">
                                                    {formData.mode}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-4 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={prevStep}
                                disabled={currentStep === 1}
                            >
                                Previous
                            </Button>

                            {currentStep < 3 ? (
                                <Button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={!validateStep(currentStep)}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                >
                                    Next
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                            Adding...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="h-4 w-4 mr-2" />
                                            Add Skill
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AddSkillComponent;
