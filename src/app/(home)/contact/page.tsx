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
        value: "sarkarrajkumar3460@gmail.com",
        link: "mailto:sarkarrajkumar3460@gmail.com",
        color: "blue",
    },
    {
        icon: Phone,
        title: "Call Us",
        description: "Mon-Fri from 9am to 6pm",
        value: "+1 (555) 123-4567",
        link: "tel:+15551234567",
        color: "green",
    },
    {
        icon: MapPin,
        title: "Visit Us",
        description: "Come say hello at our office",
        value: "123 Skills Street, Learning City, LC 12345",
        link: "#",
        color: "purple",
    },
];

export default function ContactForm() {
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
            // ✅ Real API call to your backend
            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    category: data.category,
                    message: `Subject: ${data.subject}\n\nMessage: ${data.message}`,
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || "Failed to send message");
            }

            toast.success("Message sent successfully! 🎉", {
                description: "We'll get back to you within 24 hours.",
            });

            setIsSuccess(true);
            form.reset();

            setTimeout(() => {
                setIsSuccess(false);
            }, 3000);
        } catch (error: any) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message ❌", {
                description: error?.message || "Please try again later.",
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Get in Touch
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
                        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5 text-blue-600" />
                                    Contact Information
                                </CardTitle>
                                <CardDescription>
                                    Reach out to us through any of these
                                    channels
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {contactInfo.map((info, index) => (
                                    <motion.a
                                        key={index}
                                        href={info.link}
                                        variants={itemVariants}
                                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all group"
                                    >
                                        <div
                                            className={`p-3 rounded-lg bg-gradient-to-br ${
                                                info.color === "blue"
                                                    ? "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"
                                                    : info.color === "green"
                                                    ? "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"
                                                    : "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20"
                                            }`}
                                        >
                                            <info.icon
                                                className={`h-5 w-5 ${
                                                    info.color === "blue"
                                                        ? "text-blue-600"
                                                        : info.color === "green"
                                                        ? "text-green-600"
                                                        : "text-purple-600"
                                                }`}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                {info.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                                {info.description}
                                            </p>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                {info.value}
                                            </p>
                                        </div>
                                    </motion.a>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Contact Form - Right Side */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-2"
                    >
                        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-2xl flex items-center gap-2">
                                    <Sparkles className="h-6 w-6 text-blue-600" />
                                    Send us a Message
                                </CardTitle>
                                <CardDescription className="text-base">
                                    Fill out the form below and we'll get back
                                    to you within 24 hours
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isSuccess ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="flex flex-col items-center justify-center py-12"
                                    >
                                        <CheckCircle2 className="h-20 w-20 text-green-500 mb-4" />
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                            Message Sent Successfully!
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-center">
                                            Thank you for contacting us. We'll
                                            respond to your message soon.
                                        </p>
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
                                                            <FormLabel className="text-base font-semibold">
                                                                Full Name *
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="John Doe"
                                                                    {...field}
                                                                    className="text-base"
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
                                                            <FormLabel className="text-base font-semibold">
                                                                Email Address *
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="email"
                                                                    placeholder="john@example.com"
                                                                    {...field}
                                                                    className="text-base"
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
                                                            <FormLabel className="text-base font-semibold">
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
                                                                    <SelectTrigger className="text-base">
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
                                                            <FormLabel className="text-base font-semibold">
                                                                Subject *
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="How can we help you?"
                                                                    {...field}
                                                                    className="text-base"
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
                                                        <FormLabel className="text-base font-semibold">
                                                            Message *
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="Tell us more about your inquiry..."
                                                                className="resize-none text-base"
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
                                                            <span className="text-xs">
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
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-base py-6"
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
