# 🚀 Quick Start: Role-Based Authentication

## Step 1: Run the Migration (Required for existing users)

```bash
cd skills-swap-client
node scripts/migrations/add-user-roles.js
```

**Output:**

```
✅ Successfully updated X users with default role: "user"

📊 Final role distribution:
   ┌─────────────┬───────┐
   │ Role        │ Count │
   ├─────────────┼───────┤
   │ user        │    42 │
   └─────────────┴───────┘
```

## Step 2: Create Admin User

### Option A: Interactive Tool (Recommended)

```bash
node scripts/manage-user-role.js
```

Then:

1. Choose option `4` (Promote user to admin)
2. Enter your email address
3. Confirm with `yes`

### Option B: MongoDB Direct

```javascript
// Connect to your MongoDB database
db.users.updateOne(
    { email: "your-email@example.com" },
    { $set: { role: "admin" } }
);
```

## Step 3: Test the Setup

### 1. Sign Out & Sign In Again

**Important:** You must sign out and sign in again for role changes to take effect!

```tsx
import { signOut } from "next-auth/react";

// Sign out
await signOut();
```

### 2. Check Your Role

Add this temporary component to your dashboard:

```tsx
"use client";

import { useSession } from "next-auth/react";

export default function RoleChecker() {
    const { data: session } = useSession();

    return (
        <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold">Session Debug:</h3>
            <pre className="text-sm">
                {JSON.stringify(
                    {
                        role: (session?.user as any)?.role,
                        name: session?.user?.name,
                        email: session?.user?.email,
                    },
                    null,
                    2
                )}
            </pre>
        </div>
    );
}
```

### 3. Test Role-Based Access

Try accessing these routes:

**Everyone (authenticated):**

-   ✅ `/dashboard`
-   ✅ `/dashboard/profile`

**Instructor & Admin:**

-   ✅ `/dashboard/courses`
-   ✅ `/dashboard/courses/create`

**Admin Only:**

-   ✅ `/dashboard/manageUsers`

## Step 4: Use in Your Components

### Protect a Route

```tsx
"use client";

import { InstructorRoute } from "@/components/auth/ProtectedRoute";

export default function CreateCoursePage() {
    return (
        <InstructorRoute>
            <div>Only instructors and admins can see this</div>
        </InstructorRoute>
    );
}
```

### Conditional Rendering

```tsx
import { useRBAC } from "@/hooks/useRBAC";

function MyComponent() {
    const rbac = useRBAC();

    return (
        <div>
            {rbac.isAdmin() && <AdminPanel />}
            {rbac.isInstructor() && <InstructorTools />}
            <p>Your role: {rbac.userRole}</p>
        </div>
    );
}
```

### Component Guards

```tsx
import { AdminOnly, InstructorOnly } from "@/components/auth/RoleGuard";

function Dashboard() {
    return (
        <div>
            <AdminOnly>
                <UserManagement />
            </AdminOnly>

            <InstructorOnly>
                <CourseCreator />
            </InstructorOnly>
        </div>
    );
}
```

## Common Tasks

### Make a User an Instructor

```bash
node scripts/manage-user-role.js
# Choose option 5
# Enter email
# Confirm
```

### List All Users by Role

```bash
node scripts/manage-user-role.js
# Choose option 3
# Select role (1=user, 2=instructor, 3=admin)
```

### Change Multiple Users

Use MongoDB:

```javascript
// Promote multiple users to instructor
db.users.updateMany(
    { email: { $in: ["instructor1@example.com", "instructor2@example.com"] } },
    { $set: { role: "instructor" } }
);
```

## Verification Checklist

-   [ ] Migration script executed successfully
-   [ ] At least one admin user created
-   [ ] Admin user signed out and back in
-   [ ] Admin can access `/dashboard/manageUsers`
-   [ ] Regular users cannot access admin routes
-   [ ] Navigation menu shows/hides based on role
-   [ ] Role appears correctly in session

## Troubleshooting

### Role still shows as "user"

1. Check database:

```javascript
db.users.findOne({ email: "your-email@example.com" });
// Should show: role: "admin"
```

2. Clear session:

    - Sign out
    - Clear browser cookies
    - Close all browser tabs
    - Sign in again

3. Check session:

```tsx
const { data: session } = useSession();
console.log((session?.user as any)?.role);
```

### Cannot access protected routes

1. Verify role in database
2. Sign out completely and sign back in
3. Check browser console for errors
4. Verify the route is defined in `ROUTE_ACCESS` in `roleGuard.ts`

## Next Steps

1. ✅ Read the full documentation: `docs/ROLE_BASED_AUTH.md`
2. ✅ Customize routes in `lib/auth/roleGuard.ts`
3. ✅ Add role-based UI throughout your app
4. ✅ Test all protected routes
5. ✅ Set up role-based API protection

---

**Need Help?** Check the full documentation or the example code in the docs folder.
