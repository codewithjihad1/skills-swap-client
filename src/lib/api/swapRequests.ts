import axiosInstance from "@/axios/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Types
export interface SwapRequest {
    _id: string;
    requester: {
        _id: string;
        name: string;
        email: string;
        avatar?: string;
    };
    skillOffered: {
        _id: string;
        title: string;
        category: string;
        description?: string;
    };
    skillProvider: {
        _id: string;
        name: string;
        email: string;
        avatar?: string;
    };
    skillRequested: {
        _id: string;
        title: string;
        category: string;
        description?: string;
    };
    status: "pending" | "accepted" | "rejected" | "completed" | "cancelled";
    message?: string;
    responseMessage?: string;
    respondedAt?: string;
    completedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateSwapRequestData {
    requester: string;
    skillOffered: string;
    skillProvider: string;
    skillRequested: string;
    message?: string;
}

export interface RespondToSwapRequestData {
    status: "accepted" | "rejected";
    responseMessage?: string;
}

// API Functions
const createSwapRequest = async (
    data: CreateSwapRequestData
): Promise<SwapRequest> => {
    const response = await axiosInstance.post("/api/swap-requests", data);
    return response.data.data;
};

const getSwapRequests = async (
    userId: string,
    type?: "received" | "sent",
    status?: string
): Promise<SwapRequest[]> => {
    const params = new URLSearchParams();
    if (type) params.append("type", type);
    if (status) params.append("status", status);

    const response = await axiosInstance.get(
        `/api/swap-requests/user/${userId}?${params.toString()}`
    );
    return response.data.data;
};

const getSwapRequestById = async (id: string): Promise<SwapRequest> => {
    const response = await axiosInstance.get(`/api/swap-requests/${id}`);
    return response.data.data;
};

const respondToSwapRequest = async (
    id: string,
    data: RespondToSwapRequestData
): Promise<SwapRequest> => {
    const response = await axiosInstance.patch(
        `/api/swap-requests/${id}/respond`,
        data
    );
    return response.data.data;
};

const completeSwapRequest = async (id: string): Promise<SwapRequest> => {
    const response = await axiosInstance.patch(
        `/api/swap-requests/${id}/complete`
    );
    return response.data.data;
};

const cancelSwapRequest = async (id: string): Promise<SwapRequest> => {
    const response = await axiosInstance.patch(
        `/api/swap-requests/${id}/cancel`
    );
    return response.data.data;
};

const getSwapRequestStats = async (userId: string) => {
    const response = await axiosInstance.get(
        `/api/swap-requests/user/${userId}/stats`
    );
    return response.data.data;
};

// React Query Hooks

// Hook to create swap request
export const useCreateSwapRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createSwapRequest,
        onSuccess: () => {
            toast.success("Swap request sent successfully!", {
                description: "You'll be notified when they respond.",
            });
            queryClient.invalidateQueries({ queryKey: ["swapRequests"] });
            queryClient.invalidateQueries({ queryKey: ["swapRequestStats"] });
        },
        onError: (error: any) => {
            console.error("Error creating swap request:", error);
            toast.error("Failed to send swap request", {
                description:
                    error?.response?.data?.error || "Please try again later.",
            });
        },
    });
};

// Hook to get swap requests
export const useSwapRequests = (
    userId: string | undefined,
    type?: "received" | "sent",
    status?: string
) => {
    return useQuery({
        queryKey: ["swapRequests", userId, type, status],
        queryFn: () => getSwapRequests(userId!, type, status),
        enabled: !!userId,
        refetchInterval: 30000, // Refetch every 30 seconds
    });
};

// Hook to get single swap request
export const useSwapRequest = (id: string | undefined) => {
    return useQuery({
        queryKey: ["swapRequest", id],
        queryFn: () => getSwapRequestById(id!),
        enabled: !!id,
    });
};

// Hook to respond to swap request
export const useRespondToSwapRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: RespondToSwapRequestData;
        }) => respondToSwapRequest(id, data),
        onSuccess: (data) => {
            const statusText =
                data.status === "accepted" ? "accepted" : "rejected";
            toast.success(`Swap request ${statusText}!`, {
                description:
                    data.status === "accepted"
                        ? "You can now start coordinating the skill swap."
                        : "The requester has been notified.",
            });
            queryClient.invalidateQueries({ queryKey: ["swapRequests"] });
            queryClient.invalidateQueries({ queryKey: ["swapRequestStats"] });
        },
        onError: (error: any) => {
            console.error("Error responding to swap request:", error);
            toast.error("Failed to respond to swap request", {
                description:
                    error?.response?.data?.error || "Please try again later.",
            });
        },
    });
};

// Hook to complete swap request
export const useCompleteSwapRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: completeSwapRequest,
        onSuccess: () => {
            toast.success("Swap request marked as completed! 🎉", {
                description:
                    "Congratulations on your successful skill exchange!",
            });
            queryClient.invalidateQueries({ queryKey: ["swapRequests"] });
            queryClient.invalidateQueries({ queryKey: ["swapRequestStats"] });
        },
        onError: (error: any) => {
            console.error("Error completing swap request:", error);
            toast.error("Failed to complete swap request", {
                description:
                    error?.response?.data?.error || "Please try again later.",
            });
        },
    });
};

// Hook to cancel swap request
export const useCancelSwapRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cancelSwapRequest,
        onSuccess: () => {
            toast.success("Swap request cancelled", {
                description: "The swap request has been cancelled.",
            });
            queryClient.invalidateQueries({ queryKey: ["swapRequests"] });
            queryClient.invalidateQueries({ queryKey: ["swapRequestStats"] });
        },
        onError: (error: any) => {
            console.error("Error cancelling swap request:", error);
            toast.error("Failed to cancel swap request", {
                description:
                    error?.response?.data?.error || "Please try again later.",
            });
        },
    });
};

// Hook to get swap request statistics
export const useSwapRequestStats = (userId: string | undefined) => {
    return useQuery({
        queryKey: ["swapRequestStats", userId],
        queryFn: () => getSwapRequestStats(userId!),
        enabled: !!userId,
    });
};
