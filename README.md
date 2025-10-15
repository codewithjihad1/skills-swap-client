# 🎓 Skills Swap - Peer-to-Peer Skill Exchange Platform

## 📋 Table of Contents
1. [Project Purpose](#project-purpose)
2. [Project Overview](#project-overview)
3. [Tech Stack](#tech-stack)
4. [Core Features](#core-features)
5. [Architecture](#architecture)
6. [Database Schema](#database-schema)
7. [API Documentation](#api-documentation)
8. [Setup & Installation](#setup--installation)
9. [Project Structure](#project-structure)
10. [Future Enhancements](#future-enhancements)

---

## 🎯 Project Purpose

**Skills Swap** is a peer-to-peer skill exchange platform that enables users to teach what they know and learn what they need—without monetary transactions. The platform fosters a collaborative learning community where knowledge becomes the currency, making education accessible to everyone.

### Problem Statement
- Traditional learning platforms are expensive and transactional
- People have valuable skills but lack platforms to share them
- Learners struggle to find affordable, personalized skill training
- No efficient way to barter skills in a structured, trackable manner

### Solution
Skills Swap creates a barter-based ecosystem where users can:
- Offer their expertise in exchange for learning new skills
- Connect with peers who have complementary skill needs
- Schedule sessions, track progress, and manage skill exchanges seamlessly
- Build a portfolio of both taught and learned skills

---

## 🌟 Project Overview

**Skills Swap** is a full-stack web application built with modern technologies to facilitate skill exchange between users. The platform combines social networking, scheduling, real-time communication, and learning management into one cohesive experience.

### Key Concepts
- **Skill Offering**: Users create profiles showcasing skills they can teach (proficiency level, availability, mode)
- **Swap Requests**: Users can request to exchange their skills with others
- **Session Scheduling**: Integrated Google Calendar/Meet for seamless virtual or in-person sessions
- **Progress Tracking**: Monitor learning outcomes and session history
- **Real-time Communication**: Built-in messaging for negotiation and follow-ups
- **Course Enrollment**: **(🚧 Currently in Development)** Structured learning paths with progress tracking

### Platform Highlights
- ✅ No monetary transactions - pure skill barter system
- ✅ Google Meet integration for virtual sessions
- ✅ Real-time notifications and messaging
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smart matching based on complementary skill needs
- ✅ Dashboard for managing requests, sessions, and messages

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.5.3 | React framework with SSR/SSG, App Router |
| **React** | 19.1.0 | UI component library |
| **TypeScript** | 5.x | Type safety and developer experience |
| **TanStack Query** | 5.x | Server state management, caching, mutations |
| **Tailwind CSS** | 3.x | Utility-first styling |
| **Shadcn/ui** | Latest | Accessible component library |
| **Framer Motion** | 11.x | Animations and transitions |
| **Socket.IO Client** | 4.x | Real-time WebSocket communication |
| **Axios** | 1.x | HTTP client |
| **NextAuth.js** | 4.24.11 | Authentication (Google, Credentials) |
| **Sonner** | 2.x | Toast notifications |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18.x+ | JavaScript runtime |
| **Express.js** | 4.x | Web framework |
| **MongoDB** | 6.x | NoSQL database |
| **Mongoose** | 8.19.1 | ODM for MongoDB |
| **Socket.IO** | 4.x | Real-time bidirectional communication |
| **Google APIs** | Latest | Calendar, Meet, OAuth integration |
| **googleapis** | Latest | Google Calendar/Meet REST APIs |
| **dotenv** | Latest | Environment variable management |
| **cors** | Latest | Cross-origin resource sharing |
| **nodemon** | Latest | Development auto-reload |

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git/GitHub** - Version control
- **VS Code** - Primary IDE
- **Postman** - API testing
- **Turbopack** - Fast bundler for Next.js

### Infrastructure
- **Deployment**: Vercel (Frontend), Railway/Render (Backend)
- **Database Hosting**: MongoDB Atlas
- **Image Hosting**: ImgBB
- **Authentication**: NextAuth with Google OAuth 2.0

---

## ✨ Core Features

### 1. 🔐 User Authentication & Authorization
**Description**: Secure user registration and login system with role-based access control.

**Features**:
- Google OAuth 2.0 integration
- Credential-based authentication (email/password)
- JWT session management via NextAuth
- Role-based access: User, Instructor, Admin
- Protected routes and API endpoints

**Tech**: NextAuth.js, bcrypt, JWT tokens

**Status**: ✅ Complete

---

### 2. 👤 User Profile Management
**Description**: Comprehensive profile system for showcasing skills and managing personal information.

**Features**:
- Editable profile: name, bio, avatar (ImgBB integration)
- Skills portfolio (offered and requested skills)
- View other users' public profiles
- Profile stats: total swaps, rating, active sessions
- Responsive profile cards and detail pages

**Tech**: React Query, Axios, MongoDB User schema

**Status**: ✅ Complete

---

### 3. 🎯 Skill Listing & Discovery
**Description**: Browse, search, and filter skills available for exchange.

**Features**:
- Create skill listings with title, description, category, proficiency level
- Advanced filtering: category, proficiency, mode (Online/Offline/Both)
- Full-text search on skill titles and descriptions
- Tags for better discoverability
- Pagination and infinite scroll
- Skill detail pages with instructor information

**Tech**: MongoDB text indexes, React Query, Framer Motion

**Status**: ✅ Complete

---

### 4. 🔄 Swap Request System
**Description**: Core feature enabling users to propose skill exchanges.

**Features**:
- Send swap requests (offer your skill in exchange for theirs)
- Request statuses: Pending, Accepted, Rejected, Scheduled, Completed, Cancelled
- Accept/Reject requests with reasons
- View incoming and outgoing requests in organized tabs
- Real-time status updates via Socket.IO
- Request details with skill descriptions and user info

**Tech**: Socket.IO, React Query, MongoDB SwapRequest schema

**Status**: ✅ Complete

---

### 5. 💬 Real-time Messaging System
**Description**: Built-in chat for negotiating exchanges and follow-ups.

**Features**:
- One-on-one conversations
- Real-time message delivery via WebSockets
- Message read receipts and delivery status
- Conversation list with unread count
- Auto-generated conversationId (user ID pairs)
- Follow-up messaging from swap requests
- Message history and timestamps

**Tech**: Socket.IO, MongoDB Message schema, TanStack Query

**Status**: ✅ Complete

---

### 6. 📅 Session Scheduling & Management
**Description**: Google Calendar/Meet integration for scheduling and managing skill exchange sessions.

**Features**:
- Schedule sessions with date, time, duration, notes
- Google Calendar event creation with auto-generated Meet links
- Fallback mode (mock Meet links) when OAuth not configured
- Session statuses: Scheduled, Completed, Cancelled
- Reschedule sessions with calendar updates
- Cancel sessions with reason tracking
- Join session via Google Meet link
- Copy meeting link to clipboard
- Email invitations sent to both participants
- Automatic reminders (1 day before, 30 minutes before)

**Tech**: Google Calendar API, Google Meet API, googleapis, OAuth 2.0

**Status**: ✅ Complete (with fallback mode)

---

### 7. 🔔 Notifications Center
**Description**: Real-time notification system for all platform activities.

**Features**:
- Notification types: Request, Message, Session
- Real-time push notifications via Socket.IO
- Header bell icon with unread badge
- Dropdown list with mark read/all read
- Dedicated notifications page with filtering
- Notification triggers:
  - New swap request received
  - Request accepted/rejected
  - New message received
  - Session scheduled/rescheduled/cancelled
- Pagination and infinite scroll
- Auto-mark as read on view

**Tech**: Socket.IO, React Query, MongoDB Notification schema

**Status**: ✅ Complete

---

### 8. 📊 User Dashboard
**Description**: Centralized hub for managing all platform activities.

**Features**:
- Overview stats: Active requests, pending swaps, scheduled sessions, unread messages
- Quick actions: Create skill, send request, schedule session
- Recent activity feed
- Upcoming sessions calendar view
- Tabs: Requests (Incoming/Outgoing), Sessions, Messages, Notifications
- Responsive layout for all screen sizes
- Search and filter across all sections

**Tech**: Next.js App Router, React Query, Shadcn components

**Status**: ✅ Complete

---

### 9. 🎓 Course Creation & Management
**Description**: Instructors can create structured courses as an alternative to one-on-one swaps.

**Features**:
- Create courses with title, description, category, level
- Multi-week syllabus with topics and durations
- Set learning outcomes and prerequisites
- Upload course thumbnails
- Publish/unpublish courses
- Edit and delete courses
- View courses by instructor
- Search and filter courses

**Tech**: MongoDB Course schema, Express REST API

**Status**: ✅ Complete

---

### 10. 📚 Course Enrollment & Progress Tracking
**Description**: **(🚧 Currently in Development)** Users can enroll in courses and track their learning progress.

**Features**:
- Enroll in published courses (prevents duplicates)
- View "My Courses" dashboard with statistics
- Track progress: completed lessons, percentage completion
- Mark lessons as completed (week + topic level)
- Auto-status updates: Active → Completed at 100%
- Unenroll from courses (sets status to "Dropped")
- Rate and review courses
- Certificate tracking for completed courses
- Week-by-week progress breakdown
- Total learning time and hours tracked

**Tech**: MongoDB Enrollment schema, React Query, Progress calculation middleware

**Status**: 🚧 **In Development** (Backend Complete, Frontend Pending)

**Current Progress**:
- ✅ Enrollment model with progress tracking
- ✅ 6 REST API endpoints (enroll, my-courses, progress, update, unenroll, rate)
- ✅ Auto-progress calculation based on syllabus
- ✅ Mock data seed script for testing
- ✅ API documentation for frontend integration
- ⏳ Frontend UI components (dashboard, learning page)
- ⏳ Integration with Next.js pages

**Endpoints Available**:
```
POST   /api/enrollments/enroll/:courseId       - Enroll in course
GET    /api/enrollments/my-courses             - Get enrolled courses
GET    /api/enrollments/progress/:courseId     - Get progress details
PUT    /api/enrollments/progress/:courseId     - Update lesson progress
DELETE /api/enrollments/unenroll/:courseId     - Unenroll from course
POST   /api/enrollments/rate/:courseId         - Rate course
```

---

## 🏗️ Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Next.js)                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │Dashboard │  │ Requests │  │ Messages │  │ Sessions │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         TanStack Query (State Management)                │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────┐              ┌────────────────┐            │
│  │  Socket.IO     │              │  Axios HTTP    │            │
│  │  Client        │              │  Client        │            │
│  └────────┬───────┘              └────────┬───────┘            │
└───────────┼──────────────────────────────┼────────────────────┘
            │                               │
            │ WebSocket                     │ REST API
            │                               │
┌───────────┼──────────────────────────────┼────────────────────┐
│           │                               │                    │
│  ┌────────▼───────┐              ┌───────▼────────┐           │
│  │  Socket.IO     │              │  Express.js    │           │
│  │  Server        │              │  REST API      │           │
│  └────────────────┘              └────────────────┘           │
│                                                                 │
│                    SERVER (Node.js/Express)                    │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │              Controllers & Services                      │  │
│  │  • Auth  • Users  • Skills  • Requests                   │  │
│  │  • Messages  • Sessions  • Notifications  • Courses      │  │
│  │  • Enrollments                                            │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │            External Services                             │  │
│  │  • Google Calendar API  • Google Meet API                │  │
│  │  • NextAuth OAuth  • ImgBB Image Hosting                 │  │
│  └─────────────────────────────────────────────────────────┘  │
│                              │                                  │
└──────────────────────────────┼──────────────────────────────────┘
                               │
                               │
                    ┌──────────▼──────────┐
                    │   MongoDB Atlas     │
                    │   (Database)        │
                    │                     │
                    │  Collections:       │
                    │  • users            │
                    │  • skills           │
                    │  • swapRequests     │
                    │  • messages         │
                    │  • sessions         │
                    │  • notifications    │
                    │  • courses          │
                    │  • enrollments      │
                    └─────────────────────┘
```

### Data Flow

**1. User Authentication Flow**
```
User → NextAuth → Google OAuth → Server → MongoDB → JWT Session → Client
```

**2. Skill Exchange Flow**
```
User A (Skill Offer) → Swap Request → User B (Review)
        ↓
User B Accepts → Negotiate via Messages → Schedule Session
        ↓
Google Calendar Event Created → Meet Link Generated
        ↓
Session Completed → Both Users Update Progress
```

**3. Real-time Communication Flow**
```
User A sends message → Socket.IO Server → Socket.IO Client (User B)
        ↓
MongoDB (persist) → Notification Created → Real-time Badge Update
```

**4. Course Enrollment Flow (In Development)**
```
User → Browse Courses → Enroll → Track Progress
        ↓
Mark Lessons Complete → Auto-calculate % → Status Update
        ↓
100% Complete → Certificate Issued → Rate & Review
```

---

## 🗄️ Database Schema

### Collections Overview

```javascript
// User Schema
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  password: String (hashed),
  avatar: String (URL),
  bio: String,
  role: "user" | "instructor" | "admin",
  skillsOffered: [ObjectId] (ref: Skill),
  skillsRequested: [ObjectId] (ref: Skill),
  createdAt: Date,
  updatedAt: Date
}

// Skill Schema
{
  _id: ObjectId,
  title: String (indexed),
  description: String (text indexed),
  category: String,
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert",
  tags: [String],
  exchangeFor: [String],
  availability: String,
  location: String,
  mode: "Online" | "Offline" | "Both",
  offeredBy: ObjectId (ref: User, indexed),
  createdAt: Date,
  updatedAt: Date
}

// SwapRequest Schema
{
  _id: ObjectId,
  requester: ObjectId (ref: User, indexed),
  skillProvider: ObjectId (ref: User, indexed),
  skillOffered: ObjectId (ref: Skill),
  skillRequested: ObjectId (ref: Skill),
  status: "pending" | "accepted" | "rejected" | "scheduled" | "completed" | "cancelled",
  message: String,
  createdAt: Date,
  updatedAt: Date
}

// Message Schema
{
  _id: ObjectId,
  conversationId: String (indexed),
  sender: ObjectId (ref: User, indexed),
  receiver: ObjectId (ref: User, indexed),
  content: String,
  messageType: "text" | "image" | "file",
  isRead: Boolean,
  isDelivered: Boolean,
  readAt: Date,
  attachments: [String],
  createdAt: Date,
  updatedAt: Date
}

// Session Schema
{
  _id: ObjectId,
  swapRequest: ObjectId (ref: SwapRequest, indexed),
  participants: [ObjectId] (ref: User),
  scheduledDate: Date (indexed),
  duration: Number (minutes),
  timeZone: String,
  meetingLink: String,
  meetingCode: String,
  calendarEventId: String,
  spaceId: String (Google Meet space ID),
  status: "scheduled" | "completed" | "cancelled",
  notes: String,
  isMock: Boolean,
  createdAt: Date,
  updatedAt: Date
}

// Notification Schema
{
  _id: ObjectId,
  user: ObjectId (ref: User, indexed),
  type: "request" | "message" | "session",
  title: String,
  body: String,
  data: Mixed (JSON),
  isRead: Boolean (indexed),
  createdAt: Date (indexed),
  updatedAt: Date
}

// Course Schema
{
  _id: ObjectId,
  title: String (indexed),
  description: String (text indexed),
  category: String,
  level: "Beginner" | "Intermediate" | "Advanced",
  instructor: ObjectId (ref: User, indexed),
  syllabus: [
    {
      weekNumber: Number,
      title: String,
      topics: [
        {
          title: String,
          durationMinutes: Number
        }
      ]
    }
  ],
  learningOutcomes: [String],
  prerequisites: [String],
  thumbnail: String,
  published: Boolean (indexed),
  publishedAt: Date,
  totalEnrollments: Number,
  averageRating: Number,
  createdAt: Date,
  updatedAt: Date
}

// Enrollment Schema (In Development)
{
  _id: ObjectId,
  user: ObjectId (ref: User, indexed),
  course: ObjectId (ref: Course, indexed),
  status: "active" | "completed" | "dropped",
  progress: {
    completedLessons: [
      {
        week: Number,
        lessonIndex: Number,
        completedAt: Date
      }
    ],
    progressPercentage: Number,
    lastAccessedAt: Date
  },
  rating: {
    score: Number (1-5),
    review: String,
    ratedAt: Date
  },
  certificateIssued: Boolean,
  certificateUrl: String,
  enrolledAt: Date,
  completedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes
- **User**: email (unique), role
- **Skill**: offeredBy, title (text), description (text)
- **SwapRequest**: requester, skillProvider, status
- **Message**: conversationId, sender, receiver
- **Session**: swapRequest, scheduledDate
- **Notification**: user, isRead, createdAt
- **Course**: instructor, published
- **Enrollment**: user + course (compound unique), status

---

## 📡 API Documentation

### Base URL
- **Development**: `http://localhost:5000`
- **Production**: `https://skills-swap-api.onrender.com` (example)

### Authentication
Most endpoints require authentication via NextAuth session or JWT token:
```
Headers:
  Authorization: Bearer <token>
  or
  x-user-id: <userId> (for dev testing)
```

### API Endpoints Summary

#### **Authentication** (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /session` - Get current session

#### **Users** (`/api/users`)
- `GET /` - Get all users
- `GET /:id` - Get user by ID
- `PUT /:id` - Update user profile
- `DELETE /:id` - Delete user

#### **Skills** (`/api/skills`)
- `POST /` - Create skill
- `GET /` - Get all skills (with filters)
- `GET /:id` - Get skill by ID
- `PUT /:id` - Update skill
- `DELETE /:id` - Delete skill

#### **Swap Requests** (`/api/swap-requests`)
- `POST /` - Create swap request
- `GET /user/:userId` - Get user's requests
- `PATCH /:id/accept` - Accept request
- `PATCH /:id/reject` - Reject request
- `PATCH /:id/cancel` - Cancel request

#### **Messages** (`/api/messages`)
- `POST /send` - Send message
- `GET /conversations/:userId` - Get conversations
- `GET /conversation/:conversationId` - Get conversation messages
- `PATCH /:messageId/read` - Mark message as read

#### **Sessions** (`/api/sessions`)
- `POST /schedule` - Schedule session
- `GET /user/:userId` - Get user sessions
- `GET /:id` - Get session details
- `PATCH /:id/reschedule` - Reschedule session
- `PATCH /:id/cancel` - Cancel session
- `PATCH /:id/complete` - Complete session
- `GET /google/auth` - Get Google OAuth URL
- `GET /google/callback` - OAuth callback

#### **Notifications** (`/api/notifications`)
- `POST /` - Create notification
- `GET /user/:userId` - Get user notifications
- `GET /user/:userId/unread-count` - Get unread count
- `PATCH /:id/read` - Mark as read
- `PATCH /read-all/:userId` - Mark all as read

#### **Courses** (`/api/courses`)
- `POST /` - Create course
- `GET /` - Get all courses (with filters)
- `GET /instructor/:id` - Get courses by instructor
- `GET /:id` - Get course by ID
- `PUT /:id` - Update course
- `DELETE /:id` - Delete course
- `PATCH /:id/publish` - Publish/unpublish course

#### **Enrollments** (`/api/enrollments`) - 🚧 In Development
- `POST /enroll/:courseId` - Enroll in course
- `GET /my-courses` - Get enrolled courses
- `GET /progress/:courseId` - Get course progress
- `PUT /progress/:courseId` - Update lesson progress
- `DELETE /unenroll/:courseId` - Unenroll from course
- `POST /rate/:courseId` - Rate course

### Socket.IO Events

**Client → Server**
- `message:send` - Send a message
- `notification:read` - Mark notification as read

**Server → Client**
- `message:new` - New message received
- `notification:new` - New notification
- `request:update` - Swap request status changed
- `session:update` - Session update

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18.x or higher
- MongoDB 6.x (local or Atlas)
- Google Cloud account (for Calendar/Meet integration)
- Git

### Environment Variables

**Backend (`.env`)**
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/skills-swap
# or
DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/skills-swap

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (for Calendar/Meet)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REFRESH_TOKEN=1//0abc123...
GOOGLE_REDIRECT_URI=http://localhost:5000/api/sessions/google/callback

# CORS
CLIENT_URL=http://localhost:3000
```

**Frontend (`.env.local`)**
```env
# API
NEXT_PUBLIC_API_URL=http://localhost:5000

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

### Installation Steps

**1. Clone Repository**
```bash
git clone https://github.com/your-org/skills-swap.git
cd skills-swap
```

**2. Backend Setup**
```bash
cd skills-swap-server
npm install
cp .env.example .env
# Edit .env with your values
npm start
```

**3. Frontend Setup**
```bash
cd skills-swap-client
pnpm install
cp .env.example .env.local
# Edit .env.local with your values
pnpm dev
```

**4. Seed Database (Optional)**
```bash
cd skills-swap-server
node src/seeds/seedEnrollments.js
```

**5. Access Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Docs: http://localhost:5000/api-docs (if Swagger enabled)

### Google Calendar/Meet Setup (Optional)

For real Google Meet links (otherwise fallback mode with mock links):

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable APIs:
   - Google Calendar API
   - Google Meet API (optional)
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URI: `http://localhost:5000/api/sessions/google/callback`
6. Get Client ID and Secret
7. Visit `http://localhost:5000/api/sessions/google/auth` to get refresh token
8. Add credentials to `.env`
9. Restart server

**Detailed guide**: See `QUICK_SETUP_GOOGLE_CALENDAR.md`

---

## 📁 Project Structure

### Backend Structure
```
skills-swap-server/
├── src/
│   ├── controllers/           # Request handlers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── skillController.js
│   │   ├── swapRequestController.js
│   │   ├── messageController.js
│   │   ├── sessionController.js
│   │   ├── notificationController.js
│   │   ├── courseController.js
│   │   └── enrollmentController.js
│   ├── models/                # Mongoose schemas
│   │   ├── User.js
│   │   ├── Skill.js
│   │   ├── SwapRequest.js
│   │   ├── Message.js
│   │   ├── Session.js
│   │   ├── Notification.js
│   │   ├── Course.js
│   │   └── Enrollment.js
│   ├── routes/                # Express routes
│   │   ├── authRoute.js
│   │   ├── userRoute.js
│   │   ├── skillRoute.js
│   │   ├── swapRequestRoute.js
│   │   ├── messageRoute.js
│   │   ├── sessionRoute.js
│   │   ├── notificationRoute.js
│   │   ├── courseRoute.js
│   │   └── enrollmentRoute.js
│   ├── services/              # Business logic
│   │   ├── googleCalendarService.js
│   │   └── googleMeetService.js
│   ├── middlewares/           # Express middleware
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── devAuth.js
│   ├── seeds/                 # Database seeders
│   │   ├── seedEnrollments.js
│   │   └── seed-output.json
│   └── utils/                 # Helper functions
├── docs/                      # Documentation
│   ├── COURSE_API_DOCUMENTATION.md
│   ├── ENROLLMENT_API_DOCUMENTATION.md
│   ├── GOOGLE_CALENDAR_INTEGRATION.md
│   └── QUICK_SETUP_GOOGLE_CALENDAR.md
├── index.js                   # Server entry point
├── package.json
└── .env
```

### Frontend Structure
```
skills-swap-client/
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/            # Auth layout
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/       # Dashboard layout
│   │   │   └── dashboard/
│   │   │       ├── page.tsx   # Dashboard home
│   │   │       ├── requests/  # Swap requests
│   │   │       ├── messages/  # Real-time chat
│   │   │       ├── sessions/  # Scheduled sessions (🚧)
│   │   │       ├── notifications/ # Notifications
│   │   │       └── courses/   # Course management (🚧)
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/            # React components
│   │   ├── ui/                # Shadcn components
│   │   ├── sessions/
│   │   │   └── ScheduleSessionDialog.tsx
│   │   └── profile-page/
│   ├── lib/                   # Utilities
│   │   ├── api/               # API functions
│   │   │   ├── skills.ts
│   │   │   ├── swapRequests.ts
│   │   │   ├── messages.ts
│   │   │   ├── sessions.ts
│   │   │   ├── notifications.ts
│   │   │   ├── courses.ts
│   │   │   └── enrollments.ts
│   │   ├── axiosInstance.ts   # Axios config
│   │   └── utils.ts
│   ├── context/               # React Context
│   │   └── SocketContext.tsx  # Socket.IO provider
│   └── types/                 # TypeScript types
├── public/                    # Static assets
├── next.config.ts
├── tailwind.config.ts
├── package.json
└── .env.local
```

---

## 🔮 Future Enhancements

### Phase 1 (Current Milestone-4)
- ✅ Complete Course Enrollment frontend UI
- ✅ Implement Sessions Dashboard page
- ✅ Add unit tests (Jest + RTL)
- ✅ Ensure full responsiveness

### Phase 2 (Next Sprint)
- [ ] Admin dashboard for platform management
- [ ] Advanced search with Elasticsearch
- [ ] User reputation/rating system
- [ ] Gamification (badges, leaderboards)
- [ ] Mobile app (React Native)

### Phase 3 (Long-term)
- [ ] AI-powered skill matching
- [ ] Video call integration (in-app WebRTC)
- [ ] Payment gateway for premium features
- [ ] Multi-language support (i18n)
- [ ] Analytics dashboard for instructors
- [ ] Skill certification system

---

## 👥 Team

**Team Size**: 4 Members

**Roles**:
- Member A: Backend Lead (APIs, Database, Google Integration)
- Member B: Frontend Lead (UI/UX, Components, Responsive Design)
- Member C: Full-stack (Socket.IO, Session Management, Integration)
- Member D: QA/Docs (Testing, Documentation, Polish)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Shadcn for the beautiful component library
- Google for Calendar/Meet APIs
- MongoDB for the flexible database
- Programming Hero for project guidance

---

## 📞 Support

For questions or issues:
- GitHub Issues: [Create an issue](https://github.com/your-org/skills-swap/issues)
- Email: support@skillsswap.com
- Documentation: See `docs/` folder

---

**Last Updated**: October 15, 2025  
**Version**: 1.0.0  
**Status**: ✅ Core Features Complete | 🚧 Course Enrollment in Development