# 🔐 Role-Based Authentication & Authorization System

## Overview

This application implements a comprehensive Role-Based Access Control (RBAC) system with three user roles:

-   **👤 User**: Basic access to platform features
-   **🎓 Instructor**: Can create and manage courses, view students
-   **👑 Admin**: Full system access including user management

## Table of Contents

1. [Features](#features)
2. [User Roles](#user-roles)
3. [Setup & Migration](#setup--migration)
4. [Usage](#usage)
5. [API Reference](#api-reference)
6. [Security Features](#security-features)

---

## Features

### ✨ Authentication Features

-   **Multiple Login Methods**: Email/password, Google OAuth, GitHub OAuth
-   **Account Security**:
    -   Failed login attempt tracking
    -   Automatic account lockout after 5 failed attempts
    -   Escalating lockout duration for repeated violations
-   **Session Management**:
    -   JWT-based sessions
    -   30-day session expiration
    -   Session refresh every 24 hours
-   **Email Verification**: Optional email verification requirement
-   **Password Reset**: Secure password reset flow

### 🔒 Authorization Features

-   **Role-Based Access Control**: Three-tier role hierarchy
-   **Route Protection**: Automatic route access control
-   **Component-Level Guards**: Show/hide UI based on roles
-   **Dynamic Navigation**: Menu items adapt to user role
-   **Permission Checks**: Fine-grained permission utilities

---

## User Roles

### 👤 User (Default Role)

**Permissions:**

-   View and enroll in courses
-   Manage personal profile
-   Post and manage skills
-   Send/receive skill swap requests
-   Chat with other users
-   View wallet and transactions
-   Give and receive reviews

**Dashboard Access:**

-   `/dashboard`
-   `/dashboard/profile`
-   `/dashboard/skills`
-   `/dashboard/requests`
-   `/dashboard/messages`
-   `/dashboard/wallet`
-   `/dashboard/reviews`

### 🎓 Instructor

**Inherits all User permissions, plus:**

-   Create and publish courses
-   Manage course content
-   View enrolled students
-   Access course analytics
-   Manage course pricing

**Additional Dashboard Access:**

-   `/dashboard/courses`
-   `/dashboard/courses/create`
-   `/dashboard/students`
-   `/dashboard/analytics`

### 👑 Admin

**Inherits all Instructor permissions, plus:**

-   Manage all users (view, edit, delete, change roles)
-   View system-wide reports and analytics
-   Configure platform settings
-   Access all courses and content
-   Unlock locked accounts

**Additional Dashboard Access:**

-   `/dashboard/manageUsers`
-   `/dashboard/reports`
-   `/dashboard/system-settings`

---

## Setup & Migration

### 1️⃣ Initial Setup

The User model now includes a `role` field with default value `"user"`. This is automatically applied to new user registrations.

### 2️⃣ Migrate Existing Users

If you have existing users in your database without roles, run the migration script:

```bash
# Navigate to project directory
cd skills-swap-client

# Run migration
node scripts/migrations/add-user-roles.js
```

This will:

-   Add `role: "user"` to all users without a role
-   Display statistics of role distribution
-   Leave existing roles unchanged

### 3️⃣ Promote Users to Admin/Instructor

Use the interactive management tool:

```bash
node scripts/manage-user-role.js
```

Features:

-   Change any user's role
-   List all users with roles
-   Filter users by role
-   Quick promote/demote functions

Or manually in MongoDB:

```javascript
// Promote to admin
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } });

// Promote to instructor
db.users.updateOne(
    { email: "instructor@example.com" },
    { $set: { role: "instructor" } }
);
```

### 4️⃣ User Must Re-login

**Important:** After changing a user's role, they must:

1. Sign out completely
2. Sign in again to get a fresh JWT token with the new role

---

## Usage

### React Hooks

#### `useRBAC()` - Main RBAC Hook

```tsx
import { useRBAC } from "@/hooks/useRBAC";

function MyComponent() {
    const rbac = useRBAC();

    if (rbac.loading) return <div>Loading...</div>;

    return (
        <div>
            <p>Your role: {rbac.userRole}</p>

            {rbac.isAdmin() && <AdminPanel />}
            {rbac.isInstructor() && <InstructorTools />}

            {rbac.hasRole("admin") && <p>You are an admin!</p>}
            {rbac.hasAnyRole(["instructor", "admin"]) && <CourseCreator />}
        </div>
    );
}
```

**Available Methods:**

-   `hasRole(role)` - Check if user has specific role(s)
-   `hasAnyRole(roles)` - Check if user has any of the roles
-   `isAdmin()` - Check if user is admin
-   `isInstructor()` - Check if user is instructor or admin
-   `isVerified()` - Check if email is verified
-   `hasMinimumRole(role)` - Check role hierarchy level
-   `canAccessRoute(route)` - Check route access permission

#### `useRequireRole()` - Require Specific Role

```tsx
import { useRequireRole } from "@/hooks/useRBAC";

function AdminPage() {
    const { loading, authorized } = useRequireRole("admin", {
        redirectTo: "/dashboard",
        requireVerified: true,
    });

    if (loading) return <div>Checking permissions...</div>;
    if (!authorized) return null;

    return <div>Admin content</div>;
}
```

#### `useRequireAdmin()` & `useRequireInstructor()`

```tsx
import { useRequireAdmin, useRequireInstructor } from "@/hooks/useRBAC";

function AdminOnlyPage() {
    useRequireAdmin("/dashboard");
    return <div>Admin content</div>;
}

function InstructorPage() {
    useRequireInstructor("/dashboard");
    return <div>Instructor content</div>;
}
```

### Component Guards

#### `<RoleGuard>` - Conditional Rendering

```tsx
import {
    RoleGuard,
    AdminOnly,
    InstructorOnly,
} from "@/components/auth/RoleGuard";

function Dashboard() {
    return (
        <div>
            {/* Show to specific roles */}
            <RoleGuard role="admin">
                <AdminPanel />
            </RoleGuard>

            {/* Show to multiple roles */}
            <RoleGuard role={["instructor", "admin"]}>
                <CourseManagement />
            </RoleGuard>

            {/* Convenience components */}
            <AdminOnly>
                <UserManagement />
            </AdminOnly>

            <InstructorOnly>
                <CreateCourse />
            </InstructorOnly>

            {/* With fallback */}
            <RoleGuard role="admin" fallback={<p>Admin only</p>}>
                <AdvancedSettings />
            </RoleGuard>
        </div>
    );
}
```

#### `<ProtectedRoute>` - Page-Level Protection

```tsx
import {
    ProtectedRoute,
    AdminRoute,
    InstructorRoute,
} from "@/components/auth/ProtectedRoute";

// In your page component
export default function AdminPage() {
    return (
        <AdminRoute>
            <div>This entire page is protected</div>
        </AdminRoute>
    );
}

// Or with custom configuration
export default function CustomPage() {
    return (
        <ProtectedRoute
            requiredRole={["instructor", "admin"]}
            requireVerified={true}
            fallbackUrl="/dashboard"
        >
            <div>Protected content</div>
        </ProtectedRoute>
    );
}
```

### Utility Functions

```tsx
import {
    hasRole,
    isAdmin,
    isInstructor,
    canAccessRoute,
} from "@/lib/auth/roleGuard";
import { getServerSession } from "next-auth";

// Server-side (API routes, server components)
const session = await getServerSession(authOptions);

if (isAdmin(session)) {
    // Admin-only logic
}

if (hasRole(session, ["instructor", "admin"])) {
    // Instructor or admin logic
}

if (canAccessRoute(session, "/dashboard/courses/create")) {
    // User can access course creation
}
```

---

## API Reference

### Role Guard Functions

| Function                         | Parameters       | Returns          | Description                     |
| -------------------------------- | ---------------- | ---------------- | ------------------------------- |
| `hasRole(session, role)`         | session, role(s) | boolean          | Check if user has specific role |
| `hasAnyRole(session, roles)`     | session, role[]  | boolean          | Check if user has any role      |
| `isAdmin(session)`               | session          | boolean          | Check if user is admin          |
| `isInstructor(session)`          | session          | boolean          | Check if instructor/admin       |
| `isVerified(session)`            | session          | boolean          | Check if email verified         |
| `getUserRole(session)`           | session          | UserRole \| null | Get user's role                 |
| `hasMinimumRole(session, role)`  | session, role    | boolean          | Check role hierarchy            |
| `canAccessRoute(session, route)` | session, route   | boolean          | Check route access              |

### Hook API

#### `useRBAC()`

```typescript
interface UseRBACReturn {
    session: Session | null;
    status: "loading" | "authenticated" | "unauthenticated";
    loading: boolean;
    authenticated: boolean;
    hasRole: (role: UserRole | UserRole[]) => boolean;
    hasAnyRole: (roles: UserRole[]) => boolean;
    isAdmin: () => boolean;
    isInstructor: () => boolean;
    isVerified: () => boolean;
    hasMinimumRole: (role: UserRole) => boolean;
    userRole: UserRole | null;
    userId: string | undefined;
    userName: string | null | undefined;
    userEmail: string | null | undefined;
    canAccessRoute: (route: string) => boolean;
}
```

---

## Security Features

### 🔒 Account Lockout

-   **5 failed login attempts** → 2-hour lockout
-   **10+ failed attempts** → 24-hour lockout
-   Automatic unlock after lockout period expires
-   Admin can manually unlock accounts

### 🔑 Session Security

-   JWT-based authentication
-   Secure HTTP-only cookies
-   30-day session expiration
-   Automatic session refresh every 24 hours
-   Session invalidation on role change (requires re-login)

### 🛡️ Route Protection

All dashboard routes are automatically protected. Access is controlled by:

1. Authentication status
2. User role
3. Email verification (optional)

### 📊 Audit Trail

The system tracks:

-   Last login attempt timestamp
-   Last successful login timestamp
-   Total failed login attempts
-   Account lockout history
-   Role change history (when implemented)

---

## Examples

### Example 1: Instructor Course Creator

```tsx
"use client";

import { useRequireInstructor } from "@/hooks/useRBAC";
import { InstructorRoute } from "@/components/auth/ProtectedRoute";

export default function CreateCoursePage() {
    // Double protection: hook + wrapper
    useRequireInstructor();

    return (
        <InstructorRoute>
            <div>
                <h1>Create New Course</h1>
                {/* Course creation form */}
            </div>
        </InstructorRoute>
    );
}
```

### Example 2: Admin User Management

```tsx
"use client";

import { useRequireAdmin } from "@/hooks/useRBAC";
import { AdminOnly } from "@/components/auth/RoleGuard";

export default function UserManagementPage() {
    const { loading, authorized } = useRequireAdmin();

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <h1>User Management</h1>

            <AdminOnly fallback={<p>Admin access required</p>}>
                <UserTable />
                <RoleChangeControls />
            </AdminOnly>
        </div>
    );
}
```

### Example 3: Conditional UI Elements

```tsx
import { useRBAC } from "@/hooks/useRBAC";
import { RoleGuard } from "@/components/auth/RoleGuard";

function NavigationMenu() {
    const rbac = useRBAC();

    return (
        <nav>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/dashboard/profile">Profile</Link>

            {/* Show only to instructors and admins */}
            <RoleGuard role={["instructor", "admin"]}>
                <Link href="/dashboard/courses">My Courses</Link>
                <Link href="/dashboard/courses/create">Create Course</Link>
            </RoleGuard>

            {/* Show only to admins */}
            {rbac.isAdmin() && (
                <>
                    <Link href="/dashboard/manageUsers">Manage Users</Link>
                    <Link href="/dashboard/reports">Reports</Link>
                </>
            )}
        </nav>
    );
}
```

---

## Troubleshooting

### Issue: Role not updating after database change

**Solution:** User must sign out and sign in again to get a fresh JWT token.

```tsx
import { signOut, signIn } from "next-auth/react";

// Force re-authentication
await signOut({ redirect: false });
await signIn();
```

### Issue: Role shows as "user" for all users

**Possible causes:**

1. Database users don't have `role` field → Run migration script
2. User hasn't logged in since role was added → Clear cookies and re-login
3. NextAuth callbacks not configured properly → Check `[...nextauth]/route.ts`

### Issue: Cannot access instructor/admin routes

**Check:**

1. Database: `db.users.findOne({ email: "user@example.com" })` - verify role field
2. Session: `console.log(session.user.role)` - check what role is in session
3. Clear browser cache and cookies
4. Sign out and sign in again

---

## Best Practices

1. **Always use TypeScript types** for type safety
2. **Protect routes at multiple levels**: Use both hooks and components
3. **Server-side validation**: Always verify permissions in API routes
4. **Graceful degradation**: Provide fallback UI for unauthorized access
5. **Clear user feedback**: Show why access is denied
6. **Audit trail**: Log role changes and permission checks
7. **Regular reviews**: Periodically audit user roles

---

## Support

For issues or questions:

1. Check this README
2. Review the code examples
3. Run the migration scripts
4. Check MongoDB user documents
5. Verify NextAuth configuration

---

**Last Updated:** October 2025
**Version:** 1.0.0
