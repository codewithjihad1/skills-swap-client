import type { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        location?: string;
        rating?: number;
        skillOffered?: string | string[];
        skillWanted?: string | string[];
        role?: "user" | "instructor" | "admin";
        bio?: string;
    }

    interface Session {
        user: {
            id: string;
            location?: string;
            rating?: number;
            skillOffered?: string | string[];
            skillWanted?: string | string[];
            role?: "user" | "instructor" | "admin";
            bio?: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        location?: string;
        rating?: number;
        skillOffered?: string | string[];
        skillWanted?: string | string[];
        role?: "user" | "instructor" | "admin";
        bio?: string;
    }
}
