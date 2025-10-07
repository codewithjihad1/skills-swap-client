import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const truncateText = (input: string) =>
    input?.length > 100 ? `${input.substring(0, 90)}...` : input;
