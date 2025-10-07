# Social Login Implementation Guide

## 🚀 Overview

This guide explains how to set up and configure social login with Google and GitHub for your Skills Swap marketplace application using NextAuth.js.

## ✅ Implementation Status

### ✅ Completed Features

-   [x] NextAuth.js configuration with Google and GitHub providers
-   [x] User model updated to support social login
-   [x] Social login buttons in signin and signup pages
-   [x] Automatic user creation for social login
-   [x] Session management for social users
-   [x] Database integration with MongoDB

### 🔧 Configuration Required

-   [ ] Set up Google OAuth credentials
-   [ ] Set up GitHub OAuth credentials
-   [ ] Configure environment variables

## 📋 Setup Instructions

### 1. Google OAuth Setup

1. **Go to Google Cloud Console**

    - Visit [https://console.cloud.google.com/](https://console.cloud.google.com/)
    - Create a new project or select an existing one

2. **Enable Google+ API**

    - Navigate to "APIs & Services" > "Library"
    - Search for "Google+ API" and enable it

3. **Create OAuth 2.0 Credentials**

    - Go to "APIs & Services" > "Credentials"
    - Click "Create Credentials" > "OAuth 2.0 Client IDs"
    - Configure the consent screen first if prompted
    - Application type: "Web application"
    - Name: "Skills Swap Marketplace"
    - Authorized JavaScript origins:
        - `http://localhost:3000` (for development)
        - `https://yourdomain.com` (for production)
    - Authorized redirect URIs:
        - `http://localhost:3000/api/auth/callback/google` (for development)
        - `https://yourdomain.com/api/auth/callback/google` (for production)

4. **Copy Credentials**
    - Copy the Client ID and Client Secret
    - Add them to your `.env.local` file

### 2. GitHub OAuth Setup

1. **Go to GitHub Developer Settings**

    - Visit [https://github.com/settings/developers](https://github.com/settings/developers)
    - Click "New OAuth App"

2. **Configure OAuth App**

    - Application name: "Skills Swap Marketplace"
    - Homepage URL: `http://localhost:3000` (for development)
    - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
    - Description: "Social login for Skills Swap marketplace"

3. **Generate Client Secret**
    - After creating the app, click "Generate a new client secret"
    - Copy both Client ID and Client Secret
    - Add them to your `.env.local` file

### 3. Environment Variables Configuration

Create a `.env.local` file in your project root with the following variables:

```env
# Database Configuration
MONGODB_URI=your_mongodb_connection_string

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

**Important Security Notes:**

-   Never commit `.env.local` to version control
-   Use strong, unique secrets for production
-   Rotate secrets regularly

## 🔄 How Social Login Works

### User Flow

1. **User clicks social login button** (Google/GitHub)
2. **Redirected to provider** for authentication
3. **User grants permissions** to your application
4. **Provider redirects back** with authorization code
5. **NextAuth exchanges code** for access token and user info
6. **System checks if user exists** in database
7. **If new user**: Creates account with social provider data
8. **If existing user**: Updates social provider info
9. **User is signed in** and redirected to dashboard

### Database Integration

-   Social users are automatically created in MongoDB
-   No password required for social login users
-   `provider` and `providerId` fields track social connection
-   `isVerified` is automatically set to `true` for social users
-   Existing email-based accounts can be linked to social providers

## 🎨 UI Components

### Social Login Buttons

The implementation includes styled social login buttons with:

-   **Google Button**: White background with Google logo
-   **GitHub Button**: Dark background with GitHub logo
-   **Loading states**: Buttons disabled during authentication
-   **Responsive design**: Works on all screen sizes

### Integration Points

-   **Signin Page**: Social buttons below credentials form
-   **Signup Page**: Social buttons below registration form
-   **Divider**: "Or continue with" separator for visual clarity

## 🔐 Security Features

### Account Protection

-   **Email Uniqueness**: Prevents duplicate accounts
-   **Provider Linking**: Associates social accounts with existing emails
-   **Automatic Verification**: Social accounts are pre-verified
-   **Session Security**: JWT tokens with secure configuration

### Data Privacy

-   **Minimal Data Collection**: Only essential profile information
-   **Secure Storage**: Encrypted passwords for credential accounts
-   **GDPR Compliance**: User data can be easily exported/deleted

## 🧪 Testing

### Development Testing

1. **Start the development server**:

    ```bash
    npm run dev
    ```

2. **Test Google Login**:

    - Go to `/auth/signin`
    - Click "Continue with Google"
    - Verify successful authentication and user creation

3. **Test GitHub Login**:

    - Go to `/auth/signin`
    - Click "Continue with GitHub"
    - Verify successful authentication and user creation

4. **Test Account Linking**:
    - Create account with email/password
    - Sign in with social provider using same email
    - Verify accounts are properly linked

### Production Considerations

-   Update OAuth redirect URLs to production domain
-   Use production-grade secrets
-   Enable HTTPS for secure authentication
-   Test with different user scenarios

## 🛠️ Customization Options

### Adding More Providers

NextAuth.js supports many providers. To add more:

```typescript
// In route.ts
import TwitterProvider from "next-auth/providers/twitter";

providers: [
    // ...existing providers
    TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID!,
        clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    }),
];
```

### Custom Styling

Modify the social login buttons in:

-   `/src/app/auth/signin/page.tsx`
-   `/src/app/auth/signup/page.tsx`

### User Profile Enhancement

Update the User model to store additional social profile data:

```typescript
// In User.ts model
profilePicture: String, // Store profile image URL
socialLinks: {
    github: String,
    google: String,
},
lastSocialLogin: Date,
```

## 🚨 Troubleshooting

### Common Issues

1. **"Configuration Error"**

    - Check environment variables are set correctly
    - Ensure no trailing spaces in values
    - Verify OAuth app configuration

2. **"Callback URL Mismatch"**

    - Ensure callback URLs match exactly in OAuth settings
    - Check for HTTP vs HTTPS differences
    - Verify port numbers match

3. **"User Creation Failed"**

    - Check MongoDB connection
    - Verify User model schema
    - Check database permissions

4. **"Session Not Persisting"**
    - Verify NEXTAUTH_SECRET is set
    - Check JWT configuration
    - Ensure cookies are enabled

### Debug Mode

Enable NextAuth.js debugging:

```env
NEXTAUTH_DEBUG=true
```

### Logging

Check browser console and server logs for detailed error information.

## 📚 Additional Resources

-   [NextAuth.js Documentation](https://next-auth.js.org/)
-   [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
-   [GitHub OAuth Apps Guide](https://docs.github.com/en/developers/apps/building-oauth-apps)
-   [MongoDB Integration Guide](https://next-auth.js.org/adapters/mongodb)

## 🤝 Support

For issues with social login implementation:

1. Check the troubleshooting section above
2. Verify all configuration steps are completed
3. Test with OAuth provider's debugging tools
4. Check NextAuth.js documentation for provider-specific issues

---

_This implementation provides a secure, user-friendly social authentication system that integrates seamlessly with your existing authentication infrastructure._
