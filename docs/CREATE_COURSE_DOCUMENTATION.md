# Create Course Page Documentation

## Overview

The Create Course page (`/dashboard/courses/create`) is a comprehensive form for instructors to create new courses. It includes full validation, dynamic field management, and seamless API integration following the Course API requirements.

## Features

### ✅ Core Functionality

-   **Full Form Validation** - Using React Hook Form + Zod schema
-   **Dynamic Field Arrays** - Add/remove learning outcomes, prerequisites, and syllabus weeks
-   **Tag Management** - Add and remove tags with visual badges
-   **Real-time Validation** - Instant error feedback on all fields
-   **Type Safety** - Complete TypeScript support
-   **Loading States** - Button disabled during submission
-   **Toast Notifications** - Success/error feedback using Sonner
-   **Auto-redirect** - After creation, redirects to edit page

### 📋 Form Sections

#### 1. **Basic Information** (Required)

-   **Title\*** - 5-200 characters
-   **Description\*** - Minimum 20 characters
-   **Category\*** - Dropdown with 17 categories
-   **Level\*** - Beginner/Intermediate/Advanced
-   **Duration\*** - Hours (min: 1, max: 1000)
-   **Price\*** - USD (min: 0, supports decimals)
-   **Thumbnail** - Optional URL
-   **Language** - Default: "English"

#### 2. **Tags** (Required)

-   Add tags by typing and pressing Enter or clicking "Add"
-   Visual badge display with remove option
-   At least 1 tag required
-   Prevents duplicate tags

#### 3. **Learning Outcomes** (Required)

-   Dynamic list (add/remove)
-   At least 1 outcome required
-   What students will learn/achieve

#### 4. **Prerequisites** (Optional)

-   Dynamic list (add/remove)
-   What students should know beforehand
-   Can be empty

#### 5. **Syllabus** (Optional)

-   Weekly breakdown structure
-   Each week includes:
    -   Week title
    -   Duration (hours)
    -   Topics (comma-separated)
-   Note: Required for publishing course

#### 6. **Info Box**

-   Displays publishing requirements
-   Explains draft vs. published status

## Validation Schema

Based on API requirements:

```typescript
const courseSchema = z.object({
    title: z.string().min(5).max(200),
    description: z.string().min(20),
    category: z.string().min(1),
    level: z.enum(["beginner", "intermediate", "advanced"]),
    duration: z.number().min(1).max(1000),
    price: z.number().min(0),
    currency: z.string().default("USD"),
    thumbnail: z.string().url().optional().or(z.literal("")),
    tags: z.array(z.string()).min(1),
    syllabus: z.array(...).optional(),
    prerequisites: z.array(z.string()).optional(),
    learningOutcomes: z.array(z.string()).min(1),
    language: z.string().default("English"),
});
```

## Categories Available

1. Web Development
2. Mobile Development
3. Data Science
4. Machine Learning
5. Artificial Intelligence
6. Programming
7. Database
8. DevOps
9. Cloud Computing
10. Cybersecurity
11. UI/UX Design
12. Graphic Design
13. Digital Marketing
14. Business
15. Photography
16. Video Editing
17. Other

## API Integration

### Endpoint Used

```
POST /api/courses
```

### Request Body

```json
{
    "title": "Complete Web Development Bootcamp",
    "description": "Learn web development from scratch...",
    "instructor": "64f5a1b2c3d4e5f6a7b8c9d1",
    "category": "Web Development",
    "level": "beginner",
    "duration": 40,
    "thumbnail": "https://example.com/thumb.jpg",
    "price": 49.99,
    "currency": "USD",
    "tags": ["html", "css", "javascript"],
    "learningOutcomes": [
        "Build responsive websites",
        "Understand JavaScript fundamentals"
    ],
    "prerequisites": ["Basic computer knowledge"],
    "syllabus": [
        {
            "week": 1,
            "title": "HTML Fundamentals",
            "topics": ["HTML Structure", "Semantic HTML"],
            "duration": 8
        }
    ],
    "language": "English"
}
```

### Response Handling

```typescript
// Success (201)
{
    "success": true,
    "message": "Course created successfully",
    "course": {
        "_id": "...",
        "title": "...",
        "published": false, // Always starts as draft
        // ... rest of course data
    }
}

// Error (400)
{
    "error": "Title, description, instructor, category, and duration are required"
}
```

## User Flow

### 1. Access Page

-   User must be logged in as instructor or admin
-   Non-authorized users redirected to `/dashboard`

### 2. Fill Form

-   **Required fields first**: Title, description, category, level, duration, price
-   **Add tags**: At least one tag required
-   **Learning outcomes**: At least one outcome required
-   **Optional**: Prerequisites and syllabus can be added later

### 3. Submit

-   Click "Create Course" button
-   Form validates all fields
-   If validation passes, API call is made
-   Loading state shown on button

### 4. Success

-   Toast notification: "Course created successfully!"
-   Redirect to: `/dashboard/courses/{courseId}/edit`
-   Instructor can continue editing or publish

### 5. Error Handling

-   Validation errors shown below each field
-   API errors shown in toast notification
-   Form remains filled (data not lost)

## Component Structure

```tsx
CreateCoursePage
├── Header (Back button, title)
├── Form (React Hook Form)
│   ├── Basic Information Card
│   │   ├── Title input
│   │   ├── Description textarea
│   │   ├── Category select
│   │   ├── Level select
│   │   ├── Duration input
│   │   ├── Price input
│   │   ├── Thumbnail input
│   │   └── Language input
│   ├── Tags Card
│   │   ├── Tag input + Add button
│   │   └── Badge list with remove
│   ├── Learning Outcomes Card
│   │   ├── Dynamic input list
│   │   └── Add/Remove buttons
│   ├── Prerequisites Card
│   │   ├── Dynamic input list
│   │   └── Add/Remove buttons
│   ├── Syllabus Card
│   │   ├── Week blocks
│   │   └── Add/Remove weeks
│   ├── Info Box (Publishing requirements)
│   └── Action Buttons (Cancel, Create)
└── Toast Notifications
```

## Field Details

### Title

-   **Type**: Text input
-   **Validation**: 5-200 characters
-   **Required**: Yes
-   **Placeholder**: "e.g., Complete Web Development Bootcamp"
-   **Error Messages**:
    -   "Title must be at least 5 characters"
    -   "Title must not exceed 200 characters"

### Description

-   **Type**: Textarea (4 rows)
-   **Validation**: Minimum 20 characters
-   **Required**: Yes
-   **Placeholder**: "Describe what students will learn in this course..."
-   **Error Message**: "Description must be at least 20 characters"

### Category

-   **Type**: Select dropdown
-   **Validation**: Must select one
-   **Required**: Yes
-   **Options**: 17 categories
-   **Error Message**: "Category is required"

### Level

-   **Type**: Select dropdown
-   **Validation**: Must be one of enum values
-   **Required**: Yes
-   **Options**: Beginner, Intermediate, Advanced
-   **Default**: Beginner
-   **Error Message**: "Level is required"

### Duration

-   **Type**: Number input
-   **Validation**: 1-1000 hours
-   **Required**: Yes
-   **Icon**: Clock icon (left side)
-   **Placeholder**: "40"
-   **Error Messages**:
    -   "Duration must be at least 1 hour"
    -   "Duration must not exceed 1000 hours"

### Price

-   **Type**: Number input (decimals allowed)
-   **Validation**: Minimum 0
-   **Required**: Yes
-   **Icon**: Dollar sign icon (left side)
-   **Placeholder**: "49.99"
-   **Step**: 0.01
-   **Error Message**: "Price cannot be negative"

### Thumbnail

-   **Type**: URL input
-   **Validation**: Must be valid URL or empty
-   **Required**: No
-   **Placeholder**: "https://example.com/course-thumbnail.jpg"
-   **Error Message**: "Must be a valid URL"

### Language

-   **Type**: Text input
-   **Validation**: None
-   **Required**: No (default: "English")
-   **Placeholder**: "English"
-   **Default**: "English"

### Tags

-   **Type**: Custom tag input
-   **Validation**: At least 1 tag
-   **Required**: Yes
-   **Features**:
    -   Add by typing + Enter key or clicking "Add"
    -   Remove by clicking × on badge
    -   Prevents duplicates
    -   Visual badge display
-   **Placeholder**: "e.g., html, css, javascript"
-   **Error Message**: "At least one tag is required"

### Learning Outcomes

-   **Type**: Dynamic field array
-   **Validation**: At least 1 outcome
-   **Required**: Yes
-   **Features**:
    -   Add unlimited outcomes
    -   Remove individual outcomes
    -   Cannot remove last outcome
-   **Placeholder**: "What will students be able to do?"
-   **Error Message**: "At least one learning outcome is required"

### Prerequisites

-   **Type**: Dynamic field array
-   **Validation**: None
-   **Required**: No
-   **Features**:
    -   Add unlimited prerequisites
    -   Remove individual prerequisites
    -   Can be empty
-   **Placeholder**: "What should students know before taking this course?"

### Syllabus

-   **Type**: Dynamic week blocks
-   **Validation**: None (optional)
-   **Required**: No (but needed for publishing)
-   **Structure per week**:
    -   Week number (auto-incremented)
    -   Title (text input)
    -   Duration in hours (number input)
    -   Topics (comma-separated text input)
-   **Features**:
    -   Add unlimited weeks
    -   Remove individual weeks
    -   Week numbers auto-adjust
-   **Note**: Displayed info about publishing requirement

## Validation Rules Summary

| Field             | Min       | Max        | Type   | Required         |
| ----------------- | --------- | ---------- | ------ | ---------------- |
| Title             | 5 chars   | 200 chars  | String | ✅ Yes           |
| Description       | 20 chars  | -          | String | ✅ Yes           |
| Category          | -         | -          | Enum   | ✅ Yes           |
| Level             | -         | -          | Enum   | ✅ Yes           |
| Duration          | 1 hour    | 1000 hours | Number | ✅ Yes           |
| Price             | 0         | -          | Number | ✅ Yes           |
| Currency          | -         | -          | String | Default: USD     |
| Thumbnail         | -         | -          | URL    | ❌ No            |
| Language          | -         | -          | String | Default: English |
| Tags              | 1 tag     | -          | Array  | ✅ Yes           |
| Learning Outcomes | 1 outcome | -          | Array  | ✅ Yes           |
| Prerequisites     | -         | -          | Array  | ❌ No            |
| Syllabus          | -         | -          | Array  | ❌ No            |

## Data Processing

### Before Submission

1. **Filter Empty Fields**:

    ```typescript
    prerequisites: data.prerequisites?.filter((p) => p.trim() !== "");
    learningOutcomes: data.learningOutcomes.filter((o) => o.trim() !== "");
    ```

2. **Process Syllabus**:

    ```typescript
    syllabus: data.syllabus?.map((s) => ({
        ...s,
        topics: s.topics.filter((t) => t.trim() !== ""),
    }));
    ```

3. **Add Instructor ID**:
    ```typescript
    instructor: session?.user?.id;
    ```

### After Submission

-   **Success**:
    -   Show toast: "Course created successfully!"
    -   Redirect to: `/dashboard/courses/${courseId}/edit`
-   **Error**:
    -   Show toast: API error message
    -   Keep form data (don't clear)
    -   User can fix and resubmit

## Error Handling

### Validation Errors

-   Displayed inline below each field
-   Red text color
-   Appear on blur or submit attempt

### API Errors

```typescript
try {
    const response = await courseService.createCourse(data);
    toast.success("Course created successfully!");
    router.push(`/dashboard/courses/${response.course._id}/edit`);
} catch (err: any) {
    toast.error(err.response?.data?.error || "Failed to create course");
}
```

### Common Error Messages

-   "Instructor ID not found. Please login again."
-   "Title, description, instructor, category, and duration are required"
-   "Failed to create course" (generic network error)

## Accessibility Features

-   ✅ Semantic HTML (labels, sections)
-   ✅ ARIA labels on icons
-   ✅ Keyboard navigation (Tab, Enter)
-   ✅ Focus states on inputs
-   ✅ Error announcements
-   ✅ Loading state indication
-   ✅ Color contrast (dark mode support)

## Responsive Design

### Desktop (lg+)

-   Two-column grid for category/level, duration/price
-   Full-width form with max-width container
-   Side-by-side action buttons

### Tablet (md)

-   Maintains two-column grid
-   Slightly reduced padding

### Mobile (< md)

-   Single column layout
-   Stacked action buttons
-   Full-width inputs

## State Management

### Form State (React Hook Form)

```typescript
const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
} = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
        currency: "USD",
        language: "English",
        level: "beginner",
        price: 0,
        duration: 10,
        // ...
    },
});
```

### Local State

```typescript
const [loading, setLoading] = useState(false); // Submit state
const [tagInput, setTagInput] = useState(""); // Tag input
const [tags, setTags] = useState<string[]>([]); // Tag list
```

### Field Arrays

```typescript
useFieldArray({ control, name: "learningOutcomes" });
useFieldArray({ control, name: "prerequisites" });
useFieldArray({ control, name: "syllabus" });
```

## Performance Optimizations

1. **Debounced Validation** - React Hook Form validates on blur
2. **Controlled Components** - Only for dynamic fields
3. **Minimal Re-renders** - Using register instead of controlled inputs
4. **Lazy Field Arrays** - Only rendered if populated

## Testing Scenarios

### ✅ Valid Submission

1. Fill all required fields
2. Add at least one tag
3. Add at least one learning outcome
4. Click "Create Course"
5. Verify success toast
6. Verify redirect to edit page

### ❌ Validation Errors

1. Leave title empty → Error shown
2. Enter 3-char title → Error shown
3. Enter 201-char title → Error shown
4. Leave description empty → Error shown
5. No category selected → Error shown
6. Duration = 0 → Error shown
7. Price = -1 → Error shown
8. Invalid thumbnail URL → Error shown
9. No tags → Error shown
10. No learning outcomes → Error shown

### 🏷️ Tag Management

1. Type tag and press Enter → Tag added
2. Type tag and click "Add" → Tag added
3. Try duplicate tag → Ignored
4. Click × on badge → Tag removed
5. Remove all tags → Error shown

### 📝 Dynamic Fields

1. Click "Add Learning Outcome" → New field added
2. Remove outcome (when >1) → Field removed
3. Try remove last outcome → Button hidden
4. Add/remove prerequisites → Works correctly
5. Add/remove syllabus weeks → Week numbers adjust

### 🔄 Navigation

1. Click "Back to Courses" → Returns to courses page
2. Click "Cancel" → Returns to courses page
3. Browser back button → Returns correctly

### 🚫 Authorization

1. Logout and try to access → Redirected to dashboard
2. Login as student → Redirected to dashboard
3. Login as instructor → Page accessible
4. Login as admin → Page accessible

## Future Enhancements

-   [ ] **Auto-save Draft** - Save progress automatically
-   [ ] **Image Upload** - Upload thumbnail instead of URL
-   [ ] **Rich Text Editor** - For description with formatting
-   [ ] **Preview Mode** - See how course will look
-   [ ] **Template System** - Start from course templates
-   [ ] **Import/Export** - Import course data from JSON
-   [ ] **Bulk Topics** - Add multiple syllabus weeks at once
-   [ ] **AI Suggestions** - AI-generated learning outcomes
-   [ ] **Video Upload** - Attach intro video
-   [ ] **Drag & Drop** - Reorder syllabus weeks
-   [ ] **Duplicate Course** - Clone existing course

## Files Created

```
src/app/(dashboard)/dashboard/courses/
└── create/
    └── page.tsx  (700+ lines)
```

## Dependencies Used

-   ✅ `react-hook-form` - Form management
-   ✅ `@hookform/resolvers` - Zod integration
-   ✅ `zod` - Schema validation
-   ✅ `next-auth` - Authentication
-   ✅ `sonner` - Toast notifications
-   ✅ `lucide-react` - Icons
-   ✅ Existing UI components (Card, Badge)

## Code Quality

-   ✅ **TypeScript** - Full type safety
-   ✅ **ESLint** - No linting errors
-   ✅ **Best Practices** - React Hook Form patterns
-   ✅ **Error Handling** - Try-catch with user feedback
-   ✅ **Code Comments** - Key sections documented
-   ✅ **Clean Code** - Well-organized sections

## Related Documentation

-   `COURSES_PAGE_DOCUMENTATION.md` - Courses list page
-   `skills-swap-server/docs/COURSE_API_DOCUMENTATION.md` - Backend API
-   `ROLE_BASED_SYSTEM.md` - Authorization system

## Summary

The Create Course page is a **production-ready**, fully-featured form that:

-   ✅ Follows all API requirements
-   ✅ Provides excellent UX with validation
-   ✅ Handles errors gracefully
-   ✅ Supports all required and optional fields
-   ✅ Is fully typed with TypeScript
-   ✅ Works on all screen sizes
-   ✅ Includes helpful instructions
-   ✅ Redirects appropriately after creation

**Ready to use!** 🎓

---

**Last Updated**: October 16, 2025  
**Version**: 1.0.0
