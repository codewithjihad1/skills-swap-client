# Fix: Duplicate Message Send Issue

## Issue

**Problem**: When a user sends a message, it appears twice in the conversation - the same message is duplicated.

**Screenshot Evidence**:

-   User sends "hi" → appears twice
-   User sends "how are you?" → appears twice

## Root Cause

The `handleSendMessage` function was sending the message **twice**:

1. **Via Socket.IO**: `sendSocketMessage(messageData)`
2. **Via API**: `sendMessageMutation.mutate(messageData)`

### Why This Caused Duplicates

```typescript
// ❌ BEFORE - Duplicate sends
const handleSendMessage = () => {
    const messageData = { ... };

    // First send: Socket.IO emits "message:send"
    sendSocketMessage(messageData);

    // Second send: API POST to /api/messages
    sendMessageMutation.mutate(messageData);
};
```

**The Flow**:

1. Socket.IO emits `message:send` → Backend saves to DB → Backend broadcasts via Socket → UI receives and displays
2. API call saves to DB again → React Query refetches → UI displays again
3. **Result**: Same message appears twice

## Solution

**Use only the API mutation** for sending messages. The backend should handle Socket.IO broadcasting after saving.

### Fixed Code

```typescript
// ✅ AFTER - Single send
const handleSendMessage = () => {
    if (
        !newMessage.trim() ||
        !selectedConversationId ||
        !otherUser ||
        !session?.user?.id
    )
        return;

    const messageData = {
        conversationId: selectedConversationId,
        sender: session.user.id,
        receiver: otherUser?._id,
        content: newMessage.trim(),
        messageType: "text" as const,
    };

    // Only save to database via API
    // The backend will handle Socket.IO broadcasting
    sendMessageMutation.mutate(messageData);

    setNewMessage("");
};
```

## Changes Made

**File**: `src/app/(dashboard)/dashboard/messages/page.tsx`

### Removed

```typescript
// ❌ Removed duplicate send
sendSocketMessage(messageData);
```

### Kept

```typescript
// ✅ Single source of truth
sendMessageMutation.mutate(messageData);
```

### Added Type Safety

```typescript
messageType: "text" as const,  // TypeScript const assertion
```

## How It Works Now

### Message Flow

```
User types message
    ↓
User presses Enter/Send
    ↓
handleSendMessage() called
    ↓
sendMessageMutation.mutate(messageData)
    ↓
API: POST /api/messages
    ↓
Backend: Saves to MongoDB
    ↓
Backend: Emits Socket.IO event (if implemented)
    ↓
React Query: Invalidates queries
    ↓
UI: Re-fetches messages
    ↓
Message appears ONCE ✅
```

## Backend Consideration

**Important**: Make sure your backend Socket.IO handler doesn't also save messages when receiving "message:send" events.

### Option 1: Backend Already Broadcasting (Recommended)

If your backend API endpoint already broadcasts via Socket.IO after saving:

```javascript
// Backend: messageController.js
sendMessage: async (req, res) => {
    // Save to database
    const message = await Message.create(messageData);

    // Broadcast via Socket.IO
    io.to(conversationId).emit("message:new", message);

    res.status(201).json(message);
};
```

Then the frontend should ONLY use API calls (current fix is correct).

### Option 2: Backend NOT Broadcasting

If your backend does NOT broadcast after saving, you have two choices:

**Choice A**: Add broadcasting to backend (recommended)

```javascript
// Add this to your sendMessage controller
io.to(conversationId).emit("message:new", message);
```

**Choice B**: Keep both sends in frontend (not recommended)

```typescript
// Use API for persistence
sendMessageMutation.mutate(messageData);

// Use Socket for real-time (but don't save in backend)
sendSocketMessage(messageData);
```

## Testing

### Test Case 1: Send Single Message

1. Open messages page
2. Select a conversation
3. Type "Hello" and send
4. **Expected**: Message appears once
5. **Verify**: Check database - should have only one entry

### Test Case 2: Send Multiple Messages

1. Send "Message 1"
2. Send "Message 2"
3. Send "Message 3"
4. **Expected**: Each message appears exactly once
5. **Verify**: Conversation shows 3 messages, not 6

### Test Case 3: Real-time Delivery

1. User A sends message to User B
2. User B should see message in real-time
3. **Expected**: Message appears once for both users
4. **Verify**: Both users see same message count

### Test Case 4: Network Error

1. Disconnect internet
2. Try sending message
3. **Expected**: Error notification
4. **Verify**: Message not duplicated when reconnecting

## Verification Steps

1. **Check Database**

    ```bash
    # MongoDB shell
    db.messages.find({ conversationId: "your-conversation-id" }).count()
    ```

    Each sent message should create only ONE document.

2. **Check Browser Network Tab**

    - Should see ONE POST request to `/api/messages` per message
    - Should NOT see multiple identical requests

3. **Check Browser Console**

    - Should NOT see duplicate logs
    - Should NOT see "message:send" Socket events if using API only

4. **Check React Query DevTools**
    - Messages cache should update once per send
    - No duplicate mutations

## Benefits of This Fix

✅ **No More Duplicates**: Each message appears exactly once  
✅ **Single Source of Truth**: API handles all persistence  
✅ **Better Performance**: One network request instead of two  
✅ **Cleaner Code**: Simpler message flow  
✅ **Easier Debugging**: Clear data flow  
✅ **Type Safety**: Added TypeScript const assertion

## Rollback Plan

If issues occur, temporarily revert to dual-send approach:

```typescript
// Emergency rollback
const handleSendMessage = () => {
    const messageData = { ... };

    // Use both (but fix backend to not duplicate)
    sendSocketMessage(messageData);
    sendMessageMutation.mutate(messageData);

    setNewMessage("");
};
```

But better solution is to fix the backend duplication issue.

## Related Files

-   ✅ `src/app/(dashboard)/dashboard/messages/page.tsx` - Fixed
-   `src/lib/api/messages.ts` - API hooks (no changes needed)
-   `src/context/SocketContext.tsx` - Socket context (no changes needed)
-   `src/controllers/messageController.js` (Backend) - May need Socket broadcasting

## Future Improvements

1. **Optimistic Updates**: Show message immediately before API response

    ```typescript
    // Add optimistic update
    sendMessageMutation.mutate(messageData, {
        onMutate: async (newMessage) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries(["messages"]);

            // Optimistically update UI
            // ...
        },
    });
    ```

2. **Retry Logic**: Automatically retry failed sends
3. **Message Queue**: Handle offline messages
4. **Read Receipts**: Show when message is delivered and read
5. **Message Status**: Sending → Sent → Delivered → Read

## Monitoring

After deployment, monitor for:

-   ✅ Message count per conversation (should match expected)
-   ✅ Database entries per message (should be exactly 1)
-   ✅ API request count (should match message count)
-   ❌ User reports of duplicate messages
-   ❌ Database query errors

---

**Fixed**: January 9, 2025  
**Issue Type**: Logic Bug (Double Send)  
**Severity**: High (User Experience Impact)  
**Status**: ✅ Fixed and Ready for Testing  
**Lines Changed**: ~10 lines
