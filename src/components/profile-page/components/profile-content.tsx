"use client";

import { Shield, Key, Trash2, Loader2, BookOpen, Award } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useUserProfile, useUpdateProfile } from "@/lib/api/profile";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function ProfileContent() {
    const { data: session } = useSession();
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState("");

    // Fetch user profile
    const { data: userProfile, isLoading } = useUserProfile(
        session?.user?.email || undefined
    );

    // Update profile mutation
    const updateProfileMutation = useUpdateProfile();

    // Initialize form fields when data is loaded
    useEffect(() => {
        if (userProfile) {
            setName(userProfile.name || "");
            setBio(userProfile.bio || "");
            setAvatar(userProfile.avatar || "");
        }
    }, [userProfile]);

    const handleUpdateProfile = () => {
        if (!session?.user?.id) return;

        updateProfileMutation.mutate({
            userId: session.user.id,
            profileData: {
                name: name || userProfile?.name,
                bio: bio || userProfile?.bio,
                avatar: avatar || userProfile?.avatar,
            },
        });
    };

    const getProficiencyColor = (proficiency: string) => {
        switch (proficiency?.toLowerCase()) {
            case "beginner":
                return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";
            case "intermediate":
                return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300";
            case "advanced":
                return "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300";
            case "expert":
                return "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300";
            default:
                return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300";
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <p className="text-gray-600 dark:text-gray-400">
                        Loading profile data...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Personal Information */}
            <TabsContent value="personal" className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>
                            Update your personal details and profile
                            information.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={name || userProfile?.name || ""}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={userProfile?.email || ""}
                                    disabled
                                    className="bg-gray-100 dark:bg-gray-800"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="avatar">Avatar URL</Label>
                                <Input
                                    id="avatar"
                                    value={avatar || userProfile?.avatar || ""}
                                    onChange={(e) => setAvatar(e.target.value)}
                                    placeholder="https://example.com/avatar.jpg"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                placeholder="Tell us about yourself..."
                                value={bio || userProfile?.bio || ""}
                                onChange={(e) => setBio(e.target.value)}
                                rows={4}
                            />
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {(bio || userProfile?.bio || "").length}/500
                                characters
                            </p>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setName(userProfile?.name || "");
                                    setBio(userProfile?.bio || "");
                                    setAvatar(userProfile?.avatar || "");
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleUpdateProfile}
                                disabled={updateProfileMutation.isPending}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            >
                                {updateProfileMutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Your Skills</CardTitle>
                        <CardDescription>
                            Skills you've added to your profile (
                            {userProfile?.skills?.length || 0} total)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {userProfile?.skills &&
                        userProfile.skills.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {userProfile.skills.map((skill) => (
                                    <Card
                                        key={skill._id}
                                        className="overflow-hidden border-2"
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                                                        {skill.title}
                                                    </h3>
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs mb-2"
                                                    >
                                                        {skill.category}
                                                    </Badge>
                                                </div>
                                                <Award className="h-5 w-5 text-blue-600" />
                                            </div>
                                            {skill.description && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                                    {skill.description}
                                                </p>
                                            )}
                                            <div className="flex items-center justify-between">
                                                <Badge
                                                    className={getProficiencyColor(
                                                        skill.proficiency
                                                    )}
                                                >
                                                    {skill.proficiency}
                                                </Badge>
                                                {skill.tags &&
                                                    skill.tags.length > 0 && (
                                                        <div className="flex gap-1">
                                                            {skill.tags
                                                                .slice(0, 2)
                                                                .map(
                                                                    (
                                                                        tag,
                                                                        index
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                                                                        >
                                                                            {
                                                                                tag
                                                                            }
                                                                        </span>
                                                                    )
                                                                )}
                                                            {skill.tags.length >
                                                                2 && (
                                                                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                                                                    +
                                                                    {skill.tags
                                                                        .length -
                                                                        2}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    No skills added yet
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Start adding skills to showcase your
                                    expertise!
                                </p>
                                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                    Add Your First Skill
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Account Settings */}
            <TabsContent value="account" className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                        <CardDescription>
                            Manage your account preferences and status.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-base">
                                    Account Status
                                </Label>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Your account is currently{" "}
                                    {userProfile?.isActive
                                        ? "active"
                                        : "inactive"}
                                </p>
                            </div>
                            <Badge
                                variant="outline"
                                className={
                                    userProfile?.isActive
                                        ? "border-green-200 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                        : "border-red-200 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                                }
                            >
                                {userProfile?.isActive ? "Active" : "Inactive"}
                            </Badge>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-base">
                                    Member Since
                                </Label>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {userProfile?.createdAt
                                        ? new Date(
                                              userProfile.createdAt
                                          ).toLocaleDateString("en-US", {
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                          })
                                        : "N/A"}
                                </p>
                            </div>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-base">
                                    Account Visibility
                                </Label>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Make your profile visible to other users
                                </p>
                            </div>
                            <Switch defaultChecked={userProfile?.isActive} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-base">
                                    Total Skills
                                </Label>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {userProfile?.skills?.length || 0} skills in
                                    your portfolio
                                </p>
                            </div>
                            <Badge
                                variant="outline"
                                className="text-blue-600 dark:text-blue-400"
                            >
                                {userProfile?.skills?.length || 0}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-red-300 dark:border-red-900">
                    <CardHeader>
                        <CardTitle className="text-red-600 dark:text-red-400">
                            Danger Zone
                        </CardTitle>
                        <CardDescription>
                            Irreversible and destructive actions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-base">
                                    Deactivate Account
                                </Label>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Temporarily deactivate your account
                                </p>
                            </div>
                            <Button variant="destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Deactivate
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security" className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>
                            Manage your account security and authentication.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label className="text-base">
                                        Password
                                    </Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Secure your account with a strong
                                        password
                                    </p>
                                </div>
                                <Button variant="outline">
                                    <Key className="mr-2 h-4 w-4" />
                                    Change Password
                                </Button>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label className="text-base">
                                        Two-Factor Authentication
                                    </Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Add an extra layer of security to your
                                        account
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant="outline"
                                        className="border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                    >
                                        Coming Soon
                                    </Badge>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label className="text-base">
                                        Login Notifications
                                    </Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Get notified when someone logs into your
                                        account
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label className="text-base">
                                        Active Sessions
                                    </Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Manage devices that are logged into your
                                        account
                                    </p>
                                </div>
                                <Button variant="outline">
                                    <Shield className="mr-2 h-4 w-4" />
                                    View Sessions
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
