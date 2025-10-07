import axiosInstance from "@/axios/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { email } from "zod";

// Types
export interface UserProfile {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
    skills: Array<{
        _id: string;
        title: string;
        category: string;
        proficiency: string;
        description?: string;
        tags?: string[];
    }>;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateProfileData {
    name?: string;
    bio?: string;
    avatar?: string;
}

// Get user profile by email
const getUserProfile = async (email: string): Promise<UserProfile> => {
    const { data } = await axiosInstance.get(`/api/users/email/${email}`);
    return data;
};

// Update user profile
const updateUserProfile = async (
    userId: string,
    profileData: UpdateProfileData
): Promise<UserProfile> => {
    const { data } = await axiosInstance.put(
        `/api/users/${userId}`,
        profileData
    );
    return data.user;
};

// Hook to get user profile
export const useUserProfile = (email: string | undefined) => {
    return useQuery({
        queryKey: ["userProfile", email],
        queryFn: () => getUserProfile(email!),
        enabled: !!email, // Only run if email exists
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
    });
};

// Hook to update user profile
export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            userId,
            profileData,
        }: {
            userId: string;
            profileData: UpdateProfileData;
        }) => updateUserProfile(userId, profileData),
        onSuccess: (data, variables) => {
            // Invalidate and refetch user profile
            queryClient.invalidateQueries({
                queryKey: ["userProfile", variables.userId],
            });

            toast.success("Profile updated successfully! 🎉", {
                description: "Your changes have been saved.",
            });
        },
        onError: (error: any) => {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile ❌", {
                description:
                    error?.response?.data?.error || "Please try again later.",
            });
        },
    });
};
