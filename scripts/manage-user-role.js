/**
 * User Role Management Script
 *
 * Interactive script to promote or change user roles
 *
 * Usage:
 *   node scripts/manage-user-role.js
 */

require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function question(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}

function displayMenu() {
    console.log("\n╔════════════════════════════════════════════╗");
    console.log("║        User Role Management Tool          ║");
    console.log("╚════════════════════════════════════════════╝\n");
    console.log("Choose an action:");
    console.log("  1) Change a specific user's role");
    console.log("  2) List all users with their roles");
    console.log("  3) List users by role");
    console.log("  4) Promote user to admin");
    console.log("  5) Promote user to instructor");
    console.log("  6) Demote user to regular user");
    console.log("  7) Exit\n");
}

async function changeUserRole(User) {
    const email = await question("📧 Enter user email: ");

    const user = await User.findOne({ email });
    if (!user) {
        console.log(`❌ User with email "${email}" not found\n`);
        return;
    }

    console.log(`\n👤 User: ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Current role: ${user.role || "none"}\n`);

    console.log("Select new role:");
    console.log("  1) user (regular user)");
    console.log("  2) instructor (can create courses)");
    console.log("  3) admin (full access)");

    const roleChoice = await question("\nEnter choice (1-3): ");

    const roleMap = { 1: "user", 2: "instructor", 3: "admin" };
    const newRole = roleMap[roleChoice];

    if (!newRole) {
        console.log("❌ Invalid choice\n");
        return;
    }

    const confirm = await question(
        `\n⚠️  Change role from "${
            user.role || "none"
        }" to "${newRole}"? (yes/no): `
    );

    if (confirm.toLowerCase() !== "yes") {
        console.log("❌ Operation cancelled\n");
        return;
    }

    await User.updateOne({ email }, { $set: { role: newRole } });
    console.log(`\n✅ Successfully updated ${email} to role: "${newRole}"`);
    console.log(
        "⚠️  User must sign out and sign in again for changes to take effect.\n"
    );
}

async function listAllUsers(User) {
    const users = await User.find({})
        .select("name email role createdAt")
        .sort({ createdAt: -1 });

    if (users.length === 0) {
        console.log("\n📭 No users found\n");
        return;
    }

    console.log(`\n📋 Total users: ${users.length}\n`);
    console.log(
        "┌────────────────────────────────┬────────────────────────────────┬─────────────┐"
    );
    console.log(
        "│ Name                           │ Email                          │ Role        │"
    );
    console.log(
        "├────────────────────────────────┼────────────────────────────────┼─────────────┤"
    );

    users.forEach((user) => {
        const name = (user.name || "N/A").padEnd(30).substring(0, 30);
        const email = (user.email || "N/A").padEnd(30).substring(0, 30);
        const role = (user.role || "none").padEnd(11);
        console.log(`│ ${name} │ ${email} │ ${role} │`);
    });

    console.log(
        "└────────────────────────────────┴────────────────────────────────┴─────────────┘\n"
    );
}

async function listUsersByRole(User) {
    console.log("\nSelect role to filter:");
    console.log("  1) user");
    console.log("  2) instructor");
    console.log("  3) admin");

    const choice = await question("\nEnter choice (1-3): ");
    const roleMap = { 1: "user", 2: "instructor", 3: "admin" };
    const role = roleMap[choice];

    if (!role) {
        console.log("❌ Invalid choice\n");
        return;
    }

    const users = await User.find({ role })
        .select("name email createdAt")
        .sort({ createdAt: -1 });

    if (users.length === 0) {
        console.log(`\n📭 No users found with role: ${role}\n`);
        return;
    }

    console.log(`\n📋 Users with role "${role}": ${users.length}\n`);
    console.log(
        "┌────────────────────────────────┬────────────────────────────────────────────────┐"
    );
    console.log(
        "│ Name                           │ Email                                          │"
    );
    console.log(
        "├────────────────────────────────┼────────────────────────────────────────────────┤"
    );

    users.forEach((user) => {
        const name = (user.name || "N/A").padEnd(30).substring(0, 30);
        const email = (user.email || "N/A").padEnd(46).substring(0, 46);
        console.log(`│ ${name} │ ${email} │`);
    });

    console.log(
        "└────────────────────────────────┴────────────────────────────────────────────────┘\n"
    );
}

async function promoteToRole(User, targetRole) {
    const email = await question("📧 Enter user email: ");

    const user = await User.findOne({ email });
    if (!user) {
        console.log(`❌ User with email "${email}" not found\n`);
        return;
    }

    if (user.role === targetRole) {
        console.log(`\n⚠️  User is already a ${targetRole}\n`);
        return;
    }

    console.log(`\n👤 User: ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Current role: ${user.role || "none"}`);

    const confirm = await question(
        `\n⚠️  Promote to ${targetRole}? (yes/no): `
    );

    if (confirm.toLowerCase() !== "yes") {
        console.log("❌ Operation cancelled\n");
        return;
    }

    await User.updateOne({ email }, { $set: { role: targetRole } });
    console.log(`\n✅ Successfully promoted ${email} to ${targetRole}`);
    console.log(
        "⚠️  User must sign out and sign in again for changes to take effect.\n"
    );
}

async function main() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error(
                "MONGODB_URI is not defined in environment variables"
            );
        }

        await mongoose.connect(process.env.MONGODB_URI);
        const User = mongoose.model(
            "User",
            new mongoose.Schema({}, { strict: false })
        );

        let running = true;
        while (running) {
            displayMenu();
            const choice = await question("Enter your choice: ");

            switch (choice) {
                case "1":
                    await changeUserRole(User);
                    break;
                case "2":
                    await listAllUsers(User);
                    break;
                case "3":
                    await listUsersByRole(User);
                    break;
                case "4":
                    await promoteToRole(User, "admin");
                    break;
                case "5":
                    await promoteToRole(User, "instructor");
                    break;
                case "6":
                    await promoteToRole(User, "user");
                    break;
                case "7":
                    running = false;
                    console.log("\n👋 Goodbye!\n");
                    break;
                default:
                    console.log("\n❌ Invalid choice. Please try again.\n");
            }
        }

        await mongoose.disconnect();
        rl.close();
    } catch (error) {
        console.error("\n❌ Error:", error.message);
        rl.close();
        process.exit(1);
    }
}

main();
