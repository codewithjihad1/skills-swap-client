"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Calendar, Mail, MapPin, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useUserProfile } from "@/lib/api/profile";
import { useState } from "react";
import { truncateText } from "@/lib/utils";

export default function ProfileHeader() {
    const { data: session } = useSession();
    const [isEditMode, setIsEditMode] = useState(false);

    // Fetch user profile data
    const {
        data: userProfile,
        isLoading,
        error,
    } = useUserProfile(session?.user?.email || undefined);

    if (!session) {
        return (
            <Card>
                <CardContent className="p-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                        Please sign in to view your profile
                    </p>
                </CardContent>
            </Card>
        );
    }

    if (isLoading) {
        return (
            <Card>
                <CardContent className="p-6 flex items-center justify-center min-h-[200px]">
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        <p className="text-gray-600 dark:text-gray-400">
                            Loading profile...
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardContent className="p-6 text-center">
                    <p className="text-red-600 dark:text-red-400">
                        Failed to load profile. Please try again.
                    </p>
                </CardContent>
            </Card>
        );
    }

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });
    };

    const formattedDate = userProfile?.createdAt
        ? formatDate(userProfile.createdAt)
        : "Date not available";

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                    <div className="relative">
                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                src={
                                    userProfile?.avatar ||
                                    session?.user?.image ||
                                    "/default-avatar.png"
                                }
                                alt={userProfile?.name || "Profile"}
                            />
                            <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                {userProfile?.name
                                    ? getInitials(userProfile.name)
                                    : session?.user?.name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <Button
                            size="icon"
                            variant="outline"
                            className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900"
                        >
                            <Camera className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex-1 space-y-2">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {userProfile?.name || session?.user?.name}
                            </h1>
                            <Badge
                                variant="secondary"
                                className="w-fit bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            >
                                {userProfile?.isActive
                                    ? "Active Member"
                                    : "Inactive"}
                            </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                            {truncateText(
                                userProfile?.bio || "No bio available"
                            )}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                                <Mail className="size-4" />
                                {userProfile?.email || session?.user?.email}
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="size-4" />
                                Location not specified
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="size-4" />
                                Joined {formattedDate}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                            <Badge
                                variant="outline"
                                className="text-blue-600 dark:text-blue-400"
                            >
                                {userProfile?.skills?.length || 0} Skills
                            </Badge>
                        </div>
                    </div>
                    <Button
                        variant="default"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={() => setIsEditMode(!isEditMode)}
                    >
                        Edit Profile
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
