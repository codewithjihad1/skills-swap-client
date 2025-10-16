# Middleware Authentication Documentation

## Overview

The middleware has been implemented to protect authenticated routes and manage user access control across the Skills Swap application.

## Protected Routes

The following routes are now protected and require authentication:

1. **`/dashboard`** - Main dashboard (all sub-routes included)

    - `/dashboard/profile`
    - `/dashboard/messages`
    - `/dashboard/skills`
    - `/dashboard/requests`
    - `/dashboard/setting`

2. **`/profile`** - User profile page

3. **`/matchmaking`** - Skill matchmaking page

4. **`/messages`** - Direct messaging (standalone)

5. **`/skills`** - Skills management (standalone)

6. **`/requests`** - Connection requests (standalone)

7. **`/setting`** - User settings (standalone)

## How It Works

### For Unauthenticated Users

When an unauthenticated user tries to access any protected route:

-   They are redirected to `/signin`
-   The original URL is saved as a `callbackUrl` query parameter
-   After successful sign-in, they are redirected back to the original page

**Example:**

```
User tries to visit: /dashboard/profile
Redirected to: /signin?callbackUrl=/dashboard/profile
After sign-in: Redirected back to /dashboard/profile
```

### For Authenticated Users

When an authenticated user tries to access auth routes (`/signin` or `/signup`):

-   They are automatically redirected to `/dashboard`
-   Prevents unnecessary access to login/signup pages

## Technical Implementation

### Middleware File: `src/middleware.ts`

```typescript
import { getToken } from "next-auth/jwt";
```

The middleware uses NextAuth's JWT token validation to check authentication status.

### Configuration

**Matcher Pattern:**
The middleware runs on all routes EXCEPT:

-   `/api/*` - API routes
-   `/_next/static/*` - Static files
-   `/_next/image/*` - Image optimization
-   `favicon.ico` - Favicon
-   Static assets (svg, png, jpg, jpeg, gif, webp)

### Environment Variables Required

Make sure your `.env.local` file contains:

```env
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

**Generate a secure secret:**

```bash
openssl rand -base64 32
```

## Testing the Middleware

### Test Case 1: Unauthenticated Access

1. Clear browser cookies/logout
2. Try to visit: `http://localhost:3000/dashboard`
3. **Expected:** Redirected to `/signin?callbackUrl=/dashboard`

### Test Case 2: Protected Routes

Try accessing these URLs while logged out:

-   `/dashboard` → Should redirect to `/signin`
-   `/profile` → Should redirect to `/signin`
-   `/matchmaking` → Should redirect to `/signin`
-   `/dashboard/profile` → Should redirect to `/signin`

### Test Case 3: Authenticated Redirect

1. Sign in successfully
2. Try to visit: `http://localhost:3000/signin`
3. **Expected:** Redirected to `/dashboard`

### Test Case 4: Public Routes

These should work without authentication:

-   `/` (Home page)
-   `/about`
-   `/explore-skills`
-   `/api/*` (API routes)

## Customization

### Adding More Protected Routes

Edit the `protectedRoutes` array in `src/middleware.ts`:

```typescript
const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/matchmaking",
    "/messages",
    "/skills",
    "/requests",
    "/setting",
    "/your-new-route", // Add your route here
];
```

### Adding More Auth Routes

Edit the `authRoutes` array:

```typescript
const authRoutes = [
    "/signin",
    "/signup",
    "/forgot-password", // Add more as needed
];
```

### Changing Default Redirect Paths

**Change sign-in redirect:**

```typescript
// Line 42
const signInUrl = new URL("/signin", request.url);
// Change to:
const signInUrl = new URL("/your-login-page", request.url);
```

**Change authenticated redirect:**

```typescript
// Line 48
return NextResponse.redirect(new URL("/dashboard", request.url));
// Change to:
return NextResponse.redirect(new URL("/your-home-page", request.url));
```

## Role-Based Access Control (Future Enhancement)

To add role-based protection (e.g., admin-only routes):

```typescript
// Example for admin routes
const adminRoutes = ["/admin", "/dashboard/manageUsers"];

const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

if (isAdminRoute && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
}
```

## Troubleshooting

### Issue: Infinite Redirect Loop

**Cause:** NEXTAUTH_SECRET not set or mismatched
**Solution:**

-   Check `.env.local` has `NEXTAUTH_SECRET`
-   Restart dev server after adding environment variables

### Issue: Not Redirecting

**Cause:** Matcher pattern excluding your route
**Solution:**

-   Check if route matches the pattern in `config.matcher`
-   Verify route is in `protectedRoutes` array

### Issue: Token Not Found

**Cause:** Cookie settings or domain mismatch
**Solution:**

-   Check `NEXTAUTH_URL` matches your domain
-   Ensure cookies are enabled in browser
-   Check for `__Secure-next-auth.session-token` cookie

## Security Best Practices

1. ✅ **Always use HTTPS in production**
2. ✅ **Keep NEXTAUTH_SECRET secure and never commit it**
3. ✅ **Rotate secrets periodically**
4. ✅ **Use strong secret generation (32+ characters)**
5. ✅ **Implement rate limiting on auth routes**
6. ✅ **Add CSRF protection (NextAuth includes this)**

## Performance Considerations

-   Middleware runs on every request matching the pattern
-   JWT validation is fast (no database calls)
-   Token is cached during the request lifecycle
-   Minimal overhead (~1-2ms per request)

## Related Files

-   `src/middleware.ts` - Main middleware implementation
-   `src/app/api/auth/[...nextauth]/route.ts` - NextAuth configuration
-   `src/types/next-auth.d.ts` - TypeScript type definitions
-   `.env.local` - Environment configuration

## Next Steps

-   [ ] Implement role-based access control
-   [ ] Add session timeout handling
-   [ ] Create custom error pages for 401/403
-   [ ] Add logging/monitoring for auth events
-   [ ] Implement remember-me functionality

---

**Last Updated:** October 16, 2025
**Version:** 1.0.0
