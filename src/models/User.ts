import mongoose, { Document, Schema } from "mongoose";

// Constants for account lockout configuration
export const LOCKOUT_CONFIG = {
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
    ESCALATION_ATTEMPTS: 10, // Extended lockout after 10 total attempts
    EXTENDED_LOCKOUT_DURATION: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
};

export type UserRole = "user" | "instructor" | "admin";

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password?: string; // Optional for social login users
    image?: string; // Profile image from social providers
    provider?: string; // Social provider (google, github)
    providerId?: string; // ID from social provider
    role: UserRole; // User role for access control
    emailVerified?: Date;
    isVerified: boolean;
    verificationToken?: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    loginAttempts: number;
    lockUntil?: Date;
    totalFailedAttempts: number; // Track total failed attempts for escalation
    lastLoginAttempt?: Date;
    createdAt: Date;
    updatedAt: Date;
    isAccountLocked: boolean;
    lockReason: string; // Reason for lockout
    incLoginAttempts(): Promise<any>;
    resetLoginAttempts(): Promise<any>;
    unlockAccount(): Promise<any>;
    getLockoutInfo(): {
        isLocked: boolean;
        remainingTime?: number;
        reason?: string;
    };
}

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: function (this: IUser) {
                // Password only required for non-social login users
                return !this.provider;
            },
            minlength: [6, "Password must be at least 6 characters long"],
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String, // Profile image URL from social providers
        },
        provider: {
            type: String, // 'google', 'github', etc.
        },
        providerId: {
            type: String, // ID from the social provider
        },
        role: {
            type: String,
            enum: ["user", "instructor", "admin"],
            default: "user",
            required: true,
        },
        emailVerified: {
            type: Date,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date,
        },
        loginAttempts: {
            type: Number,
            default: 0,
        },
        lockUntil: {
            type: Date,
        },
        totalFailedAttempts: {
            type: Number,
            default: 0,
        },
        lastLoginAttempt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

// Virtual field for checking if account is locked
userSchema.virtual("isAccountLocked").get(function (this: IUser) {
    return !!(this.lockUntil && this.lockUntil > new Date());
});

// Virtual field for lock reason
userSchema.virtual("lockReason").get(function (this: IUser) {
    if (!this.isAccountLocked) return "";

    const remainingTime = Math.ceil(
        (this.lockUntil!.getTime() - Date.now()) / (1000 * 60)
    );

    if (this.totalFailedAttempts >= LOCKOUT_CONFIG.ESCALATION_ATTEMPTS) {
        return `Account temporarily locked due to suspicious activity. Please try again in ${remainingTime} minutes or contact support.`;
    } else {
        return `Account locked after multiple failed login attempts. Please try again in ${remainingTime} minutes.`;
    }
});

// Instance method to handle login attempts
userSchema.methods.incLoginAttempts = function (this: IUser) {
    const now = new Date();
    this.lastLoginAttempt = now;

    // If we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < now) {
        return this.updateOne({
            $unset: { lockUntil: 1 },
            $set: {
                loginAttempts: 1,
                lastLoginAttempt: now,
            },
            $inc: { totalFailedAttempts: 1 },
        });
    }

    const updates: {
        $inc: { loginAttempts: number; totalFailedAttempts: number };
        $set: { lastLoginAttempt: Date; lockUntil?: Date };
    } = {
        $inc: { loginAttempts: 1, totalFailedAttempts: 1 },
        $set: { lastLoginAttempt: now },
    };

    // Determine lockout duration based on total failed attempts
    let lockoutDuration = LOCKOUT_CONFIG.LOCKOUT_DURATION;
    if (this.totalFailedAttempts >= LOCKOUT_CONFIG.ESCALATION_ATTEMPTS) {
        lockoutDuration = LOCKOUT_CONFIG.EXTENDED_LOCKOUT_DURATION;
    }

    // Lock account after max attempts
    if (
        this.loginAttempts + 1 >= LOCKOUT_CONFIG.MAX_LOGIN_ATTEMPTS &&
        !this.isAccountLocked
    ) {
        updates.$set.lockUntil = new Date(Date.now() + lockoutDuration);
    }

    return this.updateOne(updates);
};

// Reset login attempts on successful login
userSchema.methods.resetLoginAttempts = function (this: IUser) {
    return this.updateOne({
        $unset: { loginAttempts: 1, lockUntil: 1 },
        $set: { lastLoginAttempt: new Date() },
    });
};

// Manual account unlock (for admin use)
userSchema.methods.unlockAccount = function (this: IUser) {
    return this.updateOne({
        $unset: { loginAttempts: 1, lockUntil: 1 },
        $set: { lastLoginAttempt: new Date() },
    });
};

// Get lockout information
userSchema.methods.getLockoutInfo = function (this: IUser) {
    if (!this.isAccountLocked) {
        return { isLocked: false };
    }

    const remainingTime = Math.ceil(
        (this.lockUntil!.getTime() - Date.now()) / (1000 * 60)
    );

    return {
        isLocked: true,
        remainingTime,
        reason: this.lockReason,
    };
};

// Index for performance
userSchema.index({ lockUntil: 1 });

export default mongoose.models.User ||
    mongoose.model<IUser>("User", userSchema);
