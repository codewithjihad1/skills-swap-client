# Quick Start: Role-Based System Migration

## 🚀 Quick Setup (5 Minutes)

### Step 1: Update Environment Variables

Ensure your `.env.local` has:

```env
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=your-mongodb-connection-string
```

### Step 2: Update Existing Users in Database

**Option A: Using MongoDB Compass**

1. Open MongoDB Compass
2. Connect to your database
3. Navigate to `users` collection
4. Find user you want to make admin:
    - Click on the document
    - Add field: `role: "admin"`
    - Save

**Option B: Using MongoDB Shell**

```javascript
// Connect to your database
use your_database_name

// Make a user admin
db.users.updateOne(
    { email: "youremail@example.com" },
    { $set: { role: "admin" } }
)

// Make a user instructor
db.users.updateOne(
    { email: "instructor@example.com" },
    { $set: { role: "instructor" } }
)

// Verify
db.users.find({ role: { $exists: true } })
```

**Option C: Create Seed Script**

```javascript
// scripts/assign-roles.js
const mongoose = require("mongoose");
const User = require("../src/models/User");

async function assignRoles() {
    await mongoose.connect(process.env.MONGODB_URI);

    // Assign admin role
    await User.findOneAndUpdate(
        { email: "admin@example.com" },
        { $set: { role: "admin" } }
    );

    // Assign instructor role
    await User.findOneAndUpdate(
        { email: "instructor@example.com" },
        { $set: { role: "instructor" } }
    );

    console.log("✅ Roles assigned successfully");
    process.exit(0);
}

assignRoles().catch(console.error);
```

Run it:

```bash
node scripts/assign-roles.js
```

### Step 3: Restart Development Server

```bash
# Stop the server (Ctrl+C)
# Start again
pnpm dev
```

### Step 4: Test Login

**Test as User:**

1. Login with regular user account
2. You'll be redirected to `/dashboard`
3. See blue "User Account" badge
4. Try accessing `/dashboard/manageUsers` → Should redirect to `/dashboard`

**Test as Instructor:**

1. Login with instructor account
2. You'll be redirected to `/dashboard/courses`
3. See purple "Instructor Account" badge
4. Can access `/dashboard/courses`

**Test as Admin:**

1. Login with admin account
2. You'll be redirected to `/dashboard/manageUsers`
3. See red "Admin Account" badge with shield icon
4. Can access all routes

---

## 📋 Default Test Accounts (Create These)

```javascript
// Run this in MongoDB shell or create via signup

// 1. Create Admin
{
    name: "Admin User",
    email: "admin@skillswap.com",
    password: "hashed_password",
    role: "admin",
    isVerified: true
}

// 2. Create Instructor
{
    name: "John Instructor",
    email: "instructor@skillswap.com",
    password: "hashed_password",
    role: "instructor",
    isVerified: true
}

// 3. Create Regular User
{
    name: "Jane User",
    email: "user@skillswap.com",
    password: "hashed_password",
    role: "user",
    isVerified: true
}
```

---

## 🎯 Key Routes to Test

### All Users Can Access:

-   `/` - Home page
-   `/about` - About page
-   `/explore-skills` - Explore skills
-   `/dashboard` - Personal dashboard
-   `/profile` - Profile page
-   `/matchmaking` - Matchmaking
-   `/messages` - Messages
-   `/auth/signin` - Sign in (redirects if authenticated)

### Instructor Only:

-   `/dashboard/courses` - Course management
-   Can also access all user routes

### Admin Only:

-   `/dashboard/manageUsers` - User management
-   Can also access all instructor and user routes

---

## 🔍 Verify Installation

### Check 1: Database Schema

```javascript
// MongoDB shell
db.users.findOne()

// Should see:
{
    _id: ObjectId("..."),
    name: "...",
    email: "...",
    role: "user" or "instructor" or "admin",  // ✅ This field should exist
    // ... other fields
}
```

### Check 2: NextAuth Session

```typescript
// In any component
import { useSession } from "next-auth/react";

const { data: session } = useSession();
console.log("Role:", (session?.user as any)?.role);
// Should log: "user", "instructor", or "admin"
```

### Check 3: Middleware Protection

```bash
# Try accessing admin route without being admin
# Should redirect to /dashboard
curl -I http://localhost:3000/dashboard/manageUsers
```

---

## 🐛 Common Issues & Fixes

### Issue 1: "Role is undefined"

**Cause**: Old JWT token doesn't have role
**Fix**:

1. Clear browser cookies
2. Sign out
3. Sign in again

### Issue 2: "Can't access instructor routes"

**Cause**: Database doesn't have role field
**Fix**:

```javascript
// Update all users to have default role
db.users.updateMany({ role: { $exists: false } }, { $set: { role: "user" } });
```

### Issue 3: "Middleware redirect loop"

**Cause**: Missing NEXTAUTH_SECRET
**Fix**: Add to `.env.local`:

```env
NEXTAUTH_SECRET=generate-a-random-32-char-string
```

### Issue 4: "Role doesn't persist after refresh"

**Cause**: JWT not updating properly
**Fix**:

1. Restart Next.js dev server
2. Clear browser cache
3. Sign in again

---

## 📝 Quick Checklist

Before deploying to production:

-   [ ] All existing users have `role` field (default: "user")
-   [ ] At least one admin account created
-   [ ] NEXTAUTH_SECRET is set and secure (32+ characters)
-   [ ] Tested all three roles (user, instructor, admin)
-   [ ] Verified middleware redirects work correctly
-   [ ] Admin can access user management page
-   [ ] Instructor can access courses page
-   [ ] Regular users can't access admin/instructor routes
-   [ ] Role badges display correctly in dashboard
-   [ ] Session includes role information
-   [ ] TypeScript compilation has no errors

---

## 🎉 Success Indicators

You'll know it's working when:

1. ✅ Login redirects to role-appropriate page
2. ✅ Dashboard shows role-specific content
3. ✅ Role badge displays in header
4. ✅ Unauthorized routes redirect properly
5. ✅ No TypeScript errors
6. ✅ Session.user.role is accessible in components

---

## 📞 Need Help?

Check these files for implementation details:

-   `src/models/User.ts` - User schema with role
-   `src/middleware.ts` - Route protection logic
-   `src/app/api/auth/[...nextauth]/route.ts` - Auth configuration
-   `ROLE_BASED_SYSTEM.md` - Complete documentation

---

**Ready to go! 🚀**

Start by creating test users with different roles and logging in to see the role-based dashboards in action.
