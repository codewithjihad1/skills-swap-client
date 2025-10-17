# Dynamic Profile Implementation Guide

## 🎉 Overview

Complete implementation of a dynamic profile page with **TanStack Query** and **Axios** for API handling in the Skills Swap Marketplace application.

---

## 📁 Files Created/Modified

### 1. **API Layer** (`src/lib/api/profile.ts`)

-   ✅ TypeScript interfaces for UserProfile and UpdateProfileData
-   ✅ Axios-based API functions (getUserProfile, updateUserProfile)
-   ✅ Custom hooks using TanStack Query:
    -   `useUserProfile()` - Fetches user profile with caching
    -   `useUpdateProfile()` - Mutation hook for updating profile

### 2. **ProfileHeader Component** (`src/components/profile-page/components/profile-header.tsx`)

-   ✅ Dynamic data loading from API
-   ✅ Loading states with spinner
-   ✅ Error handling
-   ✅ Displays:
    -   Avatar with fallback initials
    -   Name and bio
    -   Email and join date
    -   Skills count badge
    -   Active/Inactive status

### 3. **ProfileContent Component** (`src/components/profile-page/components/profile-content.tsx`)

-   ✅ 4 Tabs: Personal, Skills, Account, Security
-   ✅ Editable profile fields with real-time updates
-   ✅ Dynamic skills display with:
    -   Proficiency level badges
    -   Category tags
    -   Skill descriptions
-   ✅ Form validation and submission
-   ✅ Loading and success/error toast notifications

---

## 🔧 Key Features

### **TanStack Query Integration**

```typescript
// Automatic caching and refetching
const { data: userProfile, isLoading, error } = useUserProfile(userId);

// Optimistic updates with mutations
const mutation = useUpdateProfile();
mutation.mutate({ userId, profileData });
```

### **Axios Configuration**

-   Centralized axios instance from `@/axios/axiosInstance`
-   Automatic error handling
-   Type-safe responses

### **State Management**

-   ✅ React Query cache for server state
-   ✅ Local state for form inputs
-   ✅ Automatic cache invalidation on updates

---

## 🎨 UI Components Used

| Component      | Purpose                        |
| -------------- | ------------------------------ |
| Card           | Container for sections         |
| Avatar         | Profile picture with fallback  |
| Badge          | Status indicators & skill tags |
| Tabs           | Navigate between sections      |
| Input/Textarea | Form fields                    |
| Button         | Actions with loading states    |
| Switch         | Toggle settings                |
| Loader2        | Loading animations             |

---

## 📊 Data Flow

```
User Action → Frontend Component
    ↓
TanStack Query Hook
    ↓
Axios Request → Backend API
    ↓
Response → Cache Update
    ↓
UI Re-render with new data
```

---

## 🚀 API Endpoints Required

### Backend Routes (Server-side)

```javascript
// Required in skills-swap-server

// GET user profile
GET /api/users/:userId

// PUT update user profile
PUT /api/users/:userId
Body: { name, bio, avatar }
```

### User Schema (MongoDB)

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  avatar: String,
  bio: String (max 500 chars),
  skills: [ObjectId] (ref: 'Skill'),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎯 Features Implemented

### ✅ Profile Header

-   [x] Dynamic avatar display
-   [x] Real-time name and bio
-   [x] Email display (non-editable)
-   [x] Join date formatting
-   [x] Skills count badge
-   [x] Active status indicator
-   [x] Loading states
-   [x] Error handling

### ✅ Personal Tab

-   [x] Editable name field
-   [x] Editable bio textarea (500 char limit)
-   [x] Editable avatar URL
-   [x] Email field (read-only)
-   [x] Save/Cancel buttons
-   [x] Form validation
-   [x] Loading state during save

### ✅ Skills Tab

-   [x] Display all user skills
-   [x] Skill cards with:
    -   Title and category
    -   Proficiency level badge
    -   Description (line-clamped)
    -   Tags display
-   [x] Empty state for no skills
-   [x] Dynamic count display

### ✅ Account Tab

-   [x] Account status (active/inactive)
-   [x] Member since date
-   [x] Total skills count
-   [x] Visibility toggle
-   [x] Deactivate account button

### ✅ Security Tab

-   [x] Change password button
-   [x] 2FA status (coming soon)
-   [x] Login notifications toggle
-   [x] Active sessions management

---

## 💡 Usage Example

```typescript
// In any component
import { useUserProfile, useUpdateProfile } from "@/lib/api/profile";

function MyComponent() {
    const { data: session } = useSession();

    // Fetch profile
    const { data: profile, isLoading } = useUserProfile(session?.user?.id);

    // Update profile
    const updateMutation = useUpdateProfile();

    const handleUpdate = () => {
        updateMutation.mutate({
            userId: session?.user?.id,
            profileData: { name: "New Name", bio: "New bio" },
        });
    };

    return <div>{profile?.name}</div>;
}
```

---

## 🔔 Toast Notifications

### Success Messages

-   ✅ "Profile updated successfully! 🎉"
-   ✅ "Your changes have been saved."

### Error Messages

-   ❌ "Failed to update profile ❌"
-   ❌ Server error message displayed

---

## 🎨 Styling Features

-   ✅ **Dark Mode Support** - All components adapt to theme
-   ✅ **Responsive Design** - Mobile-first approach
-   ✅ **Gradient Accents** - Blue to purple gradients
-   ✅ **Loading States** - Skeleton loaders & spinners
-   ✅ **Smooth Animations** - Framer Motion ready
-   ✅ **Color-Coded Badges**:
    -   Beginner: Green
    -   Intermediate: Blue
    -   Advanced: Purple
    -   Expert: Orange

---

## 🐛 Error Handling

### Network Errors

```typescript
if (error) {
    return <div>Failed to load profile. Please try again.</div>;
}
```

### Authentication Errors

```typescript
if (!session) {
    return <div>Please sign in to view your profile</div>;
}
```

### Validation Errors

-   Form-level validation with toast notifications
-   Character limits enforced (bio: 500 chars)

---

## 📦 Dependencies

```json
{
    "@tanstack/react-query": "Latest",
    "axios": "Latest",
    "next-auth": "Latest",
    "sonner": "Latest (toast notifications)",
    "lucide-react": "Latest (icons)",
    "@radix-ui/*": "Latest (UI primitives)"
}
```

---

## 🔐 Security Considerations

1. **Authentication Required** - All profile endpoints need valid session
2. **User ID Validation** - Only authenticated user can update their own profile
3. **Input Sanitization** - Bio limited to 500 characters
4. **Email Protected** - Email field is read-only
5. **Password Updates** - Separate secure endpoint (to be implemented)

---

## 🚀 Next Steps

### Recommended Enhancements

1. ⬜ Image upload for avatar (instead of URL)
2. ⬜ Drag-and-drop avatar upload
3. ⬜ Skills management (add/remove skills)
4. ⬜ Password change functionality
5. ⬜ Two-factor authentication
6. ⬜ Email preferences management
7. ⬜ Activity history/timeline
8. ⬜ Profile completion percentage
9. ⬜ Social media links integration
10. ⬜ Export profile data (PDF/JSON)

---

## ✅ Testing Checklist

-   [x] Profile loads on mount
-   [x] Loading states display correctly
-   [x] Error states handled gracefully
-   [x] Form fields populated from API
-   [x] Updates save successfully
-   [x] Cache invalidates after update
-   [x] Toast notifications appear
-   [x] Responsive on mobile/tablet/desktop
-   [x] Dark mode works correctly
-   [x] Skills display properly

---

## 📚 Documentation

### TanStack Query Docs

https://tanstack.com/query/latest

### Axios Docs

https://axios-http.com/docs/intro

### Next-Auth Docs

https://next-auth.js.org/

---

## 🎓 Learning Resources

-   TanStack Query makes server state management easy
-   Automatic caching reduces unnecessary API calls
-   Optimistic updates improve UX
-   Type safety prevents runtime errors
-   Separation of concerns (API layer vs UI)

---

**Built with ❤️ using Next.js 15, TanStack Query, and Axios**
