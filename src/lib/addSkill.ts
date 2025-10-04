import axiosInstance from "@/axios/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface SkillFormData {
    title: string;
    description: string;
    category: string;
    proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    tags: string[];
    exchangeFor?: string[];
    availability: string;
    location: string;
    mode: "Online" | "Offline" | "Both";
}

const addSkill = async (skillData: SkillFormData) => {
    const { data } = await axiosInstance.post("/api/skills", skillData);
    return data;
};

export const useAddSkillMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (skillData: SkillFormData) => addSkill(skillData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skills"] });
            toast.success("Skill posted successfully! 🎉", {
                description:
                    "Your skill is now live and available for exchange.",
            });
        },
        onError: (error: any) => {
            console.error("Error adding skill:", error);
            toast.error("Failed to post skill ❌", {
                description:
                    error?.response?.data?.message || "Please try again later.",
            });
        },
    });
};
