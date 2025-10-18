/**
 * Database Migration Script: Add Role Field to Users
 *
 * This script adds the 'role' field to all existing users in the database.
 * Run this script after updating the User model.
 *
 * Usage:
 *   node scripts/migrations/add-user-roles.js
 */

require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

async function migrateUserRoles() {
    try {
        // Check environment variables
        if (!process.env.MONGODB_URI) {
            throw new Error(
                "MONGODB_URI is not defined in environment variables"
            );
        }

        console.log("🔄 Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB\n");

        // Define flexible schema for migration
        const User = mongoose.model(
            "User",
            new mongoose.Schema({}, { strict: false })
        );

        // Count users without role field
        const usersWithoutRole = await User.countDocuments({
            role: { $exists: false },
        });
        console.log(`📊 Found ${usersWithoutRole} users without a role field`);

        if (usersWithoutRole === 0) {
            console.log(
                "✅ All users already have roles. No migration needed.\n"
            );
            await mongoose.disconnect();
            return;
        }

        console.log("⏳ Starting migration...\n");

        // Update all users without a role field to 'user'
        const result = await User.updateMany(
            { role: { $exists: false } },
            { $set: { role: "user" } }
        );

        console.log(
            `✅ Successfully updated ${result.modifiedCount} users with default role: "user"\n`
        );

        // Optional: Promote specific users to admin or instructor
        console.log("📝 Optional: Promote specific users");
        console.log(
            "   Uncomment the sections below in the script to promote users:\n"
        );

        // EXAMPLE: Promote specific email to admin
        // const adminEmail = 'admin@example.com';
        // const adminResult = await User.updateOne(
        //   { email: adminEmail },
        //   { $set: { role: 'admin' } }
        // );
        // if (adminResult.modifiedCount > 0) {
        //   console.log(`✅ Promoted ${adminEmail} to admin`);
        // } else {
        //   console.log(`⚠️  User ${adminEmail} not found or already an admin`);
        // }

        // EXAMPLE: Promote multiple users to instructor
        // const instructorEmails = ['instructor1@example.com', 'instructor2@example.com'];
        // const instructorResult = await User.updateMany(
        //   { email: { $in: instructorEmails } },
        //   { $set: { role: 'instructor' } }
        // );
        // console.log(`✅ Promoted ${instructorResult.modifiedCount} users to instructor`);

        // Display final statistics
        console.log("\n📊 Final role distribution:");
        const roleStats = await User.aggregate([
            { $group: { _id: "$role", count: { $sum: 1 } } },
            { $sort: { _id: 1 } },
        ]);

        console.log("   ┌─────────────┬───────┐");
        console.log("   │ Role        │ Count │");
        console.log("   ├─────────────┼───────┤");
        roleStats.forEach((stat) => {
            const role = stat._id || "undefined";
            const count = stat.count.toString();
            console.log(`   │ ${role.padEnd(11)} │ ${count.padStart(5)} │`);
        });
        console.log("   └─────────────┴───────┘\n");

        console.log("✅ Migration completed successfully!");
        console.log(
            "⚠️  Important: Users must sign out and sign in again for role changes to take effect.\n"
        );

        await mongoose.disconnect();
        console.log("✅ Disconnected from MongoDB");
    } catch (error) {
        console.error("❌ Migration failed:", error.message);
        console.error(error);
        process.exit(1);
    }
}

// Run migration
console.log("╔════════════════════════════════════════════╗");
console.log("║  User Role Migration Script                ║");
console.log("║  Adding role field to existing users       ║");
console.log("╚════════════════════════════════════════════╝\n");

migrateUserRoles();
