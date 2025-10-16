# Role-Based Authentication & Dashboard System

## Overview

Complete role-based access control (RBAC) system with three user types: **User**, **Instructor**, and **Admin**. Each role has distinct permissions, dashboard views, and access to specific routes.

---

## 🎭 User Roles

### 1. **User** (Default Role)

-   **Description**: Standard users who can exchange skills
-   **Permissions**:
    -   Access personal dashboard
    -   View and manage profile
    -   Browse matchmaking
    -   Exchange messages
    -   Manage skills and requests
-   **Dashboard Features**:
    -   Skill wallet tracking
    -   Activity overview
    -   Match suggestions
    -   Inbox messaging
    -   Profile header

### 2. **Instructor**

-   **Description**: Users who can create and manage courses
-   **Permissions**:
    -   All User permissions
    -   Create and manage courses
    -   Track student progress
    -   View student enrollments
    -   Manage class schedules
-   **Dashboard Features**:
    -   Course management interface
    -   Student statistics
    -   Earnings tracking
    -   Upcoming classes schedule
    -   Student activity monitoring

### 3. **Admin**

-   **Description**: System administrators with full control
-   **Permissions**:
    -   All Instructor and User permissions
    -   User management (view, edit, suspend)
    -   System monitoring
    -   Access control management
    -   Review pending approvals
    -   Handle reported issues
-   **Dashboard Features**:
    -   User management interface
    -   System health monitoring
    -   Pending actions queue
    -   System alerts
    -   User statistics

---

## 📁 Files Modified/Created

### Backend/Models

1. **`src/models/User.ts`**
    - Added `role` field with type: `"user" | "instructor" | "admin"`
    - Default value: `"user"`
    - Type export: `UserRole`

### Authentication

2. **`src/app/api/auth/[...nextauth]/route.ts`**

    - Updated authorize callback to include `role`
    - Modified JWT callback to store role in token
    - Updated session callback to include role in session
    - Social login users default to "user" role

3. **`src/types/next-auth.d.ts`**
    - Extended User interface with role field
    - Extended Session interface with role field
    - Extended JWT interface with role field

### Middleware

4. **`src/middleware.ts`**
    - Added `adminRoutes` array for admin-only pages
    - Added `instructorRoutes` array for instructor pages
    - Role-based redirect logic after authentication
    - Role-based access control for protected routes
    - Prevents unauthorized access to role-specific routes

### Dashboard Components

5. **`src/components/dashboard/RoleBasedDashboard.tsx`**

    - Main router component that selects dashboard based on role
    - Loading state with spinner
    - Authentication check

6. **`src/components/dashboard/UserDashboard.tsx`**

    - User-specific dashboard with tabs
    - Skill wallet, activities, matches, messages
    - Profile header integration

7. **`src/components/dashboard/InstructorDashboard.tsx`**

    - Instructor-specific dashboard
    - Course statistics
    - Upcoming classes
    - Student activity tracking
    - Earnings overview

8. **`src/components/dashboard/AdminDashboard.tsx`**
    - Admin-specific dashboard
    - User management overview
    - System health monitoring
    - Pending actions
    - System alerts

### Pages

9. **`src/app/(dashboard)/dashboard/page.tsx`**

    - Simplified to render RoleBasedDashboard component
    - Automatic role detection and routing

10. **`src/app/(dashboard)/dashboard/manageUsers/page.tsx`**

    - Admin-only user management page
    - User statistics cards
    - User table with role and status badges
    - Role-based access check

11. **`src/app/(dashboard)/dashboard/courses/page.tsx`**
    - Instructor/Admin course management page
    - Course cards with progress tracking
    - Student count per course
    - Role-based access check

---

## 🔐 Middleware Protection

### Protected Routes

All users must be authenticated:

```typescript
/dashboard, /profile, /matchmaking, /messages, /skills, /requests, /setting
```

### Admin-Only Routes

Only users with `role: "admin"`:

```typescript
/dashboard/manageUsers, /dashboard/admin, /admin
```

### Instructor Routes

Users with `role: "instructor"` or `role: "admin"`:

```typescript
/dashboard/courses, /dashboard/students, /instructor
```

### Redirect Logic

After successful authentication:

-   **Admin** → `/dashboard/manageUsers`
-   **Instructor** → `/dashboard/courses`
-   **User** → `/dashboard`

---

## 🎨 Dashboard Features by Role

### User Dashboard

| Feature        | Description                        |
| -------------- | ---------------------------------- |
| Overview Tab   | Recent swaps and upcoming sessions |
| Wallet Tab     | Credit balance and transactions    |
| Matches Tab    | Skill match suggestions            |
| Messages Tab   | Conversation inbox                 |
| Profile Header | User info with role badge          |

### Instructor Dashboard

| Feature      | Description                          |
| ------------ | ------------------------------------ |
| Stats Cards  | Students, courses, ratings, earnings |
| Overview     | Next 3 classes + recent activity     |
| Classes Tab  | All upcoming classes with details    |
| Activity Tab | Student completions and enrollments  |
| Purple Theme | Distinct visual identity             |

### Admin Dashboard

| Feature          | Description                                           |
| ---------------- | ----------------------------------------------------- |
| Stats Grid       | Total users, active users, instructors, system health |
| Pending Actions  | Instructor applications, reports, verifications       |
| System Alerts    | Warnings, errors, info messages                       |
| User Management  | View all users with role/status badges                |
| Red/Orange Theme | Distinct admin visual identity                        |

---

## 🚀 Usage Guide

### Assigning Roles

#### During User Creation

```typescript
// In signup or user creation
await User.create({
    name: "John Doe",
    email: "john@example.com",
    password: hashedPassword,
    role: "user", // or "instructor" or "admin"
});
```

#### Updating Existing User

```typescript
// Update user role (admin action)
await User.findByIdAndUpdate(userId, {
    role: "instructor",
});
```

### Accessing Role in Components

```typescript
import { useSession } from "next-auth/react";

export default function MyComponent() {
    const { data: session } = useSession();
    const userRole = (session?.user as any)?.role;

    if (userRole === "admin") {
        // Show admin features
    }

    return <div>Role: {userRole}</div>;
}
```

### Creating Role-Protected Pages

```typescript
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminOnlyPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;

        const userRole = (session?.user as any)?.role;
        if (!session || userRole !== "admin") {
            router.push("/dashboard");
        }
    }, [session, status, router]);

    return <div>Admin Content</div>;
}
```

---

## 🧪 Testing the Role System

### Test Case 1: User Login

1. Create account (role: "user")
2. Sign in
3. **Expected**: Redirect to `/dashboard`
4. **Expected**: See User Dashboard with blue badge
5. Try to access `/dashboard/manageUsers`
6. **Expected**: Redirect back to `/dashboard`

### Test Case 2: Instructor Login

1. Update user role to "instructor" in database
2. Sign in
3. **Expected**: Redirect to `/dashboard/courses`
4. **Expected**: See Instructor Dashboard with purple badge
5. Access `/dashboard/courses`
6. **Expected**: See course management interface

### Test Case 3: Admin Login

1. Update user role to "admin" in database
2. Sign in
3. **Expected**: Redirect to `/dashboard/manageUsers`
4. **Expected**: See Admin Dashboard with red badge
5. Access `/dashboard/courses`
6. **Expected**: Can access (admin can access instructor routes)
7. Access `/dashboard/manageUsers`
8. **Expected**: See user management interface

### Test Case 4: Role-Based Access

```bash
# As User
GET /dashboard ✅ (allowed)
GET /dashboard/courses ❌ (redirect to /dashboard)
GET /dashboard/manageUsers ❌ (redirect to /dashboard)

# As Instructor
GET /dashboard ✅ (allowed)
GET /dashboard/courses ✅ (allowed)
GET /dashboard/manageUsers ❌ (redirect to /dashboard)

# As Admin
GET /dashboard ✅ (allowed)
GET /dashboard/courses ✅ (allowed)
GET /dashboard/manageUsers ✅ (allowed)
```

---

## 🎯 Visual Identifiers

### Role Badges

-   **User**: Blue badge with "User Account"
-   **Instructor**: Purple badge with "Instructor Account"
-   **Admin**: Red badge with "Admin Account" + ShieldCheck icon

### Dashboard Themes

-   **User**: Gray-Blue gradient background
-   **Instructor**: Purple-Blue gradient background
-   **Admin**: Red-Orange gradient background

---

## 🔧 Database Setup

### Manual Role Assignment (MongoDB)

```javascript
// Using MongoDB shell or Compass
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } });

db.users.updateOne(
    { email: "instructor@example.com" },
    { $set: { role: "instructor" } }
);
```

### Seed Script Example

```javascript
// scripts/seed-roles.js
const User = require("./models/User");

async function seedRoles() {
    // Create Admin
    await User.findOneAndUpdate(
        { email: "admin@skillswap.com" },
        { role: "admin" },
        { upsert: false }
    );

    // Create Instructor
    await User.findOneAndUpdate(
        { email: "instructor@skillswap.com" },
        { role: "instructor" },
        { upsert: false }
    );

    console.log("Roles assigned successfully");
}
```

---

## 🛡️ Security Considerations

1. **Middleware Protection**: All role checks happen at middleware level (server-side)
2. **JWT Tokens**: Role stored in JWT token for fast access
3. **Database Validation**: Role enum in schema prevents invalid values
4. **Session Verification**: Components re-check role from session
5. **No Client-Side Bypass**: Redirects happen server-side via middleware

---

## 📊 Role Permissions Matrix

| Feature               | User | Instructor | Admin |
| --------------------- | ---- | ---------- | ----- |
| View Dashboard        | ✅   | ✅         | ✅    |
| Manage Profile        | ✅   | ✅         | ✅    |
| Skill Matchmaking     | ✅   | ✅         | ✅    |
| Messaging             | ✅   | ✅         | ✅    |
| Create Courses        | ❌   | ✅         | ✅    |
| View Course Analytics | ❌   | ✅         | ✅    |
| Manage Students       | ❌   | ✅         | ✅    |
| User Management       | ❌   | ❌         | ✅    |
| System Monitoring     | ❌   | ❌         | ✅    |
| Role Assignment       | ❌   | ❌         | ✅    |

---

## 🚨 Troubleshooting

### Issue: Role not showing after login

**Solution**: Clear browser cookies and JWT tokens, then re-login

### Issue: Getting redirected from instructor routes

**Solution**: Check database that user role is "instructor" or "admin"

### Issue: Admin badge not appearing

**Solution**: Verify `role` field in database is exactly "admin" (lowercase)

### Issue: Middleware redirect loop

**Solution**: Check NEXTAUTH_SECRET is set in `.env.local`

---

## 🔄 Future Enhancements

-   [ ] Role-based navigation sidebar
-   [ ] Dynamic permission system
-   [ ] Role assignment UI for admins
-   [ ] Instructor application workflow
-   [ ] Role-based email notifications
-   [ ] Audit log for role changes
-   [ ] Multi-role support (user can have multiple roles)
-   [ ] Custom permission sets per role

---

**Last Updated**: October 16, 2025
**Version**: 1.0.0
**Authors**: Skills Swap Development Team
