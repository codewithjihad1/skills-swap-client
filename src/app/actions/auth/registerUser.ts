"use server";

import User from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// Connect to MongoDB
if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI!);
}

interface RegisterUserPayload {
    name: string;
    email: string;
    password: string;
    role?: "user" | "instructor";
}

export const registerUser = async (payload: RegisterUserPayload) => {
    try {
        const { name, email, password, role = "user" } = payload;

        // Validate input
        if (!name || !email || !password) {
            throw new Error("All fields are required");
        }

        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters long");
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            throw new Error("User already exists with this email");
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");

        // Create new user
        const newUser = new User({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            role: role,
            verificationToken,
            isVerified: false,
            loginAttempts: 0,
        });

        const result = await newUser.save();

        // Return user without password
        return {
            success: true,
            user: {
                id: result._id.toString(),
                name: result.name,
                email: result.email,
                isVerified: result.isVerified,
            },
        };
    } catch (error) {
        console.error("Registration error:", error);
        return {
            success: false,
            error:
                error instanceof Error ? error.message : "Registration failed",
        };
    }
};
