# 🎓 Skills Swap - Peer-to-Peer Skill Exchange Platform

## 📋 Table of Contents

1. [Project Purpose](#project-purpose)
2. [Project Overview](#project-overview)
3. [Project SRS](#project-srs)
4. [Tech Stack](#tech-stack)
5. [Core Features](#core-features)
6. [Architecture](#architecture)
7. [Database Schema](#database-schema)
8. [API Documentation](#api-documentation)
9. [Setup & Installation](#setup--installation)
10. [Project Structure](#project-structure)
11. [Future Enhancements](#future-enhancements)

---

## 🎯 Project Purpose

**Skills Swap** is a peer-to-peer skill exchange platform that enables users to teach what they know and learn what they need—without monetary transactions. The platform fosters a collaborative learning community where knowledge becomes the currency, making education accessible to everyone.

### Problem Statement

-   Traditional learning platforms are expensive and transactional
-   People have valuable skills but lack platforms to share them
-   Learners struggle to find affordable, personalized skill training
-   No efficient way to barter skills in a structured, trackable manner

### Solution

Skills Swap creates a barter-based ecosystem where users can:

-   Offer their expertise in exchange for learning new skills
-   Connect with peers who have complementary skill needs
-   Schedule sessions, track progress, and manage skill exchanges seamlessly
-   Build a portfolio of both taught and learned skills

---

## 🌟 Project Overview

**Skills Swap** is a full-stack web application built with modern technologies to facilitate skill exchange between users. The platform combines social networking, scheduling, real-time communication, and learning management into one cohesive experience.

### Key Concepts

-   **Skill Offering**: Users create profiles showcasing skills they can teach (proficiency level, availability, mode)
-   **Swap Requests**: Users can request to exchange their skills with others
-   **Session Scheduling**: Integrated Google Calendar/Meet for seamless virtual or in-person sessions
-   **Progress Tracking**: Monitor learning outcomes and session history
-   **Real-time Communication**: Built-in messaging for negotiation and follow-ups
-   **Course Enrollment**: **(🚧 Currently in Development)** Structured learning paths with progress tracking

### Platform Highlights

-   ✅ No monetary transactions - pure skill barter system
-   ✅ Google Meet integration for virtual sessions
-   ✅ Real-time notifications and messaging
-   ✅ Responsive design (mobile, tablet, desktop)
-   ✅ Smart matching based on complementary skill needs
-   ✅ Dashboard for managing requests, sessions, and messages

---

# 📘 Software Requirements Specification (SRS)

## Skills Swap - Peer-to-Peer Skill Exchange Platform

**Version**: 1.0.0  
**Date**: October 15, 2025  
**Prepared by**: Skills Swap Development Team  
**Project Status**: Milestone-4 (Phase 2 Implementation)

---

## Table of Contents

1. [Introduction](#1-introduction)
    - 1.1 Purpose
    - 1.2 Document Conventions
    - 1.3 Intended Audience
    - 1.4 Project Scope
    - 1.5 References
2. [Overall Description](#2-overall-description)
    - 2.1 Product Perspective
    - 2.2 Product Functions
    - 2.3 User Classes and Characteristics
    - 2.4 Operating Environment
    - 2.5 Design and Implementation Constraints
    - 2.6 Assumptions and Dependencies
3. [System Features](#3-system-features)
4. [External Interface Requirements](#4-external-interface-requirements)
    - 4.1 User Interfaces
    - 4.2 Hardware Interfaces
    - 4.3 Software Interfaces
    - 4.4 Communication Interfaces
5. [Functional Requirements](#5-functional-requirements)
6. [Non-Functional Requirements](#6-non-functional-requirements)
7. [Other Requirements](#7-other-requirements)
8. [Appendix](#8-appendix)

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) document provides a complete description of the Skills Swap platform. It describes the functional and non-functional requirements for the system, which enables users to exchange skills in a peer-to-peer barter system without monetary transactions.

**Target Audience**:

-   Development team
-   Project managers
-   Quality assurance team
-   Stakeholders and investors
-   End users

### 1.2 Document Conventions

-   **Requirements Priority**:

    -   **High**: Essential for system operation (MVP features)
    -   **Medium**: Important but not critical for initial release
    -   **Low**: Nice-to-have features for future versions

-   **Naming Conventions**:
    -   `FR-XXX`: Functional Requirement
    -   `NFR-XXX`: Non-Functional Requirement
    -   `UI-XXX`: User Interface Requirement
    -   `API-XXX`: API Requirement

### 1.3 Intended Audience

This document is intended for:

-   **Developers**: To understand system requirements and implementation details
-   **QA Team**: To create test plans and test cases
-   **Project Managers**: To track progress and plan sprints
-   **Designers**: To create UI/UX aligned with requirements
-   **Stakeholders**: To validate that requirements meet business objectives

### 1.4 Project Scope

**Skills Swap** is a web-based platform that facilitates skill exchange between users without monetary transactions. Users can:

-   Offer skills they possess
-   Request skills they want to learn
-   Exchange skills in a barter system
-   Schedule and conduct learning sessions
-   Track progress and manage learning outcomes
-   Enroll in structured courses

**Goals**:

-   Democratize education by removing financial barriers
-   Build a collaborative learning community
-   Maximize skill utilization and knowledge sharing
-   Provide flexible, personalized learning experiences

**Out of Scope** (for current version):

-   Mobile native applications (iOS/Android)
-   Payment processing for premium features
-   Live video streaming (uses Google Meet integration)
-   Blockchain-based skill verification
-   AI-powered automatic matching (manual matching for v1.0)

### 1.5 References

-   **Technical Documentation**:

    -   Next.js 15 Documentation: https://nextjs.org/docs
    -   Express.js Documentation: https://expressjs.com
    -   MongoDB Documentation: https://docs.mongodb.com
    -   Socket.IO Documentation: https://socket.io/docs
    -   Google Calendar API: https://developers.google.com/calendar
    -   NextAuth.js Documentation: https://next-auth.js.org

-   **Project Documentation**:
    -   PROJECT_DOCUMENTATION.md
    -   COURSE_API_DOCUMENTATION.md
    -   ENROLLMENT_API_DOCUMENTATION.md
    -   GOOGLE_CALENDAR_INTEGRATION.md

---

## 2. Overall Description

### 2.1 Product Perspective

Skills Swap is a standalone web application that operates independently but integrates with external services:

**System Context Diagram**:

```
┌─────────────────────────────────────────────────────────────────┐
│                          External Systems                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Google     │  │   Google     │  │    ImgBB     │          │
│  │   Calendar   │  │     Meet     │  │ Image Host   │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
└─────────┼──────────────────┼──────────────────┼─────────────────┘
          │                  │                  │
          │ OAuth 2.0        │ REST API         │ Upload API
          │                  │                  │
┌─────────▼──────────────────▼──────────────────▼─────────────────┐
│                     Skills Swap Platform                         │
├──────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              Frontend (Next.js 15)                         │ │
│  │  • User Interface (React Components)                       │ │
│  │  • State Management (TanStack Query)                       │ │
│  │  • Real-time Updates (Socket.IO Client)                    │ │
│  │  • Authentication (NextAuth)                               │ │
│  └──────────────────────┬─────────────────────────────────────┘ │
│                         │ HTTP/WebSocket                         │
│  ┌──────────────────────▼─────────────────────────────────────┐ │
│  │              Backend (Node.js/Express)                     │ │
│  │  • REST API Endpoints                                      │ │
│  │  • WebSocket Server (Socket.IO)                            │ │
│  │  • Business Logic (Controllers)                            │ │
│  │  • Authentication & Authorization                          │ │
│  └──────────────────────┬─────────────────────────────────────┘ │
│                         │ Mongoose ODM                           │
│  ┌──────────────────────▼─────────────────────────────────────┐ │
│  │              Database (MongoDB)                            │ │
│  │  Collections: users, skills, swapRequests, messages,       │ │
│  │  sessions, notifications, courses, enrollments             │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
          │                  │                  │
          │                  │                  │
┌─────────▼──────────────────▼──────────────────▼─────────────────┐
│                           End Users                              │
├──────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  Learner │  │ Instructor│ │   Admin  │  │   Guest  │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
└──────────────────────────────────────────────────────────────────┘
```

**System Characteristics**:

-   Web-based application (responsive design)
-   Client-server architecture
-   Real-time communication via WebSockets
-   RESTful API for data operations
-   Third-party integrations (Google, ImgBB)
-   Cloud-hosted database (MongoDB Atlas)

### 2.2 Product Functions

**Core Functions Summary**:

1. **User Management**

    - Registration and authentication
    - Profile creation and editing
    - Role-based access control (User, Instructor, Admin)

2. **Skill Management**

    - Create, read, update, delete skill listings
    - Search and filter skills
    - Categorization and tagging

3. **Skill Exchange**

    - Send and receive swap requests
    - Accept/reject/cancel requests
    - Track request status and history

4. **Communication**

    - Real-time messaging between users
    - Conversation management
    - Message notifications

5. **Session Management**

    - Schedule skill exchange sessions
    - Google Calendar/Meet integration
    - Reschedule and cancel sessions
    - Track session completion

6. **Notifications**

    - Real-time push notifications
    - Notification history
    - Mark as read/unread

7. **Course Management**

    - Create and publish courses
    - Manage course content (syllabus, topics)
    - Browse and search courses

8. **Enrollment & Progress** (In Development)

    - Enroll in courses
    - Track learning progress
    - Mark lessons as completed
    - Issue certificates

9. **Dashboard**

    - Overview of user activities
    - Quick access to all features
    - Statistics and analytics

10. **Admin Functions** (Future)
    - User management
    - Content moderation
    - Platform analytics

### 2.3 User Classes and Characteristics

| User Class          | Description            | Technical Expertise | Features Access                          | Priority |
| ------------------- | ---------------------- | ------------------- | ---------------------------------------- | -------- |
| **Guest**           | Unregistered visitor   | Low                 | Browse skills, view landing page         | Low      |
| **Registered User** | Basic account holder   | Low-Medium          | All core features except course creation | High     |
| **Instructor**      | Course creator         | Medium-High         | All user features + course creation      | High     |
| **Admin**           | Platform administrator | High                | All features + admin dashboard           | Medium   |

**User Personas**:

**1. Alex - The Learner** (Primary User)

-   Age: 22-30
-   Background: Recent graduate, wants to learn new skills
-   Goals: Learn web development in exchange for teaching graphic design
-   Technical Skill: Medium
-   Usage Pattern: Daily, 30-60 minutes
-   Needs: Easy discovery, flexible scheduling, progress tracking

**2. Sarah - The Instructor** (Primary User)

-   Age: 28-40
-   Background: Professional with 5+ years experience
-   Goals: Share expertise, learn complementary skills
-   Technical Skill: High
-   Usage Pattern: Weekly, creates courses and responds to requests
-   Needs: Course creation tools, scheduling flexibility, student progress visibility

**3. Mike - The Admin** (Secondary User)

-   Age: 30-45
-   Background: Platform manager
-   Goals: Ensure platform quality and user satisfaction
-   Technical Skill: Very High
-   Usage Pattern: Daily monitoring
-   Needs: Analytics, moderation tools, user management

### 2.4 Operating Environment

**Client Side**:

-   **Browsers**:
    -   Chrome 100+ (Recommended)
    -   Firefox 100+
    -   Safari 15+
    -   Edge 100+
-   **Operating Systems**: Windows 10+, macOS 10.15+, Linux (Ubuntu 20.04+), iOS 14+, Android 10+
-   **Screen Resolutions**:
    -   Mobile: 360px - 767px
    -   Tablet: 768px - 1023px
    -   Desktop: 1024px+
-   **Internet**: Broadband connection (minimum 2 Mbps)

**Server Side**:

-   **Runtime**: Node.js 18.x or higher
-   **Web Server**: Express.js 4.x
-   **Database**: MongoDB 6.x
-   **Hosting**:
    -   Frontend: Vercel (or similar)
    -   Backend: Render/Railway (or similar)
    -   Database: MongoDB Atlas

**Third-Party Services**:

-   Google Calendar API (session scheduling)
-   Google Meet API (video conferencing)
-   ImgBB API (image hosting)
-   NextAuth (authentication)

### 2.5 Design and Implementation Constraints

**Technical Constraints**:

-   Must use Next.js 15 for frontend (requirement)
-   Must use Express.js for backend (requirement)
-   MongoDB as primary database (requirement)
-   Socket.IO for real-time features (requirement)
-   Must be mobile-responsive (requirement)

**Business Constraints**:

-   No payment processing in v1.0
-   Google OAuth setup required for full functionality
-   Fallback mode for development without Google credentials
-   4-week development timeline per milestone

**Regulatory Constraints**:

-   GDPR compliance for user data (EU users)
-   COPPA compliance (no users under 13)
-   Accessibility standards (WCAG 2.1 Level AA)

**Security Constraints**:

-   All API endpoints must require authentication
-   Passwords must be hashed (bcrypt)
-   HTTPS required in production
-   CORS properly configured
-   Input validation and sanitization

### 2.6 Assumptions and Dependencies

**Assumptions**:

-   Users have reliable internet access
-   Users have basic computer literacy
-   Users have access to modern web browsers
-   Users have email accounts for registration
-   Users willing to participate in skill exchange without payment

**Dependencies**:

-   **External Services**:
    -   Google Cloud Platform (Calendar/Meet APIs)
    -   MongoDB Atlas availability
    -   ImgBB service uptime
    -   NextAuth service
-   **Third-Party Libraries**:
    -   Continued support for Next.js 15
    -   TanStack Query maintenance
    -   Socket.IO compatibility
-   **Development Team**:
    -   4 active developers
    -   Access to development tools
    -   GitHub for version control

---

## 3. System Features

### 3.1 User Authentication & Authorization

**Description**: Secure system for user registration, login, and role-based access control.

**Priority**: High

**Functional Requirements**:

**FR-101**: Registration

-   System shall allow users to register with email and password
-   System shall allow users to register via Google OAuth
-   System shall validate email format and password strength (min 8 chars, 1 uppercase, 1 number)
-   System shall send email verification link upon registration
-   System shall prevent duplicate email registrations

**FR-102**: Login

-   System shall allow users to login with email/password or Google OAuth
-   System shall create JWT session tokens valid for 24 hours
-   System shall implement "Remember Me" functionality
-   System shall lock account after 5 failed login attempts (15-minute cooldown)

**FR-103**: Password Management

-   System shall allow users to reset password via email link
-   System shall require old password for password changes
-   System shall hash passwords using bcrypt (10 salt rounds)

**FR-104**: Role Management

-   System shall support three roles: User, Instructor, Admin
-   System shall auto-assign "User" role on registration
-   System shall allow Admins to change user roles
-   System shall restrict course creation to Instructors and Admins

**FR-105**: Session Management

-   System shall maintain user sessions across page refreshes
-   System shall log out users automatically after 24 hours of inactivity
-   System shall allow manual logout from all devices

**Acceptance Criteria**:

-   User can register and receive verification email within 30 seconds
-   User can login and access dashboard within 3 seconds
-   Unauthorized users are redirected to login page
-   Role-based restrictions are enforced on all protected routes

---

### 3.2 User Profile Management

**Description**: Comprehensive profile system for personal information and skill portfolio.

**Priority**: High

**Functional Requirements**:

**FR-201**: Profile Creation

-   System shall create default profile on registration with name and email
-   System shall allow users to add bio (max 500 characters)
-   System shall allow users to upload avatar image (max 5MB, JPG/PNG)
-   System shall use default avatar if none provided

**FR-202**: Profile Editing

-   System shall allow users to edit name, bio, and avatar
-   System shall validate name (2-50 characters)
-   System shall auto-save changes and show success message
-   System shall prevent email changes (security)

**FR-203**: Skills Portfolio

-   System shall display all skills offered by user (read-only on profile)
-   System shall display all skills requested by user
-   System shall show skill count on profile card
-   System shall link to skill detail pages

**FR-204**: Profile Viewing

-   System shall allow users to view other users' public profiles
-   System shall show: name, avatar, bio, skills offered, rating, total swaps
-   System shall hide private information (email, password)
-   System shall show "Contact" button for logged-in users

**FR-205**: Profile Statistics

-   System shall display total swaps completed
-   System shall display average rating (if rated)
-   System shall display member since date
-   System shall display active session count

**Acceptance Criteria**:

-   Profile edits save within 2 seconds
-   Image upload completes within 5 seconds
-   Public profiles load within 1 second
-   All profile data is responsive on mobile

---

### 3.3 Skill Listing & Discovery

**Description**: System for creating, browsing, and discovering skills available for exchange.

**Priority**: High

**Functional Requirements**:

**FR-301**: Skill Creation

-   System shall allow authenticated users to create skill listings
-   System shall require: title, description, category, proficiency level, mode
-   System shall allow: tags (max 10), exchange preferences, availability, location
-   System shall auto-set creator as skill owner
-   System shall mark new skills as active by default

**FR-302**: Skill Browsing

-   System shall display all active skills in grid/list view
-   System shall show: title, category, proficiency badge, owner avatar, rating
-   System shall paginate results (12 skills per page)
-   System shall support infinite scroll

**FR-303**: Skill Search

-   System shall provide search bar for full-text search
-   System shall search in: title, description, tags
-   System shall highlight search terms in results
-   System shall show "No results found" message if empty

**FR-304**: Skill Filtering

-   System shall filter by category (dropdown)
-   System shall filter by proficiency level (checkboxes)
-   System shall filter by mode (Online, Offline, Both)
-   System shall allow multiple filters simultaneously
-   System shall show active filter count

**FR-305**: Skill Sorting

-   System shall sort by: Newest, Oldest, Most Popular, Highest Rated
-   System shall persist sort preference in session
-   System shall show current sort order

**FR-306**: Skill Detail Page

-   System shall show full skill information
-   System shall show owner profile card
-   System shall show "Request Swap" button (if logged in and not owner)
-   System shall show "Edit" button (if owner)
-   System shall display related skills (same category)

**FR-307**: Skill Management

-   System shall allow owners to edit their skills
-   System shall allow owners to delete their skills (if no active requests)
-   System shall prevent deletion of skills with pending/accepted requests
-   System shall soft-delete skills (keep in DB, hide from public)

**Acceptance Criteria**:

-   Skill creation completes within 2 seconds
-   Search returns results within 1 second
-   Filters apply instantly
-   Detail page loads within 1 second
-   Mobile view shows 2 columns on tablet, 1 on phone

---

### 3.4 Swap Request System

**Description**: Core feature enabling users to propose and manage skill exchanges.

**Priority**: High

**Functional Requirements**:

**FR-401**: Request Creation

-   System shall allow users to send swap requests to skill owners
-   System shall require: skillOffered (from requester), skillRequested (from owner), message
-   System shall prevent users from requesting their own skills
-   System shall prevent duplicate requests (same user + same skill pair)
-   System shall set initial status to "pending"

**FR-402**: Request Viewing

-   System shall show incoming requests (requests TO user)
-   System shall show outgoing requests (requests FROM user)
-   System shall display: requester info, skills involved, message, date, status
-   System shall group by status: Pending, Accepted, Scheduled, Completed, Rejected, Cancelled

**FR-403**: Request Actions

-   System shall allow recipients to Accept requests
-   System shall allow recipients to Reject requests with reason
-   System shall allow requesters to Cancel pending requests
-   System shall disable actions based on status (can't accept rejected requests)

**FR-404**: Request Status Flow

```
Pending → Accepted → Scheduled → Completed
   ↓          ↓          ↓
Rejected   Cancelled   Cancelled
```

**FR-405**: Real-time Updates

-   System shall emit Socket.IO events on status changes
-   System shall update UI immediately when status changes
-   System shall show toast notifications on updates
-   System shall update request count in dashboard

**FR-406**: Request Notifications

-   System shall create notification when request is sent
-   System shall create notification when request is accepted/rejected
-   System shall create notification when session is scheduled
-   System shall send email for important events (optional)

**Acceptance Criteria**:

-   Request submission completes within 2 seconds
-   Status updates reflect in UI within 500ms
-   Incoming/outgoing tabs switch instantly
-   Request cards are responsive on all devices
-   Duplicate requests are blocked with error message

---

### 3.5 Real-time Messaging System

**Description**: Built-in chat for negotiating exchanges and follow-ups.

**Priority**: High

**Functional Requirements**:

**FR-501**: Conversation Management

-   System shall create unique conversationId from sorted user IDs
-   System shall auto-create conversation when swap request is accepted
-   System shall show all conversations in sidebar list
-   System shall show unread message count per conversation
-   System shall highlight active conversation

**FR-502**: Message Sending

-   System shall allow users to send text messages (max 1000 characters)
-   System shall send messages via REST API (not Socket.IO to avoid duplicates)
-   System shall show "sending..." indicator
-   System shall show checkmark when delivered
-   System shall timestamp all messages

**FR-503**: Message Receiving

-   System shall receive real-time messages via Socket.IO
-   System shall play notification sound (if enabled)
-   System shall update conversation list order (recent first)
-   System shall show sender avatar and name
-   System shall group messages by date

**FR-504**: Message Status

-   System shall mark messages as "delivered" when sent
-   System shall mark messages as "read" when conversation is opened
-   System shall show "Read" status to sender
-   System shall emit socket events for read receipts

**FR-505**: Message History

-   System shall load last 50 messages on conversation open
-   System shall implement infinite scroll for older messages
-   System shall paginate messages (50 per page)
-   System shall show "No messages yet" for empty conversations

**FR-506**: Conversation Search

-   System shall allow users to search conversation list
-   System shall search by: participant name, last message content
-   System shall highlight search matches
-   System shall show "No conversations found" if empty

**FR-507**: Message Actions

-   System shall allow users to copy message text
-   System shall show message timestamp on hover
-   System shall allow "Start Conversation" from profile page
-   System shall prevent messaging yourself

**Acceptance Criteria**:

-   Messages send and receive within 500ms
-   Message history loads within 1 second
-   Unread count updates in real-time
-   Conversation list stays sorted by most recent
-   Mobile view shows full-width conversation

---

### 3.6 Session Scheduling & Management

**Description**: Google Calendar/Meet integration for scheduling and managing skill exchange sessions.

**Priority**: High

**Functional Requirements**:

**FR-601**: Session Scheduling

-   System shall allow users to schedule sessions from accepted swap requests
-   System shall require: date, time, duration (minutes), timezone
-   System shall allow optional: notes, custom title
-   System shall validate date is in future
-   System shall prevent overlapping sessions (same user, same time)

**FR-602**: Google Calendar Integration

-   System shall create Google Calendar event with meeting details
-   System shall add both participants as attendees
-   System shall generate Google Meet link automatically
-   System shall send email invitations to both users
-   System shall set automatic reminders (1 day before, 30 minutes before)

**FR-603**: Fallback Mode

-   System shall generate mock Meet links if Google credentials not configured
-   System shall log warning message to console in fallback mode
-   System shall save session to database in both modes
-   System shall display fallback notice in UI

**FR-604**: Session Management

-   System shall show upcoming sessions in dashboard
-   System shall show past sessions in history
-   System shall allow users to reschedule sessions
-   System shall allow users to cancel sessions
-   System shall mark sessions as completed

**FR-605**: Session Actions

-   System shall update Google Calendar event on reschedule
-   System shall delete Calendar event on cancellation
-   System shall update swap request status to "scheduled" on schedule
-   System shall update swap request status to "completed" on completion

**FR-606**: Session Details

-   System shall show: date, time, duration, Meet link, calendar link
-   System shall show participant information
-   System shall show meeting notes
-   System shall show "Join Meeting" button (opens Google Meet)
-   System shall show "Copy Link" button

**FR-607**: Session Notifications

-   System shall notify both users when session is scheduled
-   System shall notify both users when session is rescheduled
-   System shall notify both users when session is cancelled
-   System shall send reminder notifications (via email/push)

**Acceptance Criteria**:

-   Session scheduling completes within 5 seconds (real mode) or 1 second (fallback)
-   Google Calendar event is created successfully
-   Meet link works and allows both participants to join
-   Reschedule updates Calendar within 3 seconds
-   Mobile view shows all session details clearly

---

### 3.7 Notifications Center

**Description**: Real-time notification system for all platform activities.

**Priority**: High

**Functional Requirements**:

**FR-701**: Notification Types

-   System shall support notification types: request, message, session
-   System shall create notifications for:
    -   New swap request received
    -   Swap request accepted/rejected
    -   New message received
    -   Session scheduled/rescheduled/cancelled

**FR-702**: Notification Delivery

-   System shall deliver notifications in real-time via Socket.IO
-   System shall emit to specific user's socket room
-   System shall persist notifications to database
-   System shall show toast notification on receive

**FR-703**: Notification Display

-   System shall show notification bell icon in header
-   System shall show unread count badge on bell
-   System shall show dropdown list on bell click
-   System shall limit dropdown to 5 most recent notifications
-   System shall link to full notifications page

**FR-704**: Notification Management

-   System shall allow users to mark individual notifications as read
-   System shall allow users to mark all notifications as read
-   System shall auto-mark as read when clicked
-   System shall allow users to delete notifications (future)

**FR-705**: Notifications Page

-   System shall show all notifications in paginated list
-   System shall filter by type (All, Requests, Messages, Sessions)
-   System shall filter by read status (All, Unread, Read)
-   System shall sort by date (newest first)
-   System shall show empty state if no notifications

**FR-706**: Notification Content

-   System shall show: icon (based on type), title, body, timestamp
-   System shall make notifications clickable (navigate to related page)
-   System shall highlight unread notifications
-   System shall show relative time (e.g., "2 minutes ago")

**Acceptance Criteria**:

-   Notifications appear within 500ms of event
-   Unread count updates in real-time
-   Dropdown opens instantly
-   Mark as read updates within 300ms
-   Mobile view shows compact notification list

---

### 3.8 User Dashboard

**Description**: Centralized hub for managing all platform activities.

**Priority**: High

**Functional Requirements**:

**FR-801**: Dashboard Overview

-   System shall display key statistics:
    -   Active swap requests count
    -   Pending incoming requests count
    -   Scheduled sessions count (next 7 days)
    -   Unread messages count
-   System shall show quick action buttons: Create Skill, View Requests, Messages
-   System shall show recent activity feed (last 10 activities)

**FR-802**: Dashboard Tabs

-   System shall provide tabs: Overview, Requests, Sessions, Messages, Notifications
-   System shall persist active tab in URL query parameter
-   System shall load tab content on demand
-   System shall show loading skeleton while fetching data

**FR-803**: Requests Tab

-   System shall show sub-tabs: Incoming, Outgoing
-   System shall display request cards with actions
-   System shall paginate requests (10 per page)
-   System shall show empty state if no requests

**FR-804**: Sessions Tab

-   System shall show sub-tabs: Upcoming, Past
-   System shall display session cards with details
-   System shall show "Join Meeting" button for upcoming sessions
-   System shall show calendar view option (future)

**FR-805**: Messages Tab

-   System shall show conversation list
-   System shall display active conversation in main area
-   System shall show unread badge on conversations
-   System shall support responsive layout (sidebar collapses on mobile)

**FR-806**: Notifications Tab

-   System shall display all notifications
-   System shall provide filters: type, read status
-   System shall show mark all as read button
-   System shall paginate notifications (20 per page)

**FR-807**: Dashboard Responsiveness

-   System shall show single column on mobile (< 768px)
-   System shall show two columns on tablet (768px - 1024px)
-   System shall show three columns on desktop (> 1024px)
-   System shall hide sidebar on mobile (hamburger menu)

**Acceptance Criteria**:

-   Dashboard loads within 2 seconds
-   All statistics are accurate and up-to-date
-   Tab switching is instant
-   All components are responsive
-   Empty states are user-friendly

---

### 3.9 Course Creation & Management

**Description**: Instructors can create structured courses as an alternative to one-on-one swaps.

**Priority**: Medium

**Functional Requirements**:

**FR-901**: Course Creation

-   System shall allow Instructors to create courses
-   System shall require: title, description, category, level
-   System shall allow: syllabus (weeks + topics), learning outcomes, prerequisites, thumbnail
-   System shall validate title (5-200 characters)
-   System shall validate syllabus has at least 1 week and 1 topic

**FR-902**: Syllabus Builder

-   System shall allow dynamic addition of weeks
-   System shall allow dynamic addition of topics per week
-   System shall require: weekNumber, weekTitle, topicTitle, duration (minutes)
-   System shall calculate total course duration
-   System shall support drag-and-drop reordering (future)

**FR-903**: Course Publishing

-   System shall set new courses as unpublished by default
-   System shall allow Instructors to publish courses
-   System shall validate course has syllabus and learning outcomes before publishing
-   System shall set publishedAt timestamp on first publish
-   System shall allow unpublishing

**FR-904**: Course Browsing

-   System shall display published courses in grid/list view
-   System shall show: title, thumbnail, category, level, instructor, duration
-   System shall filter by category and level
-   System shall search by title and description
-   System shall paginate results (12 per page)

**FR-905**: Course Detail Page

-   System shall show full course information
-   System shall show instructor profile card
-   System shall show syllabus (collapsible weeks)
-   System shall show "Enroll" button (if logged in and not enrolled)
-   System shall show "Edit" button (if owner)

**FR-906**: Course Management

-   System shall allow Instructors to edit their courses
-   System shall allow Instructors to delete unpublished courses
-   System shall prevent deletion of courses with enrollments
-   System shall show total enrollments count

**FR-907**: Course Statistics

-   System shall display total enrollments
-   System shall display average rating
-   System shall display completion rate (future)
-   System shall show enrollment trend (future)

**Acceptance Criteria**:

-   Course creation completes within 3 seconds
-   Syllabus builder is intuitive and responsive
-   Published courses appear immediately in browse page
-   Course edit saves all changes
-   Thumbnails display correctly on all devices

---

### 3.10 Course Enrollment & Progress Tracking

**Description**: Users can enroll in courses and track their learning progress.

**Priority**: High (In Development)

**Functional Requirements**:

**FR-1001**: Course Enrollment

-   System shall allow users to enroll in published courses
-   System shall prevent duplicate enrollments
-   System shall set enrollment status to "active"
-   System shall increment course totalEnrollments count
-   System shall create notification for instructor

**FR-1002**: My Courses Dashboard

-   System shall show all enrolled courses
-   System shall display: course title, thumbnail, progress %, status, last accessed
-   System shall show statistics:
    -   Total enrolled courses
    -   Active courses
    -   Completed courses
    -   Total learning hours
-   System shall filter by status (All, Active, Completed, Dropped)

**FR-1003**: Progress Tracking

-   System shall track completed lessons per user
-   System shall auto-calculate progress percentage (completedLessons / totalLessons × 100)
-   System shall update lastAccessedAt on course view
-   System shall auto-update status to "completed" at 100% progress

**FR-1004**: Lesson Management

-   System shall allow users to mark lessons as completed
-   System shall store: week number, lesson index, completedAt timestamp
-   System shall allow users to unmark lessons (toggle)
-   System shall update progress immediately on mark/unmark

**FR-1005**: Course Progress Page

-   System shall show syllabus with completion checkboxes
-   System shall highlight completed lessons
-   System shall show week-by-week progress breakdown
-   System shall show progress bar for each week
-   System shall show "Continue Learning" button (goes to next uncompleted lesson)

**FR-1006**: Unenrollment

-   System shall allow users to unenroll from courses
-   System shall set status to "dropped"
-   System shall preserve progress data
-   System shall prevent unenrolling from completed courses
-   System shall decrement course totalEnrollments count

**FR-1007**: Course Rating

-   System shall allow users to rate completed courses (1-5 stars)
-   System shall allow users to write reviews (max 500 characters)
-   System shall update course averageRating
-   System shall display ratings on course detail page
-   System shall prevent rating before completion

**FR-1008**: Certificate Issuance

-   System shall issue certificate on course completion
-   System shall generate certificate URL (PDF)
-   System shall store certificateUrl in enrollment
-   System shall show "Download Certificate" button
-   System shall display certificate in user profile (future)

**Acceptance Criteria**:

-   Enrollment completes within 1 second
-   Progress updates instantly on lesson mark
-   My Courses dashboard loads within 2 seconds
-   Progress calculations are accurate
-   Certificate generates within 5 seconds

---

## 4. External Interface Requirements

### 4.1 User Interfaces

**UI-101**: Landing Page

-   Responsive hero section with CTA
-   Features overview (3-column grid)
-   How it works section (3 steps)
-   Testimonials section
-   Footer with links

**UI-102**: Authentication Pages

-   Login form (email/password, Google button)
-   Register form (name, email, password, confirm password)
-   Forgot password form
-   Email verification page

**UI-103**: Dashboard

-   Sidebar navigation (collapsible on mobile)
-   Top header with search, notifications, profile menu
-   Main content area with tabs
-   Statistics cards (4-grid layout)
-   Quick action buttons

**UI-104**: Skill Pages

-   Browse page (grid view, filters sidebar)
-   Detail page (2-column layout: info + actions)
-   Create/Edit form (multi-step wizard)
-   My Skills list (editable cards)

**UI-105**: Requests Pages

-   Incoming/Outgoing tabs
-   Request cards with actions
-   Accept/Reject dialog
-   Request detail modal

**UI-106**: Messages Page

-   Two-column layout (conversations list + chat area)
-   Message bubbles (left for received, right for sent)
-   Input field with send button
-   Unread badges

**UI-107**: Sessions Pages

-   Calendar view (month/week/day)
-   Session cards (upcoming/past)
-   Schedule dialog (date picker, time picker, duration)
-   Reschedule dialog
-   Session detail modal

**UI-108**: Courses Pages

-   Browse page (grid view with filters)
-   Detail page (tabbed: Overview, Syllabus, Reviews)
-   Create/Edit form (drag-drop syllabus builder)
-   My Courses dashboard (progress cards)
-   Learning page (sidebar syllabus + video area)

**UI-109**: Profile Pages

-   Public profile (avatar, bio, skills, stats)
-   Edit profile form
-   Settings page (account, notifications, privacy)

**UI-110**: Notifications

-   Dropdown list (5 most recent)
-   Full notifications page (filterable list)
-   Empty states

**Design Guidelines**:

-   **Color Scheme**: Primary (blue), secondary (green), accent (orange)
-   **Typography**: Inter font family
-   **Spacing**: 4px base unit (8px, 16px, 24px, 32px)
-   **Shadows**: 3 levels (sm, md, lg)
-   **Border Radius**: 8px default, 4px small, 16px large
-   **Icons**: Lucide React icon set
-   **Animations**: Framer Motion (subtle, under 300ms)

**Accessibility**:

-   WCAG 2.1 Level AA compliance
-   Keyboard navigation support
-   Screen reader friendly (ARIA labels)
-   Color contrast ratio ≥ 4.5:1
-   Focus indicators on all interactive elements

### 4.2 Hardware Interfaces

**Not applicable** - Skills Swap is a web-based application with no direct hardware interfaces.

**Indirect Hardware Requirements**:

-   Client devices: Desktop/laptop (Windows, macOS, Linux) or mobile (iOS, Android)
-   Input devices: Keyboard, mouse/trackpad, touch screen
-   Output devices: Display (minimum 360px width), speakers (optional for notifications)
-   Internet connection device: Ethernet, Wi-Fi, or cellular modem

### 4.3 Software Interfaces

**SI-101**: MongoDB Database

-   **Interface Type**: Database Connection
-   **Version**: MongoDB 6.x
-   **Protocol**: MongoDB Wire Protocol
-   **Connection**: Mongoose ODM (v8.19.1)
-   **Data Exchange**: JSON documents (BSON)
-   **Operations**: CRUD operations, aggregations, text search

**SI-102**: Google Calendar API

-   **Interface Type**: REST API
-   **Version**: v3
-   **Protocol**: HTTPS
-   **Authentication**: OAuth 2.0
-   **Data Format**: JSON
-   **Operations**:
    -   `events.insert` - Create calendar event
    -   `events.update` - Update event
    -   `events.delete` - Delete event
    -   `events.get` - Get event details

**SI-103**: Google Meet API

-   **Interface Type**: REST API (v2) / Calendar conferenceData
-   **Protocol**: HTTPS
-   **Authentication**: OAuth 2.0
-   **Data Format**: JSON
-   **Operations**:
    -   Create Meet space
    -   Get Meet link
    -   End Meet space

**SI-104**: NextAuth.js

-   **Interface Type**: Authentication Library
-   **Version**: 4.24.11
-   **Providers**: Google OAuth, Credentials
-   **Session Management**: JWT tokens
-   **Operations**: Sign in, sign out, session verification

**SI-105**: Socket.IO

-   **Interface Type**: WebSocket Library
-   **Version**: 4.x
-   **Protocol**: WebSocket (fallback to HTTP long-polling)
-   **Events**: Custom application events
-   **Operations**: Emit, on, join room, leave room

**SI-106**: ImgBB API

-   **Interface Type**: REST API
-   **Protocol**: HTTPS
-   **Authentication**: API Key
-   **Data Format**: JSON, multipart/form-data
-   **Operations**: Upload image, get image URL

**SI-107**: SMTP Server (Future)

-   **Interface Type**: Email Service
-   **Protocol**: SMTP, TLS
-   **Service**: SendGrid, Mailgun, or AWS SES
-   **Operations**: Send email, send template

### 4.4 Communication Interfaces

**CI-101**: HTTP/HTTPS Protocol

-   **Frontend ↔ Backend**: RESTful API calls
-   **Method**: GET, POST, PUT, PATCH, DELETE
-   **Data Format**: JSON
-   **Headers**: Content-Type, Authorization, CORS
-   **Port**: 5000 (dev), 443 (production HTTPS)

**CI-102**: WebSocket Protocol

-   **Real-time Communication**: Socket.IO
-   **Transport**: WebSocket (primary), HTTP long-polling (fallback)
-   **Events**: Custom application events (message:new, notification:new, etc.)
-   **Port**: Same as HTTP server (upgrade connection)

**CI-103**: OAuth 2.0

-   **Google Sign-In**: OpenID Connect flow
-   **Scope**: profile, email, calendar, meet
-   **Flow**: Authorization Code with PKCE
-   **Tokens**: Access token, refresh token, ID token

**CI-104**: CDN/Static Assets

-   **Images**: ImgBB CDN
-   **Protocol**: HTTPS
-   **Caching**: Browser cache, CDN cache
-   **Format**: JPEG, PNG, WebP

**Network Requirements**:

-   **Bandwidth**: Minimum 2 Mbps (5 Mbps recommended)
-   **Latency**: < 200ms for API calls, < 100ms for WebSocket
-   **Reliability**: 99.9% uptime SLA

---

## 5. Functional Requirements

### 5.1 Authentication & Authorization

| ID     | Requirement                           | Priority | Status      |
| ------ | ------------------------------------- | -------- | ----------- |
| FR-101 | User registration with email/password | High     | ✅ Complete |
| FR-102 | User registration with Google OAuth   | High     | ✅ Complete |
| FR-103 | User login with email/password        | High     | ✅ Complete |
| FR-104 | User login with Google OAuth          | High     | ✅ Complete |
| FR-105 | Password reset via email              | Medium   | ⏳ Future   |
| FR-106 | Email verification                    | Medium   | ⏳ Future   |
| FR-107 | Role-based access control             | High     | ✅ Complete |
| FR-108 | Session management (JWT)              | High     | ✅ Complete |
| FR-109 | Logout functionality                  | High     | ✅ Complete |
| FR-110 | Account lockout after failed attempts | Low      | ⏳ Future   |

### 5.2 Profile Management

| ID     | Requirement                      | Priority | Status      |
| ------ | -------------------------------- | -------- | ----------- |
| FR-201 | Create user profile              | High     | ✅ Complete |
| FR-202 | Edit profile (name, bio, avatar) | High     | ✅ Complete |
| FR-203 | Upload profile avatar            | High     | ✅ Complete |
| FR-204 | View own profile                 | High     | ✅ Complete |
| FR-205 | View other users' profiles       | High     | ✅ Complete |
| FR-206 | Display skills portfolio         | High     | ✅ Complete |
| FR-207 | Display profile statistics       | Medium   | ✅ Complete |
| FR-208 | Privacy settings                 | Low      | ⏳ Future   |

### 5.3 Skill Management

| ID     | Requirement                           | Priority | Status      |
| ------ | ------------------------------------- | -------- | ----------- |
| FR-301 | Create skill listing                  | High     | ✅ Complete |
| FR-302 | Edit skill listing                    | High     | ✅ Complete |
| FR-303 | Delete skill listing                  | High     | ✅ Complete |
| FR-304 | Browse all skills                     | High     | ✅ Complete |
| FR-305 | Search skills (full-text)             | High     | ✅ Complete |
| FR-306 | Filter skills (category, level, mode) | High     | ✅ Complete |
| FR-307 | Sort skills                           | Medium   | ✅ Complete |
| FR-308 | View skill details                    | High     | ✅ Complete |
| FR-309 | Tag skills                            | Medium   | ✅ Complete |
| FR-310 | Recommend related skills              | Low      | ⏳ Future   |

### 5.4 Swap Request Management

| ID     | Requirement                | Priority | Status      |
| ------ | -------------------------- | -------- | ----------- |
| FR-401 | Send swap request          | High     | ✅ Complete |
| FR-402 | View incoming requests     | High     | ✅ Complete |
| FR-403 | View outgoing requests     | High     | ✅ Complete |
| FR-404 | Accept swap request        | High     | ✅ Complete |
| FR-405 | Reject swap request        | High     | ✅ Complete |
| FR-406 | Cancel swap request        | High     | ✅ Complete |
| FR-407 | View request details       | High     | ✅ Complete |
| FR-408 | Real-time request updates  | High     | ✅ Complete |
| FR-409 | Request status tracking    | High     | ✅ Complete |
| FR-410 | Prevent duplicate requests | Medium   | ✅ Complete |

### 5.5 Messaging System

| ID     | Requirement                   | Priority | Status      |
| ------ | ----------------------------- | -------- | ----------- |
| FR-501 | Send text messages            | High     | ✅ Complete |
| FR-502 | Receive messages in real-time | High     | ✅ Complete |
| FR-503 | View conversation list        | High     | ✅ Complete |
| FR-504 | View message history          | High     | ✅ Complete |
| FR-505 | Mark messages as read         | High     | ✅ Complete |
| FR-506 | Show unread count             | High     | ✅ Complete |
| FR-507 | Search conversations          | Medium   | ✅ Complete |
| FR-508 | Send images/files             | Low      | ⏳ Future   |
| FR-509 | Delete messages               | Low      | ⏳ Future   |
| FR-510 | Emoji reactions               | Low      | ⏳ Future   |

### 5.6 Session Management

| ID     | Requirement                  | Priority | Status      |
| ------ | ---------------------------- | -------- | ----------- |
| FR-601 | Schedule session             | High     | ✅ Complete |
| FR-602 | Create Google Calendar event | High     | ✅ Complete |
| FR-603 | Generate Google Meet link    | High     | ✅ Complete |
| FR-604 | Reschedule session           | High     | ✅ Complete |
| FR-605 | Cancel session               | High     | ✅ Complete |
| FR-606 | Mark session as completed    | High     | ✅ Complete |
| FR-607 | View upcoming sessions       | High     | ✅ Complete |
| FR-608 | View past sessions           | High     | ✅ Complete |
| FR-609 | Fallback mode (mock links)   | High     | ✅ Complete |
| FR-610 | Session reminders            | Medium   | ⏳ Future   |

### 5.7 Notifications

| ID     | Requirement                  | Priority | Status      |
| ------ | ---------------------------- | -------- | ----------- |
| FR-701 | Create notifications         | High     | ✅ Complete |
| FR-702 | Real-time push notifications | High     | ✅ Complete |
| FR-703 | Show unread count            | High     | ✅ Complete |
| FR-704 | Mark notification as read    | High     | ✅ Complete |
| FR-705 | Mark all as read             | High     | ✅ Complete |
| FR-706 | View notification history    | High     | ✅ Complete |
| FR-707 | Filter notifications         | Medium   | ✅ Complete |
| FR-708 | Delete notifications         | Low      | ⏳ Future   |
| FR-709 | Notification preferences     | Low      | ⏳ Future   |
| FR-710 | Email notifications          | Low      | ⏳ Future   |

### 5.8 Dashboard

| ID     | Requirement                 | Priority | Status         |
| ------ | --------------------------- | -------- | -------------- |
| FR-801 | Display statistics overview | High     | ✅ Complete    |
| FR-802 | Show recent activity        | High     | ✅ Complete    |
| FR-803 | Quick action buttons        | High     | ✅ Complete    |
| FR-804 | Tabbed navigation           | High     | ✅ Complete    |
| FR-805 | Responsive layout           | High     | ✅ Complete    |
| FR-806 | Requests management section | High     | ✅ Complete    |
| FR-807 | Sessions management section | High     | 🚧 In Progress |
| FR-808 | Messages section            | High     | ✅ Complete    |
| FR-809 | Notifications section       | High     | ✅ Complete    |
| FR-810 | Analytics charts            | Low      | ⏳ Future      |

### 5.9 Course Management

| ID     | Requirement                     | Priority | Status      |
| ------ | ------------------------------- | -------- | ----------- |
| FR-901 | Create course                   | Medium   | ✅ Complete |
| FR-902 | Edit course                     | Medium   | ✅ Complete |
| FR-903 | Delete course                   | Medium   | ✅ Complete |
| FR-904 | Publish/unpublish course        | Medium   | ✅ Complete |
| FR-905 | Build syllabus (weeks + topics) | Medium   | ✅ Complete |
| FR-906 | Browse courses                  | Medium   | ✅ Complete |
| FR-907 | Search courses                  | Medium   | ✅ Complete |
| FR-908 | Filter courses                  | Medium   | ✅ Complete |
| FR-909 | View course details             | Medium   | ✅ Complete |
| FR-910 | Course statistics               | Low      | ✅ Complete |

### 5.10 Enrollment & Progress

| ID      | Requirement               | Priority | Status              |
| ------- | ------------------------- | -------- | ------------------- |
| FR-1001 | Enroll in course          | High     | ✅ Backend Complete |
| FR-1002 | View enrolled courses     | High     | ✅ Backend Complete |
| FR-1003 | Track progress            | High     | ✅ Backend Complete |
| FR-1004 | Mark lesson as completed  | High     | ✅ Backend Complete |
| FR-1005 | Auto-calculate progress % | High     | ✅ Backend Complete |
| FR-1006 | Unenroll from course      | Medium   | ✅ Backend Complete |
| FR-1007 | Rate course               | Medium   | ✅ Backend Complete |
| FR-1008 | Issue certificate         | Low      | 🚧 Backend Complete |
| FR-1009 | My Courses dashboard UI   | High     | ⏳ Frontend Pending |
| FR-1010 | Learning page UI          | High     | ⏳ Frontend Pending |

---

## 6. Non-Functional Requirements

### 6.1 Performance Requirements

**NFR-101**: Response Time

-   API endpoints shall respond within 2 seconds for 95% of requests
-   WebSocket messages shall be delivered within 500ms
-   Page load time shall be under 3 seconds on 3G connection
-   Database queries shall execute within 1 second

**NFR-102**: Throughput

-   System shall support 1,000 concurrent users
-   System shall handle 100 requests per second
-   WebSocket server shall support 500 simultaneous connections
-   Database shall handle 50 queries per second

**NFR-103**: Scalability

-   Application shall scale horizontally (add more server instances)
-   Database shall support sharding for future growth
-   CDN shall cache static assets globally
-   System shall support 10,000+ registered users

**NFR-104**: Resource Usage

-   Client-side bundle size shall be under 500KB (gzipped)
-   Memory usage per user session shall be under 50MB
-   Database storage per user shall be under 100MB
-   Images shall be optimized (max 500KB per image)

### 6.2 Safety Requirements

**NFR-201**: Data Backup

-   Database shall be backed up daily
-   Backup retention period: 30 days
-   Backup restoration time: < 4 hours
-   Point-in-time recovery available

**NFR-202**: Error Handling

-   System shall gracefully handle all errors without crashes
-   User-friendly error messages shall be displayed
-   Errors shall be logged with stack traces
-   Critical errors shall alert development team

**NFR-203**: Fault Tolerance

-   System shall remain operational if one service fails
-   Fallback mechanisms shall be in place (e.g., mock Meet links)
-   Automatic retry for failed API calls (max 3 attempts)
-   Circuit breaker pattern for external services

**NFR-204**: Data Recovery

-   System shall recover from database connection loss
-   Unsaved user data shall be cached locally
-   Auto-save functionality for forms (every 30 seconds)
-   Session persistence across browser refreshes

### 6.3 Security Requirements

**NFR-301**: Authentication

-   Passwords shall be hashed using bcrypt (10 rounds)
-   JWT tokens shall expire after 24 hours
-   Refresh tokens shall be stored securely
-   OAuth tokens shall be encrypted at rest

**NFR-302**: Authorization

-   All API endpoints shall require authentication
-   Role-based access control shall be enforced
-   Users shall only access their own data (unless public)
-   Admin actions shall be audited

**NFR-303**: Data Protection

-   All communication shall use HTTPS/TLS 1.3
-   Sensitive data shall not be logged
-   Database connections shall be encrypted
-   CORS shall be properly configured

**NFR-304**: Input Validation

-   All user inputs shall be validated on client and server
-   SQL injection prevention (using parameterized queries)
-   XSS prevention (sanitizing user content)
-   CSRF protection (CSRF tokens)

**NFR-305**: Privacy

-   User data shall not be shared with third parties
-   Users shall be able to delete their accounts
-   GDPR compliance for EU users
-   Privacy policy shall be displayed

**NFR-306**: Vulnerability Management

-   Regular security audits (quarterly)
-   Dependency scanning for vulnerabilities (automated)
-   Penetration testing before major releases
-   Security patches applied within 48 hours

### 6.4 Software Quality Attributes

**NFR-401**: Availability

-   System uptime shall be 99.5% (excluding planned maintenance)
-   Planned maintenance window: Sunday 2-4 AM UTC
-   Maximum downtime per month: 3.6 hours
-   Health check endpoint available

**NFR-402**: Maintainability

-   Code shall follow ESLint/Prettier standards
-   Functions shall not exceed 50 lines
-   Code coverage shall be > 70% (unit tests)
-   API shall be documented (Swagger/Postman)

**NFR-403**: Usability

-   System shall be intuitive without training
-   User shall complete registration within 2 minutes
-   User shall find desired skill within 30 seconds
-   Help documentation shall be available

**NFR-404**: Reliability

-   System shall have mean time between failures (MTBF) > 720 hours
-   Data consistency shall be maintained across all operations
-   Transactions shall be atomic (all-or-nothing)
-   Message delivery shall be guaranteed (at-least-once)

**NFR-405**: Portability

-   Application shall run on Windows, macOS, Linux
-   Frontend shall work on Chrome, Firefox, Safari, Edge
-   Mobile responsive on iOS 14+ and Android 10+
-   No platform-specific dependencies

**NFR-406**: Compatibility

-   API shall maintain backward compatibility
-   Database schema changes shall have migration scripts
-   Legacy browser support (last 2 versions)
-   API versioning strategy in place

**NFR-407**: Accessibility

-   WCAG 2.1 Level AA compliance
-   Keyboard navigation fully supported
-   Screen reader compatible (ARIA labels)
-   Color contrast ratio ≥ 4.5:1
-   Text resizable up to 200%

**NFR-408**: Internationalization (Future)

-   UI text shall be externalized (i18n library)
-   Date/time formats shall respect user locale
-   Currency formats shall be locale-aware
-   Support for RTL languages

**NFR-409**: Testability

-   Unit tests for all business logic
-   Integration tests for API endpoints
-   E2E tests for critical user flows
-   Automated testing in CI/CD pipeline

**NFR-410**: Modifiability

-   Modular architecture (separation of concerns)
-   Dependency injection where applicable
-   Configuration externalized (.env files)
-   Feature flags for gradual rollouts

---

## 7. Other Requirements

### 7.1 Legal Requirements

**Legal-101**: Terms of Service

-   Users must agree to ToS before registration
-   ToS must be clearly accessible
-   ToS updates require user re-acknowledgment

**Legal-102**: Privacy Policy

-   Privacy policy must be GDPR compliant
-   Privacy policy must disclose data collection practices
-   Privacy policy must be accessible on all pages

**Legal-103**: Copyright & Intellectual Property

-   User-generated content ownership clarified
-   Platform usage rights defined
-   DMCA takedown process in place

**Legal-104**: Age Restrictions

-   Users must be 13+ years old (COPPA compliance)
-   Age verification during registration
-   Parental consent for users under 18 (future)

**Legal-105**: Liability

-   Platform not liable for user-generated content
-   Platform not responsible for skill quality
-   Dispute resolution process defined

### 7.2 Database Requirements

**DB-101**: Data Modeling

-   MongoDB collections: users, skills, swapRequests, messages, sessions, notifications, courses, enrollments
-   Relationships via ObjectId references
-   Compound indexes for frequent queries

**DB-102**: Data Integrity

-   Unique constraints (email, conversationId, etc.)
-   Foreign key validation via Mongoose
-   Atomic operations for critical updates
-   Transaction support for multi-document updates

**DB-103**: Data Retention

-   User data retained until account deletion
-   Deleted accounts anonymized (GDPR "right to be forgotten")
-   Audit logs retained for 1 year
-   Backup retention: 30 days

**DB-104**: Data Migration

-   Schema versioning system
-   Migration scripts for schema changes
-   Rollback capability for failed migrations
-   Zero-downtime migrations

### 7.3 Documentation Requirements

**Doc-101**: User Documentation

-   User guide for all features
-   Video tutorials for complex features
-   FAQ section
-   Troubleshooting guide

**Doc-102**: Developer Documentation

-   API reference (Swagger/Postman)
-   Architecture diagrams
-   Database schema documentation
-   Setup and deployment guides

**Doc-103**: Admin Documentation

-   Admin panel user guide
-   Content moderation guidelines
-   System monitoring guide
-   Incident response procedures

### 7.4 Training Requirements

**Training-101**: End User Training

-   Interactive onboarding tour (first login)
-   Tooltips for UI elements
-   In-app help guides
-   Community forum for peer support

**Training-102**: Admin Training

-   Admin panel walkthrough
-   Moderation best practices
-   Analytics interpretation
-   Crisis management training

### 7.5 Deployment Requirements

**Deploy-101**: Continuous Integration/Continuous Deployment (CI/CD)

-   Automated testing on every commit
-   Automated deployment to staging on merge
-   Manual approval for production deployment
-   Rollback capability within 5 minutes

**Deploy-102**: Environment Management

-   Separate environments: Development, Staging, Production
-   Environment-specific configurations
-   Secret management (encrypted environment variables)
-   Infrastructure as Code (Terraform/Docker)

**Deploy-103**: Monitoring & Logging

-   Application performance monitoring (APM)
-   Error tracking (Sentry or similar)
-   Server metrics (CPU, memory, disk, network)
-   User analytics (Google Analytics or similar)

---

## 8. Appendix

### 8.1 Glossary

| Term               | Definition                                               |
| ------------------ | -------------------------------------------------------- |
| **Skill**          | A competency or expertise that a user can teach or learn |
| **Swap**           | An exchange of skills between two users                  |
| **Swap Request**   | A formal proposal to exchange skills                     |
| **Session**        | A scheduled meeting for skill transfer                   |
| **Enrollment**     | Registration in a structured course                      |
| **Instructor**     | User with permission to create courses                   |
| **Proficiency**    | Skill level: Beginner, Intermediate, Advanced, Expert    |
| **Mode**           | Delivery method: Online, Offline, Both                   |
| **Fallback Mode**  | System operation without full Google integration         |
| **Mock Link**      | Placeholder Meet link used in fallback mode              |
| **ConversationId** | Unique identifier for a chat between two users           |
| **Socket.IO**      | Library for real-time bidirectional communication        |
| **TanStack Query** | Library for server state management and caching          |
| **NextAuth**       | Authentication library for Next.js                       |
| **Mongoose**       | MongoDB object modeling tool (ODM)                       |
| **JWT**            | JSON Web Token (authentication token format)             |
| **OAuth**          | Open Authorization standard                              |
| **WCAG**           | Web Content Accessibility Guidelines                     |
| **GDPR**           | General Data Protection Regulation (EU privacy law)      |
| **COPPA**          | Children's Online Privacy Protection Act                 |

### 8.2 Acronyms

| Acronym   | Full Form                                    |
| --------- | -------------------------------------------- |
| **SRS**   | Software Requirements Specification          |
| **API**   | Application Programming Interface            |
| **REST**  | Representational State Transfer              |
| **CRUD**  | Create, Read, Update, Delete                 |
| **UI**    | User Interface                               |
| **UX**    | User Experience                              |
| **DB**    | Database                                     |
| **CI/CD** | Continuous Integration/Continuous Deployment |
| **MVP**   | Minimum Viable Product                       |
| **SSR**   | Server-Side Rendering                        |
| **SSG**   | Static Site Generation                       |
| **SPA**   | Single Page Application                      |
| **TLS**   | Transport Layer Security                     |
| **HTTPS** | Hypertext Transfer Protocol Secure           |
| **CORS**  | Cross-Origin Resource Sharing                |
| **CSRF**  | Cross-Site Request Forgery                   |
| **XSS**   | Cross-Site Scripting                         |
| **ODM**   | Object Document Mapper                       |
| **ORM**   | Object Relational Mapper                     |
| **JWT**   | JSON Web Token                               |
| **APM**   | Application Performance Monitoring           |
| **MTBF**  | Mean Time Between Failures                   |
| **RBAC**  | Role-Based Access Control                    |
| **SMTP**  | Simple Mail Transfer Protocol                |
| **CDN**   | Content Delivery Network                     |

### 8.3 Assumptions

1. Users have basic computer literacy
2. Users have access to modern web browsers
3. Users have reliable internet (minimum 2 Mbps)
4. MongoDB Atlas is available 99.9% of the time
5. Google Calendar/Meet APIs remain stable
6. Users are willing to use skill barter system
7. Development team has 4 active members
8. Project follows 4-week milestone sprints
9. Users prefer web over mobile (v1.0)
10. English is the primary language (v1.0)

### 8.4 Dependencies

**External Services**:

-   Google Cloud Platform (Calendar/Meet)
-   MongoDB Atlas (Database hosting)
-   Vercel/Netlify (Frontend hosting)
-   Render/Railway (Backend hosting)
-   ImgBB (Image hosting)

**Third-Party Libraries**:

-   Next.js 15.5.3
-   React 19.1.0
-   Express.js 4.x
-   Mongoose 8.19.1
-   Socket.IO 4.x
-   TanStack Query 5.x
-   NextAuth 4.24.11
-   Tailwind CSS 3.x
-   Framer Motion 11.x
-   Lucide React (icons)
-   Shadcn/ui components

**Development Tools**:

-   Node.js 18.x+
-   pnpm (frontend package manager)
-   npm (backend package manager)
-   Git & GitHub
-   VS Code
-   Postman

### 8.5 Constraints

**Technical Constraints**:

-   Must use specified tech stack (Next.js, Express, MongoDB)
-   Must support real-time features (Socket.IO)
-   Must be mobile-responsive
-   Must integrate with Google APIs

**Time Constraints**:

-   Milestone-4 deadline: 3 days implementation + 1 day presentation
-   Total project duration: 4 milestones (16 weeks)
-   Sprint duration: 4 weeks per milestone

**Budget Constraints** (if applicable):

-   Free tier services for development
-   Minimal infrastructure costs
-   No paid premium features in v1.0

**Resource Constraints**:

-   4-member development team
-   Limited availability of team members
-   No dedicated QA team
-   No dedicated DevOps engineer

### 8.6 Future Enhancements

**Phase 2** (Post Milestone-4):

-   Admin dashboard for platform management
-   Advanced search with Elasticsearch
-   User reputation/badge system
-   Analytics dashboard for instructors
-   Email notification system
-   Payment integration for premium features

**Phase 3** (Long-term):

-   Mobile native apps (React Native)
-   AI-powered skill matching
-   In-app WebRTC video calls
-   Blockchain-based certifications
-   Multi-language support (i18n)
-   Offline mode support
-   Advanced analytics with ML insights

### 8.7 Revision History

| Version | Date         | Author           | Changes                                        |
| ------- | ------------ | ---------------- | ---------------------------------------------- |
| 1.0.0   | Oct 15, 2025 | Skills Swap Team | Initial SRS document creation                  |
| -       | -            | -                | # 📘 Software Requirements Specification (SRS) |

## Skills Swap - Peer-to-Peer Skill Exchange Platform

**Version**: 1.0.0  
**Date**: October 15, 2025  
**Prepared by**: Skills Swap Development Team  
**Project Status**: Milestone-4 (Phase 2 Implementation)

---

## Table of Contents

1. [Introduction](#1-introduction)
    - 1.1 Purpose
    - 1.2 Document Conventions
    - 1.3 Intended Audience
    - 1.4 Project Scope
    - 1.5 References
2. [Overall Description](#2-overall-description)
    - 2.1 Product Perspective
    - 2.2 Product Functions
    - 2.3 User Classes and Characteristics
    - 2.4 Operating Environment
    - 2.5 Design and Implementation Constraints
    - 2.6 Assumptions and Dependencies
3. [System Features](#3-system-features)
4. [External Interface Requirements](#4-external-interface-requirements)
    - 4.1 User Interfaces
    - 4.2 Hardware Interfaces
    - 4.3 Software Interfaces
    - 4.4 Communication Interfaces
5. [Functional Requirements](#5-functional-requirements)
6. [Non-Functional Requirements](#6-non-functional-requirements)
7. [Other Requirements](#7-other-requirements)
8. [Appendix](#8-appendix)

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) document provides a complete description of the Skills Swap platform. It describes the functional and non-functional requirements for the system, which enables users to exchange skills in a peer-to-peer barter system without monetary transactions.

**Target Audience**:

-   Development team
-   Project managers
-   Quality assurance team
-   Stakeholders and investors
-   End users

### 1.2 Document Conventions

-   **Requirements Priority**:

    -   **High**: Essential for system operation (MVP features)
    -   **Medium**: Important but not critical for initial release
    -   **Low**: Nice-to-have features for future versions

-   **Naming Conventions**:
    -   `FR-XXX`: Functional Requirement
    -   `NFR-XXX`: Non-Functional Requirement
    -   `UI-XXX`: User Interface Requirement
    -   `API-XXX`: API Requirement

### 1.3 Intended Audience

This document is intended for:

-   **Developers**: To understand system requirements and implementation details
-   **QA Team**: To create test plans and test cases
-   **Project Managers**: To track progress and plan sprints
-   **Designers**: To create UI/UX aligned with requirements
-   **Stakeholders**: To validate that requirements meet business objectives

### 1.4 Project Scope

**Skills Swap** is a web-based platform that facilitates skill exchange between users without monetary transactions. Users can:

-   Offer skills they possess
-   Request skills they want to learn
-   Exchange skills in a barter system
-   Schedule and conduct learning sessions
-   Track progress and manage learning outcomes
-   Enroll in structured courses

**Goals**:

-   Democratize education by removing financial barriers
-   Build a collaborative learning community
-   Maximize skill utilization and knowledge sharing
-   Provide flexible, personalized learning experiences

**Out of Scope** (for current version):

-   Mobile native applications (iOS/Android)
-   Payment processing for premium features
-   Live video streaming (uses Google Meet integration)
-   Blockchain-based skill verification
-   AI-powered automatic matching (manual matching for v1.0)

### 1.5 References

-   **Technical Documentation**:

    -   Next.js 15 Documentation: https://nextjs.org/docs
    -   Express.js Documentation: https://expressjs.com
    -   MongoDB Documentation: https://docs.mongodb.com
    -   Socket.IO Documentation: https://socket.io/docs
    -   Google Calendar API: https://developers.google.com/calendar
    -   NextAuth.js Documentation: https://next-auth.js.org

-   **Project Documentation**:
    -   PROJECT_DOCUMENTATION.md
    -   COURSE_API_DOCUMENTATION.md
    -   ENROLLMENT_API_DOCUMENTATION.md
    -   GOOGLE_CALENDAR_INTEGRATION.md

---

## 2. Overall Description

### 2.1 Product Perspective

Skills Swap is a standalone web application that operates independently but integrates with external services:

**System Context Diagram**:

```
┌─────────────────────────────────────────────────────────────────┐
│                          External Systems                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Google     │  │   Google     │  │    ImgBB     │          │
│  │   Calendar   │  │     Meet     │  │ Image Host   │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
└─────────┼──────────────────┼──────────────────┼─────────────────┘
          │                  │                  │
          │ OAuth 2.0        │ REST API         │ Upload API
          │                  │                  │
┌─────────▼──────────────────▼──────────────────▼─────────────────┐
│                     Skills Swap Platform                         │
├──────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              Frontend (Next.js 15)                         │ │
│  │  • User Interface (React Components)                       │ │
│  │  • State Management (TanStack Query)                       │ │
│  │  • Real-time Updates (Socket.IO Client)                    │ │
│  │  • Authentication (NextAuth)                               │ │
│  └──────────────────────┬─────────────────────────────────────┘ │
│                         │ HTTP/WebSocket                         │
│  ┌──────────────────────▼─────────────────────────────────────┐ │
│  │              Backend (Node.js/Express)                     │ │
│  │  • REST API Endpoints                                      │ │
│  │  • WebSocket Server (Socket.IO)                            │ │
│  │  • Business Logic (Controllers)                            │ │
│  │  • Authentication & Authorization                          │ │
│  └──────────────────────┬─────────────────────────────────────┘ │
│                         │ Mongoose ODM                           │
│  ┌──────────────────────▼─────────────────────────────────────┐ │
│  │              Database (MongoDB)                            │ │
│  │  Collections: users, skills, swapRequests, messages,       │ │
│  │  sessions, notifications, courses, enrollments             │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
          │                  │                  │
          │                  │                  │
┌─────────▼──────────────────▼──────────────────▼─────────────────┐
│                           End Users                              │
├──────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  Learner │  │ Instructor│ │   Admin  │  │   Guest  │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
└──────────────────────────────────────────────────────────────────┘
```

**System Characteristics**:

-   Web-based application (responsive design)
-   Client-server architecture
-   Real-time communication via WebSockets
-   RESTful API for data operations
-   Third-party integrations (Google, ImgBB)
-   Cloud-hosted database (MongoDB Atlas)

### 2.2 Product Functions

**Core Functions Summary**:

1. **User Management**

    - Registration and authentication
    - Profile creation and editing
    - Role-based access control (User, Instructor, Admin)

2. **Skill Management**

    - Create, read, update, delete skill listings
    - Search and filter skills
    - Categorization and tagging

3. **Skill Exchange**

    - Send and receive swap requests
    - Accept/reject/cancel requests
    - Track request status and history

4. **Communication**

    - Real-time messaging between users
    - Conversation management
    - Message notifications

5. **Session Management**

    - Schedule skill exchange sessions
    - Google Calendar/Meet integration
    - Reschedule and cancel sessions
    - Track session completion

6. **Notifications**

    - Real-time push notifications
    - Notification history
    - Mark as read/unread

7. **Course Management**

    - Create and publish courses
    - Manage course content (syllabus, topics)
    - Browse and search courses

8. **Enrollment & Progress** (In Development)

    - Enroll in courses
    - Track learning progress
    - Mark lessons as completed
    - Issue certificates

9. **Dashboard**

    - Overview of user activities
    - Quick access to all features
    - Statistics and analytics

10. **Admin Functions** (Future)
    - User management
    - Content moderation
    - Platform analytics

### 2.3 User Classes and Characteristics

| User Class          | Description            | Technical Expertise | Features Access                          | Priority |
| ------------------- | ---------------------- | ------------------- | ---------------------------------------- | -------- |
| **Guest**           | Unregistered visitor   | Low                 | Browse skills, view landing page         | Low      |
| **Registered User** | Basic account holder   | Low-Medium          | All core features except course creation | High     |
| **Instructor**      | Course creator         | Medium-High         | All user features + course creation      | High     |
| **Admin**           | Platform administrator | High                | All features + admin dashboard           | Medium   |

**User Personas**:

**1. Alex - The Learner** (Primary User)

-   Age: 22-30
-   Background: Recent graduate, wants to learn new skills
-   Goals: Learn web development in exchange for teaching graphic design
-   Technical Skill: Medium
-   Usage Pattern: Daily, 30-60 minutes
-   Needs: Easy discovery, flexible scheduling, progress tracking

**2. Sarah - The Instructor** (Primary User)

-   Age: 28-40
-   Background: Professional with 5+ years experience
-   Goals: Share expertise, learn complementary skills
-   Technical Skill: High
-   Usage Pattern: Weekly, creates courses and responds to requests
-   Needs: Course creation tools, scheduling flexibility, student progress visibility

**3. Mike - The Admin** (Secondary User)

-   Age: 30-45
-   Background: Platform manager
-   Goals: Ensure platform quality and user satisfaction
-   Technical Skill: Very High
-   Usage Pattern: Daily monitoring
-   Needs: Analytics, moderation tools, user management

### 2.4 Operating Environment

**Client Side**:

-   **Browsers**:
    -   Chrome 100+ (Recommended)
    -   Firefox 100+
    -   Safari 15+
    -   Edge 100+
-   **Operating Systems**: Windows 10+, macOS 10.15+, Linux (Ubuntu 20.04+), iOS 14+, Android 10+
-   **Screen Resolutions**:
    -   Mobile: 360px - 767px
    -   Tablet: 768px - 1023px
    -   Desktop: 1024px+
-   **Internet**: Broadband connection (minimum 2 Mbps)

**Server Side**:

-   **Runtime**: Node.js 18.x or higher
-   **Web Server**: Express.js 4.x
-   **Database**: MongoDB 6.x
-   **Hosting**:
    -   Frontend: Vercel (or similar)
    -   Backend: Render/Railway (or similar)
    -   Database: MongoDB Atlas

**Third-Party Services**:

-   Google Calendar API (session scheduling)
-   Google Meet API (video conferencing)
-   ImgBB API (image hosting)
-   NextAuth (authentication)

### 2.5 Design and Implementation Constraints

**Technical Constraints**:

-   Must use Next.js 15 for frontend (requirement)
-   Must use Express.js for backend (requirement)
-   MongoDB as primary database (requirement)
-   Socket.IO for real-time features (requirement)
-   Must be mobile-responsive (requirement)

**Business Constraints**:

-   No payment processing in v1.0
-   Google OAuth setup required for full functionality
-   Fallback mode for development without Google credentials
-   4-week development timeline per milestone

**Regulatory Constraints**:

-   GDPR compliance for user data (EU users)
-   COPPA compliance (no users under 13)
-   Accessibility standards (WCAG 2.1 Level AA)

**Security Constraints**:

-   All API endpoints must require authentication
-   Passwords must be hashed (bcrypt)
-   HTTPS required in production
-   CORS properly configured
-   Input validation and sanitization

### 2.6 Assumptions and Dependencies

**Assumptions**:

-   Users have reliable internet access
-   Users have basic computer literacy
-   Users have access to modern web browsers
-   Users have email accounts for registration
-   Users willing to participate in skill exchange without payment

**Dependencies**:

-   **External Services**:
    -   Google Cloud Platform (Calendar/Meet APIs)
    -   MongoDB Atlas availability
    -   ImgBB service uptime
    -   NextAuth service
-   **Third-Party Libraries**:
    -   Continued support for Next.js 15
    -   TanStack Query maintenance
    -   Socket.IO compatibility
-   **Development Team**:
    -   4 active developers
    -   Access to development tools
    -   GitHub for version control

---

## 3. System Features

### 3.1 User Authentication & Authorization

**Description**: Secure system for user registration, login, and role-based access control.

**Priority**: High

**Functional Requirements**:

**FR-101**: Registration

-   System shall allow users to register with email and password
-   System shall allow users to register via Google OAuth
-   System shall validate email format and password strength (min 8 chars, 1 uppercase, 1 number)
-   System shall send email verification link upon registration
-   System shall prevent duplicate email registrations

**FR-102**: Login

-   System shall allow users to login with email/password or Google OAuth
-   System shall create JWT session tokens valid for 24 hours
-   System shall implement "Remember Me" functionality
-   System shall lock account after 5 failed login attempts (15-minute cooldown)

**FR-103**: Password Management

-   System shall allow users to reset password via email link
-   System shall require old password for password changes
-   System shall hash passwords using bcrypt (10 salt rounds)

**FR-104**: Role Management

-   System shall support three roles: User, Instructor, Admin
-   System shall auto-assign "User" role on registration
-   System shall allow Admins to change user roles
-   System shall restrict course creation to Instructors and Admins

**FR-105**: Session Management

-   System shall maintain user sessions across page refreshes
-   System shall log out users automatically after 24 hours of inactivity
-   System shall allow manual logout from all devices

**Acceptance Criteria**:

-   User can register and receive verification email within 30 seconds
-   User can login and access dashboard within 3 seconds
-   Unauthorized users are redirected to login page
-   Role-based restrictions are enforced on all protected routes

---

### 3.2 User Profile Management

**Description**: Comprehensive profile system for personal information and skill portfolio.

**Priority**: High

**Functional Requirements**:

**FR-201**: Profile Creation

-   System shall create default profile on registration with name and email
-   System shall allow users to add bio (max 500 characters)
-   System shall allow users to upload avatar image (max 5MB, JPG/PNG)
-   System shall use default avatar if none provided

**FR-202**: Profile Editing

-   System shall allow users to edit name, bio, and avatar
-   System shall validate name (2-50 characters)
-   System shall auto-save changes and show success message
-   System shall prevent email changes (security)

**FR-203**: Skills Portfolio

-   System shall display all skills offered by user (read-only on profile)
-   System shall display all skills requested by user
-   System shall show skill count on profile card
-   System shall link to skill detail pages

**FR-204**: Profile Viewing

-   System shall allow users to view other users' public profiles
-   System shall show: name, avatar, bio, skills offered, rating, total swaps
-   System shall hide private information (email, password)
-   System shall show "Contact" button for logged-in users

**FR-205**: Profile Statistics

-   System shall display total swaps completed
-   System shall display average rating (if rated)
-   System shall display member since date
-   System shall display active session count

**Acceptance Criteria**:

-   Profile edits save within 2 seconds
-   Image upload completes within 5 seconds
-   Public profiles load within 1 second
-   All profile data is responsive on mobile

---

### 3.3 Skill Listing & Discovery

**Description**: System for creating, browsing, and discovering skills available for exchange.

**Priority**: High

**Functional Requirements**:

**FR-301**: Skill Creation

-   System shall allow authenticated users to create skill listings
-   System shall require: title, description, category, proficiency level, mode
-   System shall allow: tags (max 10), exchange preferences, availability, location
-   System shall auto-set creator as skill owner
-   System shall mark new skills as active by default

**FR-302**: Skill Browsing

-   System shall display all active skills in grid/list view
-   System shall show: title, category, proficiency badge, owner avatar, rating
-   System shall paginate results (12 skills per page)
-   System shall support infinite scroll

**FR-303**: Skill Search

-   System shall provide search bar for full-text search
-   System shall search in: title, description, tags
-   System shall highlight search terms in results
-   System shall show "No results found" message if empty

**FR-304**: Skill Filtering

-   System shall filter by category (dropdown)
-   System shall filter by proficiency level (checkboxes)
-   System shall filter by mode (Online, Offline, Both)
-   System shall allow multiple filters simultaneously
-   System shall show active filter count

**FR-305**: Skill Sorting

-   System shall sort by: Newest, Oldest, Most Popular, Highest Rated
-   System shall persist sort preference in session
-   System shall show current sort order

**FR-306**: Skill Detail Page

-   System shall show full skill information
-   System shall show owner profile card
-   System shall show "Request Swap" button (if logged in and not owner)
-   System shall show "Edit" button (if owner)
-   System shall display related skills (same category)

**FR-307**: Skill Management

-   System shall allow owners to edit their skills
-   System shall allow owners to delete their skills (if no active requests)
-   System shall prevent deletion of skills with pending/accepted requests
-   System shall soft-delete skills (keep in DB, hide from public)

**Acceptance Criteria**:

-   Skill creation completes within 2 seconds
-   Search returns results within 1 second
-   Filters apply instantly
-   Detail page loads within 1 second
-   Mobile view shows 2 columns on tablet, 1 on phone

---

### 3.4 Swap Request System

**Description**: Core feature enabling users to propose and manage skill exchanges.

**Priority**: High

**Functional Requirements**:

**FR-401**: Request Creation

-   System shall allow users to send swap requests to skill owners
-   System shall require: skillOffered (from requester), skillRequested (from owner), message
-   System shall prevent users from requesting their own skills
-   System shall prevent duplicate requests (same user + same skill pair)
-   System shall set initial status to "pending"

**FR-402**: Request Viewing

-   System shall show incoming requests (requests TO user)
-   System shall show outgoing requests (requests FROM user)
-   System shall display: requester info, skills involved, message, date, status
-   System shall group by status: Pending, Accepted, Scheduled, Completed, Rejected, Cancelled

**FR-403**: Request Actions

-   System shall allow recipients to Accept requests
-   System shall allow recipients to Reject requests with reason
-   System shall allow requesters to Cancel pending requests
-   System shall disable actions based on status (can't accept rejected requests)

**FR-404**: Request Status Flow

```
Pending → Accepted → Scheduled → Completed
   ↓          ↓          ↓
Rejected   Cancelled   Cancelled
```

**FR-405**: Real-time Updates

-   System shall emit Socket.IO events on status changes
-   System shall update UI immediately when status changes
-   System shall show toast notifications on updates
-   System shall update request count in dashboard

**FR-406**: Request Notifications

-   System shall create notification when request is sent
-   System shall create notification when request is accepted/rejected
-   System shall create notification when session is scheduled
-   System shall send email for important events (optional)

**Acceptance Criteria**:

-   Request submission completes within 2 seconds
-   Status updates reflect in UI within 500ms
-   Incoming/outgoing tabs switch instantly
-   Request cards are responsive on all devices
-   Duplicate requests are blocked with error message

---

### 3.5 Real-time Messaging System

**Description**: Built-in chat for negotiating exchanges and follow-ups.

**Priority**: High

**Functional Requirements**:

**FR-501**: Conversation Management

-   System shall create unique conversationId from sorted user IDs
-   System shall auto-create conversation when swap request is accepted
-   System shall show all conversations in sidebar list
-   System shall show unread message count per conversation
-   System shall highlight active conversation

**FR-502**: Message Sending

-   System shall allow users to send text messages (max 1000 characters)
-   System shall send messages via REST API (not Socket.IO to avoid duplicates)
-   System shall show "sending..." indicator
-   System shall show checkmark when delivered
-   System shall timestamp all messages

**FR-503**: Message Receiving

-   System shall receive real-time messages via Socket.IO
-   System shall play notification sound (if enabled)
-   System shall update conversation list order (recent first)
-   System shall show sender avatar and name
-   System shall group messages by date

**FR-504**: Message Status

-   System shall mark messages as "delivered" when sent
-   System shall mark messages as "read" when conversation is opened
-   System shall show "Read" status to sender
-   System shall emit socket events for read receipts

**FR-505**: Message History

-   System shall load last 50 messages on conversation open
-   System shall implement infinite scroll for older messages
-   System shall paginate messages (50 per page)
-   System shall show "No messages yet" for empty conversations

**FR-506**: Conversation Search

-   System shall allow users to search conversation list
-   System shall search by: participant name, last message content
-   System shall highlight search matches
-   System shall show "No conversations found" if empty

**FR-507**: Message Actions

-   System shall allow users to copy message text
-   System shall show message timestamp on hover
-   System shall allow "Start Conversation" from profile page
-   System shall prevent messaging yourself

**Acceptance Criteria**:

-   Messages send and receive within 500ms
-   Message history loads within 1 second
-   Unread count updates in real-time
-   Conversation list stays sorted by most recent
-   Mobile view shows full-width conversation

---

### 3.6 Session Scheduling & Management

**Description**: Google Calendar/Meet integration for scheduling and managing skill exchange sessions.

**Priority**: High

**Functional Requirements**:

**FR-601**: Session Scheduling

-   System shall allow users to schedule sessions from accepted swap requests
-   System shall require: date, time, duration (minutes), timezone
-   System shall allow optional: notes, custom title
-   System shall validate date is in future
-   System shall prevent overlapping sessions (same user, same time)

**FR-602**: Google Calendar Integration

-   System shall create Google Calendar event with meeting details
-   System shall add both participants as attendees
-   System shall generate Google Meet link automatically
-   System shall send email invitations to both users
-   System shall set automatic reminders (1 day before, 30 minutes before)

**FR-603**: Fallback Mode

-   System shall generate mock Meet links if Google credentials not configured
-   System shall log warning message to console in fallback mode
-   System shall save session to database in both modes
-   System shall display fallback notice in UI

**FR-604**: Session Management

-   System shall show upcoming sessions in dashboard
-   System shall show past sessions in history
-   System shall allow users to reschedule sessions
-   System shall allow users to cancel sessions
-   System shall mark sessions as completed

**FR-605**: Session Actions

-   System shall update Google Calendar event on reschedule
-   System shall delete Calendar event on cancellation
-   System shall update swap request status to "scheduled" on schedule
-   System shall update swap request status to "completed" on completion

**FR-606**: Session Details

-   System shall show: date, time, duration, Meet link, calendar link
-   System shall show participant information
-   System shall show meeting notes
-   System shall show "Join Meeting" button (opens Google Meet)
-   System shall show "Copy Link" button

**FR-607**: Session Notifications

-   System shall notify both users when session is scheduled
-   System shall notify both users when session is rescheduled
-   System shall notify both users when session is cancelled
-   System shall send reminder notifications (via email/push)

**Acceptance Criteria**:

-   Session scheduling completes within 5 seconds (real mode) or 1 second (fallback)
-   Google Calendar event is created successfully
-   Meet link works and allows both participants to join
-   Reschedule updates Calendar within 3 seconds
-   Mobile view shows all session details clearly

---

### 3.7 Notifications Center

**Description**: Real-time notification system for all platform activities.

**Priority**: High

**Functional Requirements**:

**FR-701**: Notification Types

-   System shall support notification types: request, message, session
-   System shall create notifications for:
    -   New swap request received
    -   Swap request accepted/rejected
    -   New message received
    -   Session scheduled/rescheduled/cancelled

**FR-702**: Notification Delivery

-   System shall deliver notifications in real-time via Socket.IO
-   System shall emit to specific user's socket room
-   System shall persist notifications to database
-   System shall show toast notification on receive

**FR-703**: Notification Display

-   System shall show notification bell icon in header
-   System shall show unread count badge on bell
-   System shall show dropdown list on bell click
-   System shall limit dropdown to 5 most recent notifications
-   System shall link to full notifications page

**FR-704**: Notification Management

-   System shall allow users to mark individual notifications as read
-   System shall allow users to mark all notifications as read
-   System shall auto-mark as read when clicked
-   System shall allow users to delete notifications (future)

**FR-705**: Notifications Page

-   System shall show all notifications in paginated list
-   System shall filter by type (All, Requests, Messages, Sessions)
-   System shall filter by read status (All, Unread, Read)
-   System shall sort by date (newest first)
-   System shall show empty state if no notifications

**FR-706**: Notification Content

-   System shall show: icon (based on type), title, body, timestamp
-   System shall make notifications clickable (navigate to related page)
-   System shall highlight unread notifications
-   System shall show relative time (e.g., "2 minutes ago")

**Acceptance Criteria**:

-   Notifications appear within 500ms of event
-   Unread count updates in real-time
-   Dropdown opens instantly
-   Mark as read updates within 300ms
-   Mobile view shows compact notification list

---

### 3.8 User Dashboard

**Description**: Centralized hub for managing all platform activities.

**Priority**: High

**Functional Requirements**:

**FR-801**: Dashboard Overview

-   System shall display key statistics:
    -   Active swap requests count
    -   Pending incoming requests count
    -   Scheduled sessions count (next 7 days)
    -   Unread messages count
-   System shall show quick action buttons: Create Skill, View Requests, Messages
-   System shall show recent activity feed (last 10 activities)

**FR-802**: Dashboard Tabs

-   System shall provide tabs: Overview, Requests, Sessions, Messages, Notifications
-   System shall persist active tab in URL query parameter
-   System shall load tab content on demand
-   System shall show loading skeleton while fetching data

**FR-803**: Requests Tab

-   System shall show sub-tabs: Incoming, Outgoing
-   System shall display request cards with actions
-   System shall paginate requests (10 per page)
-   System shall show empty state if no requests

**FR-804**: Sessions Tab

-   System shall show sub-tabs: Upcoming, Past
-   System shall display session cards with details
-   System shall show "Join Meeting" button for upcoming sessions
-   System shall show calendar view option (future)

**FR-805**: Messages Tab

-   System shall show conversation list
-   System shall display active conversation in main area
-   System shall show unread badge on conversations
-   System shall support responsive layout (sidebar collapses on mobile)

**FR-806**: Notifications Tab

-   System shall display all notifications
-   System shall provide filters: type, read status
-   System shall show mark all as read button
-   System shall paginate notifications (20 per page)

**FR-807**: Dashboard Responsiveness

-   System shall show single column on mobile (< 768px)
-   System shall show two columns on tablet (768px - 1024px)
-   System shall show three columns on desktop (> 1024px)
-   System shall hide sidebar on mobile (hamburger menu)

**Acceptance Criteria**:

-   Dashboard loads within 2 seconds
-   All statistics are accurate and up-to-date
-   Tab switching is instant
-   All components are responsive
-   Empty states are user-friendly

---

### 3.9 Course Creation & Management

**Description**: Instructors can create structured courses as an alternative to one-on-one swaps.

**Priority**: Medium

**Functional Requirements**:

**FR-901**: Course Creation

-   System shall allow Instructors to create courses
-   System shall require: title, description, category, level
-   System shall allow: syllabus (weeks + topics), learning outcomes, prerequisites, thumbnail
-   System shall validate title (5-200 characters)
-   System shall validate syllabus has at least 1 week and 1 topic

**FR-902**: Syllabus Builder

-   System shall allow dynamic addition of weeks
-   System shall allow dynamic addition of topics per week
-   System shall require: weekNumber, weekTitle, topicTitle, duration (minutes)
-   System shall calculate total course duration
-   System shall support drag-and-drop reordering (future)

**FR-903**: Course Publishing

-   System shall set new courses as unpublished by default
-   System shall allow Instructors to publish courses
-   System shall validate course has syllabus and learning outcomes before publishing
-   System shall set publishedAt timestamp on first publish
-   System shall allow unpublishing

**FR-904**: Course Browsing

-   System shall display published courses in grid/list view
-   System shall show: title, thumbnail, category, level, instructor, duration
-   System shall filter by category and level
-   System shall search by title and description
-   System shall paginate results (12 per page)

**FR-905**: Course Detail Page

-   System shall show full course information
-   System shall show instructor profile card
-   System shall show syllabus (collapsible weeks)
-   System shall show "Enroll" button (if logged in and not enrolled)
-   System shall show "Edit" button (if owner)

**FR-906**: Course Management

-   System shall allow Instructors to edit their courses
-   System shall allow Instructors to delete unpublished courses
-   System shall prevent deletion of courses with enrollments
-   System shall show total enrollments count

**FR-907**: Course Statistics

-   System shall display total enrollments
-   System shall display average rating
-   System shall display completion rate (future)
-   System shall show enrollment trend (future)

**Acceptance Criteria**:

-   Course creation completes within 3 seconds
-   Syllabus builder is intuitive and responsive
-   Published courses appear immediately in browse page
-   Course edit saves all changes
-   Thumbnails display correctly on all devices

---

### 3.10 Course Enrollment & Progress Tracking

**Description**: Users can enroll in courses and track their learning progress.

**Priority**: High (In Development)

**Functional Requirements**:

**FR-1001**: Course Enrollment

-   System shall allow users to enroll in published courses
-   System shall prevent duplicate enrollments
-   System shall set enrollment status to "active"
-   System shall increment course totalEnrollments count
-   System shall create notification for instructor

**FR-1002**: My Courses Dashboard

-   System shall show all enrolled courses
-   System shall display: course title, thumbnail, progress %, status, last accessed
-   System shall show statistics:
    -   Total enrolled courses
    -   Active courses
    -   Completed courses
    -   Total learning hours
-   System shall filter by status (All, Active, Completed, Dropped)

**FR-1003**: Progress Tracking

-   System shall track completed lessons per user
-   System shall auto-calculate progress percentage (completedLessons / totalLessons × 100)
-   System shall update lastAccessedAt on course view
-   System shall auto-update status to "completed" at 100% progress

**FR-1004**: Lesson Management

-   System shall allow users to mark lessons as completed
-   System shall store: week number, lesson index, completedAt timestamp
-   System shall allow users to unmark lessons (toggle)
-   System shall update progress immediately on mark/unmark

**FR-1005**: Course Progress Page

-   System shall show syllabus with completion checkboxes
-   System shall highlight completed lessons
-   System shall show week-by-week progress breakdown
-   System shall show progress bar for each week
-   System shall show "Continue Learning" button (goes to next uncompleted lesson)

**FR-1006**: Unenrollment

-   System shall allow users to unenroll from courses
-   System shall set status to "dropped"
-   System shall preserve progress data
-   System shall prevent unenrolling from completed courses
-   System shall decrement course totalEnrollments count

**FR-1007**: Course Rating

-   System shall allow users to rate completed courses (1-5 stars)
-   System shall allow users to write reviews (max 500 characters)
-   System shall update course averageRating
-   System shall display ratings on course detail page
-   System shall prevent rating before completion

**FR-1008**: Certificate Issuance

-   System shall issue certificate on course completion
-   System shall generate certificate URL (PDF)
-   System shall store certificateUrl in enrollment
-   System shall show "Download Certificate" button
-   System shall display certificate in user profile (future)

**Acceptance Criteria**:

-   Enrollment completes within 1 second
-   Progress updates instantly on lesson mark
-   My Courses dashboard loads within 2 seconds
-   Progress calculations are accurate
-   Certificate generates within 5 seconds

---

## 4. External Interface Requirements

### 4.1 User Interfaces

**UI-101**: Landing Page

-   Responsive hero section with CTA
-   Features overview (3-column grid)
-   How it works section (3 steps)
-   Testimonials section
-   Footer with links

**UI-102**: Authentication Pages

-   Login form (email/password, Google button)
-   Register form (name, email, password, confirm password)
-   Forgot password form
-   Email verification page

**UI-103**: Dashboard

-   Sidebar navigation (collapsible on mobile)
-   Top header with search, notifications, profile menu
-   Main content area with tabs
-   Statistics cards (4-grid layout)
-   Quick action buttons

**UI-104**: Skill Pages

-   Browse page (grid view, filters sidebar)
-   Detail page (2-column layout: info + actions)
-   Create/Edit form (multi-step wizard)
-   My Skills list (editable cards)

**UI-105**: Requests Pages

-   Incoming/Outgoing tabs
-   Request cards with actions
-   Accept/Reject dialog
-   Request detail modal

**UI-106**: Messages Page

-   Two-column layout (conversations list + chat area)
-   Message bubbles (left for received, right for sent)
-   Input field with send button
-   Unread badges

**UI-107**: Sessions Pages

-   Calendar view (month/week/day)
-   Session cards (upcoming/past)
-   Schedule dialog (date picker, time picker, duration)
-   Reschedule dialog
-   Session detail modal

**UI-108**: Courses Pages

-   Browse page (grid view with filters)
-   Detail page (tabbed: Overview, Syllabus, Reviews)
-   Create/Edit form (drag-drop syllabus builder)
-   My Courses dashboard (progress cards)
-   Learning page (sidebar syllabus + video area)

**UI-109**: Profile Pages

-   Public profile (avatar, bio, skills, stats)
-   Edit profile form
-   Settings page (account, notifications, privacy)

**UI-110**: Notifications

-   Dropdown list (5 most recent)
-   Full notifications page (filterable list)
-   Empty states

**Design Guidelines**:

-   **Color Scheme**: Primary (blue), secondary (green), accent (orange)
-   **Typography**: Inter font family
-   **Spacing**: 4px base unit (8px, 16px, 24px, 32px)
-   **Shadows**: 3 levels (sm, md, lg)
-   **Border Radius**: 8px default, 4px small, 16px large
-   **Icons**: Lucide React icon set
-   **Animations**: Framer Motion (subtle, under 300ms)

**Accessibility**:

-   WCAG 2.1 Level AA compliance
-   Keyboard navigation support
-   Screen reader friendly (ARIA labels)
-   Color contrast ratio ≥ 4.5:1
-   Focus indicators on all interactive elements

### 4.2 Hardware Interfaces

**Not applicable** - Skills Swap is a web-based application with no direct hardware interfaces.

**Indirect Hardware Requirements**:

-   Client devices: Desktop/laptop (Windows, macOS, Linux) or mobile (iOS, Android)
-   Input devices: Keyboard, mouse/trackpad, touch screen
-   Output devices: Display (minimum 360px width), speakers (optional for notifications)
-   Internet connection device: Ethernet, Wi-Fi, or cellular modem

### 4.3 Software Interfaces

**SI-101**: MongoDB Database

-   **Interface Type**: Database Connection
-   **Version**: MongoDB 6.x
-   **Protocol**: MongoDB Wire Protocol
-   **Connection**: Mongoose ODM (v8.19.1)
-   **Data Exchange**: JSON documents (BSON)
-   **Operations**: CRUD operations, aggregations, text search

**SI-102**: Google Calendar API

-   **Interface Type**: REST API
-   **Version**: v3
-   **Protocol**: HTTPS
-   **Authentication**: OAuth 2.0
-   **Data Format**: JSON
-   **Operations**:
    -   `events.insert` - Create calendar event
    -   `events.update` - Update event
    -   `events.delete` - Delete event
    -   `events.get` - Get event details

**SI-103**: Google Meet API

-   **Interface Type**: REST API (v2) / Calendar conferenceData
-   **Protocol**: HTTPS
-   **Authentication**: OAuth 2.0
-   **Data Format**: JSON
-   **Operations**:
    -   Create Meet space
    -   Get Meet link
    -   End Meet space

**SI-104**: NextAuth.js

-   **Interface Type**: Authentication Library
-   **Version**: 4.24.11
-   **Providers**: Google OAuth, Credentials
-   **Session Management**: JWT tokens
-   **Operations**: Sign in, sign out, session verification

**SI-105**: Socket.IO

-   **Interface Type**: WebSocket Library
-   **Version**: 4.x
-   **Protocol**: WebSocket (fallback to HTTP long-polling)
-   **Events**: Custom application events
-   **Operations**: Emit, on, join room, leave room

**SI-106**: ImgBB API

-   **Interface Type**: REST API
-   **Protocol**: HTTPS
-   **Authentication**: API Key
-   **Data Format**: JSON, multipart/form-data
-   **Operations**: Upload image, get image URL

**SI-107**: SMTP Server (Future)

-   **Interface Type**: Email Service
-   **Protocol**: SMTP, TLS
-   **Service**: SendGrid, Mailgun, or AWS SES
-   **Operations**: Send email, send template

### 4.4 Communication Interfaces

**CI-101**: HTTP/HTTPS Protocol

-   **Frontend ↔ Backend**: RESTful API calls
-   **Method**: GET, POST, PUT, PATCH, DELETE
-   **Data Format**: JSON
-   **Headers**: Content-Type, Authorization, CORS
-   **Port**: 5000 (dev), 443 (production HTTPS)

**CI-102**: WebSocket Protocol

-   **Real-time Communication**: Socket.IO
-   **Transport**: WebSocket (primary), HTTP long-polling (fallback)
-   **Events**: Custom application events (message:n…)

## 🛠️ Tech Stack

### Frontend

| Technology           | Version | Purpose                                     |
| -------------------- | ------- | ------------------------------------------- |
| **Next.js**          | 15.5.3  | React framework with SSR/SSG, App Router    |
| **React**            | 19.1.0  | UI component library                        |
| **TypeScript**       | 5.x     | Type safety and developer experience        |
| **TanStack Query**   | 5.x     | Server state management, caching, mutations |
| **Tailwind CSS**     | 3.x     | Utility-first styling                       |
| **Shadcn/ui**        | Latest  | Accessible component library                |
| **Framer Motion**    | 11.x    | Animations and transitions                  |
| **Socket.IO Client** | 4.x     | Real-time WebSocket communication           |
| **Axios**            | 1.x     | HTTP client                                 |
| **NextAuth.js**      | 4.24.11 | Authentication (Google, Credentials)        |
| **Sonner**           | 2.x     | Toast notifications                         |

### Backend

| Technology      | Version | Purpose                               |
| --------------- | ------- | ------------------------------------- |
| **Node.js**     | 18.x+   | JavaScript runtime                    |
| **Express.js**  | 4.x     | Web framework                         |
| **MongoDB**     | 6.x     | NoSQL database                        |
| **Mongoose**    | 8.19.1  | ODM for MongoDB                       |
| **Socket.IO**   | 4.x     | Real-time bidirectional communication |
| **Google APIs** | Latest  | Calendar, Meet, OAuth integration     |
| **googleapis**  | Latest  | Google Calendar/Meet REST APIs        |
| **dotenv**      | Latest  | Environment variable management       |
| **cors**        | Latest  | Cross-origin resource sharing         |
| **nodemon**     | Latest  | Development auto-reload               |

### Development Tools

-   **ESLint** - Code linting
-   **Prettier** - Code formatting
-   **Git/GitHub** - Version control
-   **VS Code** - Primary IDE
-   **Postman** - API testing
-   **Turbopack** - Fast bundler for Next.js

### Infrastructure

-   **Deployment**: Vercel (Frontend), Railway/Render (Backend)
-   **Database Hosting**: MongoDB Atlas
-   **Image Hosting**: ImgBB
-   **Authentication**: NextAuth with Google OAuth 2.0

---

## ✨ Core Features

### 1. 🔐 User Authentication & Authorization

**Description**: Secure user registration and login system with role-based access control.

**Features**:

-   Google OAuth 2.0 integration
-   Credential-based authentication (email/password)
-   JWT session management via NextAuth
-   Role-based access: User, Instructor, Admin
-   Protected routes and API endpoints

**Tech**: NextAuth.js, bcrypt, JWT tokens

**Status**: ✅ Complete

---

### 2. 👤 User Profile Management

**Description**: Comprehensive profile system for showcasing skills and managing personal information.

**Features**:

-   Editable profile: name, bio, avatar (ImgBB integration)
-   Skills portfolio (offered and requested skills)
-   View other users' public profiles
-   Profile stats: total swaps, rating, active sessions
-   Responsive profile cards and detail pages

**Tech**: React Query, Axios, MongoDB User schema

**Status**: ✅ Complete

---

### 3. 🎯 Skill Listing & Discovery

**Description**: Browse, search, and filter skills available for exchange.

**Features**:

-   Create skill listings with title, description, category, proficiency level
-   Advanced filtering: category, proficiency, mode (Online/Offline/Both)
-   Full-text search on skill titles and descriptions
-   Tags for better discoverability
-   Pagination and infinite scroll
-   Skill detail pages with instructor information

**Tech**: MongoDB text indexes, React Query, Framer Motion

**Status**: ✅ Complete

---

### 4. 🔄 Swap Request System

**Description**: Core feature enabling users to propose skill exchanges.

**Features**:

-   Send swap requests (offer your skill in exchange for theirs)
-   Request statuses: Pending, Accepted, Rejected, Scheduled, Completed, Cancelled
-   Accept/Reject requests with reasons
-   View incoming and outgoing requests in organized tabs
-   Real-time status updates via Socket.IO
-   Request details with skill descriptions and user info

**Tech**: Socket.IO, React Query, MongoDB SwapRequest schema

**Status**: ✅ Complete

---

### 5. 💬 Real-time Messaging System

**Description**: Built-in chat for negotiating exchanges and follow-ups.

**Features**:

-   One-on-one conversations
-   Real-time message delivery via WebSockets
-   Message read receipts and delivery status
-   Conversation list with unread count
-   Auto-generated conversationId (user ID pairs)
-   Follow-up messaging from swap requests
-   Message history and timestamps

**Tech**: Socket.IO, MongoDB Message schema, TanStack Query

**Status**: ✅ Complete

---

### 6. 📅 Session Scheduling & Management

**Description**: Google Calendar/Meet integration for scheduling and managing skill exchange sessions.

**Features**:

-   Schedule sessions with date, time, duration, notes
-   Google Calendar event creation with auto-generated Meet links
-   Fallback mode (mock Meet links) when OAuth not configured
-   Session statuses: Scheduled, Completed, Cancelled
-   Reschedule sessions with calendar updates
-   Cancel sessions with reason tracking
-   Join session via Google Meet link
-   Copy meeting link to clipboard
-   Email invitations sent to both participants
-   Automatic reminders (1 day before, 30 minutes before)

**Tech**: Google Calendar API, Google Meet API, googleapis, OAuth 2.0

**Status**: ✅ Complete (with fallback mode)

---

### 7. 🔔 Notifications Center

**Description**: Real-time notification system for all platform activities.

**Features**:

-   Notification types: Request, Message, Session
-   Real-time push notifications via Socket.IO
-   Header bell icon with unread badge
-   Dropdown list with mark read/all read
-   Dedicated notifications page with filtering
-   Notification triggers:
    -   New swap request received
    -   Request accepted/rejected
    -   New message received
    -   Session scheduled/rescheduled/cancelled
-   Pagination and infinite scroll
-   Auto-mark as read on view

**Tech**: Socket.IO, React Query, MongoDB Notification schema

**Status**: ✅ Complete

---

### 8. 📊 User Dashboard

**Description**: Centralized hub for managing all platform activities.

**Features**:

-   Overview stats: Active requests, pending swaps, scheduled sessions, unread messages
-   Quick actions: Create skill, send request, schedule session
-   Recent activity feed
-   Upcoming sessions calendar view
-   Tabs: Requests (Incoming/Outgoing), Sessions, Messages, Notifications
-   Responsive layout for all screen sizes
-   Search and filter across all sections

**Tech**: Next.js App Router, React Query, Shadcn components

**Status**: ✅ Complete

---

### 9. 🎓 Course Creation & Management

**Description**: Instructors can create structured courses as an alternative to one-on-one swaps.

**Features**:

-   Create courses with title, description, category, level
-   Multi-week syllabus with topics and durations
-   Set learning outcomes and prerequisites
-   Upload course thumbnails
-   Publish/unpublish courses
-   Edit and delete courses
-   View courses by instructor
-   Search and filter courses

**Tech**: MongoDB Course schema, Express REST API

**Status**: ✅ Complete

---

### 10. 📚 Course Enrollment & Progress Tracking

**Description**: **(🚧 Currently in Development)** Users can enroll in courses and track their learning progress.

**Features**:

-   Enroll in published courses (prevents duplicates)
-   View "My Courses" dashboard with statistics
-   Track progress: completed lessons, percentage completion
-   Mark lessons as completed (week + topic level)
-   Auto-status updates: Active → Completed at 100%
-   Unenroll from courses (sets status to "Dropped")
-   Rate and review courses
-   Certificate tracking for completed courses
-   Week-by-week progress breakdown
-   Total learning time and hours tracked

**Tech**: MongoDB Enrollment schema, React Query, Progress calculation middleware

**Status**: 🚧 **In Development** (Backend Complete, Frontend Pending)

**Current Progress**:

-   ✅ Enrollment model with progress tracking
-   ✅ 6 REST API endpoints (enroll, my-courses, progress, update, unenroll, rate)
-   ✅ Auto-progress calculation based on syllabus
-   ✅ Mock data seed script for testing
-   ✅ API documentation for frontend integration
-   ⏳ Frontend UI components (dashboard, learning page)
-   ⏳ Integration with Next.js pages

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

-   **User**: email (unique), role
-   **Skill**: offeredBy, title (text), description (text)
-   **SwapRequest**: requester, skillProvider, status
-   **Message**: conversationId, sender, receiver
-   **Session**: swapRequest, scheduledDate
-   **Notification**: user, isRead, createdAt
-   **Course**: instructor, published
-   **Enrollment**: user + course (compound unique), status

---

## 📡 API Documentation

### Base URL

-   **Development**: `http://localhost:5000`
-   **Production**: `https://skills-swap-api.onrender.com` (example)

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

-   `POST /register` - Register new user
-   `POST /login` - Login user
-   `POST /logout` - Logout user
-   `GET /session` - Get current session

#### **Users** (`/api/users`)

-   `GET /` - Get all users
-   `GET /:id` - Get user by ID
-   `PUT /:id` - Update user profile
-   `DELETE /:id` - Delete user

#### **Skills** (`/api/skills`)

-   `POST /` - Create skill
-   `GET /` - Get all skills (with filters)
-   `GET /:id` - Get skill by ID
-   `PUT /:id` - Update skill
-   `DELETE /:id` - Delete skill

#### **Swap Requests** (`/api/swap-requests`)

-   `POST /` - Create swap request
-   `GET /user/:userId` - Get user's requests
-   `PATCH /:id/accept` - Accept request
-   `PATCH /:id/reject` - Reject request
-   `PATCH /:id/cancel` - Cancel request

#### **Messages** (`/api/messages`)

-   `POST /send` - Send message
-   `GET /conversations/:userId` - Get conversations
-   `GET /conversation/:conversationId` - Get conversation messages
-   `PATCH /:messageId/read` - Mark message as read

#### **Sessions** (`/api/sessions`)

-   `POST /schedule` - Schedule session
-   `GET /user/:userId` - Get user sessions
-   `GET /:id` - Get session details
-   `PATCH /:id/reschedule` - Reschedule session
-   `PATCH /:id/cancel` - Cancel session
-   `PATCH /:id/complete` - Complete session
-   `GET /google/auth` - Get Google OAuth URL
-   `GET /google/callback` - OAuth callback

#### **Notifications** (`/api/notifications`)

-   `POST /` - Create notification
-   `GET /user/:userId` - Get user notifications
-   `GET /user/:userId/unread-count` - Get unread count
-   `PATCH /:id/read` - Mark as read
-   `PATCH /read-all/:userId` - Mark all as read

#### **Courses** (`/api/courses`)

-   `POST /` - Create course
-   `GET /` - Get all courses (with filters)
-   `GET /instructor/:id` - Get courses by instructor
-   `GET /:id` - Get course by ID
-   `PUT /:id` - Update course
-   `DELETE /:id` - Delete course
-   `PATCH /:id/publish` - Publish/unpublish course

#### **Enrollments** (`/api/enrollments`) - 🚧 In Development

-   `POST /enroll/:courseId` - Enroll in course
-   `GET /my-courses` - Get enrolled courses
-   `GET /progress/:courseId` - Get course progress
-   `PUT /progress/:courseId` - Update lesson progress
-   `DELETE /unenroll/:courseId` - Unenroll from course
-   `POST /rate/:courseId` - Rate course

### Socket.IO Events

**Client → Server**

-   `message:send` - Send a message
-   `notification:read` - Mark notification as read

**Server → Client**

-   `message:new` - New message received
-   `notification:new` - New notification
-   `request:update` - Swap request status changed
-   `session:update` - Session update

---

## 🚀 Setup & Installation

### Prerequisites

-   Node.js 18.x or higher
-   MongoDB 6.x (local or Atlas)
-   Google Cloud account (for Calendar/Meet integration)
-   Git

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

-   Frontend: http://localhost:3000
-   Backend API: http://localhost:5000
-   API Docs: http://localhost:5000/api-docs (if Swagger enabled)

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

-   ✅ Complete Course Enrollment frontend UI
-   ✅ Implement Sessions Dashboard page
-   ✅ Add unit tests (Jest + RTL)
-   ✅ Ensure full responsiveness

### Phase 2 (Next Sprint)

-   [ ] Admin dashboard for platform management
-   [ ] Advanced search with Elasticsearch
-   [ ] User reputation/rating system
-   [ ] Gamification (badges, leaderboards)
-   [ ] Mobile app (React Native)

### Phase 3 (Long-term)

-   [ ] AI-powered skill matching
-   [ ] Video call integration (in-app WebRTC)
-   [ ] Payment gateway for premium features
-   [ ] Multi-language support (i18n)
-   [ ] Analytics dashboard for instructors
-   [ ] Skill certification system

---

## 👥 Team

**Team Size**: 4 Members

**Roles**:

-   Member A: Backend Lead (APIs, Database, Google Integration)
-   Member B: Frontend Lead (UI/UX, Components, Responsive Design)
-   Member C: Full-stack (Socket.IO, Session Management, Integration)
-   Member D: QA/Docs (Testing, Documentation, Polish)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

-   Next.js team for the amazing framework
-   Shadcn for the beautiful component library
-   Google for Calendar/Meet APIs
-   MongoDB for the flexible database
-   Programming Hero for project guidance

---

## 📞 Support

For questions or issues:

-   GitHub Issues: [Create an issue](https://github.com/your-org/skills-swap/issues)
-   Email: support@skillsswap.com
-   Documentation: See `docs/` folder

---

**Last Updated**: October 15, 2025  
**Version**: 1.0.0  
**Status**: ✅ Core Features Complete | 🚧 Course Enrollment in Development
