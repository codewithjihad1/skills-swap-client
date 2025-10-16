import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// Connect to MongoDB (if not already connected)
if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI!);
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt" as const,
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "john@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                try {
                    // Find user by email
                    const user = await User.findOne({
                        email: credentials.email,
                    });
                    if (!user) {
                        throw new Error("No user found with this email");
                    }

                    // Check if account is locked and get detailed info
                    const lockoutInfo = user.getLockoutInfo();
                    if (lockoutInfo.isLocked) {
                        throw new Error(
                            lockoutInfo.reason ||
                                `Account locked. Try again in ${lockoutInfo.remainingTime} minutes`
                        );
                    }

                    // Check password
                    const isValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if (!isValid) {
                        // Increment failed login attempts
                        await user.incLoginAttempts();

                        // Check if this attempt caused a lockout
                        const updatedUser = await User.findById(user._id);
                        if (updatedUser?.isAccountLocked) {
                            const newLockoutInfo = updatedUser.getLockoutInfo();
                            throw new Error(
                                newLockoutInfo.reason ||
                                    "Account has been temporarily locked due to multiple failed login attempts"
                            );
                        }

                        throw new Error("Invalid password");
                    }

                    // Reset login attempts on successful login
                    if (user.loginAttempts > 0) {
                        await user.resetLoginAttempts();
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        role: user.role || "user",
                        isVerified: user.isVerified,
                    };
                } catch (error) {
                    console.error("Authorization error:", error);

                    // Log security events for monitoring
                    if (error instanceof Error) {
                        if (
                            error.message.includes("Account locked") ||
                            error.message.includes("Invalid password")
                        ) {
                            console.warn(
                                `Security event: ${error.message} for email: ${credentials.email}`
                            );
                        }
                    }

                    throw error;
                }
            },
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                // Handle social login (Google/GitHub)
                if (
                    account?.provider === "google" ||
                    account?.provider === "github"
                ) {
                    if (!user.email) {
                        console.error("No email provided by social provider");
                        return false;
                    }

                    // Check if user exists in our database
                    let existingUser = await User.findOne({
                        email: user.email,
                    });

                    if (!existingUser) {
                        // Create new user for social login
                        existingUser = await User.create({
                            name: user.name || profile?.name || "Unknown User",
                            email: user.email,
                            image: user.image,
                            role: "user", // Default role for new social users
                            isVerified: true, // Social accounts are considered verified
                            provider: account.provider,
                            providerId: account.providerAccountId,
                            // No password needed for social login
                        });
                        console.log(
                            `New social user created: ${user.email} via ${account.provider}`
                        );
                    } else {
                        // Update existing user with social provider info if not already set
                        if (!existingUser.provider) {
                            existingUser.provider = account.provider;
                            existingUser.providerId = account.providerAccountId;
                            existingUser.isVerified = true;
                            existingUser.image =
                                user.image || existingUser.image;
                            await existingUser.save();
                            console.log(
                                `Updated existing user with social provider: ${user.email}`
                            );
                        }
                    }

                    // Update the user object with our database user info
                    user.id = existingUser._id.toString();
                    (user as any).isVerified = existingUser.isVerified;
                    (user as any).role = existingUser.role || "user";
                }

                return true;
            } catch (error) {
                console.error("SignIn callback error:", error);
                return false;
            }
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role || "user";
                token.isVerified = (
                    user as { isVerified?: boolean }
                ).isVerified;

                // Store provider info in token for social logins
                if (account?.provider) {
                    token.provider = account.provider;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
                (session.user as any).role = token.role || "user";
                (session.user as any).isVerified = token.isVerified;
                (session.user as any).provider = token.provider;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
