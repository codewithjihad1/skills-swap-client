"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    MessageSquare,
    CheckCircle2,
    Sparkles,
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
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

// Form validation schema
const contactFormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    subject: z.string().min(5, {
        message: "Subject must be at least 5 characters.",
    }),
    category: z.string().min(1, {
        message: "Please select a category.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const categories = [
    "General Inquiry",
    "Technical Support",
    "Skill Exchange",
    "Partnership",
    "Bug Report",
    "Feature Request",
    "Account Issue",
    "Other",
];

const contactInfo = [
    {
        icon: Mail,
        title: "Email Us",
        description: "Send us an email anytime",
        value: "contact@skillsswap.com",
        link: "mailto:contact@skillsswap.com",
        color: "primary",
    },
    {
        icon: Phone,
        title: "Call Us",
        description: "Mon-Fri from 9am to 6pm",
        value: "+880 1XXX-XXXXXX",
        link: "tel:+8801XXXXXXXXX",
        color: "secondary",
    },
    {
        icon: MapPin,
        title: "Visit Us",
        description: "Come say hello at our office",
        value: "Dhaka, Bangladesh",
        link: "#",
        color: "accent",
    },
];

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            category: "",
            message: "",
        },
    });

    async function onSubmit(data: ContactFormValues) {
        setIsSubmitting(true);

        try {
            // Here you would make your actual API call
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.status !== 200) {
                const errorData = await response.json();
                toast.error(`Failed to send message ❌`, {
                    description: errorData.message || "Please try again later.",
                });
                return;
            }

            toast.success("Message sent successfully! 🎉", {
                description: "We'll get back to you as soon as possible.",
            });

            setIsSuccess(true);
            form.reset();
        } catch (error) {
            console.error(error);
            toast.error("Failed to send message ❌", {
                description: "Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-white via-[#B0EACD]/10 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-20 w-72 h-72 bg-[#21BF73]/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#007a3f]/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#B0EACD]/30 rounded-full blur-3xl animate-pulse delay-500" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block mb-6"
                    >
                        <div className="px-4 py-2 bg-gradient-to-r from-[#21BF73] to-[#007a3f] text-white rounded-full text-sm font-medium shadow-lg">
                            <MessageSquare className="w-4 h-4 inline-block mr-2" />
                            We're Here to Help
                        </div>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                            Get in{" "}
                        </span>
                        <span className="bg-gradient-to-r from-[#21BF73] to-[#007a3f] bg-clip-text text-transparent">
                            Touch
                        </span>
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Have a question or want to work together? We'd love to
                        hear from you. Send us a message and we'll respond as
                        soon as possible.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* Contact Information - Left Side */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-1 space-y-6"
                    >
                        {/* Contact Info Cards */}
                        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#21BF73] to-[#007a3f] flex items-center justify-center">
                                        <MessageSquare className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-gray-900 dark:text-white">
                                            Contact Information
                                        </div>
                                    </div>
                                </CardTitle>
                                <CardDescription className="mt-2">
                                    Reach out to us through any of these
                                    channels
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {contactInfo.map((info, index) => (
                                    <motion.a
                                        key={index}
                                        href={info.link}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all group ${
                                            info.color === "primary"
                                                ? "border-[#21BF73]/30 hover:border-[#21BF73] hover:bg-[#21BF73]/5"
                                                : info.color === "secondary"
                                                ? "border-[#007a3f]/30 hover:border-[#007a3f] hover:bg-[#007a3f]/5"
                                                : "border-[#B0EACD]/50 hover:border-[#B0EACD] hover:bg-[#B0EACD]/5"
                                        }`}
                                    >
                                        <div
                                            className={`p-3 rounded-lg bg-gradient-to-br ${
                                                info.color === "primary"
                                                    ? "from-[#21BF73]/20 to-[#21BF73]/10"
                                                    : info.color === "secondary"
                                                    ? "from-[#007a3f]/20 to-[#007a3f]/10"
                                                    : "from-[#B0EACD]/30 to-[#B0EACD]/10"
                                            }`}
                                        >
                                            <info.icon
                                                className={`h-5 w-5 ${
                                                    info.color === "primary"
                                                        ? "text-[#21BF73]"
                                                        : info.color ===
                                                          "secondary"
                                                        ? "text-[#007a3f]"
                                                        : "text-[#007a3f]"
                                                }`}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                                                {info.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                {info.description}
                                            </p>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white break-all">
                                                {info.value}
                                            </p>
                                        </div>
                                    </motion.a>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Quick Info Card */}
                        <Card className="bg-gradient-to-br from-[#21BF73]/10 to-[#B0EACD]/10 border-2 border-[#21BF73]/30">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#21BF73] flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                                            Quick Response
                                        </h3>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            We typically respond within 24 hours
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-[#21BF73]" />
                                        <span>Available Mon-Fri, 9am-6pm</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-[#21BF73]" />
                                        <span>Emergency support available</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-[#21BF73]" />
                                        <span>Bengali & English support</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Contact Form - Right Side */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-2"
                    >
                        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <CardHeader>
                                <CardTitle className="text-2xl flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#21BF73] to-[#007a3f] flex items-center justify-center">
                                        <Sparkles className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-gray-900 dark:text-white">
                                            Send us a Message
                                        </div>
                                    </div>
                                </CardTitle>
                                <CardDescription className="text-base mt-2">
                                    Fill out the form below and we'll get back
                                    to you within 24 hours
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isSuccess ? (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                            type: "spring",
                                            duration: 0.6,
                                        }}
                                        className="flex flex-col items-center justify-center py-12"
                                    >
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                rotate: [0, 5, -5, 0],
                                            }}
                                            transition={{ duration: 0.6 }}
                                            className="w-24 h-24 rounded-full bg-gradient-to-r from-[#21BF73] to-[#007a3f] flex items-center justify-center mb-6"
                                        >
                                            <CheckCircle2 className="h-12 w-12 text-white" />
                                        </motion.div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                            Message Sent Successfully!
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                                            Thank you for contacting us. We'll
                                            respond to your message soon.
                                        </p>
                                        <Button
                                            onClick={() => setIsSuccess(false)}
                                            className="mt-6 bg-gradient-to-r from-[#21BF73] to-[#007a3f] hover:from-[#007a3f] hover:to-[#21BF73] text-white"
                                        >
                                            Send Another Message
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <Form {...form}>
                                        <form
                                            onSubmit={form.handleSubmit(
                                                onSubmit
                                            )}
                                            className="space-y-6"
                                        >
                                            {/* Name and Email */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                                                                Full Name *
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="John Doe"
                                                                    {...field}
                                                                    className="text-base border-2 focus:border-[#21BF73] focus:ring-[#21BF73]"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                                                                Email Address *
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="email"
                                                                    placeholder="john@example.com"
                                                                    {...field}
                                                                    className="text-base border-2 focus:border-[#21BF73] focus:ring-[#21BF73]"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            {/* Category and Subject */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <FormField
                                                    control={form.control}
                                                    name="category"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                                                                Category *
                                                            </FormLabel>
                                                            <Select
                                                                onValueChange={
                                                                    field.onChange
                                                                }
                                                                defaultValue={
                                                                    field.value
                                                                }
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger className="text-base border-2 focus:border-[#21BF73] focus:ring-[#21BF73]">
                                                                        <SelectValue placeholder="Select a category" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {categories.map(
                                                                        (
                                                                            category
                                                                        ) => (
                                                                            <SelectItem
                                                                                key={
                                                                                    category
                                                                                }
                                                                                value={
                                                                                    category
                                                                                }
                                                                            >
                                                                                {
                                                                                    category
                                                                                }
                                                                            </SelectItem>
                                                                        )
                                                                    )}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="subject"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                                                                Subject *
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="How can we help you?"
                                                                    {...field}
                                                                    className="text-base border-2 focus:border-[#21BF73] focus:ring-[#21BF73]"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            {/* Message */}
                                            <FormField
                                                control={form.control}
                                                name="message"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-base font-semibold text-gray-900 dark:text-white">
                                                            Message *
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="Tell us more about your inquiry..."
                                                                className="resize-none text-base border-2 focus:border-[#21BF73] focus:ring-[#21BF73]"
                                                                rows={6}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription className="flex justify-between">
                                                            <span>
                                                                Please provide
                                                                as much detail
                                                                as possible
                                                            </span>
                                                            <span className="text-xs text-[#007a3f] dark:text-[#B0EACD] font-medium">
                                                                {
                                                                    field.value
                                                                        .length
                                                                }{" "}
                                                                characters
                                                            </span>
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Submit Button */}
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full bg-gradient-to-r from-[#21BF73] to-[#007a3f] hover:from-[#007a3f] hover:to-[#21BF73] text-white text-base py-6 font-semibold shadow-lg"
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                                                            Sending Message...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Send className="h-5 w-5 mr-2" />
                                                            Send Message
                                                        </>
                                                    )}
                                                </Button>
                                            </motion.div>
                                        </form>
                                    </Form>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
