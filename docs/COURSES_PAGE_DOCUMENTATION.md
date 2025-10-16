# Courses Page API Integration Documentation

## Overview

The courses page (`/dashboard/courses`) has been updated to integrate with the backend Course API. It now fetches real course data from the server, displays comprehensive course information, and provides full CRUD (Create, Read, Update, Delete) operations.

## What's Changed

### 1. New Course Service (`src/lib/api/courseService.ts`)

A complete TypeScript service layer has been created to interact with the Course API:

**Features:**

-   ✅ Type-safe API calls with TypeScript interfaces
-   ✅ Axios instance with base URL configuration
-   ✅ Auth token interceptor (ready for authentication)
-   ✅ All 7 Course API endpoints implemented
-   ✅ Proper error handling
-   ✅ Environment variable support

**Available Methods:**

```typescript
courseService.getAllCourses(filters); // Get all courses with filtering
courseService.getCourseById(id); // Get single course details
courseService.getInstructorCourses(id, includeUnpublished); // Get instructor's courses
courseService.createCourse(data); // Create new course
courseService.updateCourse(id, updates); // Update existing course
courseService.togglePublish(id, status); // Publish/unpublish course
courseService.deleteCourse(id); // Delete course
```

### 2. Updated Courses Page (`src/app/(dashboard)/dashboard/courses/page.tsx`)

**New Features:**

-   ✅ Real-time data fetching from backend API
-   ✅ Loading and error states
-   ✅ Statistics dashboard (Total Courses, Published, Total Students, Avg Rating)
-   ✅ Course cards with comprehensive information
-   ✅ Publish/Unpublish functionality
-   ✅ Delete course with enrollment validation
-   ✅ Edit and view navigation buttons
-   ✅ Empty state for no courses
-   ✅ Toast notifications for actions (using Sonner)

**Displayed Course Information:**

-   Course title and description (truncated)
-   Published/Draft status badge
-   Level badge (Beginner/Intermediate/Advanced)
-   Enrollment count
-   Average rating with count
-   Duration in hours
-   Price with currency
-   Creation date
-   Action buttons (Edit, View, Publish/Unpublish, Delete)

### 3. Added Toast Notifications (`layout.tsx`)

-   Added Sonner toast library for user feedback
-   Toast notifications for:
    -   ✅ Successful publish/unpublish
    -   ✅ Successful deletion
    -   ✅ Error messages
    -   ✅ Validation warnings (e.g., can't delete courses with enrollments)

## API Integration Details

### Endpoint Used: Get Instructor Courses

**Request:**

```typescript
GET /api/courses/instructor/:instructorId?includeUnpublished=true
```

**Response:**

```json
{
    "success": true,
    "count": 5,
    "courses": [
        {
            "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
            "title": "Complete Web Development Bootcamp",
            "description": "Learn web development from scratch...",
            "instructor": { ... },
            "category": "Web Development",
            "level": "beginner",
            "duration": 40,
            "thumbnail": "...",
            "price": 49.99,
            "currency": "USD",
            "published": true,
            "enrollmentCount": 150,
            "rating": {
                "average": 4.5,
                "count": 75
            },
            "createdAt": "2024-09-04T10:30:00.000Z",
            "lastUpdated": "2024-09-15T14:20:00.000Z"
        }
    ]
}
```

## Features Implementation

### 1. Statistics Cards

Shows aggregate data from all instructor courses:

-   **Total Courses**: Count of all courses
-   **Published**: Count of published courses
-   **Total Students**: Sum of all enrollments
-   **Average Rating**: Average rating across all courses

### 2. Course Cards

Each card displays:

-   **Header**: Icon + Status badges (Published/Draft + Level)
-   **Title**: Course title (clamped to 2 lines)
-   **Description**: Course description (clamped to 2 lines)
-   **Metrics**: Enrollment count + Rating (stars + count)
-   **Meta**: Duration + Price
-   **Date**: Creation date
-   **Actions**: 4 buttons (Edit, View, Publish/Unpublish, Delete)

### 3. Action Buttons

#### Edit Button (Purple)

-   Icon: Edit pencil
-   Action: Navigate to `/dashboard/courses/${courseId}/edit`
-   Purpose: Edit course details

#### View Button (Gray Border)

-   Icon: Eye
-   Action: Navigate to `/courses/${courseId}`
-   Purpose: View course as a student would see it

#### Publish/Unpublish Button (Gray Border)

-   Icons: 📤 (published) / 📥 (draft)
-   Action: Toggle publish status
-   API Call: `PATCH /api/courses/:id/publish`
-   Toast: Success/error notification

#### Delete Button (Red Border)

-   Icon: Trash
-   Action: Delete course with confirmation
-   Validation: Cannot delete courses with active enrollments
-   Confirmation: Browser confirm dialog
-   API Call: `DELETE /api/courses/:id`
-   Toast: Success/error notification

### 4. Empty State

Displayed when instructor has no courses:

-   Icon: Large BookOpen icon
-   Message: "No courses yet"
-   Description: "Create your first course to get started"
-   Button: "Create Course" (navigates to create page)

### 5. Error Handling

**Error State Display:**

-   Icon: AlertCircle
-   Error message from API
-   "Try Again" button to refetch data

**Error Scenarios:**

-   Network errors
-   API errors (404, 500, etc.)
-   Missing instructor ID
-   Failed CRUD operations

## Configuration

### Environment Variables

In `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

For production:

```bash
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

### TypeScript Interfaces

All Course API responses are properly typed:

```typescript
interface Course {
    _id: string;
    title: string;
    description: string;
    instructor: { ... };
    category: string;
    level: "beginner" | "intermediate" | "advanced";
    duration: number;
    price: number;
    currency: string;
    published: boolean;
    enrollmentCount: number;
    rating: { average: number; count: number };
    createdAt: string;
    lastUpdated: string;
    // ... more fields
}
```

## User Flow

1. **Page Load**:

    - Check authentication (instructor or admin only)
    - Show loading spinner
    - Fetch instructor's courses from API
    - Display statistics + course grid

2. **View Courses**:

    - See all courses (published and drafts)
    - View enrollment counts and ratings
    - Check publish status

3. **Manage Courses**:

    - **Edit**: Click "Edit" → Navigate to edit page
    - **View**: Click "View" → See course details
    - **Publish**: Click publish icon → Toggle publish status
    - **Delete**: Click delete → Confirm → Delete course

4. **Create New Course**:
    - Click "Create Course" button
    - Navigate to course creation page

## Security & Authorization

### Role-Based Access

-   Only instructors and admins can access this page
-   Non-authorized users are redirected to `/dashboard`

### Course Ownership (Backend)

-   Instructors can only see and manage their own courses
-   API validates instructor ID from auth token
-   Admins can see all courses

### Delete Protection

-   Frontend validates enrollment count before deletion
-   Backend also validates and prevents deletion of enrolled courses

## API Error Handling

### Error Response Format

```json
{
    "error": "Error message here",
    "details": "Additional details (optional)"
}
```

### Common HTTP Status Codes

-   `200` - Success
-   `400` - Bad Request (validation errors)
-   `403` - Forbidden (not authorized)
-   `404` - Not Found (course doesn't exist)
-   `500` - Internal Server Error

### Frontend Error Handling

```typescript
try {
    const response = await courseService.getInstructorCourses(
        instructorId,
        true
    );
    setCourses(response.courses);
} catch (err: any) {
    setError(err.response?.data?.error || "Failed to load courses");
}
```

## Toast Notifications

Using Sonner library for elegant notifications:

```typescript
import { toast } from "sonner";

// Success
toast.success("Course published successfully");

// Error
toast.error("Failed to delete course");

// Warning
toast.error("Cannot delete course with 150 active enrollments");
```

## Performance Optimizations

1. **Single API Call**: Fetches all courses in one request
2. **Efficient Rendering**: Uses React keys properly (`course._id`)
3. **Lazy Loading**: Could be added for pagination later
4. **Memoization**: Statistics calculated only when courses change

## Future Enhancements

### Planned Features

-   [ ] **Search & Filter**: Filter courses by category, level, status
-   [ ] **Sorting**: Sort by date, enrollments, rating
-   [ ] **Pagination**: Load courses in batches
-   [ ] **Bulk Actions**: Publish/delete multiple courses
-   [ ] **Course Analytics**: Click to view detailed analytics
-   [ ] **Duplicate Course**: Clone existing course
-   [ ] **Export Data**: Export course list to CSV

### API Features to Use

-   [ ] **Filtering**: `category`, `level`, `search` query params
-   [ ] **Sorting**: `sortBy`, `order` query params
-   [ ] **Pagination**: `page`, `limit` query params

## Testing Guide

### Test Scenarios

1. **Empty State**:

    - Login as new instructor (no courses)
    - Verify empty state is shown
    - Click "Create Course" button

2. **Course Display**:

    - Create/add courses via API
    - Verify all course data displays correctly
    - Check badges (published/draft, level)
    - Verify ratings and enrollments

3. **Publish/Unpublish**:

    - Click publish icon on draft course
    - Verify API call succeeds
    - Check badge updates to "Published"
    - Click again to unpublish

4. **Delete Course**:

    - Try deleting course with enrollments → Should show error
    - Delete course without enrollments → Should succeed
    - Verify confirmation dialog appears

5. **Error States**:

    - Stop backend server
    - Refresh page → Verify error state
    - Click "Try Again" → Should retry

6. **Navigation**:
    - Click "Edit" → Should go to edit page
    - Click "View" → Should go to course detail page
    - Click "Create Course" → Should go to create page

### Test Data

**Create test instructor in MongoDB:**

```javascript
db.users.insertOne({
    name: "Test Instructor",
    email: "instructor@test.com",
    role: "instructor",
    avatar: "https://example.com/avatar.jpg",
});
```

**Create test courses:**

```javascript
db.courses.insertMany([
    {
        title: "React Fundamentals",
        description: "Learn React from scratch",
        instructor: ObjectId("instructor_id_here"),
        category: "Web Development",
        level: "beginner",
        duration: 30,
        price: 49.99,
        currency: "USD",
        published: true,
        enrollmentCount: 25,
        rating: { average: 4.5, count: 10 },
    },
    {
        title: "Advanced TypeScript",
        description: "Master TypeScript",
        instructor: ObjectId("instructor_id_here"),
        category: "Programming",
        level: "advanced",
        duration: 40,
        price: 79.99,
        currency: "USD",
        published: false,
        enrollmentCount: 0,
        rating: { average: 0, count: 0 },
    },
]);
```

## Troubleshooting

### Issue: Courses Not Loading

**Symptoms:** Loading spinner forever or error state

**Solutions:**

1. Check backend server is running: `http://localhost:5000`
2. Verify MongoDB is connected
3. Check browser console for errors
4. Verify instructor ID exists in session
5. Check `NEXT_PUBLIC_API_URL` in `.env.local`

### Issue: Cannot Delete Course

**Symptoms:** Delete button shows error

**Possible Causes:**

-   Course has active enrollments (expected behavior)
-   Backend validation error
-   Network error

**Solution:**

-   Check enrollment count
-   Unenroll students first (or use admin tools)
-   Check backend logs

### Issue: Publish Not Working

**Symptoms:** Publish button doesn't work

**Possible Causes:**

-   Course missing syllabus (required by API)
-   Course missing learning outcomes (required by API)
-   Backend validation error

**Solution:**

-   Ensure course has complete syllabus
-   Add learning outcomes to course
-   Check API error response

## API Documentation Reference

Full API documentation available at:

-   `skills-swap-server/docs/COURSE_API_DOCUMENTATION.md`

Key endpoints used:

-   `GET /api/courses/instructor/:id?includeUnpublished=true`
-   `PATCH /api/courses/:id/publish`
-   `DELETE /api/courses/:id`

## Dependencies

### New Dependencies

None! All required packages were already installed:

-   `axios` - HTTP client
-   `sonner` - Toast notifications
-   `lucide-react` - Icons

### Existing Dependencies Used

-   `next-auth` - Authentication
-   `react` - UI library
-   `typescript` - Type safety

## File Structure

```
skills-swap-client/
├── src/
│   ├── lib/
│   │   └── api/
│   │       └── courseService.ts          ← NEW: API service
│   └── app/
│       └── (dashboard)/
│           ├── layout.tsx                ← UPDATED: Added Toaster
│           └── dashboard/
│               └── courses/
│                   └── page.tsx          ← UPDATED: Full API integration
└── .env.local                            ← Existing: API URL configured
```

## Conclusion

The courses page is now fully integrated with the backend API, providing a complete course management experience for instructors. All CRUD operations are implemented with proper error handling, loading states, and user feedback through toast notifications.

**Ready for production use!** 🚀

---

**Last Updated:** October 16, 2025  
**Version:** 1.0.0
