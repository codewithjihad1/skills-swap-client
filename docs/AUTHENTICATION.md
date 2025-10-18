# Authentication & Security System

This authentication system provides comprehensive user registration, login, and password reset functionality with advanced security features.

## 🚀 Features Implemented

### Authentication

-   ✅ **User Registration**: Secure user signup with password hashing
-   ✅ **User Login**: NextAuth.js integration with credentials provider
-   ✅ **Session Management**: JWT-based sessions with automatic token refresh
-   ✅ **Protected Routes**: Authentication-based route protection

### Security Features

-   ✅ **Account Lockout**: Automatic account lockout after 5 failed login attempts (2-hour lockout period)
-   ✅ **Password Reset**: Secure password reset with time-limited tokens (1-hour expiry)
-   ✅ **Password Hashing**: bcrypt with 12 salt rounds for secure password storage
-   ✅ **Input Validation**: Comprehensive client and server-side validation
-   ✅ **Rate Limiting**: Built-in protection against brute force attacks

## 📁 File Structure

```
src/
├── app/
│   ├── api/auth/
│   │   ├── [...nextauth]/route.ts       # NextAuth configuration
│   │   ├── forgot-password/route.ts     # Password reset API
│   │   └── reset-password/route.ts      # Password reset confirmation API
│   ├── auth/
│   │   ├── signin/page.tsx              # Login page
│   │   ├── signup/page.tsx              # Registration page
│   │   ├── forgot-password/page.tsx     # Forgot password page
│   │   ├── reset-password/page.tsx      # Reset password page
│   │   └── error/page.tsx               # Authentication error page
│   └── actions/auth/
│       └── registerUser.ts             # Server action for user registration
├── models/
│   └── User.ts                         # MongoDB User model with security features
├── lib/
│   └── mongodb.ts                      # MongoDB connection utility
├── provider/
│   └── AuthProvider.tsx               # NextAuth SessionProvider wrapper
└── types/
    └── next-auth.d.ts                  # NextAuth type extensions
```

## 🔧 Setup Instructions

### 1. Environment Variables

Create a `.env.local` file with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/skills-swap

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Database Name
DB_NAME=skills-swap
```

### 2. Dependencies

The following packages are already installed:

-   `next-auth` - Authentication framework
-   `mongoose` - MongoDB object modeling
-   `bcryptjs` - Password hashing
-   `mongodb` - MongoDB driver

### 3. Database Schema

The User model includes the following security fields:

-   `loginAttempts`: Number of failed login attempts
-   `lockUntil`: Account lock expiration time
-   `resetPasswordToken`: Secure reset token
-   `resetPasswordExpires`: Reset token expiration
-   `isVerified`: Email verification status

## 🛡️ Security Features Details

### Account Lockout System

-   **Trigger**: 5 consecutive failed login attempts
-   **Duration**: 2-hour lockout period
-   **Reset**: Automatic reset after successful login or lockout expiry
-   **User Feedback**: Clear error messages indicating lockout status and remaining time

### Password Reset System

-   **Token Generation**: Cryptographically secure random tokens
-   **Expiry**: 1-hour token lifetime
-   **Security**: Tokens are hashed and stored securely
-   **Validation**: Server-side token validation with expiry checks

### Password Security

-   **Hashing**: bcrypt with 12 salt rounds
-   **Requirements**: Minimum 6 characters (easily extensible)
-   **Validation**: Client and server-side password strength validation

## 📱 User Experience

### Registration Flow

1. User fills registration form with name, email, and password
2. Client-side validation for email format and password confirmation
3. Server-side validation and duplicate email checking
4. Password hashing and secure storage
5. Success message with automatic redirect to signin

### Login Flow

1. User enters email and password
2. NextAuth handles authentication with custom credential provider
3. Account lockout check before password verification
4. Failed attempts increment the counter
5. Successful login resets failed attempts and redirects to dashboard

### Password Reset Flow

1. User enters email on forgot password page
2. System generates secure reset token (doesn't reveal if email exists)
3. Token is stored with expiry time
4. User clicks reset link (in production, sent via email)
5. New password is validated and updated
6. All security fields are reset

## 🔗 API Endpoints

-   `POST /api/auth/[...nextauth]` - NextAuth authentication
-   `POST /api/auth/forgot-password` - Initiate password reset
-   `POST /api/auth/reset-password` - Complete password reset

## 🎨 UI/UX Features

-   **Responsive Design**: Mobile-first responsive authentication pages
-   **Loading States**: Visual feedback during form submissions
-   **Error Handling**: User-friendly error messages with clear guidance
-   **Success Feedback**: Confirmation messages for successful actions
-   **Password Visibility**: Toggle password visibility for better UX
-   **Form Validation**: Real-time client-side validation

## 🚀 Usage Examples

### Check Authentication Status

```tsx
import { useSession } from "next-auth/react";

function MyComponent() {
    const { data: session, status } = useSession();

    if (status === "loading") return <p>Loading...</p>;
    if (status === "unauthenticated") return <p>Not signed in</p>;

    return <p>Signed in as {session.user.email}</p>;
}
```

### Protect Pages

```tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/signin");
    }

    return <div>Protected content</div>;
}
```

## 📝 Notes

-   **Production Deployment**: Update NEXTAUTH_URL for production
-   **Email Service**: Integrate email service for password reset emails
-   **Rate Limiting**: Consider adding additional rate limiting at the API gateway level
-   **Session Storage**: Consider Redis for session storage in production
-   **Monitoring**: Add logging and monitoring for security events

## 🔄 Future Enhancements

-   [ ] Two-factor authentication (2FA)
-   [ ] OAuth providers (Google, GitHub, etc.)
-   [ ] Email verification
-   [ ] Advanced password policies
-   [ ] Session management dashboard
-   [ ] Security audit logs
