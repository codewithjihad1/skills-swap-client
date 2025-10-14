# Follow-Up Feature Flow Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERACTION                             │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
         ┌──────────▼──────────┐    ┌──────────▼──────────┐
         │  Click "Message"    │    │  Click "View Details"│
         │     Button          │    │      Button          │
         └──────────┬──────────┘    └──────────┬──────────┘
                    │                           │
                    │                           ▼
                    │              ┌────────────────────────┐
                    │              │  Enhanced Dialog Opens │
                    │              │  - Exchange Details    │
                    │              │  - Response Message    │
                    │              │  - Next Steps          │
                    │              └────────────┬───────────┘
                    │                           │
                    │              ┌────────────▼───────────┐
                    │              │ Click "Start           │
                    │              │ Conversation" in Dialog│
                    │              └────────────┬───────────┘
                    │                           │
                    └───────────────┬───────────┘
                                    │
┌───────────────────────────────────▼───────────────────────────────────┐
│                    handleStartConversation()                          │
│                                                                       │
│  1. Validate Session                                                 │
│     ├─ Check session?.user?.id exists                               │
│     └─ Check request.skillProvider?._id exists                      │
│                                                                       │
│  2. Generate Conversation ID                                         │
│     ├─ Get user IDs: [userId1, userId2]                            │
│     ├─ Sort alphabetically: ids.sort()                              │
│     └─ Join with hyphen: "userId1-userId2"                          │
│                                                                       │
│  3. Create Initial Message                                           │
│     ├─ conversationId: "userId1-userId2"                            │
│     ├─ sender: session.user.id                                      │
│     ├─ receiver: request.skillProvider._id                          │
│     ├─ content: Greeting template                                   │
│     ├─ messageType: "text"                                          │
│     └─ skillContext: request.skillOffered._id                       │
│                                                                       │
│  4. Send Message via API                                             │
│     └─ POST /api/messages                                            │
│                                                                       │
│  5. Navigate to Messages Page                                        │
│     └─ router.push('/dashboard/messages?conversationId=xxx')        │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│                         BACKEND API                                   │
│                                                                       │
│  POST /api/messages                                                   │
│  ├─ Validate sender and receiver exist                              │
│  ├─ Create Message document                                         │
│  │  ├─ conversationId                                               │
│  │  ├─ sender (populated)                                           │
│  │  ├─ receiver (populated)                                         │
│  │  ├─ content                                                      │
│  │  ├─ messageType                                                  │
│  │  ├─ skillContext                                                 │
│  │  └─ timestamps                                                   │
│  ├─ Save to MongoDB                                                  │
│  ├─ Emit socket event (if online)                                   │
│  └─ Return message object                                            │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│                      MESSAGES PAGE                                    │
│                                                                       │
│  useEffect: Handle Query Parameter                                   │
│  ├─ Read conversationId from URL                                     │
│  ├─ Check if conversation exists in list                            │
│  ├─ Set as selected conversation                                    │
│  └─ Show success toast                                               │
│                                                                       │
│  useEffect: Join Conversation Room                                   │
│  ├─ Join Socket.IO room                                             │
│  └─ Listen for real-time messages                                   │
│                                                                       │
│  useEffect: Mark as Read                                             │
│  └─ PATCH /api/messages/conversation/:id/user/:userId/read         │
│                                                                       │
│  Display:                                                            │
│  ├─ Conversation list (left sidebar)                                │
│  ├─ Selected conversation (highlighted)                             │
│  ├─ Message history (center)                                        │
│  └─ Input field (bottom)                                             │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│                   USER CAN NOW CHAT                                   │
│                                                                       │
│  Real-time messaging with:                                           │
│  ├─ Instant delivery via Socket.IO                                  │
│  ├─ Typing indicators                                                │
│  ├─ Read receipts                                                    │
│  ├─ Online status                                                    │
│  └─ Message history                                                  │
└───────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│              │         │              │         │              │
│   Request    │────────▶│   React      │────────▶│   Messages   │
│   Card       │         │   Query      │         │   Page       │
│              │         │              │         │              │
└──────┬───────┘         └──────┬───────┘         └──────┬───────┘
       │                        │                        │
       │ User clicks            │ API mutation           │ Load conv
       │ "Message"              │ sends message          │ from URL
       │                        │                        │
       ▼                        ▼                        ▼
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│              │         │              │         │              │
│ Generate     │────────▶│   Backend    │────────▶│  Auto-select │
│ Conversation │         │   API        │         │  Conversation│
│ ID           │         │              │         │              │
└──────────────┘         └──────┬───────┘         └──────────────┘
                                │
                                │ Save to MongoDB
                                │ Emit Socket event
                                ▼
                         ┌──────────────┐
                         │              │
                         │   Database   │
                         │   (MongoDB)  │
                         │              │
                         └──────────────┘
```

---

## Component Interaction Diagram

```
OutgoingRequestCard.tsx
│
├─ State Management
│  ├─ showCancelDialog: boolean
│  ├─ showDetailsDialog: boolean
│  └─ isCreatingConversation: boolean
│
├─ Hooks
│  ├─ useRouter() ──────────────┐
│  ├─ useSession() ──────────────┤
│  └─ useSendMessage() ──────────┤
│                                │
├─ Event Handlers               │
│  ├─ handleCancel()             │
│  └─ handleStartConversation() ─┤
│      │                         │
│      ├─ Validate ──────────────┤
│      ├─ Generate ID            │
│      ├─ Send message ──────────┤
│      └─ Navigate ──────────────┤
│                                │
└─ UI Components                 │
   ├─ Card                       │
   │  ├─ Avatar                  │
   │  ├─ Badge (status)          │
   │  ├─ Skills info             │
   │  ├─ Response message        │
   │  └─ Action buttons ─────────┤
   │                             │
   └─ Dialog                     │
      ├─ Header                  │
      ├─ Exchange details        │
      ├─ Response card           │
      ├─ Next steps              │
      └─ Footer buttons ─────────┘
                                 │
                                 ▼
                    Messages Page (page.tsx)
                    │
                    ├─ State Management
                    │  ├─ searchQuery: string
                    │  ├─ newMessage: string
                    │  ├─ selectedConversationId: string
                    │  └─ typingUsers: Set<string>
                    │
                    ├─ Hooks
                    │  ├─ useSession()
                    │  ├─ useSearchParams() ◀────┐
                    │  ├─ useSocket()             │
                    │  ├─ useConversations()      │
                    │  ├─ useMessages()           │
                    │  └─ useSendMessage()        │
                    │                             │
                    ├─ Effects                    │
                    │  ├─ Handle URL param ───────┘
                    │  ├─ Join conversation room
                    │  ├─ Listen for messages
                    │  ├─ Listen for typing
                    │  └─ Mark as read
                    │
                    └─ UI Components
                       ├─ Conversation list (sidebar)
                       ├─ Chat area (main)
                       │  ├─ Header
                       │  ├─ Messages
                       │  └─ Input
                       └─ Search
```

---

## State Transitions

```
Initial State
    │
    ├─ request.status === "pending"
    │   └─ Show: [Cancel Request] button
    │
    └─ request.status === "accepted"
        │
        ├─ Show: [Message] button
        │   │
        │   └─ onClick: handleStartConversation()
        │       │
        │       ├─ State: isCreatingConversation = true
        │       │   Button text: "Starting..."
        │       │
        │       ├─ API Call: POST /api/messages
        │       │   Loading...
        │       │
        │       ├─ Success
        │       │   ├─ Toast: "Conversation started!"
        │       │   ├─ Navigate to messages
        │       │   └─ State: isCreatingConversation = false
        │       │
        │       └─ Error
        │           ├─ Toast: "Failed to start conversation"
        │           └─ State: isCreatingConversation = false
        │
        └─ Show: [View Details] button
            │
            └─ onClick: setShowDetailsDialog(true)
                │
                └─ Dialog Opens
                    │
                    ├─ Show exchange details
                    ├─ Show response message
                    ├─ Show next steps
                    │
                    └─ Footer buttons
                        ├─ [Close] → setShowDetailsDialog(false)
                        └─ [Start Conversation] → handleStartConversation()
```

---

## Error Handling Flow

```
handleStartConversation()
│
├─ Validation
│  │
│  ├─ !session?.user?.id
│  │   └─ ❌ Toast: "Unable to start conversation"
│  │       └─ STOP
│  │
│  └─ !request.skillProvider?._id
│      └─ ❌ Toast: "Unable to start conversation"
│          └─ STOP
│
├─ Try Block
│  │
│  ├─ setIsCreatingConversation(true)
│  │
│  ├─ Generate conversationId
│  │
│  ├─ Send message via API
│  │   │
│  │   ├─ Success (200/201)
│  │   │   ├─ ✅ Toast: "Conversation started!"
│  │   │   └─ Navigate to messages
│  │   │
│  │   └─ Error (4xx/5xx)
│  │       └─ Throw error → Catch block
│  │
│  └─ Catch Block
│      │
│      ├─ console.error()
│      ├─ ❌ Toast: "Failed to start conversation"
│      └─ Finally: setIsCreatingConversation(false)
│
└─ Finally Block
    └─ setIsCreatingConversation(false)
```

---

## Real-time Communication

```
┌─────────────────────────────────────────────────────────────┐
│                    Socket.IO Flow                           │
└─────────────────────────────────────────────────────────────┘

User A (Sender)                    Server                    User B (Receiver)
│                                    │                              │
├─ Send message                      │                              │
│  └─ sendSocketMessage()            │                              │
│                                    │                              │
├─────────────────────────────────▶ │                              │
│  POST /api/messages                │                              │
│  + Socket emit                     │                              │
│                                    │                              │
│                                    ├─ Save to database            │
│                                    │                              │
│                                    ├─ Emit "message:new"          │
│                                    │                              │
│ ◀──────────────────────────────── ├─────────────────────────────▶│
│  Confirmation                      │  Real-time delivery          │
│                                    │                              │
│                                    │                              ├─ Receive message
│                                    │                              │  └─ Update UI
│                                    │                              │
│                                    │  ◀────────────────────────── ├─ Mark as read
│                                    │  Socket emit "message:read"  │
│                                    │                              │
│ ◀──────────────────────────────── │                              │
│  Read receipt                      │                              │
│  └─ Show ✓✓                       │                              │
│                                    │                              │
```

---

## Database Schema

```
Message Document
┌─────────────────────────────────────────────┐
│ _id: ObjectId                               │
│ conversationId: String "userId1-userId2"    │
│ sender: ObjectId → User                     │
│ receiver: ObjectId → User                   │
│ content: String                             │
│ messageType: String (text/image/file)       │
│ isRead: Boolean                             │
│ isDelivered: Boolean                        │
│ skillContext: ObjectId → Skill (optional)   │
│ createdAt: Date                             │
│ updatedAt: Date                             │
└─────────────────────────────────────────────┘
                    │
                    │ Indexes
                    ├─ conversationId
                    ├─ sender
                    ├─ receiver
                    └─ createdAt
```

---

## URL Structure

```
From Request Card
    │
    └─ Click "Message"
        │
        └─ Generate: /dashboard/messages?conversationId=xxx
            │
            ├─ conversationId format: "userId1-userId2"
            │  Example: "507f191e-507f1f77"
            │
            └─ Full URL:
               http://localhost:3000/dashboard/messages?conversationId=507f191e-507f1f77

Messages Page
    │
    ├─ useSearchParams()
    │  └─ Get conversationId from URL
    │
    ├─ Find in conversations array
    │
    └─ Auto-select conversation
       ├─ setSelectedConversationId(conversationId)
       └─ Toast: "Conversation loaded!"
```

---

**Diagram Legend:**
- `│` : Flow direction
- `├─` : Branch
- `└─` : End of branch
- `▶` : Data/action flow
- `◀` : Response/callback
- `✅` : Success state
- `❌` : Error state

---

*Visual diagrams help understand complex flows at a glance!*
