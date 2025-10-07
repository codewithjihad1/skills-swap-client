# Account Lockout System Documentation

## 🔒 Overview

The Account Lockout System is a comprehensive security feature that temporarily locks user accounts after multiple failed login attempts to prevent brute force attacks and unauthorized access attempts.

## 🚀 Features

### Core Functionality

-   **Automatic Lockout**: Accounts are automatically locked after 5 consecutive failed login attempts
-   **Progressive Lockout Duration**:
    -   Standard lockout: 2 hours for first 5 failed attempts
    -   Extended lockout: 24 hours for users with 10+ total failed attempts
-   **Real-time Tracking**: Tracks both current session and total failed attempts
-   **Automatic Unlock**: Accounts automatically unlock when the lockout period expires
-   **Manual Unlock**: Admin interface for manual account unlocking

### Security Enhancements

-   **Detailed Logging**: All security events are logged for monitoring
-   **User Feedback**: Clear messages showing lockout status and remaining time
-   **Escalation System**: Progressive penalties for repeat offenders
-   **Reset on Success**: Failed attempt counters reset upon successful login

## 📊 Configuration

### Lockout Settings (Configurable in `User.ts`)

```typescript
export const LOCKOUT_CONFIG = {
    MAX_LOGIN_ATTEMPTS: 5, // Failed attempts before lockout
    LOCKOUT_DURATION: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
    ESCALATION_ATTEMPTS: 10, // Total attempts for extended lockout
    EXTENDED_LOCKOUT_DURATION: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
};
```

## 🗄️ Database Schema

### User Model Fields

```typescript
{
    loginAttempts: Number,        // Current session failed attempts
    lockUntil: Date,             // Lockout expiration time
    totalFailedAttempts: Number, // Total failed attempts (all time)
    lastLoginAttempt: Date,      // Timestamp of last attempt
}
```

### Virtual Fields

-   `isAccountLocked`: Computed field checking if lockout is active
-   `lockReason`: Descriptive reason for the lockout with remaining time

## 🔧 API Endpoints

### GET `/api/auth/account-lockout?email={email}`

Check account lockout status for a user.

**Response:**

```json
{
    "email": "user@example.com",
    "loginAttempts": 3,
    "totalFailedAttempts": 8,
    "lastLoginAttempt": "2025-09-25T10:30:00.000Z",
    "lockoutInfo": {
        "isLocked": false,
        "remainingTime": null,
        "reason": null
    },
    "lockoutConfig": {
        "maxAttempts": 5,
        "lockoutDuration": 120,
        "escalationAttempts": 10,
        "extendedLockoutDuration": 24
    }
}
```

### POST `/api/auth/account-lockout`

Unlock a user account (admin function).

**Request Body:**

```json
{
    "email": "user@example.com",
    "action": "unlock"
}
```

### PUT `/api/auth/account-lockout`

Reset failed login attempts counter.

**Request Body:**

```json
{
    "email": "user@example.com"
}
```

## 🎯 User Experience Flow

### Normal Login Flow

1. User enters credentials
2. System checks if account is locked
3. If not locked, validates password
4. On success: Reset failed attempts, grant access
5. On failure: Increment failed attempts

### Lockout Flow

1. User fails 5 login attempts
2. Account gets locked for 2 hours
3. User sees lockout message with remaining time
4. System prevents further login attempts
5. Account automatically unlocks after duration

### Extended Lockout Flow

1. User with 10+ total failed attempts fails again
2. Account gets locked for 24 hours
3. More serious warning message displayed
4. Longer lockout period applied

## 🖥️ React Components

### AccountStatus Component

Displays real-time lockout information to users:

```tsx
<AccountStatus email="user@example.com" showFullStatus={true} />
```

**Features:**

-   Real-time countdown
-   Warning messages before lockout
-   Auto-refresh for locked accounts
-   Color-coded status indicators

### useAccountLockout Hook

Custom React hook for account management:

```tsx
const {
    checkAccountStatus,
    unlockAccount,
    resetLoginAttempts,
    formatRemainingTime,
    isLoading,
    error,
} = useAccountLockout();
```

## 🚨 Security Events Logged

-   Failed login attempts
-   Account lockouts triggered
-   Account unlocks (manual/automatic)
-   Password changes after lockout
-   Suspicious activity patterns

## 🛠️ Admin Functions

### Check Account Status

```typescript
const status = await fetch("/api/auth/account-lockout?email=user@example.com");
```

### Unlock Account

```typescript
const unlock = await fetch("/api/auth/account-lockout", {
    method: "POST",
    body: JSON.stringify({ email: "user@example.com", action: "unlock" }),
});
```

### Reset Attempts

```typescript
const reset = await fetch("/api/auth/account-lockout", {
    method: "PUT",
    body: JSON.stringify({ email: "user@example.com" }),
});
```

## 📈 Monitoring & Analytics

### Key Metrics to Monitor

-   Number of accounts locked per day
-   Average lockout duration
-   Repeat offender patterns
-   Geographic distribution of failed attempts
-   Peak times for failed login attempts

### Security Alerts

-   Multiple accounts locked from same IP
-   Unusual patterns in failed attempts
-   High volume of lockouts in short period

## 🔧 Customization Options

### Adjusting Lockout Parameters

Modify `LOCKOUT_CONFIG` in `src/models/User.ts`:

```typescript
// More strict settings
MAX_LOGIN_ATTEMPTS: 3,
LOCKOUT_DURATION: 4 * 60 * 60 * 1000, // 4 hours

// More lenient settings
MAX_LOGIN_ATTEMPTS: 7,
LOCKOUT_DURATION: 30 * 60 * 1000, // 30 minutes
```

### Adding IP-Based Lockouts

Extend the system to track attempts by IP address:

```typescript
// Add to User model
ipLockouts: [
    {
        ip: String,
        attempts: Number,
        lockUntil: Date,
    },
];
```

## 🚀 Integration Examples

### In Login Form

```tsx
const handleLogin = async (credentials) => {
    try {
        const result = await signIn("credentials", credentials);
        if (result?.error) {
            // Handle lockout errors specifically
            if (result.error.includes("Account locked")) {
                setShowLockoutInfo(true);
            }
        }
    } catch (error) {
        console.error("Login error:", error);
    }
};
```

### In Admin Dashboard

```tsx
const AdminUserManagement = () => {
    const { unlockAccount, checkAccountStatus } = useAccountLockout();

    const handleUnlock = async (email) => {
        const success = await unlockAccount(email);
        if (success) {
            toast.success("Account unlocked successfully");
            refreshUserList();
        }
    };

    // Component JSX...
};
```

## 🧪 Testing

### Test Scenarios

1. **Basic Lockout**: Fail 5 attempts, verify lockout
2. **Automatic Unlock**: Wait for lockout period, verify unlock
3. **Manual Unlock**: Admin unlocks account, verify access
4. **Extended Lockout**: Trigger escalation rules
5. **Successful Reset**: Login successfully, verify counter reset

### Test Data Setup

```typescript
// Create test user with failed attempts
const testUser = await User.create({
    email: "test@example.com",
    password: hashedPassword,
    loginAttempts: 4, // Close to lockout
    totalFailedAttempts: 9, // Close to escalation
});
```

## 📝 Best Practices

### Implementation

-   Always log security events
-   Provide clear user feedback
-   Implement rate limiting at API gateway level
-   Use secure password hashing (bcrypt)
-   Monitor for suspicious patterns

### User Experience

-   Show warning before lockout
-   Display remaining time clearly
-   Provide alternative contact methods
-   Offer password reset during lockout

### Security

-   Don't reveal if user exists
-   Log all authentication attempts
-   Implement CAPTCHA after failed attempts
-   Consider geographic restrictions
-   Regular security audits

## 🔄 Future Enhancements

-   [ ] CAPTCHA integration after 3 failed attempts
-   [ ] IP-based rate limiting
-   [ ] Geographic anomaly detection
-   [ ] Two-factor authentication bypass for lockouts
-   [ ] Machine learning for suspicious pattern detection
-   [ ] Webhook notifications for security events
-   [ ] Dashboard for security analytics
-   [ ] Automated threat response
