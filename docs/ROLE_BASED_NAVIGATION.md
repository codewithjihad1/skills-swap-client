# Role-Based Navigation System

## Overview

Dynamic sidebar navigation that adapts based on user role (User, Instructor, Admin). Each role sees relevant menu items and quick actions tailored to their permissions and responsibilities.

---

## 🎯 Navigation Structure by Role

### **User Role** (Default)

**Navigation Items:**

-   ✅ Overview - Dashboard home
-   ✅ Profile - Manage profile
-   ✅ Skills - Skills & offerings
-   ✅ Requests - Swap requests
-   ✅ Messages - Communications
-   ✅ Wallet - Credits & transactions
-   ✅ Reviews - Feedback & ratings

**Quick Actions:**

-   Add Skill (Green)
-   Find Partners (Blue)

**Badge:** Blue "User"

---

### **Instructor Role**

**Navigation Items:**
All User items PLUS:

-   ✅ My Courses - Course management
-   ✅ Students - Student management
-   ✅ Analytics - Performance metrics

**Quick Actions:**

-   Add Skill (Green)
-   Find Partners (Blue)
-   Create Course (Purple)

**Badge:** Purple "Instructor"

---

### **Admin Role**

**Navigation Items:**
All User + Instructor items PLUS:

-   ✅ User Management - Manage all users
-   ✅ Reports - System reports
-   ✅ System Settings - Platform configuration

**Quick Actions:**

-   Add Skill (Green)
-   Find Partners (Blue)
-   Create Course (Purple)
-   View Analytics (Orange)

**Badge:** Red "Admin"

---

## 📁 Files Modified

### 1. **`src/app/(dashboard)/layout.tsx`**

**Key Changes:**

-   Added `useSession` hook to get user role
-   Created `baseNavigationItems` - common to all users
-   Created `instructorNavigationItems` - instructor-specific
-   Created `adminNavigationItems` - admin-specific
-   Used `useMemo` to filter navigation based on role
-   Role-based quick actions filtering

**Code Structure:**

```typescript
const userRole = (session?.user as any)?.role || "user";

const navigationItems = useMemo(() => {
    let items = [...baseNavigationItems];

    if (userRole === "instructor" || userRole === "admin") {
        items = [...items, ...instructorNavigationItems];
    }

    if (userRole === "admin") {
        items = [...items, ...adminNavigationItems];
    }

    return items.filter((item) => item.roles.includes(userRole));
}, [userRole]);
```

### 2. **`src/app/(dashboard)/components/DesktopSidebar.tsx`**

**Key Changes:**

-   Added `getRoleBadge()` function for role badge display
-   Updated user profile section to show role badge
-   Removed static rating/credits display
-   Role-based visual identity

**Role Badge Function:**

```typescript
const getRoleBadge = () => {
    switch (userRole) {
        case "admin":
            return <span className="...bg-red-100...">Admin</span>;
        case "instructor":
            return <span className="...bg-purple-100...">Instructor</span>;
        default:
            return <span className="...bg-blue-100...">User</span>;
    }
};
```

### 3. **`src/app/(dashboard)/components/MobileSidebar.tsx`**

**Key Changes:**

-   Added `getRoleBadge()` function (same as desktop)
-   Updated user profile section with role badge
-   Consistent role-based styling

---

## 🎨 Visual Design

### Role Badge Styling

| Role       | Background      | Text Color        | Dark Mode                           |
| ---------- | --------------- | ----------------- | ----------------------------------- |
| User       | `bg-blue-100`   | `text-blue-800`   | `bg-blue-900` / `text-blue-200`     |
| Instructor | `bg-purple-100` | `text-purple-800` | `bg-purple-900` / `text-purple-200` |
| Admin      | `bg-red-100`    | `text-red-800`    | `bg-red-900` / `text-red-200`       |

### Quick Action Colors

| Action         | Color  | Icon       | Roles             |
| -------------- | ------ | ---------- | ----------------- |
| Add Skill      | Green  | Plus       | All               |
| Find Partners  | Blue   | Users      | All               |
| Create Course  | Purple | BookOpen   | Instructor, Admin |
| View Analytics | Orange | TrendingUp | Admin             |

---

## 🔍 Navigation Item Properties

Each navigation item has:

```typescript
{
    name: string;           // Display name
    href: string;          // Route path
    icon: LucideIcon;      // Icon component
    description: string;   // Subtitle/description
    roles: string[];       // Allowed roles ["user", "instructor", "admin"]
}
```

---

## 📊 Complete Navigation Matrix

| Navigation Item     | User | Instructor | Admin |
| ------------------- | :--: | :--------: | :---: |
| Overview            |  ✅  |     ✅     |  ✅   |
| Profile             |  ✅  |     ✅     |  ✅   |
| Skills              |  ✅  |     ✅     |  ✅   |
| Requests            |  ✅  |     ✅     |  ✅   |
| Messages            |  ✅  |     ✅     |  ✅   |
| **My Courses**      |  ❌  |     ✅     |  ✅   |
| **Students**        |  ❌  |     ✅     |  ✅   |
| **Analytics**       |  ❌  |     ✅     |  ✅   |
| **User Management** |  ❌  |     ❌     |  ✅   |
| **Reports**         |  ❌  |     ❌     |  ✅   |
| **System Settings** |  ❌  |     ❌     |  ✅   |
| Wallet              |  ✅  |     ✅     |  ✅   |
| Reviews             |  ✅  |     ✅     |  ✅   |

---

## 🚀 How It Works

### 1. **Session Detection**

```typescript
const { data: session } = useSession();
const userRole = (session?.user as any)?.role || "user";
```

### 2. **Dynamic Filtering**

Navigation items are filtered using `useMemo` to prevent unnecessary re-renders:

```typescript
const navigationItems = useMemo(() => {
    // Build items array based on role
    return items.filter((item) => item.roles.includes(userRole));
}, [userRole]);
```

### 3. **Role Badge Display**

Each sidebar shows a colored badge indicating the user's role:

```typescript
<div className="flex items-center gap-1 mt-1">{getRoleBadge()}</div>
```

### 4. **Quick Actions**

Quick actions are also filtered by role:

```typescript
const quickActions = useMemo(() => {
    // ... actions array
    return actions.filter((action) => action.roles.includes(userRole));
}, [userRole]);
```

---

## 🧪 Testing Guide

### Test Case 1: User Navigation

1. Login as User
2. **Expected Sidebar Items:**
    - Overview, Profile, Skills, Requests, Messages, Wallet, Reviews
3. **Expected Quick Actions:**
    - Add Skill, Find Partners
4. **Expected Badge:** Blue "User"

### Test Case 2: Instructor Navigation

1. Login as Instructor
2. **Expected Sidebar Items:**
    - All User items + My Courses, Students, Analytics
3. **Expected Quick Actions:**
    - Add Skill, Find Partners, Create Course
4. **Expected Badge:** Purple "Instructor"

### Test Case 3: Admin Navigation

1. Login as Admin
2. **Expected Sidebar Items:**
    - All User + Instructor items + User Management, Reports, System Settings
3. **Expected Quick Actions:**
    - Add Skill, Find Partners, Create Course, View Analytics
4. **Expected Badge:** Red "Admin"

### Test Case 4: Role Change

1. Update user role in database
2. Sign out
3. Sign in again
4. **Expected:** Sidebar updates with new role's navigation items

---

## 🔧 Adding New Navigation Items

### Step 1: Define the Item

Add to appropriate array in `layout.tsx`:

```typescript
// For all users
const baseNavigationItems = [
    // existing items...
    {
        name: "New Feature",
        href: "/dashboard/new-feature",
        icon: YourIcon,
        description: "Description here",
        roles: ["user", "instructor", "admin"],
    },
];

// For instructor/admin only
const instructorNavigationItems = [
    // existing items...
    {
        name: "Instructor Feature",
        href: "/dashboard/instructor-feature",
        icon: YourIcon,
        description: "Description here",
        roles: ["instructor", "admin"],
    },
];

// For admin only
const adminNavigationItems = [
    // existing items...
    {
        name: "Admin Feature",
        href: "/dashboard/admin-feature",
        icon: YourIcon,
        description: "Description here",
        roles: ["admin"],
    },
];
```

### Step 2: Import the Icon

```typescript
import { YourIcon } from "lucide-react";
```

### Step 3: Test

-   Verify item appears for correct roles
-   Verify item is hidden for unauthorized roles
-   Check active state highlighting
-   Test on both desktop and mobile

---

## 🎯 Best Practices

1. **Always Include Roles Array**

    - Every navigation item must have a `roles` array
    - Prevents accidental exposure to unauthorized users

2. **Use useMemo for Performance**

    - Prevents unnecessary re-filtering on every render
    - Only recalculates when `userRole` changes

3. **Consistent Icon Usage**

    - Use Lucide React icons for consistency
    - Keep icon sizes uniform (h-5 w-5)

4. **Clear Descriptions**

    - Provide helpful descriptions for each item
    - Visible on mobile sidebar for better UX

5. **Logical Grouping**
    - Base items: Core features for all users
    - Instructor items: Teaching/course management
    - Admin items: System administration

---

## 🔒 Security Notes

1. **Client-Side Filtering is UI Only**

    - Navigation filtering is for UX, not security
    - Backend middleware still enforces route protection
    - Users can't bypass by manipulating client code

2. **Session-Based Role Detection**

    - Role comes from NextAuth session
    - Session includes JWT token with role
    - Server validates on every protected route

3. **Default to Least Privilege**
    - Unknown roles default to "user"
    - Missing role in session defaults to "user"

---

## 🐛 Troubleshooting

### Issue: Navigation items not updating after role change

**Solution:** Sign out and sign in again to refresh JWT token

### Issue: Role badge not showing

**Solution:** Check that `session?.user?.role` exists in session

### Issue: Wrong items showing for role

**Solution:** Verify `roles` array in navigation item definition

### Issue: Quick actions missing

**Solution:** Check `quickActions` filtering logic includes the role

---

## 📱 Mobile vs Desktop

Both sidebars share the same:

-   Navigation items array
-   Quick actions array
-   Role detection logic
-   Badge styling

Differences:

-   Desktop: Fixed sidebar, always visible on large screens
-   Mobile: Overlay sidebar, animated slide-in
-   Mobile: Shows item descriptions
-   Desktop: More compact layout

---

## 🔄 Future Enhancements

-   [ ] Add notification badges per role
-   [ ] Custom navigation order per role
-   [ ] Collapsible navigation sections
-   [ ] Favorites/pinned items
-   [ ] Recently accessed items
-   [ ] Search navigation items
-   [ ] Keyboard shortcuts
-   [ ] Customizable sidebar order

---

**Last Updated:** October 16, 2025
**Version:** 2.0.0
**Feature:** Role-Based Navigation System
