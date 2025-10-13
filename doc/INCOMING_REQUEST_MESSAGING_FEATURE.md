# Incoming Request Messaging Feature

## Overview

This document describes the messaging functionality added to the `IncomingRequestCard` component, allowing skill providers to communicate with requesters directly from the requests page.

## Implementation Date

October 11, 2025

## Feature Description

Users can now start conversations with skill requesters by clicking:

-   **"Negotiate" button** (for pending requests)
-   **"Message" button** (for accepted requests)
-   **"Send Message"** option in the dropdown menu

## How It Works

### 1. Conversation Creation

When a user clicks any messaging button:

1. System generates a unique `conversationId` by combining and sorting both user IDs
2. Sends an initial greeting message to create the conversation
3. Navigates to the messages page with the conversation pre-selected

### 2. ConversationId Generation

```typescript
// Generate conversationId by combining user IDs (alphabetically sorted)
const ids = [session.user.id, request.requester._id].sort();
const conversationId = ids.join("-");
```

This ensures both users get the same conversationId regardless of who initiates.

### 3. Initial Message

The system sends an automatic greeting:

```
"Hi! I received your request for [Skill Title]. Let's discuss the details!"
```

### 4. Navigation

After message is sent, user is redirected to:

```
/dashboard/messages?conversationId=<conversationId>
```

## Technical Implementation

### Added Imports

```typescript
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSendMessage } from "@/lib/api/messages";
import { toast } from "sonner";
```

### Added State

```typescript
const { data: session } = useSession();
const router = useRouter();
const sendMessageMutation = useSendMessage();
const [isCreatingConversation, setIsCreatingConversation] = useState(false);
```

### Handler Function

```typescript
const handleStartConversation = async () => {
    if (!session?.user?.id || !request.requester?._id) {
        toast.error("Unable to start conversation");
        return;
    }

    try {
        setIsCreatingConversation(true);

        // Generate conversationId by combining user IDs (alphabetically sorted)
        const ids = [session.user.id, request.requester._id].sort();
        const conversationId = ids.join("-");

        // Send initial greeting message to create the conversation
        const initialMessage = {
            conversationId,
            sender: session.user.id,
            receiver: request.requester._id,
            content: `Hi! I received your request for ${request.skillRequested?.title}. Let's discuss the details!`,
            messageType: "text" as const,
            skillContext: request.skillRequested?._id,
        };

        // Send the message via API to create the conversation
        await sendMessageMutation.mutateAsync(initialMessage);

        toast.success("Conversation started!");

        // Navigate to messages page with the conversation
        router.push(`/dashboard/messages?conversationId=${conversationId}`);
    } catch (error) {
        console.error("Error starting conversation:", error);
        toast.error("Failed to start conversation. Please try again.");
    } finally {
        setIsCreatingConversation(false);
    }
};
```

### Updated UI Elements

#### 1. Negotiate Button (Pending Status)

```tsx
<Button
    size="sm"
    variant="outline"
    className="flex-1"
    onClick={handleStartConversation}
    disabled={isCreatingConversation}
>
    <MessageCircle className="h-4 w-4 mr-2" />
    {isCreatingConversation ? "Starting..." : "Negotiate"}
</Button>
```

#### 2. Message Button (Accepted Status)

```tsx
<Button
    size="sm"
    variant="outline"
    onClick={handleStartConversation}
    disabled={isCreatingConversation}
>
    <MessageCircle className="h-4 w-4 mr-2" />
    {isCreatingConversation ? "Starting..." : "Message"}
</Button>
```

#### 3. Dropdown Menu Item

```tsx
<DropdownMenuItem
    onClick={handleStartConversation}
    disabled={isCreatingConversation}
>
    <MessageCircle className="h-4 w-4 mr-2" />
    {isCreatingConversation ? "Starting..." : "Send Message"}
</DropdownMenuItem>
```

## User Experience

### Loading States

-   Buttons show "Starting..." text while creating conversation
-   Buttons are disabled during the process to prevent duplicate requests

### Success Flow

1. User clicks message/negotiate button
2. Button shows "Starting..." and becomes disabled
3. Conversation is created with initial message
4. Success toast notification appears
5. User is redirected to messages page
6. Conversation is automatically selected

### Error Handling

-   If user is not authenticated: Shows error toast
-   If requester data is missing: Shows error toast
-   If API call fails: Shows error toast with retry suggestion
-   Loading state is cleared in all cases (finally block)

## API Integration

### Endpoint Used

```
POST /api/messages
```

### Request Payload

```typescript
{
    conversationId: string; // Combined sorted user IDs
    sender: string; // Current user ID
    receiver: string; // Requester ID
    content: string; // Initial greeting message
    messageType: "text"; // Message type
    skillContext: string; // Skill ID for context
}
```

### Response

Returns the created message object with conversation details.

## Benefits

1. **Seamless Communication**: Direct path from request to conversation
2. **Context Preservation**: Skill context is maintained in messages
3. **Duplicate Prevention**: Same conversationId for both users
4. **User Feedback**: Loading states and toast notifications
5. **Error Resilience**: Comprehensive error handling

## Related Components

-   `OutgoingRequestCard.tsx` - Similar messaging feature for outgoing requests
-   `messages/page.tsx` - Destination page for conversations
-   `lib/api/messages.ts` - API hooks for messaging

## Testing Checklist

-   [ ] Click Negotiate button on pending request
-   [ ] Click Message button on accepted request
-   [ ] Click Send Message in dropdown menu
-   [ ] Verify conversation is created
-   [ ] Verify navigation to messages page
-   [ ] Verify conversation is pre-selected
-   [ ] Test with unauthenticated user
-   [ ] Test with missing requester data
-   [ ] Test loading states
-   [ ] Test error scenarios
-   [ ] Verify toast notifications

## Future Enhancements

1. Add ability to customize initial message
2. Show existing conversation if one already exists
3. Add quick reply templates
4. Support for attachments in initial message
5. Conversation preview before creating

## Dependencies

-   `next-auth/react` - Session management
-   `next/navigation` - Routing
-   `@tanstack/react-query` - API mutations
-   `sonner` - Toast notifications
-   `lib/api/messages` - Message API hooks

## Notes

-   ConversationId pattern ensures consistency across the application
-   Skill context is preserved for better conversation tracking
-   Loading states prevent accidental duplicate conversations
-   Error handling covers all edge cases
-   Toast notifications provide clear user feedback
